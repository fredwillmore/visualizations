require 'csv'

file_loc = '/Users/fredwillmore/Desktop/all_billboard_data.txt'
data = CSV.read file_loc, headers: true, col_sep: '|', quote_char: "\x00", encoding: 'ISO-8859-1'

data.each do |row|
  chart = BillboardChart.find_or_create_by(
    chart_date: Date.parse(row['chart date'])
  )
  artist = BillboardArtist.find_or_create_by(
    name: row['artist']
  )
  track = BillboardTrack.find_or_create_by(
    name: row['title'],
    billboard_artist: artist
  )
  chart_entry = BillboardChartEntry.find_or_create_by(
    billboard_track: track,
    billboard_chart: chart
  )
  chart_entry.update!(
    position: row['pos'],
    last_week_position: row['last week'],
    peak_position: row['peak'],
    weeks_on_chart: row['weeks on chart'],
    chart_entry_date: Date.parse('1900-01-01') + row['chart entry date'].to_i,
    entry_position: row['entry position'],
    overall_peak_position: row['overall peak'],
    overall_weeks_on_chart: row['overall weeks on chart']
  )
end
