import fetch from 'node-fetch';
import * as fs from 'fs';
import sharp from 'sharp';
import * as dotenv from 'dotenv';
import pLimit from 'p-limit';

const limit = pLimit(1);
const FIGMA_PROJECT_ID = '74268036';

dotenv.config();

if (!process.env.FIGMA_API_KEY) {
  throw new Error('Create .env file and insert FIGMA_API_KEY variable');
}

const figmaKey = process.env.FIGMA_API_KEY;

const downloadIllustrations = async() => {
   const getIllustration = async(ch, category, fileId) => {
    const folderName = `./docs/${category}/${ch.name.toLowerCase().split(' ').join('-')}/static`;

     if (fs.existsSync(folderName)) {
      for (const il of ch.children) {
        try {
        const response = await fetch(
          `https://api.figma.com/v1/images/${fileId}?ids=${il.id}&format=png`,
          { headers: { 'X-Figma-Token': figmaKey } });

        const data: {images?: {id: string, name: string}} = await response.json();
            const imageUrl = data.images[il.id];

            fetch(imageUrl)
              .then(res => res.arrayBuffer())
              .then(arrayBuffer => {
                const buffer = Buffer.from(arrayBuffer);
                sharp(buffer)
                  .png({ quality: 90 })
                  .toFile(folderName + `/${il.name}.png`)
              });

          const fileName = `${il.name}.png`;
          console.log('illustration', fileName);
          } catch (error) {
            console.error(error.message);
          }
      }
    }
  }

  const getIllustrationList = async(fileId) => {
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileId}`,
    { headers: { 'X-Figma-Token': figmaKey }});

      if (response.ok) {
        try {
          const data: {name?: string, document?: { children: string[] }} = await response.json();
          const category = data.name.toLowerCase().split(' ').join('-');
          console.log('category', category);
          const downloadPromises = data.document.children.map(ch =>
            limit(async () => {
              await getIllustration(ch, category, fileId);
            })
          )
          await Promise.all(downloadPromises);
        } catch (error) {
          console.error(error.message);
        }
      }
  }

  const response = await fetch(
    `https://api.figma.com/v1/projects/${FIGMA_PROJECT_ID}/files`,
    { headers: { 'X-Figma-Token': figmaKey }});

  if (response.ok) {
    try {
      const data: {files?: {key: string }[]} = await response.json();
      data.files.forEach(file => getIllustrationList(file.key))

    } catch (error) {
      console.error(error);
    }
  }
};

downloadIllustrations().catch((error) => {
  console.error('Loading error', error);
});




