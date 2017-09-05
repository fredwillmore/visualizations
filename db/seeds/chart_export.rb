(1941..2015).each do |year|
  json = `curl 'http://0.0.0.0:3000/visualizations/billboard_multi_line_chart.json?year=#{year}&chart_length=100'`
  File.open("/Users/fredwillmore/Documents/rails_projects/visualizations/db/seeds/data/billboard/chart_tracks/#{year}.json", 'w') do |f|
    f.write json
  end
end
