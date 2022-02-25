const path = require('path');
const task = require('@semcore/super-publisher/task');
const { getChangelogByDate } = require('@semcore/changelogs-by-date/getChangeLogByDate');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const mail = require('../../website/client/components/messageTemplate');
require('dotenv').config();

module.exports = task('Send mail', async (opt) => {
  if (!opt.package !== 'ui') {
    opt.skip();
    return opt;
  }

  const packagePath = path.resolve(__dirname, 'package.json');
  delete require.cache[packagePath];

  const { version } = require(packagePath);

  const changelogPath = path.resolve(__dirname, 'CHANGELOG.md');

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
  const mailText = mail(releaseDate, releaseVersion, chg.join(''));

  await updateEmail(mailText);
  await sendCampaign();

  return opt;
});

function styles(label) {
  const commonStyle =
    'color:#FFFFFF;border-radius:6px;width:64px;height:20px;font-size:10px;text-align:center;padding-top:5px;padding-bottom:5px;';
  if (label[0] === 'Added')
    return commonStyle + 'background:#00BC98;padding-right:15px;padding-left:15px;';
  else if (label[0] === 'Changed')
    return commonStyle + 'background:#FF9400;padding-right:9px;padding-left:9px;';
  else if (label[0] === 'Fixed')
    return commonStyle + 'background:#0070CC;padding-right:17px;padding-left:17px;';
  else if (label[0] === 'BREAK')
    return commonStyle + 'background:#F71939;padding-right:13px;padding-left:13px;';
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
      ch.data.split(' ').slice(1).join(' ') +
      '</span>'
    );
  });
}

let campaignId;

const updateEmail = async (html) => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMPKEY2,
    server: process.env.MAILCHIMPSERVER,
  });
  try {
    await mailchimp.templates.updateTemplate(process.env.MAILCHIMPTEMPLATE, {
      name: 'Updates here',
      html,
    });
    const response = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: process.env.LISTID,
      },
      settings: {
        template_id: +process.env.MAILCHIMPTEMPLATE,
        subject_line: 'New release is here!',
        from_name: 'ui-kit-team',
        reply_to: 'ui-kit-team@semrush.com',
        title: 'Intergalactic',
      },
    });
    campaignId = response.id;
  } catch (error) {
    console.log(error, 'error');
  }
};

const sendCampaign = async () => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMPKEY1,
    server: process.env.MAILCHIMPSERVER,
  });
  try {
    const response = await mailchimp.campaigns.send(campaignId);
    console.log(response, 'send successful');
  } catch (error) {
    console.log(error.response.text, 'error');
  }
};
