import { expect, userEvent, within } from '@storybook/test';

export async function iconSize({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement);
  
   // Получаем все svg элементы на странице
   const svgs = Array.from(canvasElement.querySelectorAll('svg'));

  for (const svg of svgs) {
    const dataGroup = svg.getAttribute('data-group');

    // Если data-group="m", проверяем размеры
    if (dataGroup === 'm') {
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    }

    // Если data-group="l", проверяем размеры
    if (dataGroup === 'l') {
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    }
  }
}
