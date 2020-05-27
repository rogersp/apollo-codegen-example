import { gql } from 'apollo-boost'

// The problem appears when compiling types generated from the block below.

export default gql`
    mutation UpdateBook($bookID: ID!, $input: UpdateBook!) {
        UpdateBook(bookID: $bookID, input: $input) {
            ID
            Title
            Author
        }        
    }
`

// However, no problem when the mutation is named something different:

// export default gql`
//     mutation UpdateBookMutation($bookID: ID!, $input: UpdateBook!) {
//         UpdateBook(bookID: $bookID, input: $input) {
//             ID
//             Title
//             Author
//         }        
//     }
// `