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
    const column = e.target.outerHTML[15];
    const info = {name: this.state.gameName, column: column};
    this.props.updateGame(info);
  }


  render () {
    const renderedBoard = this.props.board.map((col) => {
      return (
        <div className="col">
          <div className="col0" onClick={this.handleClick}>
            [ {col[0]} ]
          </div>
          <div className="col1" onClick={this.handleClick}>
            [ {col[1]} ]
          </div>
          <div className="col2" onClick={this.handleClick}>
            [ {col[2]} ]
          </div>
          <div className="col3" onClick={this.handleClick}>
            [ {col[3]} ]
          </div>
          <div className="col4" onClick={this.handleClick}>
            [ {col[4]} ]
          </div>
          <div className="col5" onClick={this.handleClick}>
            [ {col[5]} ]
          </div>
          <div className="col6" onClick={this.handleClick}>
            [ {col[6]} ]
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
