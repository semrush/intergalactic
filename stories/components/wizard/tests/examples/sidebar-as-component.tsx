import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import Wizard from '@semcore/ui/wizard';
import type { NSWizard } from '@semcore/ui/wizard';
import React from 'react';

import { WizardSidebar } from './components/WizardSidebar';

const steps = [{ title: 'Location' }, { title: 'Keywords' }, { title: 'Schedule' }];

const Demo = (props: NSWizard.Content.Props) => {
  const [step, setStep] = React.useState<number>(1);
  const [visible, setVisible] = React.useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <Button onClick={handleOpen}>Open wizard</Button>
      <Wizard visible={visible} step={step} w={600} onClose={handleClose}>
        <WizardSidebar step={step} setStep={setStep} />

        <Wizard.Content tag={Flex} direction='column' justifyContent='space-between' noSidebar={props.noSidebar}>
          {steps.map((s, i) => (
            <Wizard.Step key={s.title} step={i + 1}>
              <Wizard.StepTitle>
                {s.title}
              </Wizard.StepTitle>
            </Wizard.Step>
          ))}

          <Flex mt={5}>
            {step > 1 && (
              <Wizard.StepBack
                onActive={() => setStep(step - 1)}
                stepName={steps[step - 2].title}
              />
            )}
            {step !== steps.length && (
              <Wizard.StepNext
                ml='auto'
                onActive={() => setStep(step + 1)}
                stepName={steps[step].title}
              />
            )}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
};

export const defaultExampleNoSideBarProps: NSWizard.Content.Props = {
  noSidebar: false,
};

Demo.defaultProps = defaultExampleNoSideBarProps;

export default Demo;
