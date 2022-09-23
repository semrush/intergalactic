import React from 'react';
import Pills from '@semcore/pills';
import ThumbUpM from '@semcore/icon/ThumbUp/m';
import ThumbDownM from '@semcore/icon/ThumbDown/m';

export default () => {
  const [choice, setChoice] = React.useState(null);

  return (
    <Pills value={choice} onChange={setChoice}>
      <Pills.Item value={'like'}>
        <Pills.Item.Addon tag={ThumbUpM} />
        <Pills.Item.Text>Like</Pills.Item.Text>
      </Pills.Item>
      <Pills.Item value={null}>Don't care</Pills.Item>
      <Pills.Item value={'dislike'}>
        <Pills.Item.Addon tag={ThumbDownM} />
        <Pills.Item.Text>Dislike</Pills.Item.Text>
      </Pills.Item>
    </Pills>
  );
};
