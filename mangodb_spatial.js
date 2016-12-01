// MongoDb allows us to store geospatial records and features in GeoJSON formats
// MongoDB supports the following GeoJSON objects: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection

//Types of geospatial indexes are 2D and Spherical
//To create a 2D geospatial index you need to create a field that holds and array say location: [x, y]


use spatial_db
db
db.createCollection('locations')
show collections 

// Insert record into the collection customers
db.locations.insert(
	{
		id: "1",
		name: "Lagos",
		loc: [2, 3] //loc field is the spatial field in the collection [lat, lng]
	},
	{
		id: "2",
		name: "Enugu",
		loc: [16, 4]
	},
	{
		id: "3",
		name: "Ogun",
		loc: [1, 3]
	},
	{
		id: "4",
		name: "Abuja",
		loc: [12, 23]
	},
	{
		id: "5",
		name: "Oyo",
		loc: [10, 9]
	}
);


// create a geospatial index on the field that contains the locations
db.locations.ensureIndex({loc : "2dsphere"}) // for 2d spherical coordinate system
db.locations.ensureIndex({loc : "2d"}) // for 2d cartesian coordinate system

//to see the indexes that exist for a collection
db.locations.getIndexes()

//Spatial query $near
db.locations.find({
	loc : {
		$near : {
			$geometry : {
				type: "Point",
				coordinates : [2,2.01]
			},
			spherical : true
		}
	}
})

//Polygon query - everything within the polygon
db.locations.find({
	loc : {
		$geoWithin : {
			$geometry : {
				type: "Polygon", 
				coordinates : [
					[					
						[0, 0],
						[2, 2],
						[1, 1],
						[0, 0]
					]
				]
			},
			spherical : true
		}
	}
})

// Other spatial geometry functions are;
$geoIntersects, $geoNear