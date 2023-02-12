import { createCanvas, loadImage } from 'canvas';
import fs from 'fs-extra';
import { join } from 'path';
import Watermark from '../src';

const image = fs.readFileSync(join(__dirname, 'test.png'));
const watermark = new Watermark(image);

(async () => {
  console.log('Adding watermark');

  // Add watermark to image and export as new image
  await watermark.addWatermark('Hello World!');
  const newImage = await watermark.getImage();
  fs.writeFileSync(join(__dirname, 'test-watermarked.png'), newImage);

  console.log('Watermark added');

  console.log('Cropping image');

  // Crop the image to show that the watermark can be read from any part of the image
  // This is not part of the watermarking process or the library, but is just to show that it works
  const croppedImage = await cropImageSomehow(newImage);

  console.log('Image cropped');

  console.log('Extracting watermark');

  const croppedWatermark = new Watermark(croppedImage);
  const watermarkData = await croppedWatermark.extractWatermark();

  console.log('Extracted', watermarkData);
})();

// Helper to crop the image - not part of the library
async function cropImageSomehow(newImage: Buffer) {
  const imageCanvas = createCanvas(200, 200);
  const imageContext = imageCanvas.getContext('2d');
  const imageObject = await loadImage(newImage);
  imageContext.drawImage(imageObject, -100, -200);
  const croppedImage = imageCanvas.toBuffer();
  fs.writeFileSync(join(__dirname, 'test-cropped.png'), croppedImage);
  return croppedImage;
}
