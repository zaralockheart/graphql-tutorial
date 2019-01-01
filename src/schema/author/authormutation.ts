
import { GraphQLString, GraphQLInt } from 'graphql';
import { getConnection } from 'typeorm';
import { author } from '../../entities/author';
import { AuthorType } from './author';
import { getConnectionManagerInstance } from '../../util/connectionmanager';

export const addAuthor = {
    addAuthor: {
        type: AuthorType,
        args: {
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
        },
        resolve(parent: any, args: any) {

            const newAuthor = new author()
            newAuthor.name = args.name
            newAuthor.age = args.age

            return getConnectionManagerInstance().save(newAuthor)
        },
    },
}
