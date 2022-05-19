import React from 'react';
import styled from 'styled-components';
import Modal from '@semcore/modal';

const ImageContainer = styled.div`
  img {
    width: 100%;
  }
`;

function ImageFromModal({ content, ...other }) {
  return (
    <Modal visible={!!content} {...other}>
      <ImageContainer dangerouslySetInnerHTML={{ __html: content }} />
    </Modal>
  );
}

export default ImageFromModal;
