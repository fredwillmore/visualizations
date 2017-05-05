class CreateBillboardArtists < ActiveRecord::Migration
  def change
    create_table :billboard_artists do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
