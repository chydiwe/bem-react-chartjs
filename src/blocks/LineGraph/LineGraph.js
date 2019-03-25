import React, {Fragment} from 'react';
import {Line} from 'react-chartjs-2';
import {decl} from 'bem-react-core';

import InfoBlock from 'e:InfoBlock'
import ButtonsPanel from 'b:ButtonsPanel'
import SelectPanel from 'b:SelectPanel'
import SetDay from 'b:SetDay'
function changeItemIfEnd(item, maxItem) {
  if (item > maxItem - 1)
    item = 0;
  if (item < 0)
    item = maxItem-1;
  return item
}

export default decl({
  block: 'LineGraph',
  tag: 'div',
  willInit() {
    this.state = {
      data: {
        labels: [],
        datasets: [{
          label: 'data',
          fill: false,
          data: [],

        }]
      },
      currentDay: 0,
      currentMonth: 0,
      currentYear:0,
      daysOnMonth: 30,
      monthName: '',
    };
    this.getDataForDay = this.getDataForDay.bind(this);
    this.getDataForMonth = this.getDataForMonth.bind(this);
    this.getDataForYear = this.getDataForYear.bind(this);
    this.getDaysOnMonth = this.getDaysOnMonth.bind(this);

  },

  getDaysOnMonth(month) {

    return fetch(`http://127.0.0.1:8001/data/days/${this.state.currentYear}/${month}`, {method: "GET"})
      .then(res => res.json()).then(res => {
        this.setState({daysOnMonth: res})
      })
  },
  getDataForDay(n) {
    n = changeItemIfEnd(n, this.state.daysOnMonth);
    fetch(`http://127.0.0.1:8001/data/day/${this.state.currentYear}/${this.state.currentMonth}/${n}`, {method: "GET"})
      .then(res => res.json()).then(
      res => {
        this.setState({
          monthName: Object.keys(res)[0],
          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,],
            datasets: [{
              label: "Data",
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(res)[0]
            }]
          },
          currentDay: n,
        })
      },
    )
  }
  , getDataForMonth(month) {
    month = changeItemIfEnd(month, 12);
    this.getDaysOnMonth(month).then(()=>fetch(`http://127.0.0.1:8001/data/month/${this.state.currentYear}/${month}`, {method: "GET"}))
      .then(res => res.json().then(res => {
          let labels = [];
          for (let i = 0; i < this.state.daysOnMonth; i++)
            labels.push(i + 1);
          this.setState({
            monthName: Object.keys(res)[0],
            data: {
              labels: labels,
              datasets: [{
                label: "Data",
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.values(res)[0]
              }]
            },
            currentMonth: month,
            currentDay: 0,
          })
        },
      ))


  },
  getDataForYear(year) {
    changeItemIfEnd(year,10);
    fetch(`http://127.0.0.1:8001/data/year/${year}`, {method: "GET"})
      .then(res => res.json()).then(
      res => {
        this.setState({
          monthName: Object.keys(res)[0],
          info: Object.values(res)[0],
          data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            datasets: [{
              label: "Data",
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: Object.values(res)[0].slice(0, 25)
            }]
          },
          currentDay: 0,
          currentYear: year,
        })
      },
    )
  },
  didMount() {
    this.getDaysOnMonth(this.state.currentMonth);
    this.getDataForDay(0);
  }
  ,


  content() {
    return (
      <Fragment>
        <ButtonsPanel getDataForDay={this.getDataForDay} getDataForMonth={this.getDataForMonth}
                      getDataForYear={this.getDataForYear} currentMonth={this.state.currentMonth}
                      currentDay={this.state.currentDay} currentYear={this.state.currentYear}/>
        <SelectPanel getDataForMonth={this.getDataForMonth}/>
        <InfoBlock text={`${2000+this.state.currentYear}  ${this.state.monthName} ${this.state.currentDay + 1}`}/>
        <SetDay daysOnMonth={this.state.daysOnMonth} getDataForDay={this.getDataForDay}/>
        <Line ref="chart" data={this.state.data}/>
      </Fragment>
    );
  }
  ,

})
