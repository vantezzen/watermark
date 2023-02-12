import Watermark from '../Watermark';

export default class WatermarkExtractor {
  constructor(private parent: Watermark) {}

  public async extractWatermark() {
    const checkerboardPosition =
      this.parent.checkerboardFinder.findCheckerboardInImage();
    if (!checkerboardPosition) {
      throw new Error('No checkerboard found in image');
    }

    const chunk = this.parent.imageChunker.getChunkAtPosition(
      checkerboardPosition.y,
      checkerboardPosition.x
    );

    return this.parent.watermarkDataExtractor.extractWatermarkData(chunk);
  }
}
