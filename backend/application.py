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
import datetime
from flask_jwt_extended import (
JWTManager, jwt_required, create_access_token,
get_jwt_identity
)
from flask_mail import Mail, Message

application = Flask(__name__)
application.config['SECRET_KEY'] = "transportMinistry"
CORS(application)
jwt = JWTManager(application)


# email server
application.config.update(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = "kwokkinhungisme@gmail.com",
    MAIL_PASSWORD = 'Ken13798132631'
)
mail = Mail(application)

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

@application.route("{}/reset-password-request".format(url_prex))
def resetPasswordRequest():
    lg = request.args.get('lg', type = str)
    email = db.retrieve_email(lg)
    if email == 'err':
        return jsonify({'msg': 'The lifegroup you entered is not registered'})
    expires = datetime.timedelta(minutes=10)
    token = create_access_token(identity=lg, expires_delta=expires)
    link = "localhost:4200/reset-password/" + token
    try:
        msg = Message("Reset your password on Hope Transport",
                      sender="kwokkinhungisme@gmail.com",
                      recipients=[email])
        msg.body = "Hi "+ lg +",\nWe received a request to reset your Transport App password\nyou can enter the following password reset code:\n635837"
        msg.html = "<p>Hi " + lg + ",</p>"
        msg.html += "<p>We received a request to reset your Transport App password</p>"
        msg.html += "<p>You can click the link below to reset password:</p>"
        msg.html += "<p><a href='" + link + "'>" + link + "</a></p>"
        mail.send(msg)
        return jsonify({'msg': 'Mail sent'})
    except Exception as e:
        return jsonify({'msg': e})

@application.route("{}/reset-password".format(url_prex), methods=['POST'])
@jwt_required
def resetPassword():
    lg = get_jwt_identity()
    pw = request.args.get('password', type = str)
    msg = db.reset_password(lg, pw)
    return jsonify({'msg': msg}), 200

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
        email = content.get('email')
        password = content.get('password')
        if lg is None or email is None or password is None:
            abort(400) # missing arguments
        lifegroup = db.LifeGroup(lg=lg, email=email, password=password)
        msg = lifegroup.add_lg()
        return jsonify({"msg": msg})
    
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
        msg = db.LifeGroup(lg=lg, password=None).del_lg()
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

@application.route("{}/login".format(url_prex), methods=['GET'])
def verify_lg():##
    lg = request.args.get('lg', type = str)
    pw = request.args.get('password', type = str)
    lifegroup = db.LifeGroup(lg=lg, password=pw)
    verified = lifegroup.verify_password()
    if verified == None:
        return jsonify({"failure": "The lifegroup is not registered"})
    if verified == False:
        return jsonify({"failure": "Incorrect password"})
    expires = datetime.timedelta(minutes=10)
    ret = {'access_token': create_access_token(identity=lg, expires_delta=expires)}
    return jsonify(ret), 200

@application.route('{}/protected'.format(url_prex), methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@application.route("{}/member".format(url_prex), methods=['PUT'])
@jwt_required
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
        msg = db.Person(lg = lg, name = name   ,
                        seats = seats, suburb = suburb).add_db()
        return jsonify({"msg":msg}), 200
    
    except Exception as e:
        return jsonify({"err":e}), 500
    

@application.route("{}/member".format(url_prex), methods=['DELETE'])
@jwt_required
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
        name = request.args.get('name', type = str)
        
        msg = db.Person(lg = lg, name = name).del_db()
        return jsonify({"msg":msg}), 200
    
    except Exception as e:
        return jsonify({"err":"Some internal error existed {}".foramt(e)}), 500

@application.route("{}/member".format(url_prex), methods=['GET'])
@jwt_required
def show_members(): ##
    """
    This method shows all the members of a lifegroup.
    """
    # Parameters
    lg = request.args.get('lg', type = str)
    name = request.args.get('name', type = str)
    
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

@application.route("{}/suburb".format(url_prex), methods=['GET'])
def serachSuburb(): ##
    suburb = request.args.get('suburb')
    url = 'http://v0.postcodeapi.com.au/suburbs.json?name=' + suburb
    r = requests.get(url)
    return r.text

@application.route("{}/notes".format(url_prex), methods=['POST'])
def addNotes():##
    content = request.get_json()
    lg = content.get('lg')
    if lg == None:
        return jsonify("lg cannot be none")
    note = content.get('note')
    msg = db.Note(lg=lg, note=note).add_db()
    return jsonify(msg)

@application.route("{}/notes".format(url_prex), methods=['GET'])
def returnNotes():##
    lg = request.args.get('lg')
    return jsonify(db.show_notes(lg))

@application.route("{}/notes".format(url_prex), methods=['DELETE'])
def deleteNotes():##
    lg = request.args.get('lg')
    note = request.args.get('note')
    msg = db.Note(lg=lg, note=note).del_db()
    return jsonify(msg)

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
