import Watermark from '../Watermark';
import SignalStrategy from './SignalStrategy';

/**
 * A signal strategy that uses the odd/even property of a pixel value to encode a bit value.
 *
 * This strategy is used by default.
 *
 * If the pixel value is odd, the bit value is 0 - if the pixel value is even, the bit value is 1.
 */
export default class OddEvenSignalStrategy implements SignalStrategy {
  getBitValueFromPixelValue(pixelValue: number): boolean {
    return pixelValue % 2 === 0;
  }
  alignBitToStrategy(bitValue: boolean, getPixelValue: () => number): number {
    const targetModulo = bitValue ? 0 : 1;
    const pixelValue = getPixelValue();
    const pixelValueModulo = pixelValue % 2;
    if (pixelValueModulo === targetModulo) {
      return pixelValue;
    } else {
      return pixelValue === 255 ? pixelValue - 1 : pixelValue + 1;
    }
  }
}
