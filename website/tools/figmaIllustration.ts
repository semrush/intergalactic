import fetch from 'node-fetch';
import * as fs from 'fs';
import sharp from 'sharp';
import * as dotenv from 'dotenv';
import pLimit from 'p-limit';

const limit = pLimit(1);
const FIGMA_PROJECT_ID = '74268036';

dotenv.config();

if (!process.env.FIGMA_API_KEY) {
  throw new Error(
    'Create .env file and insert FIGMA_API_KEY variable that can be generated on https://www.figma.com/developers/api#authentication',
  );
}

const figmaKey = process.env.FIGMA_API_KEY;

const downloadIllustrations = async () => {
  const chosenPath = process.argv.slice(2);

  const getIllustration = async (children, category, fileId) => {
    const folderName = `./docs/${category}/${children.name
      .toLowerCase()
      .split(' ')
      .join('-')}/static`;
    // rome-ignore lint/nursery/noConsoleLog: <explanation>
    console.log('page', children.name);

    if (fs.existsSync(folderName)) {
      for (const illustration of children.children) {
        try {
          const response = await fetch(
            `https://api.figma.com/v1/images/${fileId}?ids=${illustration.id}&format=png`,
            { headers: { 'X-Figma-Token': figmaKey } },
          );

          const data: { images?: { id: string; name: string } } = await response.json();
          const imageUrl = data.images[illustration.id];

          fetch(imageUrl)
            .then((res) => res.arrayBuffer())
            .then((arrayBuffer) => {
              const buffer = Buffer.from(arrayBuffer);
              sharp(buffer).png({ quality: 90 }).toFile(`${folderName}/${illustration.name}.png`);
            });

          const fileName = `${illustration.name}.png`;
          // rome-ignore lint/nursery/noConsoleLog: <explanation>
          console.log('illustration', fileName);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  };

  const getIllustrationList = async (fileId) => {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'X-Figma-Token': figmaKey },
    });

    if (response.ok) {
      try {
        const data: { name?: string; document?: { children: { name: string }[] } } =
          await response.json();
        const category = data.name.toLowerCase().split(' ').join('-');
        // rome-ignore lint/nursery/noConsoleLog: <explanation>
        console.log('category', category);
        const downloadPromises = data.document.children
          .filter(
            (file) =>
              chosenPath.length !== 2 || file.name.toLowerCase() === chosenPath[1].toLowerCase(),
          )
          .map((children) =>
            limit(async () => {
              await getIllustration(children, category, fileId);
            }),
          );
        await Promise.all(downloadPromises);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const response = await fetch(`https://api.figma.com/v1/projects/${FIGMA_PROJECT_ID}/files`, {
    headers: { 'X-Figma-Token': figmaKey },
  });

  if (response.ok) {
    try {
      const data: { files?: { key: string; name: string }[] } = await response.json();
      data.files
        .filter((file) => !chosenPath.length || file.name.toLowerCase() === chosenPath[0])
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
