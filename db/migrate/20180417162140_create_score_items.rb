class CreateScoreItems < ActiveRecord::Migration
  def change
    create_table :score_items do |t|
      t.belongs_to :score
      t.timestamps null: false
    end
  end
end
