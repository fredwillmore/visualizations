class AddDensityToAsteroids < ActiveRecord::Migration[5.2]
  def change
    add_column :asteroids, :density, :decimal, precision: 8, scale: 8
  end
end
