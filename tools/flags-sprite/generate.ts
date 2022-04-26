import { PNG } from 'pngjs';
import fs from 'fs';
import { pascalCase } from 'change-case';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

const normalizeName = (name: string) => {
  const noExtensions = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name;
  const noSpaces = noExtensions.split(' ').join('-');
  return pascalCase(noSpaces);
};

/**
 * Package execution is locked to file structure of `@semcore/flags`.
 * cwd should be exactly `@semcore/flags` root
 */
export const generate = async (version: string) => {
  const versionHash = version.split('.').join('_');

  fs.mkdirSync('lib/sprites');
  const aliases: { [aliased: string]: string[] } = JSON.parse(
    fs.readFileSync('./src/aliases.json', 'utf-8'),
  );

  for (const scaling of [1, 2]) {
    const spritesList = await fs.readdirSync(`png/${scaling}x`);
    const spriteHeight = Math.ceil(Math.sqrt(spritesList.length));
    const spriteWidth = Math.ceil(spritesList.length / spriteHeight);

    const parts = spritesList.map((spriteName) => {
      const filePath = `png/${scaling}x/${spriteName}`;
      const buffer = fs.readFileSync(filePath);
      const png = PNG.sync.read(buffer);

      return {
        name: normalizeName(spriteName),
        image: png,
      };
    });
    for (const part of parts) {
      for (const aliasName of aliases[part.name] ?? []) {
        parts.push({
          ...part,
          name: normalizeName(aliasName),
        });
      }
    }

    const partWidth = parts.reduce((width, part) => Math.max(width, part.image.width), 0);
    const partHeight = parts.reduce((height, part) => Math.max(height, part.image.height), 0);

    const spriteUrl = `https://static.semrush.com/ui-kit/flags/${version}/sprite@${scaling}x.png`;
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
      const cssX = -x / scaling;
      const cssY = -y / scaling;
      cssRules.push(
        `.flag-${name}-${versionHash} {\n  background-position: ${cssX}px ${cssY}px;\n}`,
      );
      // for some weird reasons image.bitblt is undefined so here is a little trick with bind (I hate classes)
      new PNG().bitblt.bind(image)(sprite, 0, 0, image.width, image.height, x, y);
    }

    const spriteBuffer = PNG.sync.write(sprite);
    const reducedBuffer = await imagemin.buffer(spriteBuffer, {
      plugins: [imageminPngquant({ quality: [0.6, 0.8] })],
    });
    fs.writeFileSync(`lib/sprites/sprite@${scaling}x.png`, reducedBuffer);
    fs.writeFileSync(`lib/sprites/sprite@${scaling}x.css`, cssRules.join('\n'));
  }
};
