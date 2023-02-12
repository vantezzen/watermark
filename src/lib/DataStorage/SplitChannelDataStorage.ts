import Watermark from '../Watermark';
import { Chunk } from '../types';
import { DataBit } from './DataBit';
import DataStorage from './DataStorage';
import SplitChannelDataBit from './SplitChannelDataBit';

/**
 * Split Channel Data Storage:
 * Store data in the red, green and blue channel of each pixel separately.
 */
export default class SplitChannelDataStorage implements DataStorage {
  constructor(private parent: Watermark) {}

  getDataBitsInChunk(chunk: Chunk, headerHeight: number): DataBit[] {
    const bits: DataBit[] = [];

    for (let y = headerHeight + 1; y < chunk.chunkSize; y++) {
      for (let x = 0; x < chunk.chunkSize; x++) {
        for (let channel = 0; channel < 3; channel++) {
          bits.push(new SplitChannelDataBit(chunk, x, y, channel, this.parent));
        }
      }
    }
    return bits;
  }
}
