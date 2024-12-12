import { expect, userEvent, within } from '@storybook/test';

export async function BasicUsageTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  //Interactions by the mouse
  const section1 = within(document.body).queryByText("Section 1");
  const section2 = within(document.body).queryByText("Section 2");
  const section3 = within(document.body).queryByText("Section 3");

  const subSection1 = within(document.body).queryByText("Hello Section 1");
  expect(subSection1).toBeVisible();
  if (!(section1)) {
    throw new Error('Section 1 not found');
  }

 await userEvent.click(section1);
 await new Promise((resolve) => setTimeout(resolve, 500));
 expect(subSection1).not.toBeVisible();
 if (!(section2)) {
    throw new Error('Section 2 not found');
  }
 await userEvent.click(section2);
 const subSection2 = within(document.body).queryByText("Hello Section 2");
 expect(subSection2).toBeVisible();
 expect(subSection1).not.toBeVisible();
 
 await userEvent.click(section1);
 await new Promise((resolve) => setTimeout(resolve, 1000));
 expect(subSection2).toBeVisible();
 expect(within(document.body).queryByText("Hello Section 1")).toBeVisible();

 await userEvent.click(section1);
 await userEvent.click(section2);
 await new Promise((resolve) => setTimeout(resolve, 1000));
 expect(subSection2).not.toBeVisible();
 expect(subSection1).not.toBeVisible();

 expect(section3).toHaveAttribute('disabled', '');

}
