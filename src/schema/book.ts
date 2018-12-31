import { GraphQLList, GraphQLInt, GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import * as _ from 'lodash'
import { book } from '../entities/book';
import { getConnection } from 'typeorm';

export const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		// The reason this is a function it can
		// reference to other.
		// One type doesn't know the other type
		id: { type: GraphQLString },
		name: { type: GraphQLString },		
	})
})

const getBook = async (parent: any, args: any) => {

    const bookRepository = await getConnection().manager.getRepository(book)

    const bookData = await bookRepository.find({where  : {
        id: args.id
    }})

    return bookData[0]
}

export const bookField = {
    book: {
        type: BookType,
        args: { id: {type: GraphQLID } },
        resolve: getBook
    }
}