#!/usr/bin/env tsm

/* eslint-disable no-console */

import { execa } from 'execa';
import pc from 'picocolors';

try {
  await execa('which', ['gpg']);
} catch (error) {
  console.log(
    pc.red(
      `Unable to locate "gpg" binary in PATH. All commits in repository should be signed with GPG signature and "gpg" binary is expected to be available.`,
    ),
  );
  process.exit(1);
}

const { stdout: gitSignatureEnabled } = await execa('git', ['config', 'commit.gpgsign']);

if (gitSignatureEnabled !== 'true') {
  console.log(
    pc.red(`Seems like you have't enabled signing of all your commits in git. How to fix it:`),
  );
  console.log(
    "1. Generate GPG key if you haven't yet: https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key",
  );
  console.log(
    "2. Tell git about your signing key (not X.509 key!) if you haven't yet: https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key",
  );
  console.log('3. Run "git config --global commit.gpgsign true"\n');
  process.exit(1);
}

const { stdout: gitEmail } = await execa('git', ['config', 'user.email']);

if (!gitEmail) {
  console.log(
    pc.red(
      `Seems like you have't told git what is your email. Run "git config --global user.email <email>" to set it up.`,
    ),
  );
  process.exit(1);
}

const { stdout: gitSignatureUid } = await execa('git', ['config', 'user.signingkey']);

if (!gitSignatureUid) {
  console.log(pc.red(`Seems like your git is not configurated to sign commits. How to fix it:`));
  console.log('1. Run "gpg --list-secret-keys --keyid-format=long".');
  console.log(
    '2. Copy uid (text like CF2DC815AE956C1F right after "rsaXXXX/" text) of previously generated GPG signature.',
  );
  console.log(
    '3. Run "git config --global user.signingkey <uid>" to enable commits signature globally.\n',
  );
  process.exit(1);
}

const { stdout: signaturesRawText } = await execa('gpg', [
  '--list-secret-keys',
  '--keyid-format=long',
]);
const signaturesRawTexts = signaturesRawText.split('sec   ');
const rsaSignatures = signaturesRawTexts
  .filter((rawText) => rawText.startsWith('rsa'))
  .map((rawText) => {
    const lines = rawText.split('\n');
    const uid = lines[0]?.substring(lines[0]?.indexOf('/') + 1, lines[0]?.indexOf(' '));
    const email = lines[2]?.substring(lines[2]?.indexOf('<') + 1, lines[2]?.indexOf('>'));

    return { uid, email };
  });

const usedSignature = rsaSignatures.find(({ uid }) => uid === gitSignatureUid);

if (!usedSignature) {
  const foundList = rsaSignatures.map(({ uid }) => uid).join(', ') ?? '<empty list>';
  console.log(
    pc.red(
      `Unable to find GPG signature "${gitSignatureUid}". Found: ${foundList}. Run "gpg --list-secret-keys --keyid-format=long" to see which signatures are available.`,
    ),
  );
  process.exit(1);
}

if (usedSignature.email !== gitEmail) {
  console.log(
    pc.red(
      `GPG signature email is not equal to current git email. Email of GPG signature: "${usedSignature.email}". Current git email: "${gitEmail}".`,
    ),
  );
  process.exit(1);
}

console.log(pc.green(`Commit will be authored by "${gitEmail}"`));
