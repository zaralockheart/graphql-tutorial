import { GraphQLList, GraphQLInt, GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import * as _ from 'lodash'
import { authorField } from './author';
import { bookField } from './book';

const rootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		...authorField,
		...bookField
	}
})

module.exports = new GraphQLSchema({
	query: rootQuery
})