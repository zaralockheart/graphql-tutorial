import { GraphQLList, GraphQLInt, GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import * as _ from 'lodash'
import { authorField } from './author';

const rootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		...authorField,
	}
})

module.exports = new GraphQLSchema({
	query: rootQuery
})