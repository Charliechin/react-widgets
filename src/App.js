import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate'
import Route from './components/Route';
import Header from './components/Header';
import LearnWrite from './components/LearnWrite';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front-end Javascript Framework'
  },
  {
    title: 'What use React?',
    content: 'React is a favorite JS library among engineers'
  },
  {
    title: 'How do you use React?',
    content: 'You use React by  creating components'
  }
]
const options = [
  {
    label: 'The color red',
    value: 'red',
  },
  {
    label: 'The color green',
    value: 'green'
  }]

// const dummyData = [
//   { title: "NES" },
//   { title: "Super Nintendo" },
//   { title: "Nintendo 64" },
//   { title: "Game Cube" }
// ]


export default () => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div>
      <Header />
      <Route path="/" >
        <Accordion items={items} />
      </Route>

      <Route path="/list" >
        <Search />
      </Route>
      <Route path="/dropdown" >
        <Dropdown
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected} />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
      <Route path="/learnwrite">
        <LearnWrite />
      </Route>
    </div >
  )
}