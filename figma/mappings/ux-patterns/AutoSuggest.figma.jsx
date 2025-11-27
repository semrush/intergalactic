import figma from '@figma/code-connect/react';
import { Box } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import Select from '@semcore/ui/select';

figma.connect(
  Box,
  'https://www.figma.com/design/t7T1SLzIkERV1IrsjsKugE/-Refactoring-WIP--%F0%9F%92%A0-UX-Patterns?node-id=15049-258574&',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
    },
    example: ({ size }) => (
      <>
        <Box>
          <Select size={size}>
            <Select.Trigger>
              <Input.Value role='combobox' />
            </Select.Trigger>
            <Select.Menu>
              {/* Suggestions map here */}
            </Select.Menu>
          </Select>
        </Box>
      </>
    ) },
);
