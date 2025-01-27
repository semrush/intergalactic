import React from 'react';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
    const styleBox = {
        border: '1px solid',
        background: '#ccc',
    };

    return (
        <div>
            <Box inline style={styleBox}>
                No m/p
            </Box>
            <Box inline style={styleBox} m={5} p={10}>
                m={10} p={5}
            </Box>
            <Box inline style={styleBox} mr={5} ml={5} mt={10} mb={10}>
                mr={5} ml={5}
            </Box>

            <Box inline style={styleBox} pt={10} pr={5} pb={10} pl={5}>
                pt={10}  pr={5} pb={10}  pl={5}
            </Box>

            <Box inline style={styleBox} mx={10}>
                mx={10}
            </Box>

            <Box inline style={styleBox} my={10}>
                my={10}
            </Box>

            <Box inline style={styleBox} px={10}>
                px={10}
            </Box>

            <Box inline style={styleBox} py={10}>
                py={10}
            </Box>

            <Box inline scaleIndent={4} style={styleBox} py={10}>
                py={10}
            </Box>

        </div>
    );
};

export default Demo;


