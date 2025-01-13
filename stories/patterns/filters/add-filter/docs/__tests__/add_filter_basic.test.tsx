import { expect, userEvent, within } from '@storybook/test';

export async function BasicUsageTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  //Interactions by the mouse
  const addFilter = within(document.body).queryByText("Add filter");

  if (!(addFilter)) {
    throw new Error('Section 1 not found');
  }

 await userEvent.click(addFilter);
 await new Promise((resolve) => setTimeout(resolve, 500));
 const colorItem = within(document.body).getByRole('menuitem', { name: 'Color' });
 expect(colorItem).toBeVisible();
 await userEvent.click(colorItem);
 const colorOption = within(document.body).getByRole('option', { name: 'Blue' });
 expect(colorOption).toBeVisible();
 await userEvent.click(colorOption);
 const clearAll = within(document.body).queryByText("Clear filters");
 expect(clearAll).toBeVisible();

 await userEvent.click(addFilter);
 await new Promise((resolve) => setTimeout(resolve, 500));
 expect(colorItem).not.toBeVisible();
 const deviceItem = within(document.body).getByRole('menuitem', { name: 'Device' });
 await userEvent.click(deviceItem);
 const deviceOption = within(document.body).getByRole('option', { name: 'Phone' });
 expect(deviceOption).toBeVisible();
 await userEvent.click(deviceOption);

 await userEvent.click(addFilter);
 await new Promise((resolve) => setTimeout(resolve, 500));
 await new Promise((resolve) => setTimeout(resolve, 500));
 expect(deviceItem).not.toBeVisible();
 const languageItem = within(document.body).getByRole('menuitem', { name: 'Language' });
 await userEvent.click(languageItem);
 const languageOption = within(document.body).getByRole('option', { name: 'Spanish' });
 expect(languageOption).toBeVisible();
 await userEvent.click(languageOption);

 await userEvent.click(addFilter);
 await new Promise((resolve) => setTimeout(resolve, 500));
 expect(languageItem).not.toBeVisible();
 const materialItem = within(document.body).getByRole('menuitem', { name: 'Material' });
 await userEvent.click(materialItem);
 const materialOption = within(document.body).getByRole('option', { name: 'Glass' });
 expect(materialOption).toBeVisible();
 await userEvent.click(materialOption);

 await userEvent.click(addFilter);
 await new Promise((resolve) => setTimeout(resolve, 500));
 expect(languageItem).not.toBeVisible();
 const shapeItem = within(document.body).getByRole('menuitem', { name: 'Shape' });
 await userEvent.click(shapeItem);
 const shapeOption = within(document.body).getByRole('option', { name: 'Star' });
 expect(shapeOption).toBeVisible();
 await userEvent.click(shapeOption);
 
 expect(addFilter).not.toBeVisible();
}
