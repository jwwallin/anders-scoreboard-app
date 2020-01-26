import React, { useState } from 'react';
import './AddScoreForm.css';

const AddScoreForm = ({ addScoreAction }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  return <div className='AddScoreForm'>
    Add Score:<br />
    <label>
      Name:
          <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
    </label>
    <label>
      Score:
          <input type="text" value={score} onChange={(event) => { setScore(event.target.value) }} />
    </label>
    <input type="submit" value="Submit" onClick={() => {
      setName('');
      setScore('');
      addScoreAction(JSON.parse(JSON.stringify(name)), JSON.parse(JSON.stringify(score)));
    }} />
  </div >
};

export default AddScoreForm;