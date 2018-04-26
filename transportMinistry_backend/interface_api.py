# -*- coding: utf-8 -*-
"""
Created on Tue Apr  3 16:09:28 2018

@author: BrunoAdmin

Notes:
    Webservice run on port 3000

"""
from flask import Flask, Response, request, send_file, jsonify, send_from_directory
import threading
import Lib.databaseInteraction as db
import Lib.algorithms as alg
import Lib.transportPlanning as plan
import csv
import os
app = Flask(__name__)
    
## Actual implementation
global url_prex
url_prex = '/api'
    
@app.route("{}/".format(url_prex), methods=['GET'])
def index(): 
    """
    Landing page
    """
    
    def html_process(tag, contents):
        # mini helper method to generate tag
        s = ""
        for c in contents:
            s += "<{}>{}</{}>".format(tag,c,tag)
        return s
    
    header = ["Welcome to Hope Church Life Group Transportation management web service documentation page"]
    header = html_process("h1",header)
    
    dc = ["I mean, you are actually not supposed to see this... But if you do, ya, here are some \
          of the RESTful api that you can call directly via url. JSON files or otherwise strings\
           will be returned. I hope you are developer, otherwise please use the proper interface to \
           interact with the system. IF YOU SIMPLY CALL THESE METHODS, YOU WILL PROBABLY SCREW \
           UP THE SYSTEM!!!! nuh i m just kidding..."]
    dc = html_process("p",dc)
    methods = ["[get ] /: webservice landing page, instructions of all available methods", ##
               "[get ] /readme: all the detailed requirements",
               "--- DB interaction ---",
               "[post] /editPerson: {'lg':value, 'name':value, 'postcode':value}", ##
               "[post] /deletePerson: {'lg':value, 'name':value}", ##
               "[post] /registerPerson: {'lg':value, 'name':value, 'postcode':value}", ##
               "[post] /addLG: {'lg':value, 'auth':value}", ##
               "[post] /deleteLG: {'lg':value, 'auth':value}",##
               "[get ] /nuclearbomb: reset everything",##
               "--- Event planning ---",
               "[post] /submit: ",
               "[post] /bestmatches: ",
               "--- Display info ---",
               "[get ] /whoisgoing/?event_id=<value> : show all the names who is going",
               "[get ] /showmembers/?auth=<value>&lg=<value> : who is in the lifegroup",
               "[get ] /"]
    methods = html_process("li",methods)
    
    
    h2 = ["The txt file has to be in this format in order to work"]
    h2 = html_process("h2",h2)
    
    txt_format = ["1st row: ['title1','title2',...]",
                  "2nd row: ['job1','job2',...]",
                  "Example is below (upload.txt):",
                  "--------------I am upload.txt------------------",
                  "['junior', 'graduate', 'parttime']",
                  "['marketing', 'accountant', 'banker']",
                  "--------------I am upload.txt------------------"]
    txt_format = html_process("p",txt_format)
    
    body = "<html><body>\
            {}{}\
            <ul>{}</ul>\
            </body></html>".format(header, dc, methods)
    
    return body    

## Reademe
@app.route("{}/readme".format(url_prex), methods=['GET'])
def read_me():
    return app.send_static_file('readme.html')

## DB direct modify
@app.route("{}/addLG".format(url_prex), methods=['POST'])
def add_LG(): ##
    """
    Register life group
    
    Requires:
        - lifegroup name
        
    Returns:
        - success / fail
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        
        ## exec
        msg = db.LifeGroup(lg=lg)
        msg = msg.add_lg()
        
        return msg
    
    except Exception as e:
        return e
        #return "Some internal error existed"


@app.route("{}/deleteLG".format(url_prex), methods=['POST'])
def delete_LG(): ##
    """
    Delete life group
    
    Requires:
        - lifegroup name
        
    Returns:
        - success / fail
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        msg = db.LifeGroup(lg).del_lg()
        return msg
    
    except Exception as e:
        return "Some internal error existed"
    
