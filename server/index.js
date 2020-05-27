const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    ID: ID!
    Title: String!
    Author: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    Books: [Book]
    Book(bookID: ID!): Book
  }

  type Mutation {
    UpdateBook(bookID: ID!, input: UpdateBook!): Book
  }

  input UpdateBook {
    Title: String
    Author: String
  }
`;

let books = [
    {
        ID: "book1",
        Title: 'Harry Potter and the Chamber of Secrets',
        Author: 'J.K. Rowling',
    },
    {
        ID: "book2",
        Title: 'Jurassic Park',
        Author: 'Michael Crichton',
    },
];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {      
      /**
       * List books
       */
      Books: () => books,

      /**
       * Query for a book
       */
      Book: (obj, args) => {        
        const { bookID } = args;        
        if (bookID) {
          let book = books.find(book => book.ID === bookID);          
          return book;
        }
        return null;
      }

    },
    Mutation: {
      /**
       * Update a book
       */
      UpdateBook: (obj, args) => {
        const { bookID, input } = args;
        if (bookID) {
          let bookIdx = books.findIndex(book => book.ID === bookID);
          if (bookIdx !== -1) {
            const book = books[bookIdx];
            if (input) {            
              const newBook = {
                ID: bookID,
                Title: input.Title || book.Title,
                Author: input.Author || book.Author
              };
              books = [
                ...books.slice(0, bookIdx),
                newBook,
                ...books.slice(bookIdx + 1)
              ];
              return newBook;
            }
            return book;
          }
        }
        return null;
      }
    }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers       
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});