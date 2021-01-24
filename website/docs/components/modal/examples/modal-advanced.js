import React from 'react';
import Modal from '@semcore/modal';
import Button from '@semcore/button';

const overlayStyles = { background: 'rgba(255, 147, 253, .75)' };
const closeStyles = {
  fontSize: '20px',
};

export default class Demo extends React.Component {
  state = {
    visible: false,
  };

  handleClose = () => this.setState({ visible: false });

  handleOpen = () => this.setState({ visible: true });

  render() {
    const { visible } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen}>Open modal</Button>
        <Modal visible={visible} closable={false} onClose={this.handleClose}>
          <Modal.Overlay style={overlayStyles}>
            <Modal.Window wMax="400px" px={5} py={2.5}>
              <Modal.Close style={closeStyles}>🦄</Modal.Close>
              <h1>Lorem Title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, autem blanditiis
                consectetur distinctio dolorem ducimus earum facere fuga laudantium magni odit
                officia porro provident quas quia sed sint voluptatum. Nesciunt!
              </p>
              <Button use="primary" theme="danger" onClick={this.handleClose}>
                Закройте меня!
              </Button>
            </Modal.Window>
          </Modal.Overlay>
        </Modal>
      </React.Fragment>
    );
  }
}
