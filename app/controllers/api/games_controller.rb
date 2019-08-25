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
      @game.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]
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
    @game.board[2][params[:game][:row].to_i] = 1
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

  private

  def game_params
    params.require(:game).permit(:name)
  end

end
