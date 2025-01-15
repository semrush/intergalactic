
import React from 'react';
import WidgetEmpty, { NoData, getIconPath } from '@semcore/widget-empty';
import FileExportM from '@semcore/icon/FileExport/m';
import { Hint } from '@semcore/tooltip';
import Button, { ButtonLink } from '@semcore/button';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {

    return (
     
        <Flex direction="row" gap={6} alignItems="flex-start" wrap="wrap" justifyContent="space-between">
            <Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    <WidgetEmpty.Title>Icon, title, description and button. Set up your [Tool Name]</WidgetEmpty.Title>
                    <WidgetEmpty.Description>
                        [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                    </WidgetEmpty.Description>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>

                <WidgetEmpty icon={getIconPath('line-chart')}>
                    <WidgetEmpty.Description>
                        Icon, description and button. [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                    </WidgetEmpty.Description>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>


                <WidgetEmpty>
                    <WidgetEmpty.Description>
                        Description and button. [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                    </WidgetEmpty.Description>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>
</Box>
<Box style={{ flex: '1 1 45%', minWidth: '45%' }}>
                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    <WidgetEmpty.Title>
                        [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                    </WidgetEmpty.Title>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>


                <WidgetEmpty>
                    <WidgetEmpty.Title>
                        [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                    </WidgetEmpty.Title>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>

                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    Icon, text and button.
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>

                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    <Box mt={4}>
                        <Button theme='success' use='primary'>
                            Set up [Tool Name]
                        </Button>
                    </Box>
                </WidgetEmpty>
</Box>
            </Flex>
     
    );
};

export default Demo;
