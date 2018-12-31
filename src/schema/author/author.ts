import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { getConnection } from "typeorm";
import { author } from '../../entities/author';

export const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
	})
})

const getAuthor = async (parent: any, args: any) => {
    const authorQuery = new author()
            authorQuery.id = args.id

            const authorRepository = await getConnection().manager.getRepository(author)

            const authorData = await authorRepository.find({where  : {
                id: args.id
            }})

            return authorData[0]
}

export const authorField = {
    author: {
        type: AuthorType,
        args: { id: {type: GraphQLID } },
        resolve: getAuthor
    }
}