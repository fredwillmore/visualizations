class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.belongs_to :user
      t.belongs_to :score_category
      t.timestamps null: false
    end
  end
end
