import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ scores, refreshScoresAction, sortType, changeSortTypeAction }) => {
  return <div className='Scoreboard'>
    <button className='Button' onClick={refreshScoresAction}>Refresh</button>
    <button className='Button' onClick={changeSortTypeAction}>Sort by {sortType}</button>
    <div className='ScoreList'>
      {scores.map(({ name, score }) => {
        return <div className='ScoreItem'>
          <div className='NameField'>{name}</div><div className='ScoreField'>{score}</div>
        </div>
      })}
    </div>
  </div>
};

export default Scoreboard;