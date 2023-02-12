import Watermark from '../Watermark';
import { Chunk, ImagePosition } from '../types';

/**
 * WatermarkDataExtractor: Extract and decode data from a chunk.
 */
export default class WatermarkDataExtractor {
  constructor(private parent: Watermark) {}

  public async extractWatermarkData(chunk: Chunk) {
    const dataAsBinary = this.extractDataAsBinary(chunk);
    const dataBinary = this.getUsedDataBits(dataAsBinary);
    return this.binaryToString(dataBinary);
  }

  private getUsedDataBits(dataAsBinary: boolean[]) {
    const dataLengthBinary = dataAsBinary.slice(0, 32);
    const dataLength = parseInt(
      dataLengthBinary.map((bin) => (bin ? '1' : '0')).join(''),
      2
    );
    const dataBinary = dataAsBinary.slice(32, 32 + dataLength);

    return dataBinary;
  }

  private extractDataAsBinary(chunk: Chunk) {
    const bits = this.parent.dataStorage.getDataBitsInChunk(chunk, 2);
    return bits.map((bit) => bit.getBit());
  }

  private binaryToString(dataAsBinary: boolean[]) {
    const characters: string[] = [];
    const bytes = [];
    for (let i = 0; i < dataAsBinary.length; i += 8) {
      const byte = dataAsBinary.slice(i, i + 8).map((bit) => (bit ? '1' : '0'));
      const charCode = parseInt(byte.join(''), 2);
      characters.push(String.fromCharCode(charCode));
      bytes.push(byte);
    }
    return characters.join('');
  }
}
