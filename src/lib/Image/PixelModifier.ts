import { Chunk, RGB } from '../types';

/**
 * Pixel Modifier: Low-level helper class to modify pixels in chunks and align them to a condition
 * (e.g. make sure the sum of the RGB values is even)
 */
export default class PixelModifier {
  public alignPixelToCondition(
    rgb: RGB,
    isConditionFulfilled: (rgb: RGB) => boolean
  ) {
    let currentIndex = 0;
    let indexModificationDirection = [1, 1, 1];

    while (!isConditionFulfilled(rgb)) {
      rgb[currentIndex] += indexModificationDirection[currentIndex];
      if (rgb[currentIndex] >= 255 || rgb[currentIndex] <= 0) {
        indexModificationDirection[currentIndex] *= -1;
      }
      currentIndex = (currentIndex + 1) % 3;
    }
    return rgb;
  }

  public alignPixelInChunkToCondition(
    chunk: Chunk,
    x: number,
    y: number,
    isConditionFulfilled: (rgb: RGB) => boolean
  ) {
    const pixelIndex = (y * chunk.chunkSize + x) * 3;
    const rgb: RGB = [
      chunk.pixelData[pixelIndex],
      chunk.pixelData[pixelIndex + 1],
      chunk.pixelData[pixelIndex + 2],
    ];

    this.alignPixelToCondition(rgb, isConditionFulfilled);

    chunk.pixelData[pixelIndex] = rgb[0];
    chunk.pixelData[pixelIndex + 1] = rgb[1];
    chunk.pixelData[pixelIndex + 2] = rgb[2];
  }
}
