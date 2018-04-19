# -*- coding: u/tf-8 -*-
"""
Created on Thu Apr 19 13:32:09 2018

@author: BrunoAdmin
"""
import databaseInteraction as db
import datetime
import pandas as pd

def create_event():
    """
    Create a temp event with unique id.
    
    Returns the uniqueID of the event
    """
    pass

def delete_event():
    """
    Simply deleted a finished event
    
    Returns flag
    """
    pass


def show_all_events(lg=):
    """
    Returns all the ID of one lifegroup
    
    """
    pass


def submit(lg_unit, name, driver_flag):
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
    df
    
    
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