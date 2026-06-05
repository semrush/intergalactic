import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function BasicUsageTest({ canvasElement }: { canvasElement: HTMLElement }) {
  const canvas = within(canvasElement);

  const expectSectionVisible = async (sectionNumber: number) => {
    await expect(await canvas.findByText(`This is section ${sectionNumber}`)).toBeVisible();
  };
  const expectSectionClosed = async (sectionNumber: number) => {
    await waitFor(() => {
      expect(canvas.queryByText(`This is section ${sectionNumber}`)).not.toBeInTheDocument();
    });
  };

  // Interactions by the mouse
  const section1 = await canvas.findByRole('button', { name: /section 1/i });
  const section2 = await canvas.findByRole('button', { name: /section 2/i });
  const section3 = await canvas.findByRole('button', { name: /section 3/i });

  await expectSectionVisible(1);

  await userEvent.click(section1);
  await expectSectionClosed(1);

  await userEvent.click(section2);
  await expectSectionVisible(2);
  expect(canvas.queryByText('This is section 1')).not.toBeInTheDocument();

  await userEvent.click(section1);
  await expectSectionVisible(1);
  await expectSectionVisible(2);

  await userEvent.click(section1);
  await userEvent.click(section2);
  await expectSectionClosed(1);
  await expectSectionClosed(2);

  await expect(section3).toHaveAttribute('disabled', '');
}
