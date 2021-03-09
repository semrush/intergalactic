const path = require('path');
const task = require('@semcore/super-publisher/task');
const { getChangelogByDate } = require('changelogs-by-date/getChangeLogByDate');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const mail = require('../website/client/components/messageTemplate');
require('dotenv').config();

let mailText;
module.exports = task('Send mail', async (opt) => {
  if (!opt.root.includes('release')) {
    opt.skip();
    return opt;
  }

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const { version } = require(packagePath);

  const changelogPath = path.resolve(opt.root, 'CHANGELOG.md');

  const now = new Date();
  const year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(now);
  const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(now);
  const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(now);
  const options = {
    day: 'numeric',
    month: 'long',
  };

  const componentsChangelogs = await getChangelogByDate('release', version, changelogPath);
  const changelogMeta = componentsChangelogs.find(({ date }) => date === `${year}-${month}-${day}`);
  const releaseVersion = changelogMeta.version;
  const releaseDate = now.toLocaleString('en-US', options);
  const chg = buildHtml(changelogMeta);
  mailText = mail(releaseDate, releaseVersion, chg.join(''));

  await updateEmail();
  // await sendCampaign();

  return opt;
});

function styles(label) {
  if (label[0] === 'Added')
    return 'color:#FFFFFF;background:#00BC98;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-right:15px;padding-bottom:5px;padding-left:15px;';
  else if (label[0] === 'Changed')
    return 'color:#FFFFFF;background:#FF9400;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-right:9px;padding-bottom:5px;padding-left:9px;';
  else if (label[0] === 'Fixed')
    return 'color:#FFFFFF;background:#0070CC;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-right:17px;padding-bottom:5px;padding-left:17px;';
  else if (label[0] === 'BREAK')
    return 'color:#FFFFFF;background:#F71939;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-right:13px;padding-bottom:5px;padding-left:13px;';
}

function buildHtml(chs) {
  return chs.changes.map((ch) => {
    const label = ch.data.split(' ').slice(0, 1);
    return (
      '<div class="title" style="color:#171A22;font-weight:bold;font-size:18px;line-height:26px;margin:20px 0 11px;">' +
      ch.type +
      '</div>' +
      `<span class=${label} style=${styles(label)}>` +
      label +
      '</span>' +
      '<span class="desc" style="color:#171A22;font-size:14px;line-height:150%;margin-left:8px">' +
      ch.data
        .split(' ')
        .slice(1)
        .join(' ') +
      '</span>'
    );
  });
}

let campaignId;

const updateEmail = async () => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMPKEY2,
    server: process.env.MAILCHIMPSERVER,
  });
  try {
    // const response = await mailchimp.templates.updateTemplate(process.env.MAILCHIMPTEMPLATE, {html: mailText});
    const response = await mailchimp.campaigns.create({
      type: 'regular',
      settings: {
        template_id: +process.env.MAILCHIMPTEMPLATE,
        subject_line: 'updates',
        from_name: 'ui-kit-team',
        reply_to: 'ui-kit-team@semrush.com',
        title: 'Intergalactic',
      },
    });
    campaignId = response.id;
  } catch (error) {
    console.log(error);
  }
};

const sendCampaign = async () => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMPKEY1,
    server: process.env.MAILCHIMPSERVER,
  });
  try {
    const response = await mailchimp.campaigns.send(campaignId);
    console.log(response, 'response');
  } catch (error) {
    console.log(error);
  }
};
