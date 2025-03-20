export interface Item  {
  id: string;
  fileName: string;
  path: string;
  totalChunks: number;
}

export interface Chunk {
  data: Blob;
  fileName: string;
  index: number;
  totalChunks: number;
}
