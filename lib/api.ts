import { ls } from "./core/fs";
import { parse } from "./core/parser";

/**
 * API layer
 * Represents functionalities that are exposed to consumers
 *
 */
export interface Config {
  /**
   * directory that holds interfaces
   */
  interface_dir: string;
}

export async function api(config: Config): Promise<string> {
  if (!config?.interface_dir)
    throw new Error("config.inteface_dir not specified");

  const files = await ls(config.interface_dir);
  if (files.length === 0) return "";

  let blob = "";
  // parse files concurrently
  files.forEach((file) => {
    blob += parse(file);
  });

  return blob;
}
