import { GqlType, KEY } from "../contants";

/**
 * Parser layer: the lowest layer of the library
 * represents the layer of the library that parses the input
 * TS interfaces and converts them to Grapql Schemas
 */
import ts from "typescript";

const newProgram = (path: string) =>
  ts.createProgram({
    options: { target: ts.ScriptTarget.ESNext },
    rootNames: [path],
  });

export function parse(filepath: string): string {
  const program = newProgram(filepath);
  const sourceFile = program.getSourceFile(filepath);
  if (!sourceFile) return "";

  const checker = program.getTypeChecker();

  // temporary store for holding mappings to be later interpolated into the
  // intermediary result of parsing
  let vars: Map<string, string> = new Map();

  let str = "";

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      let gqlType: GqlType;
      let gql = "";

      for (const member of node.members) {
        const field = member.name.getText();
        const type = checker.typeToString(checker.getTypeAtLocation(member));
        const suffix = member.questionToken !== undefined ? "" : "!";

        if (field === KEY) {
          const enumfield = type.split(".").pop();
          gqlType = GqlType[enumfield] ?? GqlType.TYPE;
          vars.set(interfaceName, `${interfaceName}${gqlType}`);
        } else {
          gql += `${field}: ${getGQLType(type)}${suffix}\n`;
        }
      }
      if (gqlType) {
        str += createGqlSchema(gqlType, interfaceName, gql) ?? "";
      }
    }
  });

  return str.replaceAll(/\$(\w+)/g, (val, key) => vars.get(key) || val);
}

function getGQLType(tsType: string): string {
  if (tsType === "number") return "Int";

  if (tsType === "string") return "String";

  if (tsType === "boolean") return "Boolean";

  if (tsType.endsWith("[]")) {
    const arrayType = tsType.split("[]")[0];
    return `[${getGQLType(arrayType)}]`;
  }

  return `$${tsType}`;
}

function createGqlSchema(type: GqlType, name: string, fields: String) {
  switch (type) {
    case GqlType.INPUT:
      return `\ninput $${name} {\n${fields}}\n`;

    case GqlType.TYPE:
      return `\ntype $${name} {\n${fields}}\n`;
    default:
      return null;
  }
}
