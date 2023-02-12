import Watermark from '../Watermark';
import { Chunk } from '../types';

/**
 * This class is responsible for splitting an image into chunks and cutting chunks out of an image.
 */
export default class ImageChunker {
  constructor(private parent: Watermark, public chunkSize = 32) {}

  public splitImageIntoChunks() {
    const chunks: Chunk[] = [];
    for (
      let height = 0;
      height + this.chunkSize < this.parent.image.height;
      height += this.chunkSize
    ) {
      for (
        let width = 0;
        width + this.chunkSize < this.parent.image.width;
        width += this.chunkSize
      ) {
        chunks.push(this.getChunkAtPosition(height, width));
      }
    }
    return chunks;
  }

  public getChunkAtPosition(
    yStartPosition: number,
    xStartPosition: number
  ): Chunk {
    const pixelData = new Uint8ClampedArray(
      this.chunkSize * this.chunkSize * 3
    );
    const imagePixelData = this.parent.image.data;

    for (let y = 0; y < this.chunkSize; y++) {
      for (let x = 0; x < this.chunkSize; x++) {
        const pixelIndex = (y * this.chunkSize + x) * 3;
        const imagePixelIndex =
          ((y + yStartPosition) * this.parent.image.width +
            (x + xStartPosition)) *
          4;

        pixelData[pixelIndex] = imagePixelData[imagePixelIndex];
        pixelData[pixelIndex + 1] = imagePixelData[imagePixelIndex + 1];
        pixelData[pixelIndex + 2] = imagePixelData[imagePixelIndex + 2];
      }
    }

    return {
      position: {
        x: xStartPosition,
        y: yStartPosition,
      },
      pixelData,
      chunkSize: this.chunkSize,
    };
  }

  public mergeChunkIntoImage(chunk: Chunk) {
    const imagePixelData = this.parent.image.data;

    for (let y = 0; y < this.chunkSize; y++) {
      for (let x = 0; x < this.chunkSize; x++) {
        const pixelIndex = (y * this.chunkSize + x) * 3;
        const imagePixelIndex =
          ((y + chunk.position.y) * this.parent.image.width +
            (x + chunk.position.x)) *
          4;

        imagePixelData[imagePixelIndex] = chunk.pixelData[pixelIndex];
        imagePixelData[imagePixelIndex + 1] = chunk.pixelData[pixelIndex + 1];
        imagePixelData[imagePixelIndex + 2] = chunk.pixelData[pixelIndex + 2];
        imagePixelData[imagePixelIndex + 3] = 255; // Transparency off
      }
    }
  }
}
