import { Chunk } from '../types';
import { DataBit } from './DataBit';

/**
 * DataStorage interface
 * Extract data bits from a chunk to allow reading and writing data to a chunk.
 */
export default interface DataStorage {
  getDataBitsInChunk(chunk: Chunk, headerHeight: number): DataBit[];
}
