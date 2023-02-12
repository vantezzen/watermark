import DataStorage from './DataStorage/DataStorage';
import SplitChannelDataStorage from './DataStorage/SplitChannelDataStorage';
import OddEvenSignalStrategy from './SignalStrategy/OddEvenSignalStrategy';
import SignalStrategy from './SignalStrategy/SignalStrategy';
import { ImageDimensions } from './types';
import { ImageData } from 'canvas';
import ImageFileManager from './Image/ImageFileManager';
import ImageChunker from './Image/ImageChunker';
import CheckerboardCreator from './WatermarkCreation/CheckerboardCreator';
import PixelModifier from './Image/PixelModifier';
import WatermarkCreator from './WatermarkCreation/WatermarkCreator';
import WatermarkDataCreator from './WatermarkCreation/WatermarkDataCreator';
import WatermarkExtractor from './WatermarkExtraction/WatermarkExtractor';
import CheckerboardFinder from './WatermarkExtraction/CheckerboardFinder';
import WatermarkDataExtractor from './WatermarkExtraction/WatermarkDataExtractor';

/**
 * Hidden Image Watermark: Add or extract a hidden image watermark from an image
 *
 * @author: vantezzen
 * @license: MIT
 * @copyright: 2023
 */
export default class Watermark {
  // Strategies
  public signalStrategy: SignalStrategy = new OddEvenSignalStrategy();
  public dataStorage: DataStorage = new SplitChannelDataStorage(this);

  // Watermark Creation
  public checkerboardCreator = new CheckerboardCreator(this);
  public watermarkCreator = new WatermarkCreator(this);
  public watermarkDataCreator = new WatermarkDataCreator(this);

  // Watermark Extraction
  public watermarkExtractor = new WatermarkExtractor(this);
  public checkerboardFinder = new CheckerboardFinder(this);
  public watermarkDataExtractor = new WatermarkDataExtractor(this);

  // Image Management
  public imageFileManager = new ImageFileManager();
  public imageChunker = new ImageChunker(this);
  public pixelModifier = new PixelModifier();

  // Image Data
  public image: ImageData = null;
  public imageDimensions: ImageDimensions = null;

  constructor(public imageSource: Buffer) {}

  /**
   * Add a watermark to the loaded image provided in the constructor or stored in the imageSource property
   */
  public async addWatermark(watermark: string) {
    await this.ensureImageIsLoaded();
    await this.watermarkCreator.addWatermark(watermark);
  }

  /**
   * Extract a watermark from the loaded image provided in the constructor or stored in the imageSource property
   */
  public async extractWatermark() {
    await this.ensureImageIsLoaded();
    return await this.watermarkExtractor.extractWatermark();
  }

  /**
   * Export the image with the watermark to a buffer
   */
  public async getImage() {
    return await this.imageFileManager.convertPixelDataToImage(this.image);
  }

  private async ensureImageIsLoaded() {
    if (this.image) return;

    this.imageDimensions = this.imageFileManager.getImageDimensions(
      this.imageSource
    );
    this.image = await this.imageFileManager.getImagePixelData(
      this.imageSource
    );
  }
}
