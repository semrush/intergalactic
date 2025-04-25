import React from 'react';
import { DatePicker } from '@semcore/ui/date-picker';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = React.useState(new Date('2025-04-06'));
  const [displayedPeriod, setDisplayedPeriod] = React.useState(new Date('2025-04-01'));
  const [highlightedDates, setHighlightedDates] = React.useState([new Date('2025-04-10')]);

  // Пример: Функция, которая вызывается при попытке выбрать заблокированную дату
  const disabledErrorText = (attemptedDate: Date) => `Date ${attemptedDate.toDateString()} is disabled`;

  // Функция для изменения отображаемого месяца
  const handleDisplayedPeriodChange = (newDate: Date) => {
    setDisplayedPeriod(newDate);
  };

  return (
    <div>
      <DatePicker
        value={value} // Текущая выбранная дата
        onChange={(date: Date) => setValue(date)} // Обработчик выбора новой даты
        disabled={[new Date('2025-04-28'), new Date('2025-04-29')]} // Массив заблокированных дат
        disabledErrorText={disabledErrorText} // Сообщение об ошибке при попытке выбрать заблокированную дату
        displayedPeriod={displayedPeriod} // Отображаемый месяц
        onDisplayedPeriodChange={handleDisplayedPeriodChange} // Обработчик для изменения отображаемого месяца
        size="l" // Размер компонента (l - большой)
        highlighted={highlightedDates} // Массив выделенных дат
        defaultValue={new Date('2025-04-06')} // Значение по умолчанию
        defaultDisplayedPeriod={new Date('2025-03-01')} // Месяц по умолчанию
        defaultHighlighted={[new Date('2025-04-10')]} // Выделенные даты по умолчанию
      >
        <DatePicker.Trigger mt={2}>
          <DatePicker.Trigger.SingleDateInput>
            <DatePicker.Trigger.SingleDateInput.Indicator />
            <DatePicker.Trigger.SingleDateInput.MaskedInput id="trigger-and-popper-example-picker" />
          </DatePicker.Trigger.SingleDateInput>
        </DatePicker.Trigger>
        <DatePicker.Popper />
      </DatePicker>
    </div>
  );
};

export default Demo;
