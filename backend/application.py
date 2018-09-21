# -*- coding: utf-8 -*-
"""
Created on Tue Apr 3 16:09:28 2018

@author: Bruno
Trimmed and modified by Kenneth Guo

"""
from functools import wraps
from flask import Flask, Response, request, jsonify, render_template
from flask_cors import CORS

import databaseInteraction as db
import pandas as pd
import os
import requests
import base64

application = Flask(__name__)
CORS(application)
    
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

@application.route("{}/".format(url_prex), methods=['GET'])
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


@application.route("{}/readme".format(url_prex), methods=['GET'])
@requires_auth
def secret_page():
    return render_template('readdoc.html')


## DB direct modify
@application.route("{}/lifegroup".format(url_prex), methods=['POST'])
def add_LG(): ##
    """
    Register life group
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

@application.route("{}/lifegroup".format(url_prex), methods=['DELETE'])
def delete_LG(): ##
    """
    Delete life group.
    """
    try:
        ## receive file
        lg = request.args.get('lg', type = str)
        auth = request.args.get('passcode', type = str)
        
        ## passcode
        if auth != auth_passcode:
            return "Un-authorized action"
        
        msg = db.LifeGroup(lg).del_lg()
        return msg
    
    except Exception as e:
        return "Some internal error existed"
    
    
@application.route("{}/lifegroup".format(url_prex), methods=['GET'])
def list_LG(): ##
    """
    Show all the lifegroups.
    """
    try:        
        ## Access from db        
        ls = db.show_all_lg()            
        
        all_lg = []
        for lg in ls:
            d = {"name":lg}
            all_lg.append(d)
        
        return jsonify(all_lg)
        
    
    except Exception as e:
        return "Some internal error existed"
    
    
@application.route("{}/member".format(url_prex), methods=['PUT'])
def edit_person(): ##
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
        suburb = content.get('suburb')
        seats = content.get('seats')
        
        ## passcode
        if content.get('auth') != auth_passcode:
            return jsonify({"msg":"Un-authorized action"}), 401
        msg = db.Person(lg = lg, name = name, seats = seats, suburb = suburb).edit_db()
        return jsonify({"msg":msg}), 200
    
    except Exception as e:
        return jsonify({"err": "Some internal error existed"}), 500

@application.route("{}/member".format(url_prex), methods=['POST'])
def add_person(): ##
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
        name = content.get('name').title()
        seats = content.get('seats')
        suburb = content.get('suburb')
        ## passcode
        if content.get('auth') != auth_passcode:
            return jsonify({"msg":"Un-authorized action"}), 401
        msg = db.Person(lg = lg, name = name   ,
                        seats = seats, suburb = suburb).add_db()
        return jsonify({"msg":msg}), 200
    
    except Exception as e:
        return jsonify({"err":e}), 500
    

@application.route("{}/member".format(url_prex), methods=['DELETE'])
def delete_person(): ##
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
        lg = request.args.get('lg', type = str)
        auth = request.args.get('auth', type = str)
        name = request.args.get('name', type = str)
        
        ## passcode
        if auth != auth_passcode:
            return jsonify({"msg":"Un-authorized action"}), 401
        
        msg = db.Person(lg = lg, name = name).del_db()
        return jsonify({"msg":msg}), 200
    
    except Exception as e:
        return jsonify({"err":"Some internal error existed {}".foramt(e)}), 500

@application.route("{}/member".format(url_prex), methods=['GET'])
def show_members(): ##
    """
    This method shows all the members of a lifegroup.
    """
    # Parameters
    lg = request.args.get('lg', type = str)
    name = request.args.get('name', type = str)
    passcode = request.args.get('passcode', type = str)
    
    # Authorization required:
    if passcode == auth_passcode:
        # Function 1: Retreive member names
        if lg != None and name == None:
            members = db._sql("SELECT name, seats, suburb \
                    FROM Person WHERE lg = '{}';".format(lg))
            ls = []
            for i, pair in enumerate(members):
                n = {"id":str(i), "name":pair[0], "group":lg,
                         "seats":pair[1], "suburb":pair[2]}
                ls.append(n)
                
            return jsonify(ls), 200
        
        else:
            # Function 2: Retrieve details of a person
            members = db._sql("SELECT name, postcode FROM Person WHERE lg = '{}'\
                              AND name = '{}';".format(lg, name))
            ls = []
            for i, pair in enumerate(members):
                n = {"id":str(i), "name":pair[0],"postcode":str(pair[1]), "group":lg, "seats":"4"}
                ls.append(n)
                
            return jsonify(ls), 200
    
    else:
        return jsonify({"msg":"Unauthorized action"}), 401
    
@application.route("{}/suburb".format(url_prex), methods=['GET'])
def serachSuburb(): ##
    suburb = request.args.get('suburb')
    url = 'http://v0.postcodeapi.com.au/suburbs.json?name=' + suburb
    r = requests.get(url)
    return r.text

@application.route("{}/clear".format(url_prex), methods=['GET'])
@requires_auth
def reset():##
    """
    Reset db
    """
    msg = db.red_reset_button()
    return msg

if __name__ == "__main__":
    application.run()
    
    
    
    
    
    
