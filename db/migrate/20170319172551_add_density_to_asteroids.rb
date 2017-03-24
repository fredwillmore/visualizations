class AddDensityToAsteroids < ActiveRecord::Migration
  def change
    add_column :asteroids, :density, :decimal, precision: 8, scale: 8
  end
end
