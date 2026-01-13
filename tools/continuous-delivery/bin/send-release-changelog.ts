#!/usr/bin/env tsm

import process from 'process';

import dotenv from 'dotenv';

import { sendReleaseChangelog } from '../index';

dotenv.config();

const endpoints = process.env['SLACK_API_ENDPOINTS']?.split(',') ?? ['fake-url'];

await sendReleaseChangelog(endpoints);
