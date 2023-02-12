import Watermark from '../Watermark';
import { ImagePosition, RGB } from '../types';

/**
 * CheckerboardFinder: Find an instance of the checkerboard pattern in the image.
 */
export default class CheckerboardFinder {
  constructor(private parent: Watermark) {}

  public findCheckerboardInImage(): ImagePosition | null {
    const chunkSize = this.parent.imageChunker.chunkSize;

    for (let y = 0; y < this.parent.image.height - chunkSize; y++) {
      for (let x = 0; x < this.parent.image.width - chunkSize; x++) {
        if (this.checkerboardStartsAt(x, y)) {
          return {
            x,
            y,
          };
        }
      }
    }
    return null;
  }

  private checkerboardStartsAt(x: number, y: number) {
    for (let deltaY = 0; deltaY < 2; deltaY++) {
      for (
        let deltaX = 0;
        deltaX < this.parent.imageChunker.chunkSize / 2;
        deltaX++
      ) {
        const yPos = y + deltaY;
        const xPos = x + deltaX;
        const pixelIndex = (yPos * this.parent.image.width + xPos) * 4;
        const rgb: RGB = [
          this.parent.image.data[pixelIndex],
          this.parent.image.data[pixelIndex + 1],
          this.parent.image.data[pixelIndex + 2],
        ];

        const isHighlighted = (deltaX + deltaY) % 2 === 0;
        const rgbSum = rgb.reduce((a, b) => a + b);
        const targetModulo = isHighlighted ? 0 : 1;
        if (rgbSum % 2 !== targetModulo) {
          return false;
        }
      }
    }
    return true;
  }
}
