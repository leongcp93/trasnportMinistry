# -*- coding: utf-8 -*-
"""
Created on Tue Apr  3 16:09:28 2018

@author: BrunoAdmin

Notes:
    Webservice run on port 3000

"""
from flask import Flask, Response, request, send_file
import threading
import lib.databaseInteraction
import lib.algorithms
import csv
app = Flask(__name__)


## -------------------------------------------------------------
## -------------------------------------------------------------

@app.route("/runspider")
def run_runspider():
    """
    Run the spider.    
    Return a flag that telling client computer that the app is running
    multi-thread
    """       
    try: 
        # Train data (Thread)
        def crawling_begin():
            # just to run the py script (according to email)
            import os
            os.system("python webScraping.py")
        
        td = threading.Thread(target=crawling_begin)
        td.daemon = True
        td.start()
        return "Thank you the spider is crawling :) Come back after 2 hours"
    except:
        return "Something went wrong, 898"
    
@app.route("/runtest")
def run_runtest():
    """
    Run the spider.    
    Return a flag that telling client computer that the app is running
    multi-thread
    """       
    try: 
        # Train data (Thread)
        def crawling_begin():
            # just to run the py script (according to email)
            import os
            os.system("python webScraping_testing.py")
        
        td = threading.Thread(target=crawling_begin)
        td.daemon = True
        td.start()
        return "Thank you the spider is crawling :) Come back after 2 hours"
    except:
        return "Something went wrong, 898"



@app.route("/test")
def get_testing():
    """
    Get the current status: whether or not a scraper is running    
    """
    try: 
        # Train data (Thread)
        def daemon_testing():
            # just to run the py script (according to email)
            import os
            os.system("python testDaemon.py")
        
        td = threading.Thread(target=daemon_testing)
        td.daemon = True
        td.start()
        return "a file is supposed to be generated soon according to time"
    except Exception as e:
        return "testing went wrong: {}".format(e)

@app.route("/status")
def get_status():
    """
    Get the current status: whether or not a scraper is running    
    """
    return "status"    

###### Download general file
@app.route("/download")
def download_latest():
    """
    Download the latest job _analysed.csv when called    
    """
    try:
        import os
        f_name = _get_latest_fname()
        return send_file(os.path.join("job_dataset/", f_name), attachment_filename=f_name, as_attachment=True)
    
    except Exception as e:
        return "Downloading error: {}".format(e)
    
    
## -------------------------------------------------------------
## -------------------------------------------------------------
    
    
## Actual implementation
@app.route("/")
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
           UP THE SYSTEM!!!!"]
    dc = html_process("p",dc)
    methods = ["[get ] /: webservice landing page, instructions of all available methods",
               "[post] /submit: ",
               "[post] /submitConfirm: ",
               "[post] /editPerson: ",
               "[post] /deletePerson: ",
               "[post] /findCombination: ",
               "[post] /registerPerson: ",
               "[post] /addLG: ", 
               "[post] /deleteLG: "]
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


## DB direct modify
@app.route("/addLG")
def add_LG():
    """
    Register life group
    
    Requires:
        - lifegroup name
        
    Returns:
        - success / fail
    """
    return "log"

@app.route("/deleteLG")
def delete_LG():
    """
    Delete life group
    
    Requires:
        - lifegroup name
        
    Returns:
        - success / fail
    """
    return "log"## Helper Person Info class
class Info (object):
    def __init__(self, lg = None, name = None, postcode = None):
        self.lg = lg
        self.name = name
        self.postcode = postcode
    
@app.route("/registerPerson")
def add_person():
    """
    Register person
    
    Requires:
        - person name
        - life group
        - postcode
        
    Returns:
        - success / fail
    """
    info = Info(lg = None, name = None, postcode = None)
    p = Person(info)
    p.add_db()
    return "Added successfully"

@app.route("/editPerson")
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
    p = Person()
    p.edit_db()
    return "Edited successfully"

@app.route("/deletePerson")
def delete_person():
    """
    Register life group
    
    Requires:
        - person name
        - life group
        
    Returns:
        - success / fail
    """
    p = Person()
    p.del_db()
    return "Deleted successfully"


### Scheduler
"""
Reference:
https://stackoverflow.com/questions/21214270/scheduling-a-function-to-run-every-hour-on-flask?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

"""
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)