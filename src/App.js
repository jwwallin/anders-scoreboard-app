import React, { useState } from 'react';
import './App.css';
import Scoreboard from './Scoreboard.js'
import AddScoreForm from './AddScoreForm.js'

function App() {
  const [scores, setScores] = useState([]);
  const [sortType, setSortType] = useState('Score');

  const changeSortType = () => {
    var sort = sortType === 'Score' ? 'Name' : 'Score'
    setSortType(sort);
    setScores(scores.sort((a, b) => {
      if (sort === 'Score') {
        return b.score - a.score;
      } else {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      }
    }))
  }

  const addScore = (name, score) => {
    const arr = [...scores, { name: name, score: score }];
    setScores(arr);
  }

  return (
    <div className="App">
      <header className="App-header" />
      <Scoreboard scores={scores} sortType={sortType} changeSortTypeAction={changeSortType} />
      <AddScoreForm addScoreAction={addScore} />
      <footer className="App-footer" />
    </div>
  );
}

const initScores = [
  { name: 'AAA', score: 123 },
  { name: 'BBB', score: 234 },
  { name: 'CCC', score: 345 },
]

export default App;
