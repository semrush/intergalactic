import * as fs from 'fs';

import type { CanvasNode, GetFileResponse, GetImagesResponse, GetProjectFilesResponse } from '@figma/rest-api-spec';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import sharp from 'sharp';

const FIGMA_EXPORT_SCALE = 1.2;
const MIN_FRAME_WIDTH_FOR_SCALE = 200;

dotenv.config();

if (!process.env.FIGMA_API_KEY) {
  throw new Error(
    'Create .env file and insert FIGMA_API_KEY variable that can be generated on https://www.figma.com/developers/api#authentication',
  );
}

if (!process.env.FIGMA_PROJECT_ID) {
  throw new Error(
    'FIGMA_PROJECT_ID is missing in the .env file',
  );
}

const figmaKey = process.env.FIGMA_API_KEY;

const downloadIllustrations = async () => {
  const chosenPath = process.argv.slice(2);

  const getIllustration = async (page: CanvasNode, category: string, fileId: string) => {
    const folderName = `./docs/${category}/${page.name
      .toLowerCase()
      .split(' ')
      .join('-')}/static`;

    console.log('page', page.name);

    if (fs.existsSync(folderName)) {
      const largeFrames = page.children.filter((frame) => 'absoluteRenderBounds' in frame && frame.absoluteRenderBounds && frame.absoluteRenderBounds.width > MIN_FRAME_WIDTH_FOR_SCALE);
      const smallFrames = page.children.filter((frame) => 'absoluteRenderBounds' in frame && frame.absoluteRenderBounds && frame.absoluteRenderBounds.width <= MIN_FRAME_WIDTH_FOR_SCALE);
      try {
        // scale up only big images
        const largeFrameIds = largeFrames.map((frame) => frame.id).join();
        const responseLarge = await fetch(
          `https://api.figma.com/v1/images/${fileId}?ids=${largeFrameIds}&format=png&scale=${FIGMA_EXPORT_SCALE}`,
          { headers: { 'X-Figma-Token': figmaKey } },
        );

        const smallFrameIds = smallFrames.map((frame) => frame.id).join();
        const responseSmall = await fetch(
          `https://api.figma.com/v1/images/${fileId}?ids=${smallFrameIds}&format=png`,
          { headers: { 'X-Figma-Token': figmaKey } },
        );

        const dataLarge = await responseLarge.json() as GetImagesResponse;
        const dataSmall = await responseSmall.json() as GetImagesResponse;
        const imageResponses = { ...dataLarge.images, ...dataSmall.images };

        page.children.forEach((frame) => {
          const id = imageResponses[frame.id];
          if (typeof id === 'string') {
            fetch(id)
              .then((res) => res.arrayBuffer())
              .then((arrayBuffer) => {
                const buffer = Buffer.from(arrayBuffer);
                sharp(buffer)
                  .png({ compressionLevel: 2, quality: 98, adaptiveFiltering: true })
                  .toFile(`${folderName}/${frame.name}.png`);
              });
          }

          const fileName = `${frame.name}.png`;
          console.log('illustration', fileName);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    }
  };

  const getIllustrationList = async (fileId: string) => {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'X-Figma-Token': figmaKey },
    });

    if (response.ok) {
      try {
        const data = await response.json() as GetFileResponse;
        const category = data.name.toLowerCase().split(' ').join('-');

        console.log('category', category);
        data.document.children
          .filter(
            (page) =>
              chosenPath.length !== 2 || page.name.toLowerCase() === chosenPath[1].toLowerCase(),
          )
          .forEach(async (page) =>
            await getIllustration(page, category, fileId),
          );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    }
  };

  const response = await fetch(`https://api.figma.com/v1/projects/${process.env.FIGMA_PROJECT_ID}/files`, {
    headers: { 'X-Figma-Token': figmaKey },
  });

  if (response.ok) {
    try {
      const data = await response.json() as GetProjectFilesResponse;
      data.files
        ?.filter((file) => !chosenPath.length || file.name.toLowerCase() === chosenPath[0])
        .map((file) => getIllustrationList(file.key));
    } catch (error) {
      console.error(error);
    }
  }
};

downloadIllustrations().catch((error) => {
  console.error('Loading error', error);
});
// When calling the script, the first argument can be a filename and the second argument a page name in the file
