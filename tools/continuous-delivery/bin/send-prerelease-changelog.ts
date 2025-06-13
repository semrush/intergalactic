#!/usr/bin/env tsm

import process from 'process';

import dotenv from 'dotenv';

import { sendReleaseChangelog } from '../index';

dotenv.config();

const endpoints = process.env['PRIVATE_CHANNEL_SLACK_API']?.split(',') ?? ['fake-url'];

await sendReleaseChangelog(endpoints);
