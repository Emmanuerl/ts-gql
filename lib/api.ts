/**
 * API layer
 * Represents functionalities that are exposed to consumers
 *
 */
export interface Config {
  path: string;
}

export function api(config: Config) {
  if (!config?.path) throw new Error("config.path not specified");
}
