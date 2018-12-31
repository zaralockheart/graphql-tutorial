const express = require('express') 
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
import "reflect-metadata";
import {createConnection} from "typeorm";

const app = express()

createConnection().then(async connection => {

	app.use('/graphql', graphqlHTTP({
		schema,
		graphiql: true
	}))

	app.listen(4000, () => {
		console.log('now you are listening for request on port 4000')
	})
    
}).catch(error => console.log(error));
