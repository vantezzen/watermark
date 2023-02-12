import Watermark from '../Watermark';
import { Chunk } from '../types';

export default class WatermarkCreator {
  constructor(private parent: Watermark) {}

  public async addWatermark(watermark: string) {
    const chunks = this.parent.imageChunker.splitImageIntoChunks();
    for (const chunk of chunks) {
      this.addWatermarkToChunk(chunk, watermark);
      this.parent.imageChunker.mergeChunkIntoImage(chunk);
    }
  }

  private addWatermarkToChunk(chunk: Chunk, watermark: string) {
    this.parent.checkerboardCreator.addCheckerboardToChunk(chunk);
    this.parent.watermarkDataCreator.addDataToChunk(chunk, watermark);
  }
}
