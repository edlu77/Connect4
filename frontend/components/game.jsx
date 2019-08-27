import React from 'react';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: "", gameName: "", numplayers: "", board: this.props.board}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refresh = this.refresh.bind(this);
    setInterval(() => {this.refresh()}, 500);
  };

  handleSubmit(e) {
    e.preventDefault();
    const info = {name: this.state.gameName, user: this.state.username, numplayers: this.state.numplayers};
    this.props.createGame(info);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.username != this.props.currentPlayer || this.props.status === "won") {
      return
    }
    const column = e.target.outerHTML[15];
    if (this.props.board[0][parseInt(column)] != " ") {
      return
    }
    if (this.props.currentPlayer === this.state.username) {
      const info = {name: this.state.gameName, column: column, numplayers: this.state.numplayers};
      this.props.updateGame(info);
    }
  }

  refresh(e) {
    if (this.props.status === "waiting" || this.props.status === "play") {
      const info = {name: this.state.gameName, user: this.state.username, numplayers: this.state.numplayers};
      this.props.createGame(info);
    }
  }

  render () {
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
            {row[0]}
          </div>
          <div className={`row1 ${colors[1]}`} onClick={this.handleClick}>
            {row[1]}
          </div>
          <div className={`row2 ${colors[2]}`} onClick={this.handleClick}>
            {row[2]}
          </div>
          <div className={`row3 ${colors[3]}`} onClick={this.handleClick}>
            {row[3]}
          </div>
          <div className={`row4 ${colors[4]}`} onClick={this.handleClick}>
            {row[4]}
          </div>
          <div className={`row5 ${colors[5]}`} onClick={this.handleClick}>
            {row[5]}
          </div>
          <div className={`row6 ${colors[6]}`} onClick={this.handleClick}>
            {row[6]}
          </div>
        </div>
      )
    })

    if (this.props.status === "won") {
      return (
        <div>
          <div>
            {this.props.currentPlayer} wins!
          </div>
          {renderedBoard}
        </div>
      )
    }

    return (
      <div className="gamearea">
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
          <input type="numplayers"
            value={this.state.numplayers}
            onChange={this.update('numplayers')}
            className="numplayers-input"
            placeholder="1 or 2 players?"
          />
        <input className="info-submit" type="submit" value="Submit" />
        </form>

        <div>
          {this.props.currentPlayer}'s turn
        </div>
        {renderedBoard}
      </div>
    );
  };
};

export default Game;
