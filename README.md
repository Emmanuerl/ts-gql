# TS-GQL

A simple library for converting typescript interfaces into GraphQL schemas.

### Usage

```ts
// SAMPLE USAGE

// interfaces/user.interface.ts
import { GqlType } from "src/lib";

interface Book {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  rating?: number;
  authors: string[];
}

// index.ts
import tsGql from "src/lib";
import path from "path";

async function run() {
  const interfaceDir = path.join(proces.cwd(), "/path/to/user.interface.ts");
  const schema = await tsQql({ interfaceDir });

  console.log(Schema);
}
```

```graphql
# Output

type BookType {
  id: String!
  name: String!
  rating: Int
  authors: [String]!
}
```

### Walkthrough

This repository, at the highest level, consists of two parts

1. The parser library in `src/lib`.
2. A demonstration of the library integration with [Apollo GraphQL](https://www.apollographql.com/) in `src/usage` .

### The Parser Library

Located in `src/lib` the parser library is simply put a utility tool can be broken down into three components: The core parser library, the fs module for file IO and the client facing api

The core parer library is where all the "grinding" happens. Simple put, the parser leverages the [Typescript compiler APIs](https://github.com/microsoft/TypeScript-wiki/blob/main/Using-the-Compiler-API.md) to perform the following

- Detect interface declarations and
- Get interface members

During the first step, the parser walks through tne input source tree, detects interface deflaration, checks if the interface has been marked for parsing and gradually builds up a GrapQL schema for each primitive type it recognizes. For composite types (eg another interface) the parser remembers the position of the Composite type by appending a placeholder to the intermeiary GraphQL schema. At the end of this step, all primitive types would have been converted to their corresponding GraphQL Schema typa. The primitive types currently supported are:

```js
{
  string: String,
  number: Int,
  boolean: Boolean
}
```

The next step is the final step. In this step, the parser uses interpolation to replace the Composite type placeholders that were identified during step 1 using regex pattern matching. The end result is a string representing the GraphQL Schema

### Constraints

- **Limited TS primitive types**: The library only handles sring, number and boolean primitive types. It doesn't support other primitive types like `symbol`, `null` and `undefined`

- **Independent file parsing**: The library can only handle independent file inputs. Hence imported interfaces will not be parsed accordingly. inheritance is also not covered by the library.

```ts
import { OtherInterface } from "./wherever";
import { GqlType } from "src/lib";

interface User {
  __kind: GqlType.TYPE;
  id: string;
  name: string;
  other: OtherInterface;
}
```

An input like the one above that involves an imported interface will result in the following

```graphql
type UserType {
  id: String!
  name: String!
  other: $OtherInterface!;
}
```

### Author

[Yours faithfully](https://github.com/emmanuerl)
