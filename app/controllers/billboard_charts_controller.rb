class BillboardChartsController < ApplicationController
  before_action :set_billboard_chart, only: [:show, :edit, :update, :destroy]

  # GET /billboard_charts
  # GET /billboard_charts.json
  def index
    @billboard_charts = BillboardChart.all
  end

  # GET /billboard_charts/1
  # GET /billboard_charts/1.json
  def show
  end

  # GET /billboard_charts/new
  def new
    @billboard_chart = BillboardChart.new
  end

  # GET /billboard_charts/1/edit
  def edit
  end

  # POST /billboard_charts
  # POST /billboard_charts.json
  def create
    @billboard_chart = BillboardChart.new(billboard_chart_params)

    respond_to do |format|
      if @billboard_chart.save
        format.html { redirect_to @billboard_chart, notice: 'Billboard chart was successfully created.' }
        format.json { render :show, status: :created, location: @billboard_chart }
      else
        format.html { render :new }
        format.json { render json: @billboard_chart.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /billboard_charts/1
  # PATCH/PUT /billboard_charts/1.json
  def update
    respond_to do |format|
      if @billboard_chart.update(billboard_chart_params)
        format.html { redirect_to @billboard_chart, notice: 'Billboard chart was successfully updated.' }
        format.json { render :show, status: :ok, location: @billboard_chart }
      else
        format.html { render :edit }
        format.json { render json: @billboard_chart.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /billboard_charts/1
  # DELETE /billboard_charts/1.json
  def destroy
    @billboard_chart.destroy
    respond_to do |format|
      format.html { redirect_to billboard_charts_url, notice: 'Billboard chart was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_billboard_chart
      @billboard_chart = BillboardChart.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def billboard_chart_params
      params.require(:billboard_chart).permit(:date)
    end
end
