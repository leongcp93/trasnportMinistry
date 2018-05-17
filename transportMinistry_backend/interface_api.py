# -*- coding: utf-8 -*-
"""
Created on Tue Apr  3 16:09:28 2018

@author: BrunoAdmin

Notes:
    Webservice run on port 3000

"""
from functools import wraps
from flask import Flask, Response, request, jsonify, render_template

import Lib.databaseInteraction as db
import Lib.algorithms as alg
import Lib.transportPlanning as plan
import pandas as pd

import base64
app = Flask(__name__)
    
## Actual implementation
global url_prex, auth_passcode
url_prex = '/api'
auth_passcode = 'pw1234'


## --------------------- Auth class --------------------------------
def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == 'admin' and password == 'badpassword'

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Your username/password is wrong.', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated
## --------------------- Auth class --------------------------------
    

## ---------------------- Converter class ----------------------------
class CodeConverter(object):
    def __init__(self):
        pass
    
    def external2internal(self, eventID):
        # uq6-2018-05-01-20-13-26 to
        # [uq6]2018-05-01#20-13-26#
        ls_event = eventID.split('-')
        
        lg = ls_event[0]
        yy = ls_event[1]
        mm = ls_event[2]
        dd = ls_event[3]
        h = ls_event[4]
        m = ls_event[5]
        s = ls_event[6]
        
        encode = "[{}]{}-{}-{}#{}-{}-{}#".format(lg,yy,mm,dd,h,m,s)
        return encode
    
    def internal2external(self, eventID):
        # [uq6]2018-05-01#20-13-26# to
        # uq6-2018-05-01-20-13-26
        lg = eventID.split(']')[0][1:]
        yymmdd = eventID.split(']')[1].split('#')[0]
        hms = eventID.split('#')[1]
        encode = "{}-{}-{}".format(lg, yymmdd, hms)
        return encode
    
    def encode(self, code):
        """
        String
        """
        e = base64.b64encode(code.encode()) 
        return e.decode('utf-8')
    
    def decode(self, code):
        """
        String
        """
        d = base64.b64decode(code.encode()) 
        return d.decode('utf-8')
## ---------------------- Converter class ----------------------------

@app.route("{}/".format(url_prex), methods=['GET'])
def index(): 
    """
    Landing page
    """
    body = "<h1>Hope Church Transport app API Landing page</h1>"
    body = body + "<p>Please enter through <a href='http://transport.hope-church.com.au'>main entrance</a>, this is back door</p>"
    body = body + "<p>I hate hackers, so please dont mess up with me. I am SERIOUS! Nuh, I am just kidding; Jesus and I still love you <3. But ya, please <b> go to the main entrance if you are not part of our dev team; otherwise you will mess up the system </b>. Thanks</p>"
    body = body + "<p>Full document please visit <a href='/api/readme'>readme</a></p>"
    body = body + "<p>Established on 15/05/2018 ; Developed by Patrick and Bruno.</p>"
    return body

@app.route("{}/readme".format(url_prex), methods=['GET'])
@requires_auth
def secret_page():
    return render_template('readdoc.html')

## DB direct modify
@app.route("{}/lifegroup".format(url_prex), methods=['PUT'])
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
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return "Un-authorized action"
        
        ## exec
        msg = db.LifeGroup(lg=lg)
        msg = msg.add_lg()
        
        return msg
    
    except Exception as e:
        return e
        #return "Some internal error existed"


@app.route("{}/lifegroup".format(url_prex), methods=['DELETE'])
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
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return "Un-authorized action"
        
        msg = db.LifeGroup(lg).del_lg()
        return msg
    
    except Exception as e:
        return "Some internal error existed"
    
@app.route("{}/member".format(url_prex), methods=['PUT'])
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
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return "Un-authorized action"
        
        msg = db.Person(lg = lg, name = name, postcode = postcode).add_db()
        return msg
        #return "Added successfully"
    
    except Exception as e:
        return "Some internal error existed"

@app.route("{}/member".format(url_prex), methods=['DELETE'])
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
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return "Un-authorized action"
        
        msg = db.Person(lg = lg, name = name, postcode = postcode).edit_db()
        return msg
        #return "Edited successfully"
    
    except Exception as e:
        return e
    

@app.route("{}/member".format(url_prex), methods=['DELETE'])
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
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return "Un-authorized action"
        
        msg = db.Person(lg = lg, name = name).del_db()
        return msg
        #return "Deleted successfully"
    
    except Exception as e:
        return "Some internal error existed"

@app.route("{}/member".format(url_prex), methods=['GET'])
def show_members():
    """
    This method shows all the members of a lifegroup.
    """
    # Parameters
    lg = request.args.get('lg', type = str)
    name = request.args.get('name', type = str)
    passcode = request.args.get('passcode', type = str)

    # Function 1: Retrieve details of a person
    if lg != None and name != None:
        pc = db._sql("SELECT postcode FROM Person WHERE name = '{}' AND lg = '{}';".format(name, lg))
        try:
            return jsonify({"name":name, "postcode":pc[0][0]})
        
        except Exception as e:
            return "No information is returned."
        
    # Function 2: Retreive member names
    members = db._sql("SELECT name, postcode FROM Person WHERE lg = '{}';".format(lg))
    if passcode == auth_passcode:
        ls = []
        for pair in members:
            n = [pair[0], str(pair[1])]
            ls.append(n)
            
        return jsonify({"members":ls})
    
    else:
        return jsonify({"msg":"Unauthorized action"})

