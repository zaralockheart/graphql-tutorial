import { GraphQLList, GraphQLInt, GraphQLID ,GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'
import * as _ from 'lodash'
import { author } from '../entities/author';
import {getConnection} from "typeorm";

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
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