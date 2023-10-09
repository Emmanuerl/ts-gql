import path from "path";
import tsGql from "./lib";
const query = `
type Query {
  book(input: FilterInput): ResponseType
}
`;
const interfaceDir = path.join(process.cwd(), "src/usage/interfaces");

export async function getTypeDefinitiona() {
  const schema = await tsGql({ interfaceDir: interfaceDir });

  return `
${schema}
${query}
  `;
}
