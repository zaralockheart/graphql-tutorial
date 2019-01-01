
import { GraphQLString, GraphQLInt } from 'graphql';
import { getConnection } from 'typeorm';
import { author } from '../../entities/author';
import { BookType } from './book';
import { book } from '../../entities/book';
import { getConnectionManagerInstance } from '../../util/connectionmanager';

export const addBook = {
    addBook: {
        type: BookType,
        args: {
            title: { type: GraphQLString },
            authorId: { type: GraphQLInt },
        },
        resolve: addBookAndAuthor,
    },
}

async function addBookAndAuthor(parent: any, args: any) {

    const authorRepository = await getConnectionManagerInstance().getRepository(author)

    const authorData = await authorRepository.find({where  : {
        id: args.authorId,
    }})

    const newBook = new book()
    newBook.title = args.title
    newBook.author_ = authorData[0]

    const response = await getConnectionManagerInstance().save(newBook);

    // Since in our entities, relations is with _ sign, but request didn't let's
    // make it the same so that they can just get the values
    const res: any = response;
    res.author = res.author_

    return getConnectionManagerInstance().save(res)
}
