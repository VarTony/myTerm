type directoryTree <sub extends {}> = {
    key: string;
}

type bufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" 
    | "ucs2" | "ucs-2" | "base64" | "latin1" 
    | "binary" | "hex";

export { directoryTree, bufferEncoding };