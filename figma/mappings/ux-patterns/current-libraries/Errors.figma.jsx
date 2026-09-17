import figma from '@figma/code-connect/react';
import Error, { AccessDenied, Maintenance, PageError, PageNotFound, ProjectNotFound, getIconPath } from '@semcore/ui/errors';

figma.connect(
  PageNotFound,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    variant: { type: '404: We got lost' },
  },
);

figma.connect(
  AccessDenied,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    variant: { type: 'AccessDenied (Secret page)' },
  },
);

figma.connect(
  ProjectNotFound,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    variant: { type: '404: Project not found' },
  },
);

figma.connect(
  Maintenance,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    variant: { type: 'Under maintenance' },
    example: () => <Maintenance toolName={toolname} />,
  },
);

figma.connect(
  PageError,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    variant: { type: '500: Smth wrong - Try again' },
  },
);

figma.connect(
  Error,
  'https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788',
  {
    example: () => (
      <Error icon={getIconPath({ illustrationName })}>
        <Error.Title>{errorTitle}</Error.Title>
        <Error.Description>{errorDescription}</Error.Description>
        <Error.Controls>{errorControls}</Error.Controls>
      </Error>
    ),
  },
);
