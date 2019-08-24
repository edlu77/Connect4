class ChangeGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :current_players, :text, array: true, default: []
  end
end