@app.route("{}/registerPerson".format(url_prex), methods=['POST'])
def add_person(): ##
    """
    Register person
    
    Requires:
        - person name
        - life group
        - postcode
        
    Returns:
        - success / fail
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        name = content.get('name')
        postcode = content.get('postcode')
        
        msg = db.Person(lg = lg, name = name, postcode = postcode).add_db()
        return msg
        #return "Added successfully"
    
    except Exception as e:
        return "Some internal error existed"

@app.route("{}/editPerson".format(url_prex), methods=['POST'])
def edit_person():
    """
    Register life group
    
    Requires:
        - person name
        - life group
        - postcode
        
    Returns:
        - success / fail
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        name = content.get('name')
        postcode = content.get('postcode')
        
        msg = db.Person(lg = lg, name = name, postcode = postcode).edit_db()
        return msg
        #return "Edited successfully"
    
    except Exception as e:
        return "Some internal error existed"
    

@app.route("{}/deletePerson".format(url_prex), methods=['POST'])
def delete_person():
    """
    Register life group
    
    Requires:
        - person name
        - life group
        
    Returns:
        - success / fail
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        name = content.get('name')
        
        msg = db.Person(lg = lg, name = name).del_db()
        return msg
        #return "Deleted successfully"
    
    except Exception as e:
        return "Some internal error existed"

@app.route("{}/nuclearbomb".format(url_prex), methods=['GET'])
def reset(): ##
    """
    Reset db
    """
    msg = db.red_reset_button()
    return msg


## -------------------------------------------------------------
## ----------------Event -------------------------------------
@app.route("{}/submit".format(url_prex), methods=['POST'])
def api_submit(): ##
    """
    Submit the person info that are going to one particular event.
    """
    try:
        ## receive file
        content = request.get_json()
        event = content.get('event_id')
        lg = content.get('lg')
        name = content.get('name')
        driver_flag = content.get('isDriver')
        pc_from = content.get('postcode_from')
        pc_to = content.get('postcode_to')
        
        ## 
        msg = submit(event, lg, name, driver_flag, pc_from, pc_to)
        if type(msg) == tuple:
            pass
            
        else:
            return msg
    
    except Exception as e:
        return "Some internal error existed {}".format(e)

@app.route("{}/createEvent".format(url_prex), methods=['POST'])
def api_createEvent(): ##
    """
    Submit the person info that are going to one particular event.
    """
    try:
        ## receive file
        content = request.get_json()
        lg = content.get('lg')
        pc_from = content.get('postcode_from')
        pc_to = content.get('postcode_to')
        note = content.get('note')
        
        ## Event        
        e = plan.Event(lg= lg, note=note)
        e_id = e.create_event()
        return e_id
    
    except Exception as e:
        return "Some internal error existed {}".format(e)
    
@app.route("{}/bestmatches".format(url_prex), methods=['POST'])
def api_bestmatches(): ##
    """
    Submit the person info that are going to one particular event.
    """
    try:
        ## receive file
        content = request.get_json()
        event_id = content.get('event_id')
        lg = content.get('lg')
        
        ## Get drivers / passengers
        drivers
        passengers
        
        ## trigger calculation        
        mapping = alg.find_combinations(drivers, passengers)
        return mapping
    
    except Exception as e:
        return "Some internal error existed {}".format(e)


## ----------------End Event----------------------------------------
## -------------------------------------------------------------
    

    ## -------------------------------------------------------------
## -------------------------------------------------------------
    ## -------------------------------------------------------------
## -------------------------------------------------------------
    ## -------------------------------------------------------------
## -------------------------------------------------------------
    
## -------------------------------------------------------------
## -------------------------------------------------------------

### Scheduler
"""
Reference:
https://stackoverflow.com/questions/21214270/scheduling-a-function-to-run-every-hour-on-flask?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

"""
if __name__ == "__main__":
    ## cd to absolute dir (depends on server)
    #os.chdir("/home/bruno1993/transport_api/")
    app.run(host="0.0.0.0", port=3000)
    
    
    
    
    
    