import { PNG } from 'pngjs';
import fs from 'fs/promises';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import expectedOutputRequirements from './src/countries.json';
import aliases from './src/aliases.json';
import { fileURLToPath } from 'url';
import { resolve as resolvePath } from 'path';
import { version } from './package.json';

const __dirname = resolvePath(fileURLToPath(import.meta.url), '..');

const normalizeName = (name: string) => {
  if (!name) return name;
  const noExtensions = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name;
  const noApostrophe = noExtensions.split("'").join('');
  const noSpaces = noApostrophe.split(' ').join('-');
  const noComas = noSpaces.split(',').join('-');
  return noComas.toLowerCase();
};

const versionHash = version.split('.').join('_');

await fs.mkdir(resolvePath(__dirname, 'lib/sprites'), { recursive: true });
// Minimal size for png icon 14x11
const flagSizes: any = { 1: 16, 2: 32 };
// Offset for correct position
const offset: any = { x: 1, y: 3 };

for (const scaling of [1, 2]) {
  const spritesList = await fs.readdir(resolvePath(__dirname, `./png/${scaling}x`));
  const spriteHeight = Math.ceil(Math.sqrt(spritesList.length));
  const spriteWidth = Math.ceil(spritesList.length / spriteHeight);

  const parts = await Promise.all(
    spritesList.map(async (spriteName) => {
      const filePath = resolvePath(__dirname, `./png/${scaling}x/${spriteName}`);
      const buffer = await fs.readFile(filePath);
      const png = (PNG as any).sync.read(buffer);

      return {
        name: normalizeName(spriteName),
        image: png,
      };
    }),
  );
  for (const part of parts) {
    for (const aliasName of (aliases as any)[part.name] ?? []) {
      parts.push({
        ...part,
        name: normalizeName(aliasName),
      });
    }
  }

  const partWidth = parts.reduce(
    (width, part) => Math.max(width, part.image.width),
    flagSizes[scaling],
  );
  const partHeight = parts.reduce(
    (height, part) => Math.max(height, part.image.height),
    flagSizes[scaling],
  );

  const spriteUrl = `https://static.semrush.com/intergalactic/flags/${version}/sprite@${scaling}x.png`;
  const backgroundWidth = `${(spriteWidth * partWidth) / scaling}px`;
  const backgroundHeight = `${(spriteHeight * partHeight) / scaling}px`;
  const backgroundSize = `${backgroundWidth} ${backgroundHeight}`;
  const cssRules: string[] = [
    `.flag-${versionHash} {\n  background-image: url(${spriteUrl});\n  background-size: ${backgroundSize}\n}`,
  ];
  const sprite = new PNG({
    width: spriteWidth * partWidth,
    height: spriteHeight * partHeight,
  });
  for (let i = 0; i < parts.length; i++) {
    const x = (i % spriteWidth) * partWidth;
    const y = Math.floor(i / spriteWidth) * partHeight;
    const { name, image } = parts[i];
    const cssX = -x / scaling + offset['x'];
    const cssY = -y / scaling + offset['y'];
    cssRules.push(`.flag-${name}-${versionHash} {\n  background-position: ${cssX}px ${cssY}px;\n}`);
    // for some weird reasons image.bitblt is undefined so here is a little trick with bind (I hate classes)
    (new PNG() as any).bitblt.bind(image)(sprite, 0, 0, image.width, image.height, x, y);
  }

  const cssOutput = cssRules.join('\n');

  const spriteBuffer = (PNG as any).sync.write(sprite);
  const reducedBuffer = await imagemin.buffer(spriteBuffer, {
    plugins: [imageminPngquant({ quality: [0.6, 0.8] })],
  });
  await fs.writeFile(
    resolvePath(__dirname, `./lib/sprites/sprite@${scaling}x.png`),
    reducedBuffer as any,
  );
  await fs.writeFile(resolvePath(__dirname, `./lib/sprites/sprite@${scaling}x.css`), cssOutput);

  const expectedCountries = Object.values(expectedOutputRequirements.iso2Name);
  for (const country of expectedCountries) {
    const normalizedName = normalizeName(country);
    if (!cssOutput.includes(normalizedName)) {
      throw new Error(
        `${country} sprite class name is missing in css output (was searching for ${normalizedName} at ${scaling}x scaling)`,
      );
    }
  }
}
