import fs from 'node:fs/promises';
const stagedFiles = process.argv.slice(2);

const bannedTokens = ['semrush[dot]net'.replace('[dot]', '.')];

await Promise.all(
  stagedFiles.map(async (file) => {
    const content = await fs.readFile(file, 'utf-8');

    for (const token of bannedTokens) {
      if (content.includes(token)) {
        console.error(`Banned token ${token} found in ${file}`);
        process.exit(1);
      }
    }
  }),
);
