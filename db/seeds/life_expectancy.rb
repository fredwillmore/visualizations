require 'csv'

stuff = CSV.read('public/life-expectancy-cleaned-all.csv')
rc = CSV.read('public/country-regions.csv', headers: true)
hdi = CSV.read('db/seeds/data/human_development_index.csv', headers: true, encoding: 'ISO-8859-1')
hdi_columns = [
  'HD rating',
  'HDI',
  'Life expectancy',
  'Mean schooling',
  'Expected schooling',
  'GNI per capita',
  'GNI minus HDI',
  'Nonincome HDI',
  'Well being',
  'Fertility rate',
  'CO2 emission',
  'Greenhouse gas emission',
  'Urban pollution',
  'HDI 1980',
  'HDI 1990',
  'HDI 2000',
  'HDI 2005',
  'HDI 2009',
  'HDI 2010'
] # hdi stuff

headers = stuff[0]
headers.insert(2, 'RegionName', 'RegionCode')
hdi_columns.reverse.each do |e|
  headers.insert(4, e.parameterize.underscore.camelize) # keep inserting at position 4 - this is why I had to reverse the array to keep expected order
end
output = [headers]

# Sample hdi entry
# HD rank":"1"
# "Country":"Norway"
# "Subregion":"Northern europe"
# "Region":"Europe"
# "HD rating":"Very high"
# "HDI":"0.943"
# "Life expectancy":"81.1"
# "Mean schooling":"12.6"
# "Expected schooling":"17.3"
# "GNI per capita":"47557.1"
# "GNI minus HDI":"6"
# "Nonincome HDI":"0.975"
# "Well being":"7.6"
# "Fertility rate":"2"
# "CO2 emission":"10.5"
# "Greenhouse gas emission":"5.8"
# "Urban pollution":"16"
# "1980":"0.796"
# "1990":"0.844"
# "2000":"0.913"
# "2005":"0.938"
# "2009":"0.941"
# "2010":"0.941"

stuff.each_with_index do |row, i|
  if i > 0
    if (rc_entry = rc.find { |entry| entry['CountryCode'] == row[1] }) && (hdi_row = hdi.find { |hdi_row| hdi_row['Country'] == row[0] })
      row.insert( 2, rc_entry['RegionName'], rc_entry['RegionCode'] )

      hdi_columns.reverse.each do |col|
        col.gsub! /HDI\s/, ''
        row.insert( 4, hdi_row[col] ) # keep inserting at position 4 - this is why I had to reverse the array to keep expected order
      end
      output << row
    else
      puts row[1]
    end
  end
end

File.open('db/seeds/data/life_expectancy/chart_countries.json', 'w') { |f| f.write(output.to_json) }

puts 'hello'

# csv = CSV.parse(csv_text, headers: true, header_converters: :downcase)
# csv.each do |row|
#   row.delete 'ir'
#   Asteroid.create! row.to_hash
# end
