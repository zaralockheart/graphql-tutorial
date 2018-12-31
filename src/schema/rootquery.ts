import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { authorField } from './author/author';
import { addAuthor } from './author/authormutation';
import { bookField } from './book';

const rootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		...authorField,
		...bookField
	}
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
		...addAuthor,
	}
})

module.exports = new GraphQLSchema({
	query: rootQuery,
	mutation: mutation
})