import React, {Fragment} from 'react';
import {Bem, decl} from 'bem-react-core';

export default decl({
  block: 'SelectPanel',
  tag: 'div',
  content({
            getDataForDay,
            getDataForMonth,

          }) {
    return (
      <Fragment>
        <Bem elem='p' tag="p">Выбор Месяца</Bem>
        <Bem tag='div' elem='dropdawn'> <Bem onClick={() => getDataForMonth(0)} tag='button' elem='ListEl'> Январь</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(1)}> Февраль</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(2)}> Март</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(3)}> Апрель</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(4)}> Май</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(5)}> Июнь</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(6)}> Июль</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(7)}> Август</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(8)}> Сентябрь</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(9)}>Октябрь</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(10)}> Ноябрь</Bem>
          <Bem tag='button' elem='ListEl' onClick={() => getDataForMonth(11)}>Декабрь</Bem>
        </Bem>

      </Fragment>
    );
  }
});
