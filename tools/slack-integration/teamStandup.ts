import axios from 'axios';
import { sendMessage } from './sendMessage';

export const notifyTeamAboutStandup = async ({ dryRun }: { dryRun: boolean }) => {
  let title = 'Sad day 😢 No more memes';
  let image = {
    thumb: 'https://www.meme-arsenal.com/memes/b3c347c4c5fd766c336b2b6985d037c8.jpg',
    full: 'https://www.meme-arsenal.com/memes/b3c347c4c5fd766c336b2b6985d037c8.jpg',
  };
  try {
    const { data } = await axios.get('https://meme-api.herokuapp.com/gimme/ProgrammerHumor/50');
    const { memes } = data;

    memes.sort((memeA, memeB) => memeB.ups - memeA.ups);
    const safeMemes = memes.filter((meme) => !meme.nsfw && !meme.spoiler);
    const bestMemes = safeMemes.slice(0, 10);
    const pickedOne = bestMemes[Math.floor(Math.random() * bestMemes.length)];

    const thumb = pickedOne.preview[0];
    const full = pickedOne.preview[pickedOne.preview.length - 1];
    title = pickedOne.title;
    image = { thumb, full };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('API for memes', e);
  }

  return await sendMessage({
    title: 'Daily standup!',
    body: `Write what you have done the previous working day and your plans for today in the thread\n_${title}_`,
    dryRun,
    image,
  });
};
