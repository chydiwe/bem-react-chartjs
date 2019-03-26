import React, {Fragment} from 'react';
import {decl} from 'bem-react-core';

import Button from "e:Button"

export default decl({
  block: 'ButtonsPanel',
  tag: 'div',
  mods({ size, type }) {
    return { size, type };
  },
  content({

            getDataForDay,
            getDataForMonth,
            getDataForYear,
            changeMonthIfEnd,
            currentMonth, currentDay,currentYear
          }) {
    return (
      <Fragment>
        <Button elem="Button" tag="button" text="Предыдущий день" func={() => getDataForDay(currentDay - 1)}/>
        <Button elem="Button" tag="button" text="Следующий день" func={() => getDataForDay(currentDay + 1)}/>
        <Button elem="Button" tag="button" text="Предыдущий месяц"
                func={()=>getDataForMonth(currentMonth - 1)}/>
        <Button elem="Button" tag="button" text="Следующий месяц"
                func={() => getDataForMonth(currentMonth + 1)}/>
        <Button elem="Button" tag="button" text="Предыдущий год"
                func={()=>getDataForYear(currentYear - 1)}/>
        <Button elem="Button" tag="button" text="Следующий год"
                func={() => getDataForYear(currentYear + 1)}/>
        <Button elem="Button" tag="button" text="Почасовая статистика" func={() => getDataForDay(currentDay)}/>
        <Button elem="Button" tag="button" text="Подневная статистика" func={() => getDataForMonth(currentMonth)}/>
        <Button elem="Button" tag="button" text="Помесячная статистика" func={() => getDataForYear(0)}/>

      </Fragment>
    );
  }
});
