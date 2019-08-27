import React from 'react';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", gameName: "", numplayers: "", board: this.props.board, time: Date.now()}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.refresh = this.refresh.bind(this);
    setInterval(() => {this.refresh()}, 500);
  };

  handleSubmit(e) {
    e.preventDefault();
    const info = {name: this.state.gameName, user: this.state.username, numplayers: this.state.numplayers};
    this.props.createGame(info);
  }

  handleRestart(e) {
    e.preventDefault();
    const info = {name: this.state.gameName, user: this.state.username, numplayers: this.state.numplayers};
    if (this.props.status === "won") {
      this.props.deleteGame(info)
      this.props.createGame(info)
    }
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (Date.now()-this.state.time < 500 || this.state.username != this.props.currentPlayer || this.props.status === "won" || this.props.status === "waiting") {
      return
    }
    const column = e.target.outerHTML[15];
    if (this.props.board[0][parseInt(column)] != " ") {
      return
    }
    if (this.props.currentPlayer === this.state.username) {
      const info = {name: this.state.gameName, column: column, numplayers: this.state.numplayers, currentPlayer: this.state.username};
      this.props.updateGame(info);
      this.setState({time: Date.now()})
    }
  }

  refresh(e) {
    if (this.props.status === "waiting" || this.props.status === "play" || this.props.status === "won") {
      const info = {name: this.state.gameName, user: this.state.username, numplayers: this.state.numplayers};
      this.props.createGame(info);
    }
  }

  render () {
    const playerColor = this.props.currentPlayer === this.props.currentPlayers[0] ? "red" : "blue"
    const renderedBoard = this.props.board.map((row, idx) => {
      let colors = [];
      for (let i = 0; i < row.length; i++) {
        if (row[i] === "x") {
          colors.push("red")
        } else if (row[i] === "o") {
          colors.push("blue")
        } else {
          colors.push("white")
        }
      };

      return (
        <div className="row" key={idx}>
          <div className={`row0 ${colors[0]}`} onClick={this.handleClick}>
          </div>
          <div className={`row1 ${colors[1]}`} onClick={this.handleClick}>
          </div>
          <div className={`row2 ${colors[2]}`} onClick={this.handleClick}>
          </div>
          <div className={`row3 ${colors[3]}`} onClick={this.handleClick}>
          </div>
          <div className={`row4 ${colors[4]}`} onClick={this.handleClick}>
          </div>
          <div className={`row5 ${colors[5]}`} onClick={this.handleClick}>
          </div>
          <div className={`row6 ${colors[6]}`} onClick={this.handleClick}>
          </div>
        </div>
      )
    })

    if (this.props.status === "making game") {
      return (
        <form className='loginform'>
          <input type="username-input"
            value={this.state.username}
            onChange={this.update('username')}
            className="username-input"
            placeholder="Username"
          />
          <input type="gamename-input"
            value={this.state.gameName}
            onChange={this.update('gameName')}
            className="gamename-input"
            placeholder="Game name"
          />
          <input type="numplayers-input"
            value={this.state.numplayers}
            onChange={this.update('numplayers')}
            className="numplayers-input"
            placeholder="1 or 2 players?"
          />
        <button className="info-submit" onClick={this.handleSubmit}>Submit</button>
        </form>
      )
    }

    if (this.props.status === "waiting") {
      return (
        <div>
          <h1 className="gamename">
            {this.state.gameName}
          </h1>
          <div className="statuspanel">
            Waiting for Player 2...
          </div>
          <div className="gameboard">
            {renderedBoard}
          </div>
        </div>
      )
    }

    if (this.props.status === "won") {
      return (
        <div>
          <h1 className="gamename">
            {this.state.gameName}
          </h1>
          <div className="statuspanel">
            {this.props.currentPlayer} wins!
            <button onClick={this.handleRestart}>
              New Game
            </button>
          </div>
          <div className="gameboard">
            {renderedBoard}
          </div>
        </div>
      )
    }

    return (
      <div className="gamearea">
        <h1 className="gamename">
          {this.state.gameName}
        </h1>
        <div className="statuspanel">
          {this.props.currentPlayer}'s turn ({playerColor})
        </div>
        <div className="gameboard">
          {renderedBoard}
        </div>
      </div>
    );
  };
};

export default Game;
