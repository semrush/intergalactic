import fs from 'fs-extra';
import tempy from 'tempy';
import open from 'open';
import { createTask } from '../task';
import { sendMail, mailGenerators, validateMailerEnv } from '@semcore/mailer';
import dotenv from 'dotenv';
import { getReleaseChangelog } from '@semcore/changelog-handler';

dotenv.config();

export const mailerTask = createTask('Send mail', async (opt) => {
  if (opt.package !== 'ui') {
    opt.skip();
    return opt;
  }

  validateMailerEnv();

  const {
    changelogs,
    package: { version },
  } = await getReleaseChangelog();
  const lastVersionChangelogs = changelogs.filter((changelog) => changelog.version === version);

  const mailBody = mailGenerators.release(lastVersionChangelogs);

  const mailMetaOptions = {
    title: 'Updates here',
    subject: 'New release is here!',
    from: 'ui-kit-team',
    replyTo: 'ui-kit-team@semrush.com',
  };

  opt.log(`Sending email with following meta options: ${JSON.stringify(mailMetaOptions)}`);

  if (!opt.dryRun) {
    await sendMail({
      ...mailMetaOptions,
      body: mailBody,
    });
  } else {
    const tempFilePath = tempy.file({ extension: 'html' });
    fs.writeFileSync(tempFilePath, mailBody);
    open(tempFilePath);
  }

  return opt;
});
