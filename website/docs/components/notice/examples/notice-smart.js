import React from 'react';
import { NoticeSmart } from '@semcore/notice';
import QuestionAltS from '@semcore/icon/Question/m';

const message = 'The reports are based on the data from the Russia Federation and CIS.';

class Demo extends React.PureComponent {
  state = {
    message,
  };

  show = () => {
    setTimeout(() => {
      this.changeText(message);
    }, 2000);
  };

  close = () => {
    this.show();
    this.changeText(null);
  };

  changeText = (message) => {
    this.setState({ message });
  };

  render() {
    const { message } = this.state;
    return (
      <NoticeSmart closable label={<QuestionAltS />} onClose={this.close} hidden={!message}>
        {message}
      </NoticeSmart>
    );
  }
}

export default Demo;
