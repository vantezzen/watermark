import Watermark from '../Watermark';
import { Chunk } from '../types';
import { DataBit } from './DataBit';

/**
 * DataBit implementation for the SplitChannelDataStorage.
 */
export default class SplitChannelDataBit implements DataBit {
  private pixelIndex: number;

  constructor(
    private chunk: Chunk,
    x: number,
    y: number,
    private channelType: number,
    private parent: Watermark
  ) {
    this.pixelIndex = (y * chunk.chunkSize + x) * 3 + this.channelType;
  }

  setBit(bitValue: boolean) {
    this.chunk.pixelData[this.pixelIndex] =
      this.parent.signalStrategy.alignBitToStrategy(
        bitValue,
        () => this.chunk.pixelData[this.pixelIndex]
      );
  }

  getBit(): boolean {
    return this.parent.signalStrategy.getBitValueFromPixelValue(
      this.chunk.pixelData[this.pixelIndex]
    );
  }
}
