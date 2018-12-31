import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, print, GraphQLList } from 'graphql';
import { getConnection } from "typeorm";
import { author } from '../../entities/author';
import { BookType } from '../book/book';

export const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent: any, args: any) {
                
                return parent.books
            }
        }
	})
})

const getAuthor = async (parent: any, args: any) => {

    return await getConnection().manager.createQueryBuilder(author, 'author')
            .leftJoinAndSelect('author.books', 'book')
            .where(`author.id = :id`, {id: args.id})
            .getOne()

}

export const authorField = {
    author: {
        type: AuthorType,
        args: { id: {type: GraphQLID } },
        resolve: getAuthor
    },
    authors: {
        type: GraphQLList(AuthorType),
        resolve: async (parent: any, args: any) => {
            return await getConnection()
                                .manager
                                .createQueryBuilder(author, 'author')
                                .leftJoinAndSelect('author.books', 'book')
                                .getMany()
        }
    }
}