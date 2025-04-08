import React from 'react';
import ColorPicker, { PaletteManager } from '@semcore/color-picker';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
    const [value, setValue] = React.useState('#98848D');
    const [customColors, setCustomColors] = React.useState(['#8649E6', '#8649E7', '#8649E8']);

    return (
        <Flex gap={5} flexWrap>

            <ColorPicker value={value} onChange={setValue}>
                <ColorPicker.Trigger mt={2} id="player-1-color" />
                <ColorPicker.Popper>
                    <ColorPicker.Colors
                        colors={[
                            null,
                            '#8649E1',
                            '#FF5733',
                            '#27D3E7',
                            '#2D747C',
                            '#6ad0de',
                            '#6E2D7C',
                        ]}
                    />
                    <PaletteManager
                        w={200}
                        wMax={300}
                        colors={customColors}
                        defaultColors={['#00FF00', '#0000FF']} // опционально, можно убрать, если не нужно
                        onColorsChange={(newColors, event) => {
                            console.log('Updated palette:', newColors);
                            setCustomColors(newColors);
                        }}
                    >
                        <PaletteManager.Colors />
                        <PaletteManager.InputColor />
                    </PaletteManager>
                </ColorPicker.Popper>
            </ColorPicker>

            <Flex gap={5} flexWrap>

                <ColorPicker value={value} onChange={setValue}>
                    <ColorPicker.Trigger mt={2} id="player-1-color" />
                    <ColorPicker.Popper>
                        <ColorPicker.Colors
                            colors={[
                                null,
                                '#8649E1',
                                '#FF5733',
                                '#98848D',
                                '#8E3B29',
                                '#B0E727',
                                '#27D3E7',
                                '#2D747C',
                                '#6ad0de',
                                '#6E2D7C',
                            ]}
                        />
                        <PaletteManager
                            w={500}
                            h={500}
                            defaultColors={['#00FF00', '#0000FF']} // опционально, можно убрать, если не нужно
                            onColorsChange={(newColors, event) => {
                                console.log('Updated palette:', newColors);
                                setCustomColors(newColors);
                            }}
                        >
                            <PaletteManager.Colors />
                            <PaletteManager.InputColor />
                        </PaletteManager>
                    </ColorPicker.Popper>
                </ColorPicker>
            </Flex>
        </Flex>
    );
};

export default Demo;
