import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `
    type Author {
        id: ID!
        name: String! # returns a String and non-nullable
        books: [Book!]!# A list of Books 
    }

    type Book {
        id: ID!
        title: String!
        author: Author! # returns an Author
    }

    type Query {
        authors: [Author!]!
        author(id: ID!): Author!
        books: [Book!]!
        book(id: ID!): Book!

        animals: [Word!]!
        animal(english: String!): Word!
    }

    type Word {
        xaitsnue: String!
        english: String!
        grammar: String!
        headword: Boolean!
        variant: [String!]
        speakers: String!
        other_info: String
        semantic_domain: String!
    }

    type Variant {
        word: Word!
        context: String!
    }
`



//sample dataset. We will fetch data from these array of objects
const authors = [
    { id: "1", name: "J.K. Rowling" },
    { id: "2", name: "Stephen King" },
    { id: "3", name: "Haruki Murakami" },
];
  
const books = [
    { id: "1", title: "Harry Potter and the Philosopher's Stone", authorId: "1" },
    { id: "2", title: "The Shining", authorId: "2" },
    { id: "3", title: "1Q84", authorId: "3" },
];

// Xaitsnue Animals sample
const animals = [
    {
        xaitsnue: "'asá",
        english: "fox",
        grammar: "noun",
        headword: true,
        variant: null,
        speakers: "AT, JK, JB, JD, EK",
        other_info: null,
        semantic_domain: "mammal"
    },
    {
        xaitsnue: "'aw'aw",
        english: "crow",
        grammar: "noun",
        headword: true,
        variant: null,
        speakers: "AT, JK, JB, JD, LK",
        other_info: "name comes from the sound that crows make",
        semantic_domain: "bird"
    },
    {
        xaitsnue: "beth'éqal",
        english: "bear",
        grammar: "noun",
        headword: true,
        variant: null,
        speakers: "JK, JB, JD, AT, EK, LK",
        other_info: null,
        semantic_domain: "mammal"
    }
];



// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    // Define resolvers for queries
    Query: {
        // Return all books
        books: () => books,
        // Find a book by ID and return it
        book: (parent, args) => books.find(book => book.id === args.id),
        // Return all authors
        authors: () => authors,
        // Find an author by ID and return them
        author: (parent, args) => authors.find(author => author.id === args.id),
        
        // Return all animals
        animals: () => animals,
        // Return animal translation in Xaitsnue given English name
        animal: (parent, args) => animals.find(animal => animal.english === args.english)
    },

    // Define resolvers for Author type fields
    Author: {
        // Return all books written by the author
        books: (parent) => books.filter(book => book.authorId === parent.id)
    },

    // Define resolvers for Book type fields
    Book: {
        // Return the author of the book
        author: (parent) => authors.find(author => author.id === parent.authorId)
    },

    // // Define resolver for Word type fields
    // Word: {
    //     // Return all information about the word
    //     headword: (parent) => animals.find(animal => animal.headword === parent.headword),
    //     english: (parent) => animals.find(animal => animal.english === parent.english),
    //     grammar: (parent) => animals.find(animal => animal.grammar === parent.grammar)
    // }
};



// The ApolloServer constructor takes two parameters: the schema and the resolvers you created 
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
// Passing an ApolloServer instance to the `startStandaloneServer` function.
// start the server at port 2410 on localhost
const { url } = await startStandaloneServer(server, {
    listen: { port: 2410 },
});

console.log(`Server starts at: ${url}`);

