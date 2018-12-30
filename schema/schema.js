const graphql = require('graphql')

// This is how we define object type in graph ql

const { GraphQLList, GraphQLInt, GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
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
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args){
				
				return _.find(authors, { id: parent.authorId })
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		// The reason this is a function it can
		// reference to other.
		// One type doesn't know the other type
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: {type: GraphQLInt},
		books: {
			type: GraphQLList(BookType),
			resolve(parent, args) {

				return _.filter(books, { authorId: parent.id })
			}
		}
	})
})

// dummy data
var books = [
	{name: "Name of the wind", genre: 'Fantasy', id: '1', authorId: '1'},
	{name: "The Final Empire", genre: 'Fantasy', id: '2', authorId: '2'},
	{name: "The Long Earth", genre: 'Sci-FI', id: '3', authorId: '3'},
	{name: "The Hero of Ages", genre: 'Fantasy', id: '4', authorId: '2'},
	{name: "The Color of Magic", genre: 'Fantasy', id: '5', authorId: '3'},
	{name: "The Light Fantastic", genre: 'Fantasy', id: '6', authorId: '3'},
]

var authors = [
	{ name: 'Patrick Rothfuss', age: 44, id: '1'},
	{ name: 'Brandon Sanderson', age: 42, id: '2'},
	{ name: 'Terry Pratchettt', age: 66, id: '3'},
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
		},
		books: {
			type: GraphQLList(BookType),
			resolve(parent, args ) {
				return books
			}
		},
		author: {
			type: AuthorType,
			args: { id: {type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id })
			}
		},
		authors: {
			type: GraphQLList(AuthorType),
			resolve (parent, args) {
				return authors
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})