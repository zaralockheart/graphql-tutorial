import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { getConnection } from 'typeorm';
import { book } from '../../entities/book';
import { AuthorType } from '../author/author';

export const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve: async (parent, args) => {

                return parent.author_
            }
        }		
	})
})

const getBook = async (parent: any, args: any) => {

    return await getConnection().manager.createQueryBuilder(book, 'book')
                                    .leftJoinAndSelect('book.author_', 'author')
                                    .where('book.id = :id', {id: args.id})
                                    .getOne()

}

export const bookField = {
    book: {
        type: BookType,
        args: { id: {type: GraphQLID } },
        resolve: getBook
    },
    books: {
        type: GraphQLList(BookType),
        resolve: async (parent: any, args: any) => {
            return await getConnection()
                                .manager
                                .createQueryBuilder(book, 'book')
                                .leftJoinAndSelect('book.author_', 'author')
                                .getMany()
        }
    }
}