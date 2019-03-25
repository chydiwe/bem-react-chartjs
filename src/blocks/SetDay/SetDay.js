import React, {Fragment} from 'react';
import {Bem, decl} from 'bem-react-core';

export default decl({
  block: 'SetDay',
  tag: 'div',
  willInit() {
    this.state = {numDay: ''};
    this.changeInput = this.changeInput.bind(this);
    this.setDay=this.setDay.bind(this);
  },
  changeInput(e) {
    this.setState({numDay: e.target.value})

  },
  setDay() {

    if(Number(this.state.numDay) && this.state.numDay<this.props.daysOnMonth && this.state.numDay>0)
      this.props.getDataForDay(Number(this.state.numDay)-1);
    else alert('Неправильный ввод')

  },
  content({
            getDataForDay,
            daysOnMonth,

          }) {
    return (
      <Fragment>
        <Bem tag='input' value={this.state.numDay} onChange={this.changeInput} elem='text'/>
        <Bem tag='button' elem='set' onClick={this.setDay}>Выбрать день</Bem>

      </Fragment>
    );
  }
})
;
