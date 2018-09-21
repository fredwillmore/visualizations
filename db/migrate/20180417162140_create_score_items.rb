class CreateScoreItems < ActiveRecord::Migration[5.2]
  def change
    create_table :score_items do |t|
      t.belongs_to :score
      t.timestamps null: false
    end
  end
end
