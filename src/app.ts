const express = require('express') 
const graphqlHTTP = require('express-graphql')
// const schema = require('./schema/schema')
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
const schema = require('./schema/rootquery');

const app = express()

createConnection().then(async (connection: Connection) => {
	if (connection.isConnected) {
		console.log("Db is connected")
	} else {		
		console.log("Db is not connected")
	}
}).catch(error => console.log(error));

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))	

app.listen(4000, () => {
	console.log('now you are listening for request on port 4000')
})