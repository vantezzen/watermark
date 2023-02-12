import Watermark from '../Watermark';
import { Chunk } from '../types';

/**
 * This class is responsible for adding a checkerboard pattern to a chunk.
 *
 * The left half of the first 2 rows will be marked using a checkerboard pattern.
 * This allows the checkerboard finder to find the chunk in the image, e.g. if the image is cropped
 */
export default class CheckerboardCreator {
  constructor(private parent: Watermark) {}

  public addCheckerboardToChunk(chunk: Chunk) {
    const chunkSize = this.parent.imageChunker.chunkSize;
    const checkerboardWidth = chunkSize / 2;

    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < checkerboardWidth; x++) {
        const isHighlighted = (x + y) % 2 === 0;
        this.parent.pixelModifier.alignPixelInChunkToCondition(
          chunk,
          x,
          y,
          (rgb) => {
            const rgbSum = rgb.reduce((a, b) => a + b);
            const targetModulo = isHighlighted ? 0 : 1;
            return rgbSum % 2 === targetModulo;
          }
        );
      }
    }
  }
}
