class CreateScoreCategories < ActiveRecord::Migration
  def change
    create_table :score_categories do |t|
      t.string :name
      t.string :color
      t.string :description
      t.references :scores
      t.timestamps null: false
    end
  end
end
