import figma from '@figma/code-connect';
import WidgetEmpty, { NoData, Error, getIconPath } from '@semcore/ui/widget-empty';
import { Box } from '@semcore/ui/base-components';

// Mappings for Illustration component?

figma.connect(
    NoData,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-302929&t=7CEXrbu9XEfMUFlr-11', {
    variant: { 'case': 'No data' },

    example: () => (
        <NoData />
    ),
},
);

figma.connect(
    Error,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-302929&t=7CEXrbu9XEfMUFlr-11', {
    variant: { 'case': 'Error (we know about)' },
    props: {
        actions: figma.children('Button'),
    },

    example: ({ actions }) => (
        <Error>
            <Box mt={4}>
                {actions}
            </Box>
        </Error>
    ),
},
);

figma.connect(
    Error,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-302929&t=7CEXrbu9XEfMUFlr-11', {
    variant: { 'case': 'Error (we do not know about)' },
    props: {
        actions: figma.children('Button'),
    },

    example: ({ actions }) => (
        <Error description={(
            <>
              Try again later. If the problem persists,
              {' '}
              <Link href='https://www.semrush.com/company/contacts/'>contact our support</Link>
            </>
          )}>
            <Box mt={4}>
                {actions}
            </Box>
        </Error>
    ),
},
);

figma.connect(
    WidgetEmpty,
    'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-302929&t=7CEXrbu9XEfMUFlr-11', {
    variant: { 'case': 'Custom' },
    props: {
        title: figma.textContent('↳ title'),
        description: figma.textContent('↳ description'),
        actions: figma.children('Button'),
    },
    example: ({ title, description, actions }) => (
    <WidgetEmpty icon={getIconPath(/* Specify illustration type, for example, 'nothing-found' */)}>
        <WidgetEmpty.Title>{title}</WidgetEmpty.Title>
        <WidgetEmpty.Description>{description}</WidgetEmpty.Description>
        <Box mt={4}>
            {actions}
        </Box>
    </WidgetEmpty>
    ),
},
);