class CreateBillboardArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :billboard_artists do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
