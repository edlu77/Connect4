class Api::GamesController < ApplicationController

  def create
    if Game.find_by_name(params[:game][:name])
      @game = Game.find_by_name(params[:game][:name])
      if @game.current_players.length == 2
        render json: @game.errors.full_messages, status: 422
      else
        @game.current_players = ["player1", "player2"]
        @game.save
        render :show
      end
    else
      @game = Game.new(game_params)
      @game.current_players = ["player1"];
      if @game.save
        render :show
      else
        render json: @game.errors.full_messages, status: 422
      end
    end
  end
  #
  # def update
  #   @game = Game.find_by_name(params[:game][:name])
  #   if @game.update(game_params)
  #     render :show
  #   end
  # end

  def show
    @game = Game.find_by_name(params[:game][:name]) || {}
    render :show
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
    params.require(:game).permit(:name, :current_players)
  end

end
