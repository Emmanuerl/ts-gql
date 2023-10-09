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
import path from "path";
/**
 * reads a directory for all ts files
 * @param path
 * @returns list of only ts files in that directory
 */
export async function ls(directory: string): Promise<string[]> {
  try {
    const call = await fs.readdir(directory);
    const list = call.toString();
    return list
      .split(",")
      .filter((f) => /\.ts$/i.test(f))
      .map((f) => path.join(directory, f));
  } catch (err) {
    throw new Error(`unable to read path: "${directory}"`);
  }
}
