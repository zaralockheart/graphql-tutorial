
import { GraphQLString, GraphQLInt } from 'graphql';
import { getConnection } from 'typeorm';
import { author } from '../../entities/author';
import { BookType } from './book';
import { book } from '../../entities/book';

export const addBook = {
    addBook: {
        type: BookType,
        args: {
            title: { type: GraphQLString },
            authorId: { type: GraphQLInt }, 
        },
        resolve: addBookAndAuthor
    }
}

async function addBookAndAuthor(parent: any, args: any) {

    const authorRepository = await getConnection().manager.getRepository(author)

    const authorData = await authorRepository.find({where  : {
        id: args.authorId
    }})

    const newBook = new book()
    newBook.title = args.title
    newBook.author_ = authorData[0]

    const response = await getConnection().manager.save(newBook);

    // Since in our entities, relations is with _ sign, but request didn't let's
    // make it the same so that they can just get the values
    const res: any = response;
    res.author = res.author_

    return getConnection().manager.save(res) 
}