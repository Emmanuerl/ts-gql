/**
 * File system layer
 * Handles all file IO operations for the library
 *
 * File operations include:
 * read directory
 * read ts files
 * write file
 */
import fs from "fs/promises";

/**
 * reads a directory
 * @param path
 * @returns
 */
export async function ls(path: string) {
  return (await fs.readdir(path)).toString();
}
