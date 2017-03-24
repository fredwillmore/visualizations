# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

csv_text = File.read 'db/seeds/data/comets.csv'
csv = CSV.parse(csv_text, headers: true, header_converters: :downcase)
csv.each do |row|
  data = row.to_hash
  data.delete 'gm'
  data['comet_class'] = data.delete 'class'
  Comet.create! data
end

debugger
puts 'hello'
