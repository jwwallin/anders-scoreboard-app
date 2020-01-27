import React, { useState, useEffect } from 'react';
import './App.css';
import Scoreboard from './Scoreboard.js';
import AddScoreForm from './AddScoreForm.js';

function App() {
  const backendAddress = "http://localhost:8000/";
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

  const refreshScores = () => {
    window.fetch(backendAddress)
      .then(response => response.json())
      .then(data => setScores(data.sort((a, b) => {
        if (sortType === 'Score') {
          return b.score - a.score;
        } else {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        }
      })))
      .catch(err => {
        alert("Data fetching failed.", err);
      });
  }

  const addScore = (name, score) => {
    window.fetch(backendAddress, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, score: score }),
    }).then(() =>
      refreshScores());

  }

  useEffect(refreshScores, []);

  return (
    <div>
      <header className="App-header" />
      <div className="App">
        <Scoreboard scores={scores} refreshScoresAction={refreshScores} sortType={sortType} changeSortTypeAction={changeSortType} />
        <AddScoreForm addScoreAction={addScore} />
      </div>
      <footer className="App-footer" />
    </div>
  );
}

export default App;
