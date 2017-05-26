class VisualizationsController < ApplicationController
  require 'csv'

  def index
    @asteroids_by_condition_code = Asteroid.by_condition_code
  end

  def asteroid_bar_chart
    respond_to do |format|
      format.html do
        render :asteroid_bar_chart
      end
      format.json do
        if use_flat_file
          render json: File.read("db/seeds/data/asteroids/by_condition_code.json")
        else
          render json: Asteroid.by_condition_code
        end
      end
    end
  end

  def asteroid_pie_chart
    respond_to do |format|
      format.html do
        render :asteroid_pie_chart
      end
      format.json do
        if use_flat_file
          render json: File.read("db/seeds/data/asteroids/by_condition_code.json")
        else
          render json: Asteroid.by_condition_code
        end
      end
    end
  end

  def asteroid_scatter_plot
    respond_to do |format|
      format.html do
        render :asteroid_scatter_plot
      end
      format.json do
        if use_flat_file
          render json: File.read("db/seeds/data/asteroids/perihelion_aphelion_diameter.json")
        else
          render json: Asteroid.perihelion_aphelion_diameter
        end
        return
        csv = CSV.parse(
          "perihelion,mass,aphelion,petal_width,species
          5.1,3.5,1.4,0.2,setosa
          4.9,3.0,1.4,0.2,setosa
          4.7,3.2,1.3,0.2,setosa
          4.6,3.1,1.5,0.2,setosa
          5.0,3.6,1.4,0.2,setosa
          5.4,3.9,1.7,0.4,setosa
          4.6,3.4,1.4,0.3,setosa
          5.0,3.4,1.5,0.2,setosa
          4.4,2.9,1.4,0.2,setosa
          4.9,3.1,1.5,0.1,setosa
          5.4,3.7,1.5,0.2,setosa
          4.8,3.4,1.6,0.2,setosa
          4.8,3.0,1.4,0.1,setosa
          4.3,3.0,1.1,0.1,setosa
          5.8,4.0,1.2,0.2,setosa
          5.7,4.4,1.5,0.4,setosa
          5.4,3.9,1.3,0.4,setosa
          5.1,3.5,1.4,0.3,setosa
          5.7,3.8,1.7,0.3,setosa
          5.1,3.8,1.5,0.3,setosa
          5.4,3.4,1.7,0.2,setosa
          5.1,3.7,1.5,0.4,setosa
          4.6,3.6,1.0,0.2,setosa
          5.1,3.3,1.7,0.5,setosa
          4.8,3.4,1.9,0.2,setosa
          5.0,3.0,1.6,0.2,setosa
          5.0,3.4,1.6,0.4,setosa
          5.2,3.5,1.5,0.2,setosa
          5.2,3.4,1.4,0.2,setosa
          4.7,3.2,1.6,0.2,setosa
          4.8,3.1,1.6,0.2,setosa
          5.4,3.4,1.5,0.4,setosa
          5.2,4.1,1.5,0.1,setosa
          5.5,4.2,1.4,0.2,setosa
          4.9,3.1,1.5,0.1,setosa
          5.0,3.2,1.2,0.2,setosa
          5.5,3.5,1.3,0.2,setosa
          4.9,3.1,1.5,0.1,setosa
          4.4,3.0,1.3,0.2,setosa
          5.1,3.4,1.5,0.2,setosa
          5.0,3.5,1.3,0.3,setosa
          4.5,2.3,1.3,0.3,setosa
          4.4,3.2,1.3,0.2,setosa
          5.0,3.5,1.6,0.6,setosa
          5.1,3.8,1.9,0.4,setosa
          4.8,3.0,1.4,0.3,setosa
          5.1,3.8,1.6,0.2,setosa
          4.6,3.2,1.4,0.2,setosa
          5.3,3.7,1.5,0.2,setosa
          5.0,3.3,1.4,0.2,setosa
          7.0,3.2,4.7,1.4,versicolor
          6.4,3.2,4.5,1.5,versicolor
          6.9,3.1,4.9,1.5,versicolor
          5.5,2.3,4.0,1.3,versicolor
          6.5,2.8,4.6,1.5,versicolor
          5.7,2.8,4.5,1.3,versicolor
          6.3,3.3,4.7,1.6,versicolor
          4.9,2.4,3.3,1.0,versicolor
          6.6,2.9,4.6,1.3,versicolor
          5.2,2.7,3.9,1.4,versicolor
          5.0,2.0,3.5,1.0,versicolor
          5.9,3.0,4.2,1.5,versicolor
          6.0,2.2,4.0,1.0,versicolor
          6.1,2.9,4.7,1.4,versicolor
          5.6,2.9,3.6,1.3,versicolor
          6.7,3.1,4.4,1.4,versicolor
          5.6,3.0,4.5,1.5,versicolor
          5.8,2.7,4.1,1.0,versicolor
          6.2,2.2,4.5,1.5,versicolor
          5.6,2.5,3.9,1.1,versicolor
          5.9,3.2,4.8,1.8,versicolor
          6.1,2.8,4.0,1.3,versicolor
          6.3,2.5,4.9,1.5,versicolor
          6.1,2.8,4.7,1.2,versicolor
          6.4,2.9,4.3,1.3,versicolor
          6.6,3.0,4.4,1.4,versicolor
          6.8,2.8,4.8,1.4,versicolor
          6.7,3.0,5.0,1.7,versicolor
          6.0,2.9,4.5,1.5,versicolor
          5.7,2.6,3.5,1.0,versicolor
          5.5,2.4,3.8,1.1,versicolor
          5.5,2.4,3.7,1.0,versicolor
          5.8,2.7,3.9,1.2,versicolor
          6.0,2.7,5.1,1.6,versicolor
          5.4,3.0,4.5,1.5,versicolor
          6.0,3.4,4.5,1.6,versicolor
          6.7,3.1,4.7,1.5,versicolor
          6.3,2.3,4.4,1.3,versicolor
          5.6,3.0,4.1,1.3,versicolor
          5.5,2.5,4.0,1.3,versicolor
          5.5,2.6,4.4,1.2,versicolor
          6.1,3.0,4.6,1.4,versicolor
          5.8,2.6,4.0,1.2,versicolor
          5.0,2.3,3.3,1.0,versicolor
          5.6,2.7,4.2,1.3,versicolor
          5.7,3.0,4.2,1.2,versicolor
          5.7,2.9,4.2,1.3,versicolor
          6.2,2.9,4.3,1.3,versicolor
          5.1,2.5,3.0,1.1,versicolor
          5.7,2.8,4.1,1.3,versicolor
          6.3,3.3,6.0,2.5,virginica
          5.8,2.7,5.1,1.9,virginica
          7.1,3.0,5.9,2.1,virginica
          6.3,2.9,5.6,1.8,virginica
          6.5,3.0,5.8,2.2,virginica"
        )
        fields = csv.shift
        fields = fields.map {|f| f.downcase.gsub(" ", "_")}
        render json: csv.collect { |record| Hash[*fields.zip(record).flatten ] }
      end
    end
  end

  def psu_data
    respond_to do |format|
      format.html
      format.json do
        year = (2006..2016).include?(visualizations_params[:year].to_i) ? visualizations_params[:year] : 2016
        parsed_file = CSV.read("#{Rails.root}/db/seeds/data/graduates/portland_state/#{year}.tsv", { col_sep: "\t", headers: true })
        result = parsed_file.map(&:to_h)
        json = case visualizations_params[:type]
          when 'by_program_male'
            result
          else
            result
        end
        render json: json
      end
    end
  end

  def multi_line_charts
    respond_to do |format|
      format.html
    end
  end

  def life_expectancy_multi_line_chart
    respond_to do |format|
      format.html
      format.json do
        if use_flat_file
          render json: File.read("db/seeds/data/life_expectancy/chart_countries.json")
        else
          raise NotImplementedError
        end
      end
    end
  end

  def billboard_multi_line_chart
    @year = visualizations_params[:year].to_i
    @chart_length = visualizations_params[:chart_length]
    respond_to do |format|
      format.html
      format.json do
        if use_flat_file
          render json: File.read("db/seeds/data/billboard/chart_tracks/#{@year}.json") rescue {}
        else
          start_date = Date.new(@year)
          end_date = Date.new(@year+1)-1
          render json: BillboardTrack.charting_tracks(start_date, end_date)
        end
      end
    end
  end

  private

  def visualizations_params
    params[:use_flat_file] ||= use_flat_file
    params[:year] ||= 1977
    params[:chart_length] ||= 40

    params
  end
end
