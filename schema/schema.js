const graphql = require('graphql')

// This is how we define object type in graph ql

const { GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash')

// Now we can define a new type
// GraphQLObjectType is a function that accept object
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		// The reason this is a function it can
		// reference to other.
		// One type doesn't know the other type
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
})

// dummy data
var books = [
	{name: "Name of the wind", genre: 'Fantasy', id: '1'},
	{name: "The Final Empire", genre: 'Fantasy', id: '2'},
	{name: "The Long Earth", genre: 'Sci-FI', id: '3'},
]

// This is gonna be our root schema
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			/**  This is what argument client should send for query
			It's gonna make it looks like this
			book(id = "id") {

			}
			*/
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// Code to get data from db / other source
				return _.find(books, { id: args.id })

			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})