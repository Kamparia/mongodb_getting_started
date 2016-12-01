//MongoDB supports scalable application development. Its object oriented and you can update your schema when needed.
//Documents is a record, equivalent to rows in RDBMS
//Collection is a group of documents, equivalent to tables in RDBMS


//Navigate to the MongoDB Bin folder
cd  ./MongoDB/Server/3.2/bin

//Define the DB folder where all databases are stored
mongod --directoryperdb --dbpath C:\mongodb\Server\3.2\data\db --logpath C:\mongodb\server\3.2\log\mongo.log --logappend --rest --install

// Start MongoDB Server
net start MongoDB

// Start working in the Mongo shell by just typing "mongo"
mongo

// Create user for the database
db.createUser({
	user: "user_test",
	pwd: "password*1",
	roles: ["readWrite", "dbAdmin"]
});

// Shows the list of DB on the server
show dbs

// To create a new database "use database_name" and define the database as our working directory
use customers 

//to see the database that you currently working in
db

// drop database
db.dropDatabase();

// create collections (similar to tables in RDBMS)
db.createCollection('customers');

// drop collections
db.collection_name.drop();

// shows all collections in the database
show collections 

// Insert record into the collection customers
db.customers.insert(
	{
		first_name: "Somide",
		last_name: "Olaoye",
		email: "somideolaoye@gmail.com",
		skills: ["Software development", "Data Management", "Photography"],
		// address is an object
		address:{
			street: "No. 8, Ajoke Street, Iwaya, Sabo, Yaba",
			city: "Lagos",
			state: "Lagos State"
		},
		//contact is an array of object
		contact: [
			{name: "Toyin Somide", relationship: "Father"},
			{name: "Olabisi Somide", relationship: "Mother"},
			{name: "Bunmi Somide", relationship: "Sister"},
			{name: "Rita Somide", relationship: "Sister"},
			{name: "Samuel Somide", relationship: "Brother"}
		]
	},
	{
		first_name: "Bamigbade ",
		last_name: "Oluwatoyin",
		email: "teewhybam@gmail.com",
		skills: ["Software development", "Data Management", "Photography"],
		address:{
			street: "No. 8, Ajoke Street, Iwaya, Sabo, Yaba",
			city: "Lagos",
			state: "Lagos State"
		}
	},
	{
		first_name: "Segun",
		last_name: "Odegbami",
		email: "seegebee@yahoo.com",
		skills: ["Software development", "Data Management", "Photography"],
		address:{
			street: "No. 8, Ajoke Street, Iwaya, Sabo, Yaba",
			city: "Lagos",
			state: "Lagos State"
		},
		contact: [
			{name: "Toyin Somide", relationship: "Father"},
			{name: "Olabisi Somide", relationship: "Mother"},
			{name: "Bunmi Somide", relationship: "Sister"}
		]
	}
);

// To print/see list of documents in a collection
db.customers.find();

 // To nicely list documents in JSON format
db.customers.find().pretty();

// To find record by firstname
db.customers.find({first_name: "Somide"});

// find by either first name or lastname
db.customers.find( $or:[{first_name:"Somide"}, {last_name: "Olaoye"}]); // OR

// query's for age less than 40
db.customers.find({age:{$lt:40}});

 // query's for age greater than 40
db.customers.find({age:{$gt:40}});

// query's for customers that resides in Lagos
db.customers.find({"address.city":"Lagos"});

db.customers.find({skills:"Software development"});

// sorts record in decending order
db.customers.find().sort({last_name: -1});

// sorts record in ascending order 
db.customers.find().sort({last_name: 1}); 

// count numbers of records/objects in a collection/table
db.customers.find().count(); 
db.customers.find({"address.city":"Lagos"}).count();

// shows the first 4 records and sorts them based on last name
db.customers.find().limit(4).sort(lastname: 1);

// With NoSQL you can add a new column or field on the fly
// You dont need to set unique ID, primary ID, etc.

// Updating fields
db.customers.update(
	{first_name: "Somide"},
	{
		first_name: "Somide",
		last_name: "Olaoye",
		email: "somideolaoye@gmail.com",
		gender: "Male", // we adding a new field called gender
		skills: ["Software development", "Data Management", "Photography"],
		address:{
			street: "No. 8, Ajoke Street, Iwaya, Sabo, Yaba",
			city: "Lagos",
			state: "Lagos State"
		},
		contact: [
			{name: "Toyin Somide", relationship: "Father"},
			{name: "Olabisi Somide", relationship: "Mother"},
			{name: "Bunmi Somide", relationship: "Sister"},
			{name: "Rita Somide", relationship: "Sister"},
			{name: "Samuel Somide", relationship: "Brother"}
		]
	}	
);

// Update : add column to the object without removing previous record, find and modify
db.customers.update(
	{first_name: "Somide"},
	{$set: {dob: "09/01/1990", phone: "08060151398"}}
);

// Remove a field using unset
db.customers.update(
	{first_name: "Somide"},
	{$unset: {dob: 1}}
);

// To rename a field name
db.customers.update({first_name: "Somide"}, {$rename:{"gender":"sex"}});

// Remove a document with the first name Somide
db.customers.remove({first_name: "Somide"});

db.customers.find().forEach(function(doc){print("Customer Name:" + doc.first_name)});

// Types of data types that can be stored null, boolean, numbers, strings, arrays
 
//to get query explanations
db.customers.find().explain("executionStats");

//Indexing : this is for large record of data to make query faster (improves performance of query)
db.customers.ensureIndex({"age" : 1}); //Single index
db.customers.ensureIndex({"age" : 1, "name" : 1}); //Compound Index

//To get indexes
db.customers.getIndexes();

//To drop an Index
db.customers.dropIndex("index_name");

// DB aggregate function - Sort users by numbers of contacts
db.customers.aggregate([ 
	{
		$group : {
			_id: "firstname",
			num_contacts : {$sum : 1}
		}
	}
])

