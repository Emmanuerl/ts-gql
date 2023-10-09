import { GqlType } from "../../src/lib";

interface Book {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  rating?: number;
  authors: string[];
}
