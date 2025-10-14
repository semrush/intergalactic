import { ScrollArea } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import Wizard from '@semcore/ui/wizard';
import React from 'react';

export const Demo = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <Wizard
      visible
      step={1}
      w={500}
      h={400}
      closable={isLoading ? false : true}
    >
      <Wizard.Sidebar title='Site Audit Settings'>
        <Wizard.Stepper step={1} disabled={isLoading ? true : false}>
          Step 1
        </Wizard.Stepper>
      </Wizard.Sidebar>
      <Wizard.Content>
        <Wizard.Step step={1}>
          <ScrollArea hMax={320} shadow observeParentSize>
            <Button onClick={() => alert('Button')}>Click me</Button>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            incidunt qui, dolorem obcaecati, nesciunt consequuntur laudantium ab
            repellat id corporis alias, maxime quisquam culpa libero molestias
            sint sed commodi molestiae! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sequi incidunt qui, dolorem obcaecati, nesciunt
            consequuntur laudantium ab repellat id corporis alias, maxime
            quisquam culpa libero molestias sint sed commodi molestiae! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Sequi incidunt
            qui, dolorem obcaecati, nesciunt consequuntur laudantium ab repellat
            id corporis alias, maxime quisquam culpa libero molestias sint sed
            commodi molestiae! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sequi incidunt qui, dolorem obcaecati, nesciunt
            consequuntur laudantium ab repellat id corporis alias, maxime
            quisquam culpa libero molestias sint sed commodi molestiae! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Sequi incidunt
            qui, dolorem obcaecati, nesciunt consequuntur laudantium ab repellat
            id corporis alias, maxime quisquam culpa libero molestias sint sed
            commodi molestiae!
          </ScrollArea>
        </Wizard.Step>
      </Wizard.Content>
    </Wizard>
  );
};
export default () => <Demo />;
