export type ImageDimensions = { width: number; height: number };
export type ImagePosition = { x: number; y: number };
export type Chunk = {
  position: ImagePosition;
  pixelData: Uint8ClampedArray;
  chunkSize: number;
};
export type RGB = [number, number, number];
