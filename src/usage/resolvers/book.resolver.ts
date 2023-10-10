import { Filter, Response, Book } from "../interfaces/book.interface";

import bookStore from "../modules/books/book.store";

type FilterInput = Omit<Filter, "__kind">;
type ResponseType = Omit<Response, "__kind">;

export class BookResolver {
  book(_, args: { input: FilterInput }): ResponseType {
    const books = <Book[]>bookStore.filterByRating(args.input.rating);
    return { books };
  }
}

export const bookResolver = new BookResolver();
