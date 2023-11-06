#!/usr/bin/env tsm

import {replaceImports} from "./importUtils";

console.log('start replace old imports');

await replaceImports();

console.log('Done!');
