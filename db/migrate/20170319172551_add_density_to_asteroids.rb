class AddDensityToAsteroids < ActiveRecord::Migration
  def change
    add_column :asteroids, :density, :decimal, precision: 8, scale: 8

    Asteroid.find(1).try :update!, density: 2.12
    Asteroid.find(2).try :update!, density: 2.71
    Asteroid.find(4).try :update!, density: 3.44
    Asteroid.find(10).try :update!, density: 2.76
    Asteroid.find(11).try :update!, density: 2.72
    Asteroid.find(15).try :update!, density: 0.96
    Asteroid.find(16).try :update!, density: 2.00
    Asteroid.find(20).try :update!, density: 3.26
    Asteroid.find(22).try :update!, density: 2.50
    Asteroid.find(45).try :update!, density: 1.20
    Asteroid.find(87).try :update!, density: 1.62
    Asteroid.find(90).try :update!, density: 1.30
    Asteroid.find(121).try :update!, density: 1.96
    Asteroid.find(243).try :update!, density: 2.60
    Asteroid.find(253).try :update!, density: 1.30
    Asteroid.find(433).try :update!, density: 2.67
    Asteroid.find(704).try :update!, density: 4.40
    Asteroid.find(762).try :update!, density: 1.80
    Asteroid.find(804).try :update!, density: 4.90
    Asteroid.find(1999).try :update!, density: 2.39
    Asteroid.find(2000).try :update!, density: 1.62
    Asteroid.find(2000).try :update!, density: 1.47
    Asteroid.find(854).try :update!, density: 0.89
    Asteroid.find(1089).try :update!, density: 2.52
    Asteroid.find(1313).try :update!, density: 1.21
    Asteroid.find(4492).try :update!, density: 0.90
    Asteroid.find(617).try :update!, density: 0.80
  end
end
