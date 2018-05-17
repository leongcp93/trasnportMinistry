## ------- Authorization passcodes ------
## JSON auth: pw1234
## readme username: admin
## readme password: badpassword
## --------------------------------------

*1 = retrieve the personal info when lg = ? and name = ? / retrieve personal info lg
*2 = url/'<event_id> return {"LG"} if fail {"msg"} / eventID is encoded by b64 algorithm


## ------- List of methods --------------
## 1. General
## |- / [get]
## |- /readme [get]
## 
## 2. Permanent Database
## |- /member [put, post, delete, get*1]
## |- /lifegroup [put, delete]
## |- /clear [get]
## 
## 3. Event handling (yet to be tested)
## |- /event [put, post, get*2]
## |- /bestmatches [post]
## 
## 4. Display info
## |- /attendees [get]
## ---------------------------------------

--------------------General Info--------------------------
Here are all the methods that you can call; Also their detailed specifications.
prefix url: transport.hope-church.co.au:3000/api

- ok
[get ] /
	description: webservice landing (index) page

- ok
[get ] /readme
	required: http header -- username/password
	description: all the detailed specifications

---------------------Lifegroup DB--------------------------
- ok
- * no error msg: never tell whether success or not
[post] /member (old: editPerson)
	description: interact with lifegroup database. Edit the postcode of a member from a lifegroup.
	required <auth>: an auth token; just pass string "password1234"
	required: {'lg', 'name','postcode','auth'}
	return: {'msg'}

- ok
- * no error msg: never tell whether success or not
[delete] /member (old: /deletePerson)
	description: interact with lifegroup database. Delete a member from a lifegroup.
	required: {'lg', 'name', 'auth'}
	return: {'msg'}

- ok
- * buggy when he db is empty
[put ] /member (old: /registerPerson)
	description: interact with lifegroup database. Register a member from a lifegroup.
	required: {'lg', 'postcode', 'auth'}
	return: {'msg'}

- ok, specific lg
- ok, all lg with auth = 1234
[get ] /member?auth=&lg= (old: showmembers)
	description: this method returns all the member's name of a given LG
	return: {"members":<array of str>}
	example: {
"members": [
"foo","spam"
]
}

- ok in general
- * but, weird lifegroup name can also get registered
[put] /lifegroup (old: addLG)
	description: interact with lifegroup database. Add a lifegroup among all LGs (good, multiplying).
	required: {'lg', 'auth'}
	return: {'msg'}

- ok
- * no error msg: lifegroup doesnt exist
- * no error msg: double deletion
[delete] /lifegroup (old: addLG)
	description: interact with lifegroup database. Delete a lifegroup among all LGs (sad).
	required: {'lg', 'auth'}
	return: {'msg'}

- ok
[get ] /clear (old: nuclearbomb)
	description: reset everything (only developer has access)
	required: http header <username/password>
	return: {'msg'}
--------------------Transport Events Planning -----------------------
[put ] /event (old: createEvent)
	description: it creates an ONE WAY transport event. If return trip is required, 2 events have to be
			created. For example, unidus prayer, Event1-home2unidus and Event2-unidus2home are 
			required.
	required: {'lg','postcode_from','postcode_to','note'}
	return: {'event_id'} if success; 
		{'msg'} if failed;

[post] /event (old: submit)
	description: this method is for general users to submit their attendance to one particular event. If they have confirmed their 
			need transport / driving, they will need to submit this request to register themselves into this event. 
	parameter <postcode_vary>: this postcode is used for identifying starting/destination location if default postcode of this person
					is no longer applicable. For example, Bruno lives in 4067. There is a touching heaven prayer tonight;
					He will be leaving from city (4000) instead of his own house in the evening. So, his default postcode (4067)
					has to be replaced by 4000 because 4067 is no longer useful. 
	required: {'event_id','lg','name','isDriver','postcode_vary'}
	return: {'msg'}

[post] /bestmatches
	description: after knowing who will be going to one particular event, the organizer has to place passengers into driver's car.
			This method will look for the best combination f driver & passengers according to their end destination / starting
			location. 
	required: {'event_id','lg'}
	return: {driver1:[passenger_names,...], driver2:[p_name,...]...}

--------------------Display Info -----------------------------
- ok
- * err msg exposed to public
[get ] /attendees?event_id=
	description: this method returns the list of names and associate with a driver flag
	return: {"names":<array of str>}
	example: {
"names": [
"foobar (driving)",
"tom (driving)","peter","john","spam","foo"]
}



------------------ General Comment: -----------------
- If one transaction hang, another transaction will hang --> the whoel system will go down
--> bug: When DB is empty, add person, hang -> other requests also hang --> system down



