import { GqlType } from "../../lib";

interface Book {
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

interface Filter {
  __kind: GqlType.INPUT;
  rating?: number;
}

interface Response {
  __kind: GqlType.TYPE;
  books: Book[];
}
