class AddGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :games, :name
  end
end
