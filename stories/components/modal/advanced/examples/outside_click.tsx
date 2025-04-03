import React from 'react';
import Button from '@semcore/button';
import Modal from '@semcore/modal';
import InlineEdit from '@semcore/inline-edit';
import InlineInput from '@semcore/inline-input';
import EditM from '@semcore/icon/Edit/m';
import FileExportM from '@semcore/icon/FileExport/m';
import Tooltip from '@semcore/tooltip';

const Demo = () => {
    const [visible, setVisible] = React.useState(false);
    const handleOpen = React.useCallback(() => setVisible(true), []);
    const handleClose = React.useCallback(() => setVisible(false), []);

    const [text, setText] = React.useState('Martin Eden');
    const [confirmedText, setConfirmedText] = React.useState(text);
    const [editable, setEditable] = React.useState(false);

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal visible={visible} onClose={handleClose}>
                <Modal.Title>Do you want to save your chasadengesdsds?</Modal.Title>

                <Tooltip
                    title='Default tooltip contains short text explaining something about the trigger.'
                    tag={Button}
                    aria-label='Export to PDF'
                    addonLeft={FileExportM}
                />

                <InlineEdit editable={editable} onEditableChange={setEditable}>
                    <InlineEdit.View style={{ display: 'flex', gap: 8, alignItems: 'center' }} pr={2}>
                        {text} <EditM color='icon-secondary-neutral' />
                    </InlineEdit.View>
                    <InlineEdit.Edit>
                        <InlineInput
                            onConfirm={() => {
                                setEditable(false);
                                setConfirmedText(text);
                            }}
                            onCancel={() => {
                                setText(confirmedText);
                                setEditable(false);
                            }}
                            onBlurBehavior={'confirm'}
                        >
                            <InlineInput.Value
                                autoFocus
                                value={text}
                                onChange={setText}
                                aria-labelledby='author-label'
                            />
                            <InlineInput.ConfirmControl />
                            <InlineInput.CancelControl />
                        </InlineInput>
                    </InlineEdit.Edit>
                </InlineEdit>


                <Button use='primary' theme='success' size='l' onClick={handleClose}>
                    Save changes
                </Button>
                <Button size='l' ml={2} onClick={handleClose}>
                    Don't save
                </Button>
            </Modal>
        </React.Fragment>
    );
};

export default Demo;
