// MapReduce allows you to split a large problem into smaller parts.
// Map accepts data and transforms to key value pair functions
// Reduce accepts key value pairs and reduce them into a smaller aggregation

use students_db
db
db.createCollection('books')
show collections 

db.books.insert(
	{
	    "title" : "MongoDB: The Definitive Guide",
	    "published" : "2013-05-23",
	    "authors": [
	        { "firstName" : "Kristina",  "lastName" : "Chodorow" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Programming" ],
	    "publisher" : { "name" : "O'Reilly" },
	    "price" : 32.99
	},
	{
	    "title" : "MongoDB Applied Design Patterns",
	    "published" : "2013-03-19",
	    "authors": [
	        { "firstName" : "Rick",  "lastName" : "Copeland" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Patterns", "Programming" ],
	    "publisher" : { "name" : "O'Reilly" },
	    "price" : 32.99
	},
	{
	    "title" : "MongoDB in Action",
	    "published" : "2011-12-16",
	    "authors": [
	        { "firstName" : "Kyle",  "lastName" : "Banker" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Programming" ],
	    "publisher" : { "name" : "Manning" },
	    "price" : 30.83
	},
	{
	    "title" : "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence",
	    "published" : "2012-08-18",
	    "authors": [
	        { "firstName" : "Pramod J.",  "lastName" : "Sadalage" },
	        { "firstName" : "Martin",  "lastName" : "Fowler" }
	    ],
	    "categories" : [ "Databases", "NoSQL" ],
	    "publisher" : { "name" : "Addison Wesley" },
	    "price" : 26.36
	},
	{
	    "title" : "Scaling MongoDB",
	    "published" : "2011-03-07",
	    "authors": [
	        { "firstName" : "Kristina",  "lastName" : "Chodorow" }
	    ],
	    "categories" : [ "Databases", "NoSQL" ],
	    "publisher" : { "name" : "O'Reilly" },
	    "price" : 25.30
	},
	{
	    "title" : "50 Tips and Tricks for MongoDB Developers",
	    "published" : "2011-05-06",
	    "authors": [
	        { "firstName" : "Kristina",  "lastName" : "Chodorow" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Programming" ],
	    "publisher" : { "name" : "O'Reilly" },
	    "price" : 25.08
	},	
	{
	    "title" : "MongoDB in Action, 2nd Edition",
	    "published" : "2014-12-01",
	    "authors": [
	        { "firstName" : "Kyle",  "lastName" : "Banker" },
	        { "firstName" : "Peter",  "lastName" : "Bakkum" },
	        { "firstName" : "Tim",  "lastName" : "Hawkins" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Programming" ],
	    "publisher" : { "name" : "Manning" },
	    "price" : 26.66
	},
	{
	    "title" : "Node.js, MongoDB, and AngularJS Web Development",
	    "published" : "2014-04-04",
	    "authors": [
	        { "firstName" : "Brad",  "lastName" : "Dayley" }
	    ],
	    "categories" : [ "Databases", "NoSQL", "Programming", "Web" ],
	    "publisher" : { "name" : "Addison Wesley" },
	    "price" : 34.35
	}	
)

// A MapReduce function that count books by author
db.runCommand( {
    mapReduce: "books",
    map: function() {
        for (var index = 0; index < this.authors.length; ++index) {
            var author = this.authors[ index ];
            emit( author.firstName + " " + author.lastName, 1 );
        }
    },
    reduce: function(author, counters) {
        count = 0;

        for (var index = 0; index < counters.length; ++index) {
            count += counters[index];
        }

        return count;
    },
    out: { inline: 1 }
})

// We are going to count average book price per publisher using a particular currency (f.e. US dollar).
db.runCommand( {
    mapReduce: "books",
    scope: { currency: "US" },
    map: function() {
        emit( this.publisher, { count: 1, price: this.price } );
    },
    reduce: function(publisher, values) {
        var value = { count: 0, price: 0 };

        for (var index = 0; index < values.length; ++index) {
            value.count += values[index].count;
            value.price += values[index].price;
        }

        return value;
    },
    finalize: function(publisher, value) {
        value.average = currency + ( value.price / value.count ).toFixed(2);
        return value;
    },
    out: {
        replace: "results"
    }
})

