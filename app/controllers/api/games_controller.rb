class Api::GamesController < ApplicationController
  attr_reader :current_player

  def create
    if Game.find_by_name(params[:game][:name])
      @game = Game.find_by_name(params[:game][:name])
      if @game.current_players.length == 2
        if @game.current_players.include?(params[:game][:user])
          render :show
        else
          render json: @game.errors.full_messages, status: 422
        end
      else
        if @game.current_players[0] != params[:game][:user]
          @game.current_players.push(params[:game][:user])
          @game.status = "play"
          @game.save
          render :show
        end
      end
    else
      @game = Game.new(game_params)
      @game.board = [[" ", " ", " ", " ", " ", " ", " "],[" ", " ", " ", " ", " ", " ", " "],[" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " "]]
      @game.current_players = [params[:game][:user]]
      @game.current_player = params[:game][:user]
      if params[:game][:numplayers] == "1"
        @game.current_players.push("CPU")
        @game.status = "play"
      else
        @game.status = "waiting"
      end
      if @game.save
        render :show
      else
        render json: @game.errors.full_messages, status: 422
      end
    end
  end

  def show
    @game = Game.find_by_name(params[:game][:name]) || {}
    render :show
  end

  def update
    @game = Game.find_by_name(params[:game][:name]) || {}
    if params[:game][:numplayers] == "2"
      # drop piece, check state of game
      if @game.current_player == @game.current_players[0]
        @game.board = self.drop_piece(@game.board, params[:game][:column].to_i, "x")
      else
        @game.board = self.drop_piece(@game.board, params[:game][:column].to_i, "o")
      end
      if self.won?(@game.board)
        @game.status = "won"
      else
        @game.current_player = self.next_player(@game.current_players, @game.current_player)
      end

    else
      @game.board = self.drop_piece(@game.board, params[:game][:column].to_i, "x")
      if self.won?(@game.board)
        @game.status = "won"
      else
        @game.board = self.drop_piece_cpu(@game.board, rand(7), "o")
        if self.won?(@game.board)
          @game.current_player = @game.current_players[1]
          @game.status = "won"
        end
      end
    end
    if @game.update(game_params)
      render :show
    end
  end

  def destroy
    @game = Game.find_by_name(params[:game][:name])
    if @game.destroy
      render :index
    else
      render json: @game.errors.full_messages, status: 422
    end
  end

  def next_player(players, current_player)
    if current_player == players[0]
      return players[1]
    else
      return players[0]
    end
  end

  def drop_piece(board, column, piece)
    for row in 0..5 do
      if board[5-row][column] == " "
        board[5-row][column] = piece
        return board
      end
    end
    board
  end

  def drop_piece_cpu(board, column, piece)
    for row in 0..5 do
      if board[5-row][column] == " "
        board[5-row][column] = piece
        return board
      end
    end
    return self.drop_piece_cpu(board, rand(7), piece)
  end

  def check_horizontal(board)
    for row in 0..5 do
      for col in 0..3 do
        if board[row][col] != ' ' && board[row][col] == board[row][col+1] && board[row][col] == board[row][col+2] && board[row][col] == board[row][col+3]
          # puts("winner(horizontal)" + player)
          return true
        end
      end
    end
    return false
  end

  def check_vertical(board)
    for col in 0..6 do
      for row in 0..2 do
        if board[row][col] != ' ' && board[row][col] == board[row+1][col] && board[row][col] == board[row+2][col] && board[row][col] == board[row+3][col]
          # puts("winner(vertical)" + player)
          return true
        end
      end
    end
    return false
  end

  def check_diag_down(board)
    for row in 0..2 do
      for col in 0..3 do
        if board[row][col] != ' ' && board[row][col] == board[row+1][col+1] && board[row][col] == board[row+2][col+2] && board[row][col] == board[row+3][col+3]
          # puts("winner(diag down)" + player)
          return true
        end
      end
    end
    return false
  end

  def check_diag_up(board)
    for row in 0..2 do
      for col in 3..6 do
        if board[row][col] != ' ' && board[row][col] == board[row+1][col-1] && board[row][col] == board[row+2][col-2] && board[row][col] == board[row+3][col-3]
          # puts("winner(diag up)" + player)
          return true
        end
      end
    end
    return false
  end

  def won?(board)
    if self.check_horizontal(board) || self.check_vertical(board) || self.check_diag_down(board) || self.check_diag_up(board)
      return true
    end
    false
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end


end
