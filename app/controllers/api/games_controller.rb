class Api::GamesController < ApplicationController

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
        @game.current_players.push(params[:game][:user])
        @game.save
        render :show
      end
    else
      @game = Game.new(game_params)
      @game.board = [[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
      @game.current_players = [params[:game][:user]];
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
    # drop piece, check state of game
    @game.board = self.drop_piece(@game.board, params[:game][:column].to_i, "x")
    self.check_winner(@game.board)
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

  def drop_piece(board, column, current_player)
    for row in 0..5 do
      if board[5-row][column] == "0"
        board[5-row][column] = current_player
        return board
      end
    end
    board
  end

  def check_horizontal(board)
    for row in 0..5 do
      for col in 0..3 do
        if board[row][col] != '0' && board[row][col] == board[row][col+1] && board[row][col] == board[row][col+2] && board[row][col] == board[row][col+3]
          puts("winner(horizontal)")
          return true
        end
      end
    end
  end

  def check_vertical(board)
    for col in 0..6 do
      for row in 0..2 do
        if board[row][col] != '0' && board[row][col] == board[row+1][col] && board[row][col] == board[row+2][col] && board[row][col] == board[row+3][col]
          puts("winner(vertical)")
          return true
        end
      end
    end
  end

  def check_diag_down(board)
    for row in 0..2 do
      for col in 0..3 do
        if board[row][col] != '0' && board[row][col] == board[row+1][col+1] && board[row][col] == board[row+2][col+2] && board[row][col] == board[row+3][col+3]
          puts("winner(diag down)")
          return true
        end
      end
    end
  end

  def check_diag_up(board)
    for row in 0..2 do
      for col in 3..6 do
        if board[row][col] != '0' && board[row][col] == board[row+1][col-1] && board[row][col] == board[row+2][col-2] && board[row][col] == board[row+3][col-3]
          puts("winner(diag up)")
          return true
        end
      end
    end
  end

  def check_winner(board)
    self.check_horizontal(board)
    self.check_vertical(board)
    self.check_diag_down(board)
    self.check_diag_up(board)
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end


end
