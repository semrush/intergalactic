import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import { Flex } from '@semcore/flex-box';

const loremSting =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus\n' +
  '          facere iste praesentium quae quia repudiandae tempore! Assumenda\n' +
  '          consequatur cum ducimus, fuga incidunt necessitatibus nulla odit\n' +
  '          placeat praesentium quidem rerum vero? Lorem ipsum dolor sit amet,\n' +
  '          consectetur adipisicing elit. Ducimus facere iste praesentium quae\n' +
  '          quia repudiandae tempore';

class Demo extends React.PureComponent {
  state = { visible: false };
  onVisibleChange = (visible) => this.setState({ visible });
  openModal = () => this.onVisibleChange(true);
  closeModal = () => this.onVisibleChange(false);

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button use="primary" onClick={this.openModal}>
          Открыть окно
        </Button>
        <Modal visible={visible} onClose={this.closeModal} w={500}>
          <div style={{ fontSize: '16px' }}>
            {Array(6)
              .fill()
              .map(() => loremSting)}

            <Flex justifyContent="center" mt={8}>
              <Button use="primary" theme="success" size="l" onClick={this.closeModal}>
                Got it!
              </Button>
            </Flex>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Demo;
