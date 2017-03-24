class CreateAsteroids < ActiveRecord::Migration
  def change
    create_table :asteroids do |t|
      t.string :full_name
      t.decimal :a, precision: 16, scale: 8
      t.decimal :e, precision: 16, scale: 8
      t.decimal :i, precision: 16, scale: 8
      t.decimal :om, precision: 16, scale: 8
      t.decimal :w, precision: 16, scale: 8
      t.decimal :q, precision: 16, scale: 8
      t.decimal :ad, precision: 16, scale: 8
      t.decimal :per_y, precision: 16, scale: 8
      t.integer :data_arc
      t.integer :condition_code
      t.integer :n_obs_used
      t.integer :n_del_obs_used
      t.integer :n_dop_obs_used
      t.decimal :h, precision: 16, scale: 8
      t.decimal :diameter, precision: 16, scale: 8
      t.string :extent
      t.decimal :albedo, precision: 16, scale: 8
      t.decimal :rot_per, precision: 16, scale: 8
      t.decimal :gm, precision: 16, scale: 8
      t.decimal :bv, precision: 16, scale: 8
      t.decimal :ub, precision: 16, scale: 8
      t.string :spec_b
      t.string :spec_t
      t.timestamps null: false
    end
  end
end
