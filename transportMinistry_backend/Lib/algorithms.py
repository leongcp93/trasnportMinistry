# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 12:08:54 2018

@author: BrunoAdmin
"""
import sys
def find_combinations(drivers={}, passengers={}):
    """
    Graph mining method:
        - Given nodes as centres
        - find the closest points for each nodes
        - k-d tree implementation
        - it is a 3d data structure; for each person(lg, lat, long)
        
    Input: 
        - drivers = {name: (postcode, capacity)}
        - passenger = {name: postcode}
        
    Output:
        - combinations = {driver1: [p1, p2, p5], 
                          driver2: [p3, p4] ...}
    """
    
    from scipy.spatial import KDTree
    import numpy as np
    # Ref: https://docs.scipy.org/doc/scipy-0.14.0/reference/generated/scipy.spatial.KDTree.query.html
    # retrieve the lat, long of one lg -> data
    list_postcode_driver = []
    list_postcode_passenger = []
    map_postcode_driver = {}
    map_postcode_passenger = {}
    
    # list out all driver keys
    listDrivers(list_postcode_driver, map_postcode_driver, drivers)
        
    # list out all passengers keys
    listPassengers(list_postcode_passenger, map_postcode_passenger, passengers)
    
    # mapping postcodes with lat/long
    ## Format: reverse format {(lat, long): postcode}
    dict_post_passenger = {}
    dict_post_passenger = _map_postcode(list_postcode_passenger)
    
    # Define k for each driver, according to their locaiton / size
    # dict format: {driver: }
    dict_drive_passenger_map = {}
    list_driver = drivers.keys()
    list_passenger = passengers.keys()
    postcode_obj = postcode_finder()
    ready_to_pop = []
    while True:
        
        # modify dictionary before next iteration: avoid poping during iteration
        for p in ready_to_pop:
            drivers.pop(p)
        ready_to_pop = []

        # the actual loop        
        for d, pair in drivers.items():
            #reconstruct the kdtree again
            ls_np = []
            for p in dict_post_passenger.keys():
                ls_np.append([p[0],p[1]])
            data = np.array(ls_np)
            
            ## return dict when there is no data: is good
            if len(data) == 0:
                return dict_drive_passenger_map
            else:
                tree = KDTree(data)
            
            # find the nearest Non-picked passenger
            d_location = postcode_obj._return_coordinates(pair[0])
            nearest_postcode, nearest_cor = _find_min(d_location, tree, dict_post_passenger)
            
            # find a passenger from the postcode
            arr_ps = map_postcode_passenger.get(nearest_postcode)
            #print("Current driver: {}".format(d))
            #print("All the passengers in this postcode: {}".format(arr_ps))
            #print("The nearest coordinates: {}".format(nearest_cor))
            #print("The nearest postcode: {}".format(nearest_postcode))
            
            
            ## check if this ps is still in the passenger list
            for i, p in enumerate(arr_ps):
                if p in passengers: 
                    nearest_p = p
                    break
                else:
                    print('Something went wrong')
                    continue
            
            # then commit change to the dict
            arr = dict_drive_passenger_map.get(d)
            if arr == None: 
                arr = [nearest_p]
            else:
                arr.append(nearest_p)
            dict_drive_passenger_map.update({d:arr})
            
            # Drop this driver: if the driver cap is full
            if len(dict_drive_passenger_map.get(d)) >= drivers.get(d)[1]:
                ready_to_pop.append(d)
        
            ### Drop this passanger: must
            passengers.pop(nearest_p)
            
            ### and update the map_postcode_passenger
            arr = map_postcode_passenger.get(nearest_postcode)
            arr.pop(arr.index(nearest_p))
            if len(arr) == 0:
                map_postcode_passenger.pop(nearest_postcode)
                dict_post_passenger.pop((nearest_cor[0],nearest_cor[1]))
            else:
                map_postcode_passenger.update({nearest_postcode:arr})
                
        # Break condition
        if len(list_passenger) <= 0 or len(list_driver) <= 0: 
            break
        
    # For those who did not have car, take bus
    ls = []
    for i in passengers:
        ls.append(i)
    dict_drive_passenger_map.update({'Not assigned': ls})
    return dict_drive_passenger_map
    
## Helpers
def listDrivers(list_postcode_driver, map_postcode_driver, drivers):
    for dv, pair in drivers.items():
        postcode = pair[0]
        if postcode not in list_postcode_driver:
            list_postcode_driver.append(postcode)
            
        # mapping postcode -> driver
        arr = map_postcode_driver.get(postcode)
        if arr == None:
            map_postcode_driver.update({postcode:[dv]})
        else:
            arr.append(dv)
            map_postcode_driver.update({postcode:arr})

def listPassengers(list_postcode_passenger, map_postcode_passenger, passengers):
    for ps, postcode in passengers.items():
        if postcode not in list_postcode_passenger:
            list_postcode_passenger.append(postcode)
            
        # mapping postcode -> passengers
        arr = map_postcode_passenger.get(postcode)
        if arr == None:
            map_postcode_passenger.update({postcode:[ps]})
        else:
            arr.append(ps)
            map_postcode_passenger.update({postcode:arr})
def _map_postcode(list_postcode):
    """
    Pass in a set of postcode (no duplicate).
    Expect to transform into a reverse index that
    uses (lat, long) as key.
    
    input: list of postcode
    output: dict_rev_index
    """
    p = postcode_finder()
    dc = {}
    for l in list_postcode:
        dc.update({p._return_coordinates(l):l})
    return dc

def _find_min(coordinates, tree, map_cor2pc, k=1):
    """
    Finds out the closest person with given d_location
    
    Return the name and postcode of the closest person
    """
    result = tree.query(coordinates, k=k)
    dis = result[0]
    cor = tree.data[result[1]]
    postcode = map_cor2pc.get((cor[0],cor[1]))
    
    ## debug
    #print("The distance:{}".format(dis))
    #print("The cordinate:{}".format(cor))
    #print("The postcode:{}".format(postcode))
    return postcode, cor
    
class postcode_finder(object):
    """
    This is a helper class, that boost up performance of retrieving postcode (lat, long)
    """
    def __init__(self):
        import pandas as pd
        self.d = pd.read_csv('Database/Australian_postcode_location.csv')

    def _return_coordinates(self, postcode):
        """
        Simply return a coordinates for that postcode
        """
        try:
            e = self.d.loc[self.d['postcode'] == postcode][:1]
            return (round(e['lat'].values[0],4), round(e['lon'].values[0],4))
        except:
            return (0,0)

## Helpers end
    

### Debug: dummy inputs
if __name__ == "__main__":
    # demo example
    drivers = {'adam':(4000, 1), 
               'peter':(4067, 5),
               'spam':(4066, 6),
               'rr':(4000, 3)}
    
    passengers = {'a':4030,
                  'aa':4000,
                  'aaa':4051,
                  'p':4068,
                  'pp':4067,
                  'ppp':4104,
                  's':4069,
                  'ss':4074,
                  'sss':4066,
                  't':4170,
                  'tt':4172,
                  'ttt':4005,
                  'qw':4030,
                  'aqwa':4000,
                  'aawa':4051,
                  'fp':4068,
                  'pvp':4067,
                  'pnpp':4104,
                  'sv':4069,
                  'sds':4074,
                  'ssss':4066,
                  'te':4170,
                  'ttbt':4172,
                  'tutt':4005,
                  'qqaa':4000,
                  'awwaa':4051,
                  'pe':4068,
                  'perp':4067,
                  'pperp':4104,
                  'ser':4069,
                  'ssdc':4074,
                  'sdcss':4066,
                  'tdc':4170,
                  'tdct':4172,
                  'ttdct':4005,
                  'qdcw':4030,
                  'aqdcwa':4000,
                  'aawdca':4051,
                  'fpdc':4068,
                  'pvdvp':4067,
                  'pnfbpp':4104,
                  'svfb':4069,
                  'sdgns':4074}
    
    d = find_combinations(drivers, passengers)
    print(d)
    
