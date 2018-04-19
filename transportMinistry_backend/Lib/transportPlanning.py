# -*- coding: utf-8 -*-
"""
Created on Thu Apr 19 09:08:54 2018

@author: BrunoAdmin
"""

import databaseInteraction as db
import datetime
import pandas as pd
import os

global path
path = "../Events_temp"

## Event file handling
def create_event(lg, date, time):
    """
    Create a temp event with unique id.
    
    Returns the uniqueID of the event
    """
    # define name
    unique_id = "[{}]{}{}".format(lg,date, time)
    
    # define file
    file = pd.DataFrame()
    file.to_csv('{}/{}.csv'.format(path, unique_id), index=False)
    return unique_id


def delete_event(event_id=None):
    """
    Simply deleted a finished event
    
    Returns flag
    """
    try:
        filename = "{}.txt".format(event_id)
        os.remove("{}/{}".format(path, filename))
        return "Delete successfully"
    except:
        return "Warning: event not found."

def find_lg_events(lg=None):
    """
    Returns all the ID of one lifegroup
    """
    # get all files from the directory
    ls = os.listdir("{}".format(path))
    
    # parse the bracket and append only file with lg==this_lg
    files = []
    for i in ls:
        # Analysing lifegroup
        this_lg = i.split(']')[0].strip('[]')
        if this_lg == lg or lg==None:
            files.append(i)
            
    return files

## event file handling ends
    

## Event action handling
def submit(event_id, lg_unit, name, driver_flag):
    """
    Submit attendee's info; Store it temporary in folder Event_temp
    Returns: flag (success / fail)
    """
    lg_unit = lg_unit.lower()
    name = name.lower()
    
    # parsing info: check if lg and person exist
    lg = db.show_all_lg()
    people = db.show_person(lg=lg_unit)
    
    ## check
    if lg_unit not in lg:
        return 'Warning: Lifegroup not registered.'
    
    if name not in people:
        return 'Warning: Name not registered.'
    
    if len(people) >= 2:
        return people
    
    # timestamp
    tmstamp = datetime.datetime.now().strftime("%Y-%m-%d[%H-%M]")
    
    # store file under folder: if event is not created yet
    
    
    # Register this person into event
    df = pd.read_csv()
    
    
    # return flag 
    return 'Request submited'

def submit_confirm(lg_unit, name):
    """
    Require the input be correct
    Returns: flag (success / fail)    
    """
    # Parse info
    
    
    
    # store
    
    pass

## Event action handling ends