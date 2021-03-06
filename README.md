# qneo4j-helper
This module focuses on making using Neo4j for JavaScript easier by making its coding cleaner and shorter.

- Functions for date conversions:
	- Neo4j date to native javascript date;
	- Neo4j date to [momentjs](https://momentjs.com/ "momentjs");
	- date in string format to Neo4j date and also cypher syntax;
	- native javascript date to Neo4j date and also cypher syntax;
	- [momentjs](https://momentjs.com/ "momentjs") to Neo4j date and also cypher syntax;
- Parse Neo4j response records to simple object;
- Transforms objects in string to help create cypher queries;


## Usage

Object to string:
``` javascript
let obj = {
    prop1: "value",
    prop2: "value2"
}
helper.objToString(obj) // returns '{prop1:"value",prop2:"value2"}'
```

------------

Object to params:
``` javascript
let obj = {
    prop1: "value",
    prop2: "value2"
}
helper.objToParams("prefix", obj) // returns '{prefix.prop1:"value",prefix.prop2:"value2"}'
```

------------

Checks if the value is a neo4j date type:
``` javascript
let date = "2019/02/08"
helper.isDateTypeNeo4j(date) // returns false

let date2 = neo4j.types.DateTime.fromStandardDate(new Date())
helper.isDateTypeNeo4j(date2) // returns true
```

------------

Converts a Neo4j date to a native JavaScript date
``` javascript
let dateNeo4j = neo4j.types.DateTime.fromStandardDate(new Date())
let date = helper.toStandardDate(dateNeo4j) // returns a date object 
date instanceof Date // returns true
```

------------

Converts a Neo4j date to a moment object
``` javascript
let dateNeo4j = neo4j.types.DateTime.fromStandardDate(new Date())
let date = helper.toMoment(dateNeo4j) // returns a moment object 
date instanceof moment // returns true
```

------------

Parse any date (string, native js, moment, neo4j, number) to Neo4j date:
``` javascript
let dateToParse = "30/07/2019" // DD/MM/YYYY
// or
let dateToParse = new Date(2019, 6, 30) // native JavaScript date
// or
let dateToParse = moment("30/07/2019") // moment date
// or
let dateToParse = neo4j.types.DateTime.fromStandardDate(new Date(2019, 6, 30)) // Neo4j date

// THEN:
let date = helper.parseDate(dateSource) // returns a Neo4j LocalDateTime

// more options...
let dateToParse = 201907 // any format that can be informed, format: YYYYMM
let date = helper.parseDate(dateToParse, DATE_TYPE.LOCAL_DATE_TIME, "YYYYMM") // returns "Date('2019-07-01')"
// returns a Neo4j LocalDateTime
```
Its possible to inform the Neo4j date type to return, the options are:
- LOCAL_TIME
- TIME
- DATE
- LOCAL_DATE_TIME
- DATE_TIME

``` javascript
const { DATE_TYPE } = helper
let date = helper.parseDate(dateSource, DATE_TYPE.DATE) // returns a Neo4j Date
```

------------

Parse any date (string, native js, moment, neo4j, number) to cypher syntax:
``` javascript
let dateToParse = "30/07/2019" // DD/MM/YYYY
// or
let dateToParse = new Date(2019, 6, 30) // native JavaScript date
// or
let dateToParse = moment("30/07/2019") // moment date
// or
let dateToParse = neo4j.types.DateTime.fromStandardDate(new Date(2019, 6, 30)) // Neo4j date
// or
let dateToParse = Date.now() // timestamp

// THEN:
let date = helper.parseDateCypher(dateSource) // returns "LocalDateTime('2019-07-30T00:00:00.000Z')"

// its possible to inform the Neo4j date type to return
let date = helper.parseDateCypher(dateSource, DATE_TYPE.DATE) // returns "Date('2019-07-30')"

// more options...
let dateToParse = 201907 // any format that can be informed, format: YYYYMM
let date = helper.parseDateCypher(dateToParse, DATE_TYPE.DATE, "YYYYMM") // returns "Date('2019-07-01')"
```
Its possible to inform the Neo4j date type to return, the options are:
- LOCAL_TIME
- TIME
- DATE
- LOCAL_DATE_TIME
- DATE_TIME

``` javascript
const { DATE_TYPE } = helper
let date = helper.parseDate(dateSource, DATE_TYPE.DATE) // returns a Neo4j Date
```

------------

Parse the Neo4j response to a json structure:
```javascript
// Original Neo4j Result:
Record {
    keys: [ 'myNode' ],
    length: 1,
    _fields: [ { prop2: 'value2', prop1: 'value1' } ],
    _fieldLookup: { myNode: 0 }
}

// Parsed Result:
{ 
    myNode: { 
        prop2: 'value2',
        prop1: 'value1'
    }
}
```

``` javascript
const driver = neo4j.driver(/*auth and options*/)
const session = driver.session();

let result = await session.run(`return { prop1: "value1", prop2: "value2" } as myNode`)
let parsed = helper.parseResponse(result)

console.log(parsed.myNode.prop2) // returns "value2"
```
