import React from 'react';
import tokens from './design-tokens.json';
import DesignTokensTable from '@components/DesignTokens';

const DesignTokens = () => <DesignTokensTable tokens={tokens} />;

export default DesignTokens;
