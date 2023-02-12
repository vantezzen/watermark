import { createCanvas, ImageData, loadImage } from 'canvas';
import getImageSize from 'image-size';
import { ImageDimensions } from '../types';

/**
 * ImageFileManager: Handle reading and writing images and their pixel data
 */
export default class ImageFileManager {
  public getImageDimensions(imageSource: Buffer): ImageDimensions {
    return getImageSize(imageSource);
  }
  public async getImagePixelData(imageSource: Buffer) {
    const dimensions = this.getImageDimensions(imageSource);
    const imageCanvas = createCanvas(dimensions.width, dimensions.height);
    const imageContext = imageCanvas.getContext('2d');

    const imageObject = await loadImage(imageSource);
    imageContext.drawImage(imageObject, 0, 0);
    const imagePixelData = imageContext.getImageData(
      0,
      0,
      dimensions.width,
      dimensions.height
    );

    return imagePixelData;
  }
  public async convertPixelDataToImage(imagePixelData: ImageData) {
    const imageCanvas = createCanvas(
      imagePixelData.width,
      imagePixelData.height
    );
    const imageContext = imageCanvas.getContext('2d');

    imageContext.putImageData(imagePixelData, 0, 0);

    return imageCanvas.toBuffer();
  }
}
