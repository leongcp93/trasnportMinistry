"""
Created on Tue Apr  12 12:05:28 2018

@author: BrunoAdmin

All Available methods:
    show_person(lg, postcode)
    show_all_lg
    red_reset_button
    _sql(query)
        
    
Class:
    Person(lg, name, postcode)
        add_db
        edit_db(postcode)
        del_db
        
    LifeGroup(lg)
        add_lg
        del_lg
"""
import sqlite3
import sys

global table1_name,table2_name,table3_name
table1_name = "Person"
table2_name = "PostCodeAddress"
table3_name = "LifeGroups"

## Helper Person Info class
class Person (object):
    def __init__(self, lg = None, name = None, postcode = None, seats = None):
        self.lg = lg.lower()
        self.name = name
        self.postcode = postcode
        self.seats = seats
    
    # can implement in form of class later    
    def add_db(self):
        unit = self.lg
        name= self.name
        postcode = self.postcode
        seats = self.seats
        
        # manual rule 
        ls = show_all_lg()
        if unit not in ls:
            return "Life group not registered"
        
        
        # query
        q = "INSERT INTO {tb} (name, lg, postcode, seats) \
        VALUES ('{nm}', '{lg}', {pc}, {st});".format(tb=table1_name, nm = name, lg=unit, pc=postcode, st=seats)
        msg = _sql(q)
        sys.stderr.write(msg)
        return msg
        
    
    # can implement in form of class later    
    def edit_db(self):
        lg = self.lg
        name= self.name
        postcode = self.postcode # reverse edit to class        
        seats = self.seats
        
        # query
        q = "UPDATE {tb} \
         SET postcode = {pc}, seats = {st}\
         WHERE lg = '{lg}' \
         AND name = '{nm}';".format(tb=table1_name, pc=postcode, st=seats, lg=lg, nm = name)
        msg = _sql(q)
        return msg
            
    # can implement in form of class later    
    def del_db(self):
        lg = self.lg
        name= self.name
        
        # query
        q = "DELETE FROM {tb} \
         WHERE lg = '{lg}' \
         AND name = '{nm}';".format(tb=table1_name, lg=lg, nm = name)
        msg = _sql(q)            
        return msg
            
            
class LifeGroup(object):
    def __init__(self, lg=None):
        self.lg = lg.lower()
        
    def add_lg(self):
        q = "INSERT INTO LifeGroups (lg) \
             VALUES ('{}');".format(self.lg)
        msg = _sql(q)
        return msg
        
    def del_lg(self):
        q = "DELETE FROM LifeGroups \
             WHERE lg = '{}';".format(self.lg)
        msg = _sql(q)
        return msg
            
#################################
## General info enq methods
def show_person(lg = None, postcode= None):   
    if lg == 10000:
        # search for lg
        q = "SELECT * FROM {}".format(table1_name)
         
    elif lg != None :
        # search for lg
        q = "SELECT * FROM {tb} \
         WHERE lg = '{lg}';".format(tb=table1_name, lg=lg)
         
    else:
        # search for postcode
        q = "SELECT * FROM {tb} \
         WHERE postcode = '{pc}';".format(tb=table1_name, pc=postcode)
    r = _sql(q)
    return r


def show_all_lg():
    q = "select * from LifeGroups \
     ORDER BY lg"
    r = _sql(q)
    l = []
    
    for i in r:
        l.append(i[0])
    
    return l
     
def red_reset_button():
    """
    So this is a red reset button that RESETS everything :)
    You will loss EVERY DATA by running this.
    
    - Helps debugging :)
    - Helps admin :))
    - Destroy everything :))))))
    - Re-create tables
    """    
    print('You have decided to clear out everything...')
    # Delete all records
    sql1 = "DROP TABLE {tn};".format(tn = table1_name)
    sql2= "DROP TABLE {tn};".format(tn = table2_name)
    sql3= "DROP TABLE {tn};".format(tn = table3_name)
    
    # Re-Creating a sqlite table with PK
    sql4 = "CREATE TABLE {tn} (\
     postcode int(5),\
     lat FLOAT(8),\
     long FLOAT(8), \
     PRIMARY KEY (postcode)\
     );".format(tn=table2_name)
    
    sql5 = "CREATE TABLE {tn} (\
     lg varchar(5), \
     PRIMARY KEY (lg)\
     );".format(tn=table3_name)
    
    sql6 = "CREATE TABLE {t1} (\
     lg varchar(5),\
     name varchar(20),\
     postcode int(5), \
     PRIMARY KEY (lg, name) \
     );".format(t1=table1_name, t2=table2_name, t3=table3_name)
    
    querys = [sql1, sql2, sql3, sql4, sql5, sql6]
    for i, q in enumerate(querys):
        e = _sql(q)
        if e[0:3] != 'err':            
            print("Reset {}/{} OK".format(i+1, len(querys)))
            
        else:
            print("{} --  error --  {}".format(q,e))
        
    return 'Reset db'

def _sql(q):
    """
    Space for direct sql
    """
    ## Standard procedure
    sql_file = "Database/my_db.sqlite"
    conn = sqlite3.connect(sql_file)
    c=conn.cursor()
    w = q.split(" ")
    w = w[0].lower()
    rows = None
    
    try:
        if w == 'select':
            c.execute(q)
            rows = c.fetchall()
            
        else:
            c.execute(q)
            msg = "{}ed!".format(w)
        
        conn.commit()
        
    except Exception as e:
        msg = "err: {}".format(e)
        
    finally:        
        conn.close()
        
    # return list of selects if exists
    if rows != None:
        return rows
    else:
        return msg
    
    
## Debugging Testing
if __name__ == '__main__':
    # change directory only if run as debug
    global sql_file
    sql_file = "../Database/my_db.sqlite"
    
    red_reset_button()     
    
    ## register lg
    lgs = []
    lgs.extend(["uq{}".format(lg) for lg in range(1,10)])
    lgs.extend(["qut{}".format(lg) for lg in range(1,7)])
    for lg in lgs:
        LifeGroup(lg).add_lg()
        
    ## testing    
    Person('uq6','bruno',4067).add_db() # success
    Person('uq4','sd',4000).add_db() # fail
    show_all_lg()
    show_person(lg=10000)