@app.route("{}/clear".format(url_prex), methods=['GET'])
@requires_auth
def reset(): ##
    """
    Reset db
    """
    msg = db.red_reset_button()
    return msg


## -------------------------------------------------------------
## ---------------- Event -------------------------------------
@app.route("{}/event".format(url_prex), methods=['POST'])
def api_submit(): ##
    """
    Submit the person info that are going to one particular event.
    """
    try:
        ## receive file
        content = request.get_json()
        event = content.get('event_id')
        #event = CodeConverter.external2internal(event)
        lg = content.get('lg')
        name = content.get('name')
        driver_flag = content.get('isDriver')
        pc_vary = content.get('postcode_vary') # this can be asked in the front-end; if special postcode request is required
        
        ## fetching the method
        msg = plan.submit(event, lg, name, driver_flag, pc_vary)
        if type(msg) == tuple:
            return msg[0]
            
        else:
            return msg
    
    except Exception as e:
        return "Some internal error existed {}".format(e)

@app.route("{}/event".format(url_prex), methods=['PUT'])
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
    
@app.route("{}/event/<eventID>".format(url_prex), methods=['GET'])
def api_getEventInfo(eventID): ##
    """
    Retrieve the event details by a given eventid
    """
    try:
        ## given event id -> event info
        c = CodeConverter()
        eventID = c.decode(eventID)
        
        # parse lg from eventid
        info = eventID.split("-")
        
        # check whether this lg is in the system
        if info[0] in db.show_all_lg():
            return jsonify({"lg":info[0], "from":info[1],"to":info[2],"destination":info[3],"date":info[4],"time":info[5]})
        
        else:
            return jsonify({"msg":"Lifegroup does not exist."})        
    
    except Exception as e:
        return "This event is either deleted or not existed: {}".format(e)
    
@app.route("{}/bestmatches".format(url_prex), methods=['POST'])
def api_bestmatches(): ##
    """
    Submit the person info that are going to one particular event.
    """
    try:
        ## receive file
        content = request.get_json()
        event_id = content.get('event_id')
        
        ## Get drivers / passengers
        event_file = "Events_temp/{}.csv".format(event_id)
        file = pd.read_csv(event_file)
        
        condition_isDriver = file['driver'] != 0 #as for driver column, non-0 is capacity
        condition_isPassenger = file['driver'] == 0
        drivers = file[condition_isDriver]
        passengers = file[condition_isPassenger]
        
        map_drivers = {}
        map_passengers = {}
        
        for i, row in drivers.iterrows():
            ## Append drive into the dictionary
            name = row['name']
            info_pair = (row['postcode'], row['driver'])
            map_drivers.update({name: info_pair})
            
        for i, row in passengers.iterrows():
            ## Append passenger into the dictionary
            name = row['name']
            postcode = row['postcode']
            map_passengers.update({name: postcode})        
        
        ## trigger calculation
        mapping = alg.find_combinations(map_drivers, map_passengers)
        return jsonify(mapping)
    
    except Exception as e:
        return "Error: Please check again the input of Event ID or Lifegroup{}".format(e)


## ----------------End Event----------------------------------------
## -------------------------------------------------------------

## -------------------------------------------------------------
## ----------------Display Info------------------------------------

# Sending parameters via url
# Example: url/api/whoisgoing?eventID=<value>

@app.route("{}/attendees".format(url_prex), methods=['GET'])
def show_pplgoing():
    
    try:
        # Parameters
        event_id = request.args.get('eventID', type = str)
        event_id = CodeConverter().external2internal(event_id)
        
        # Call function: read eventID file first
        file = pd.read_csv('Events_temp/{}.csv'.format(event_id))
        
        # retrieve all passengers (df) to list
        condition = file['driver'] == 0
        ls_array = file['name'].loc[condition].values.tolist()
        
        # retrieve all drivers, attach tag, to list
        condition = file['driver'] >= 1
        ls_drivers = file['name'].loc[condition].values.tolist()
        ls_drivers = ["{} (driving)".format(i) for i in ls_drivers]
        ls_drivers.extend(ls_array)
        
        return jsonify({"names":ls_drivers})
    except Exception as e:
        return "Event ID does not exist {}".format(e)





## ----------------End Display---------------------------------
## -------------------------------------------------------------


"""
Reference:
https://stackoverflow.com/questions/21214270/scheduling-a-function-to-run-every-hour-on-flask?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

"""
if __name__ == "__main__":
    ## cd to absolute dir (depends on server)
    #os.chdir("/home/bruno1993/transport_api/")
    app.run(host="0.0.0.0", port=3000)
    
    
    
    
    
    