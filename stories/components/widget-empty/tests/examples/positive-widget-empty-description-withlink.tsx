
import React from 'react';
import WidgetEmpty, { NoData, getIconPath } from '@semcore/widget-empty';
import FileExportM from '@semcore/icon/FileExport/m';
import { Hint } from '@semcore/tooltip';
import Button, { ButtonLink } from '@semcore/button';
import Link from '@semcore/link';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {

    return (
        <div>
            <Flex direction={'column'} gap={6} alignItems={'flex-start'}>

              

                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    <WidgetEmpty.Description>
                        Icon, description and link. [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                        <Link>
                            Set up [Tool Name]
                        </Link>
                    </WidgetEmpty.Description>
                        
                </WidgetEmpty>

                <WidgetEmpty icon={getIconPath('combined-chart')}>
                    <WidgetEmpty.Description>
                        Icon, description and button link. [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                        <ButtonLink>
                            Set up [Tool Name]
                        </ButtonLink>
                    </WidgetEmpty.Description>
                        
                </WidgetEmpty>

                <WidgetEmpty>
                    <WidgetEmpty.Description>
                        description and button link. [Tool Name] allows you to get daily updates on positions in Google's top 100 organic
                        and paid search results.
                        <ButtonLink>
                            Set up [Tool Name]
                        </ButtonLink>
                    </WidgetEmpty.Description>
                        
                </WidgetEmpty>


            </Flex>
        </div>
    );
};

export default Demo;
