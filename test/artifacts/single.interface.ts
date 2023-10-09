import { GqlType } from "../../lib";

interface Book {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  rating?: number;
  authors: Author[];
  editor: Author;
}

interface Author {
  __kind: GqlType.TYPE;
  name: string;
}
