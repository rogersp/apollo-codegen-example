/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBook } from "./../../ApiTypes";

// ====================================================
// GraphQL mutation operation: UpdateBook
// ====================================================

export interface UpdateBook_UpdateBook {
  __typename: "Book";
  ID: string;
  Title: string;
  Author: string;
}

export interface UpdateBook {
  UpdateBook: UpdateBook_UpdateBook | null;
}

export interface UpdateBookVariables {
  bookID: string;
  input: UpdateBook;
}
