import { DataBit } from '../DataStorage/DataBit';
import Watermark from '../Watermark';
import { Chunk } from '../types';

/**
 * This class is responsible for adding watermark data to chunks.
 *
 * The watermark data starts at row 3 as the first 2 rows are used for the checkerboard pattern.
 * The first `chunkSize` bits are used to encode the length of the watermark string to avoid
 * trying to later decode bits that are not part of the watermark.
 *
 * The data is added using a `DataStorage` provider.
 */
export default class WatermarkDataCreator {
  constructor(private parent: Watermark) {}

  public addDataToChunk(chunk: Chunk, data: string) {
    const dataAsBinary = this.stringToBinary(data);
    this.addDataToChunkAsBinary(chunk, dataAsBinary);
  }

  private stringToBinary(watermark: string) {
    // Source: https://stackoverflow.com/a/53247859/10590162
    const characters = watermark.split('');
    return characters
      .map(function (char) {
        const binary = char.charCodeAt(0).toString(2);
        const pad = Math.max(8 - binary.length, 0);
        // Just to make sure it is 8 bits long.
        return '0'.repeat(pad) + binary;
      })
      .map((binary) => binary.split(''))
      .flat()
      .map((binaryString) => binaryString !== '0');
  }

  private addDataToChunkAsBinary(chunk: Chunk, dataAsBinary: boolean[]) {
    const bits = this.parent.dataStorage.getDataBitsInChunk(chunk, 2);
    if (bits.length < dataAsBinary.length + chunk.chunkSize) {
      throw new Error(
        `Watermark data is too long. Max allowed length is ${
          bits.length - chunk.chunkSize
        } bits, ${dataAsBinary.length} supplied.`
      );
    }

    this.addDataLengthToChunkBits(chunk, dataAsBinary.length, bits);
    this.addDataToChunkBits(dataAsBinary, bits);
  }

  private addDataToChunkBits(dataAsBinary: boolean[], bits: DataBit[]) {
    for (let i = 0; i < dataAsBinary.length; i++) {
      bits[i].setBit(dataAsBinary[i]);
    }

    for (const bit of dataAsBinary) {
      bits.shift().setBit(bit);
    }
  }

  private addDataLengthToChunkBits(
    chunk: Chunk,
    length: number,
    bits: DataBit[]
  ) {
    const dataLengthAsBinary = length.toString(2);
    const dataLengthAsBinaryPadded = dataLengthAsBinary
      .padStart(chunk.chunkSize, '0')
      .split('');

    for (const bit of dataLengthAsBinaryPadded) {
      bits.shift().setBit(bit !== '0');
    }
  }
}
