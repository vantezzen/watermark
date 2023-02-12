# `@vantezzen/watermark` - Add hidden watermarks to images

[![npm version](https://badge.fury.io/js/%40vantezzen%2Fwatermark.svg)](https://badge.fury.io/js/%40vantezzen%2Fwatermark)

This package allows adding hidden watermarks to uncompressed images (PNG, BMP etc.) that do not rely on image metadata and are not visible to the eye. The watermark is added by tweaking the RGB values of the image slightly and it is still readable after cropping the image.

Possible use cases for the watermark are DRM or leak protection, adding a way to trace back the origins of an image or adding hidden copyright information.

## What does it look like

| Original image                                                                                   | Watermarked image                                                                                               |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| ![Original image](https://raw.githubusercontent.com/vantezzen/watermark/master/example/test.png) | ![Watermarked image](https://raw.githubusercontent.com/vantezzen/watermark/master/example/test-watermarked.png) |

## Features

- [x] Add arbitrary strings up to a specific length to an image
- [x] Doesn't rely on image metadata as these are often removed by websites and services
- [x] Watermark is still extractable if the image is cropped

## Currently not supported

With its current limitation, the watermark cannot be read if the pixel data of the image have been altered - though some limitations can be removed by improving the code.

Some limitations include:

- Compression (e.g. JPG) makes the watermark unreadable
- Stretching, rotating or zooming the image makes the watermark unreadable
- Image editing (e.g. brightness) makes the watermark unreadable

## Installation

```bash
npm install @vantezzen/watermark
```

## Usage

Interaction with the package is done through the `Watermark` class. It can be used to add watermarks to images and to extract watermarks from images.

An example of how to use the package can be found in the `example` folder.

### Adding a watermark

```typescript
import Watermark from '@vantezzen/watermark';
import fs from 'fs';

// You need to load your image as a Buffer, e.g. using fs.readFile
const image = fs.readFileSync(join(__dirname, 'test.png'));

// Create a new Watermark instance
const watermark = new Watermark(image);

// Add a watermark to the image
// This will modify the image stored inside the Watermark instance
await watermark.addWatermark('Hello World!');

// Get the modified image as a Buffer
const modifiedImage = await watermark.getImage();

// You can save the modified image to disk, e.g. using fs.writeFile
fs.writeFileSync(join(__dirname, 'test-watermarked.png'), modifiedImage);
```

### Extracting a watermark

> **Note:** The `Watermark` instance saves image pixel data and metadata internally. Create separate instances for separate images instead of reusing the same one.

```typescript
import Watermark from '@vantezzen/watermark';
import fs from 'fs';

// You need to load your watermarked image as a Buffer, e.g. using fs.readFile
const image = fs.readFileSync(join(__dirname, 'test-watermarked.png'));

// Create a new Watermark instance
const watermark = new Watermark(image);

// Extract the watermark from the image
const extractedWatermark = await watermark.extractWatermark();

// The extracted watermark will be null if no watermark was found
console.log(extractedWatermark); // Hello World!
```

## License

MIT
