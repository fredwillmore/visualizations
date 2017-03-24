class CreateComets < ActiveRecord::Migration
  def change
    create_table :comets do |t|
      t.string :full_name
      t.decimal :e, :precision => 16, :scale => 16
      t.decimal :q, :precision => 16, :scale => 16
      t.decimal :i, :precision => 16, :scale => 16
      t.decimal :om, :precision => 16, :scale => 16
      t.decimal :w, :precision => 16, :scale => 16
      t.decimal :ad, :precision => 16, :scale => 16
      t.decimal :tp_cal, :precision => 16, :scale => 16
      t.decimal :per_y, :precision => 16, :scale => 16
      t.string :comet_class
      t.integer :data_arc
      t.integer :condition_code
      t.integer :n_obs_used
      t.string :two_body
      t.decimal :a1, :precision => 16, :scale => 16
      t.decimal :a2, :precision => 16, :scale => 16
      t.decimal :a3, :precision => 16, :scale => 16
      t.decimal :dt, :precision => 16, :scale => 16
      t.decimal :m1, precision: 8, scale: 8
      t.integer :k1
      t.decimal :m2, precision: 8, scale: 8
      t.integer :k2
      t.decimal :pc, precision: 8, scale: 8
      t.decimal :diameter, precision: 8, scale: 8
      t.string :extent
      t.decimal :albedo, precision: 8, scale: 8
      t.decimal :rot_per, precision: 8, scale: 8
      t.timestamps null: false
    end
  end
end
