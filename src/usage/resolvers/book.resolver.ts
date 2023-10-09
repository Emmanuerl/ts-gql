import { Filter, Response, Book } from "../interfaces/book.interface";

import bookStore from "../modules/books/book.store";

type FilterInput = Omit<Filter, "__kind">;
type ResponseType = Omit<Response, "__kind">;

export class BookResolver {
  book(_, input: FilterInput): ResponseType {
    console.log(input);
    const books = <Book[]>bookStore.filterByRating(input.rating);
    console.log(books);
    return { books };
  }
}

export const bookResolver = new BookResolver();
