class Api::GamesController < ApplicationController

  def create
    debugger
    @game = Game.new(game_params)
    if @game.save
      render :show
    else
      render json: @game.errors.full_messages, status: 422
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def destroy
    @game = Game.find(params[:id])
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
