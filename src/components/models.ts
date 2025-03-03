export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Chunk {
  // data: Blob;
  filename: string;
  index: number;
  totalChunks: number;
}
