import axios from 'axios';
import { sendMessage } from './sendMessage';

export const notifyTeamAboutStandup = async ({ dryRun }: { dryRun: boolean }) => {
  const { data } = await axios.get('https://meme-api.herokuapp.com/gimme/ProgrammerHumor/50');
  const { memes } = data;

  memes.sort((memeA, memeB) => memeB.ups - memeA.ups);
  const safeMemes = memes.filter((meme) => !meme.nsfw && !meme.spoiler);
  const bestMemes = safeMemes.slice(0, 10);
  const pickedOne = bestMemes[Math.floor(Math.random() * bestMemes.length)];

  const thumb = pickedOne.preview[0];
  const full = pickedOne.preview[pickedOne.preview.length - 1];

  return await sendMessage({
    title: 'Daily standup!',
    body: `Write what you have done the previous working day and your plans for today in the thread\n_${pickedOne.title}_`,
    dryRun,
    image: { thumb, full },
  });
};
