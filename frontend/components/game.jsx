import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", gameName: "", board: this.props.board};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    const info = {name: this.state.gameName, user: this.state.username};
    this.props.createGame(info);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  handleClick(e) {
    e.preventDefault();
    const row = e.target.outerHTML[15];
    const info = {name: this.state.gameName, row: row};
    this.props.updateGame(info);
  }


  render () {
    const renderedBoard = this.props.board.map((row) => {
      return (
        <div className="row">
          <div className="row0" onClick={this.handleClick}>
            [ {row[0]} ]
          </div>
          <div className="row1" onClick={this.handleClick}>
            [ {row[1]} ]
          </div>
          <div className="row2" onClick={this.handleClick}>
            [ {row[2]} ]
          </div>
          <div className="row3" onClick={this.handleClick}>
            [ {row[3]} ]
          </div>
        </div>
      )
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit} className='login-form-box'>
          <input type="username"
            value={this.state.username}
            onChange={this.update('username')}
            className="username-input"
            placeholder="Username"
          />

          <input type="gamename"
            value={this.state.gameName}
            onChange={this.update('gameName')}
            className="gamename-input"
            placeholder="Game name"
          />

        <input className="info-submit" type="submit" value="Submit" />
        </form>
        {renderedBoard}
      </div>
    );
  };
};

export default Game;
