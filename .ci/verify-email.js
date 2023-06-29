#!/usr/bin/env tsm

const { execSync } = require('child_process');
const pc = require('picocolors');
const log = console.log;

try {
  execSync('which gpg', { encoding: 'utf-8' });
} catch (error) {
  log(
    pc.red(
      `Unable to locate "gpg" binary in PATH. All commits in repository should be signed with GPG signature and "gpg" binary is expected to be available.`,
    ),
  );
  process.exit(1);
}

const gitSignatureEnabled = execSync('git config commit.gpgsign', { encoding: 'utf-8' });
if (gitSignatureEnabled !== 'true\n') {
  log(pc.red(`Seems like you have't enabled signing of all your commits in git. How to fix it:`));
  log(
    "1. Generate GPG key if you haven't yet: https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key",
  );
  log(
    "2. Tell git about your signing key (not X.509 key!) if you haven't yet: https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key",
  );
  log('3. Run "git config --global commit.gpgsign true"\n');
  process.exit(1);
}

const gitEmail = execSync('git config user.email', { encoding: 'utf-8' }).replace('\n', '');

if (!gitEmail) {
  log(
    pc.red(
      `Seems like you have't told git what is your email. Run "git config --global user.email <email>" to set it up.`,
    ),
  );
  process.exit(1);
}

const gitSignatureUid = execSync('git config user.signingkey', {
  encoding: 'utf-8',
}).replace('\n', '');

if (!gitSignatureUid) {
  log(pc.red('Seems like your git is not configurated to sign commits. How to fix it:'));
  log('1. Run "gpg --list-secret-keys --keyid-format=long".');
  log(
    '2. Copy uid (text like CF2DC815AE956C1F right after "rsaXXXX/" text) of previously generated GPG signature.',
  );
  log('3. Run "git config --global user.signingkey <uid>" to enable commits signature globally.\n');
  process.exit(1);
}

const signaturesRawText = execSync('gpg --list-secret-keys --keyid-format=long', {
  encoding: 'utf-8',
});
const signaturesRawTexts = signaturesRawText.split('sec   ');
const rsaSignatures = signaturesRawTexts
  .filter((rawText) => rawText.startsWith('rsa') || rawText.startsWith('ed25519'))
  .map((rawText) => {
    const lines = rawText.split('\n');
    const uid = lines[0]?.substring(lines[0]?.indexOf('/') + 1, lines[0]?.indexOf(' '));
    const email = lines[2]?.substring(lines[2]?.indexOf('<') + 1, lines[2]?.indexOf('>'));

    return { uid, email };
  });

const usedSignature = rsaSignatures.find(({ uid }) => uid === gitSignatureUid);

if (!usedSignature) {
  const foundList = rsaSignatures.map(({ uid }) => uid).join(', ') ?? '<empty list>';
  log(
    pc.red(
      `Unable to find GPG signature "${gitSignatureUid}". Found: ${foundList}. Run "gpg --list-secret-keys --keyid-format=long" to see which signatures are available.`,
    ),
  );
  process.exit(1);
}

if (usedSignature.email !== gitEmail) {
  log(
    pc.red(
      `GPG signature email is not equal to current git email. Email of GPG signature: "${usedSignature.email}". Current git email: "${gitEmail}".`,
    ),
  );
  process.exit(1);
}

log(pc.green(`Commit will be authored by "${gitEmail}"`));
