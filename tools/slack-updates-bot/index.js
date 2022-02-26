const axios = require('axios');
const dayjs = require('dayjs');
const en = require('dayjs/locale/en');
const changelogByDate = require('@semcore/changelogs-by-date');
const messageTemplate = require('./messageTemplate');

dayjs.locale('en', en);

module.exports = async function sendUiKitUpdates(start, end, urls) {
  const componentsChangelogs = await changelogByDate(start, end);
  const toolsChangelogs = await changelogByDate(start, end, '../../tools');
  const changelog = [...componentsChangelogs, ...toolsChangelogs];
  const flatChangelog = mergeChangeLog(changelog);
  const message = messageTemplate(flatChangelog);
  const messageData = createMessage(start, end, message);
  return await postMessage(urls, messageData);
};

function mergeChangeLog(changelog) {
  const flatChangelog = [];
  for (const changelogItem of changelog) {
    const { components } = changelogItem;
    components.forEach(({ name, version, changes }) => {
      const existingComponentIndex = flatChangelog.findIndex((comp) => comp.component === name);
      if (existingComponentIndex === -1) {
        flatChangelog.push({ component: name, version, changes });
      } else {
        const existingComponent = flatChangelog[existingComponentIndex];
        existingComponent.changes = [...existingComponent.changes, ...changes];
      }
    });
  }
  return flatChangelog.map((comp) => ({ ...comp, changes: groupChangesByType(comp.changes) }));
}

function groupChangesByType(changes) {
  const res = [];
  for (const changesItem of changes) {
    const { type, data } = changesItem;
    const existingTypeIndex = res.findIndex((item) => item.type === type);
    if (existingTypeIndex === -1) {
      res.push({ type, data: [data] });
    } else {
      const existingType = res[existingTypeIndex];
      existingType.data = [...existingType.data, data];
    }
  }
  return res;
}

function getFormattedDatePeriod(start, end) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const startDateFormat = startDate.get('month') === endDate.get('month') ? 'DD' : 'DD MMMM';
  const endDateFormat = 'DD MMMM YYYY';
  return [startDate.format(startDateFormat), endDate.format(endDateFormat)];
}

function createMessage(start, end, text) {
  if (!text) return null;
  const [startDate, endDate] = getFormattedDatePeriod(start, end);
  return {
    attachments: [
      {
        mrkdwn: true,
        title: `:whale: Semcore updates from ${startDate} to ${endDate}`,
        text,
      },
    ],
  };
}

function postMessage(urls, data) {
  if (!data) return Promise.resolve(false);
  return Promise.all(
    urls.map((url) =>
      axios({
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        data,
        url,
      }),
    ),
  );
}
