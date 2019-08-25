class AddBoardToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :current_player, :string
    add_column :games, :board, :text, array: true, default: []
  end
end
