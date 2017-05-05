class CreateBillboardTracks < ActiveRecord::Migration
  def change
    create_table :billboard_tracks do |t|
      t.string :name
      t.belongs_to :billboard_artist, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
