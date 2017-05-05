class BillboardChartEntriesController < ApplicationController
  before_action :set_billboard_chart_entry, only: [:show, :edit, :update, :destroy]

  # GET /billboard_chart_entries
  # GET /billboard_chart_entries.json
  def index
    @billboard_chart_entries = BillboardChartEntry.all
  end

  # GET /billboard_chart_entries/1
  # GET /billboard_chart_entries/1.json
  def show
  end

  # GET /billboard_chart_entries/new
  def new
    @billboard_chart_entry = BillboardChartEntry.new
  end

  # GET /billboard_chart_entries/1/edit
  def edit
  end

  # POST /billboard_chart_entries
  # POST /billboard_chart_entries.json
  def create
    @billboard_chart_entry = BillboardChartEntry.new(billboard_chart_entry_params)

    respond_to do |format|
      if @billboard_chart_entry.save
        format.html { redirect_to @billboard_chart_entry, notice: 'Billboard chart entry was successfully created.' }
        format.json { render :show, status: :created, location: @billboard_chart_entry }
      else
        format.html { render :new }
        format.json { render json: @billboard_chart_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /billboard_chart_entries/1
  # PATCH/PUT /billboard_chart_entries/1.json
  def update
    respond_to do |format|
      if @billboard_chart_entry.update(billboard_chart_entry_params)
        format.html { redirect_to @billboard_chart_entry, notice: 'Billboard chart entry was successfully updated.' }
        format.json { render :show, status: :ok, location: @billboard_chart_entry }
      else
        format.html { render :edit }
        format.json { render json: @billboard_chart_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /billboard_chart_entries/1
  # DELETE /billboard_chart_entries/1.json
  def destroy
    @billboard_chart_entry.destroy
    respond_to do |format|
      format.html { redirect_to billboard_chart_entries_url, notice: 'Billboard chart entry was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_billboard_chart_entry
      @billboard_chart_entry = BillboardChartEntry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def billboard_chart_entry_params
      params.require(:billboard_chart_entry).permit(:integer, :integer, :integer, :peak_position, :integer, :belongs_to, :belongs_to, :date, :integer, :integer, :integer, :belongs_to)
    end
end
