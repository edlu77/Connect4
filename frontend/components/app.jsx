import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GameContainer from './game_container';

const App = () => {
  return (
    <div className="site-content">
      <header className="header">
      </header>
      <div className="content-main">
        <GameContainer />
      </div>
    </div>
  );
};

export default App;
