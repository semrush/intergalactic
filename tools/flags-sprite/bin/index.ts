#!/usr/bin/env tsm

import { resolve as resolvePath } from 'path';
import fs from 'fs/promises';
import { generate } from '../generate';

const packageFilePath = resolvePath(process.cwd(), 'package.json');
const packageFile = await fs.readFile(packageFilePath, 'utf-8');
const { version } = JSON.parse(packageFile);

await generate(version);
