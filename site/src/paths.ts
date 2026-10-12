/** Prefix a root-relative path with the deploy base ("" or "/<repo>"). */
export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
