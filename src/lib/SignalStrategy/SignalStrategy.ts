/**
 * Interface for a signal strategy.
 *
 * A signal strategy is a way to encode a bit value into a pixel value and vice versa.
 */
export default interface SignalStrategy {
  alignBitToStrategy(bitValue: boolean, getPixelValue: () => number): number;
  getBitValueFromPixelValue(pixelValue: number): boolean;
}
