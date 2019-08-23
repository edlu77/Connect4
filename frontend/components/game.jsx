import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", gameName: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    const game = {name: this.state.gameName};
    this.props.createGame(game);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }


  render () {
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
      </div>
    );
  };
};

export default Game;
