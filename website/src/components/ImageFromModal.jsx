import React from 'react';
import Modal from '@semcore/modal';
import styles from './ImageFromModal.module.css';

function ImageFromModal({ content, ...other }) {
  return (
    <Modal visible={!!content} {...other}>
      <div src={styles.imageContainer} dangerouslySetInnerHTML={{ __html: content }} role="img" />
    </Modal>
  );
}

export default ImageFromModal;
