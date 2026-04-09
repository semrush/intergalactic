#!/usr/bin/env tsm
import process from 'process';

import { publishTool } from '../index';

const [,, tool] = process.argv;

await publishTool(tool);
