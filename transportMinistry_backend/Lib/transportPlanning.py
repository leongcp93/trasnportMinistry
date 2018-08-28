# -*- coding: utf-8 -*-
"""
Created on Thu Apr 19 09:08:54 2018

@author: BrunoAdmin
"""

#import databaseInteraction as db
import datetime
import pandas as pd
import os
import Lib.databaseInteraction as db

global path
path = "Events_temp"

## Event file handling
class Event(object):
    def __init__(self, lg=None, unique_id=None):
        """
        This event object contains all the functions admin needs to 
        create / delete / listing all events
        """
        self.lg = lg
        self.unique_id = unique_id
        
    def create_event(self, pc_from, pc_to, destination, startingTime):
        """
        Create a temp event with unique id.
        
        Format startingTime:
        "YYYY_MM_DD-hhmm"
        
        Returns the uniqueID of the event
        """
        ## definition
        lg = self.lg
        # define name
        time = startingTime.replace(':', '-')
        unique_id = "[{}]{}-{}-{}#{}#".format(lg, pc_from, pc_to, destination, time)
        
        # define file
        colm = {'name':[], 'postcode':[], 'driver':[]}
        file = pd.DataFrame(data=colm)
        
        # check if file already existed
        if "{}.csv".format(unique_id) in os.listdir(path):
            raise Exception("Same event already existed.")
        
        else:
            file.to_csv('{}/{}.csv'.format(path, unique_id), index=False)
            return unique_id
    
    def list_events(self):
        """
        Returns all the ID of one lifegroup
        """
        lg = self.lg
        
        # get all files from the directory'
        ls = os.listdir("{}".format(path))
        if ls != None:
            ls.sort()
        else:
            return []
        
        # parse the bracket and append only file with lg==this_lg
        files = []
        for i in ls:
            # Analysing lifegroup
            this_lg = i.split(']')[0].strip('[]')
            if this_lg == lg or lg == None:
                i = i.strip('.csv')
                files.append(i)
                
        return files

    def delete_event(self):
        """
        Simply deleted a finished event
        
        Returns flag
        """
        event_id = self.unique_id
        try:
            filename = "{}.csv".format(event_id)
            os.remove("{}/{}".format(path, filename))
            return "Delete successfully"
        except:
            return "Warning: event not found."

## event file handling ends


## Event action handling
def submit(event_id, lg_unit, name, driver_flag, code_vary):
    """
    Submit attendee's info; Store it temporary in folder Event_temp
    Returns: flag (success / fail)
    """
    
    lg_unit = lg_unit.lower()
    name = name.lower()
    
    # parsing info: check if lg and person exist
    lg = db.show_all_lg()
    people = db.show_person(lg=lg_unit)
    people = [p[1] for p in people]
    
    
    ## check
    if lg_unit not in lg:
        raise Exception('Warning: Lifegroup not registered.')
    
    if name not in people:
        raise Exception('Warning: Name not registered.')
        
    if len(people) >= 2:
        # there exist 2 person with same name in lg, need to uniquely identify
        msg = 'Warning: More than 1 person found with same name.'
        return (msg, people)

    ## Normal submit procedure    
    try:
        msg = _submit_confirm(lg_unit, name, event_id, code_vary, driver_flag)
        return msg
    except Exception as e:
        return e
    

def _submit_confirm(lg_unit, name, event_id, code_vary, driver_flag):
    """
    Require the input be correct
    Returns: flag (success / fail)    
    """
    
    #### Register this person into event
    event_path = '{}/{}.csv'.format(path, event_id)
    df = pd.read_csv(event_path)
    
    #### detect duplicates
    # name is the primary key in this file
    if name in df['name'].values:
        # change record
        condition = df['name'] == name
        df.postcode.loc[condition] = code_vary
        df.driver.loc[condition] = driver_flag
        
    else:
        df = df.append({'name':name, 'postcode':code_vary, 'driver':driver_flag}, ignore_index=True)
        df.to_csv('{}/{}.csv'.format(path, event_id), index=False)
    
    #### Registering done
    # return flag also event id
    return 'Request submited to {}'.format(event_id)

## Event action handling ends
## Debug only
if __name__ == "__main__":
    # event details
    lg = 'uq6'
    u_id = Event(lg).create_event()
    print(u_id)
    
    # personal info
    lg = 'uq6'
    name = 'bruno'
    print(submit(u_id, lg,name, 4, 4067))
    
