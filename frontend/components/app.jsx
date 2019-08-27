import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GameContainer from './game_container';

const App = () => {
  return (
    <div className="site-content">
      <header className="header">
        CONNECT 4 by Edward Lu
      </header>
      <GameContainer />
    </div>
  );
};

export default App;
