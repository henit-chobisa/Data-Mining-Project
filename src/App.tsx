import React from 'react';
import './App.css';
import TabBar from './Tabs';
import Wave from './Waveline';
// import WaveLine from './Waveline';

function App() {
  return (
    <div className="App">
      <div className='CenteredBox'>
        <TabBar/>
        <div className='questionText'>Tell us, How are you feeling today?</div>
        <Wave/>
        <div className='introLine'>We take responsiblity to find out what you feel and how you feel by analysing the patterns of your voice and deeply understanding your emotions, getting you covered for a perfect task scheduling environment, Welcome to the future of Task Scheduling</div>
      </div>
    </div>
  );
}

export default App;
