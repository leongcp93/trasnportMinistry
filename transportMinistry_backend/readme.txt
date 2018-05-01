Here are all the methods that you can call; Also their detailed specifications.
### JSON format: ###
[get ] /: webservice landing page, instructions of all available methods
[get ] /readme: all the detailed requirements
--- DB interaction ---
[post] /editPerson: 
	required: {'lg', 'auth','postcode'}
	return: {}

[post] /deletePerson: 
	required: {'lg', 'auth'}
	return: {}

[post] /registerPerson: 
	required: {'lg', 'auth', 'postcode'}
	return: {}

[post] /addLG:
	required: {'lg', 'auth'}
	return: {}

[post] /deleteLG: 
	required: {'lg', 'auth'}
	return: {}

[get ] /nuclearbomb: reset everything (only developer has access)
	required: {'auth'}
	return: {}

--- Event planning ---
[post] /createEvent: This method will create event object. So members will signup to this event./* tbt
	required: {'lg','postcode_from','postcode_to','note'}
	return: {'event_id'} if success

[post] /submit: /* tbt
	required: {'event_id','lg','name','isDriver','postcode_from','postcode_to'}
	return: {}

[post] /bestmatches: //
	required: {'event_id'}
	return: {driver1:[passenger_names,...], driver2:[p_name,...]...}

--- Display info ---
[get ] /whoisgoing/?event_id= : show all the names who is going
[get ] /showmembers/?auth=&lg= : who is in the lifegroup
[get ] /