class Api::PlayersController < ApplicationController

  def create
    @player = Player.new(player_params)
    if @player.save
      render :show
    else
      render json: @player.errors.full_messages, status: 422
    end
  end

  def destroy
    @player = Player.find(params[:id])
    if @player.destroy
      render :index
    else
      render json: @player.errors.full_messages, status: 422
    end
  end

  private

  def player_params
    params.require(:player).permit(:username)
  end
end
