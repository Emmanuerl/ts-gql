import { GqlType } from "../../lib";

export interface Book {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  rating: number;
  authors: Author[];
}

interface Author {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  age?: number;
}

export interface Filter {
  __kind: GqlType.INPUT;
  rating?: number;
}

export interface Response {
  __kind: GqlType.TYPE;
  books: Book[];
}
