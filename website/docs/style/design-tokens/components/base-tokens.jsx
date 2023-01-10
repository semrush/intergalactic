import React from 'react';
import tokens from './base-tokens.json';
import BaseTokensTable from '@components/BaseTokens';

const BaseTokens = () => <BaseTokensTable tokens={tokens} />;

export default BaseTokens;
