class CometsController < ApplicationController
  before_action :set_comet, only: [:show, :edit, :update, :destroy]

  # GET /comets
  # GET /comets.json
  def index
    @comets = Comet.all
  end

  # GET /comets/1
  # GET /comets/1.json
  def show
  end

  # GET /comets/new
  def new
    @comet = Comet.new
  end

  # GET /comets/1/edit
  def edit
  end

  # POST /comets
  # POST /comets.json
  def create
    @comet = Comet.new(comet_params)

    respond_to do |format|
      if @comet.save
        format.html { redirect_to @comet, notice: 'Comet was successfully created.' }
        format.json { render :show, status: :created, location: @comet }
      else
        format.html { render :new }
        format.json { render json: @comet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /comets/1
  # PATCH/PUT /comets/1.json
  def update
    respond_to do |format|
      if @comet.update(comet_params)
        format.html { redirect_to @comet, notice: 'Comet was successfully updated.' }
        format.json { render :show, status: :ok, location: @comet }
      else
        format.html { render :edit }
        format.json { render json: @comet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comets/1
  # DELETE /comets/1.json
  def destroy
    @comet.destroy
    respond_to do |format|
      format.html { redirect_to comets_url, notice: 'Comet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comet
      @comet = Comet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comet_params
      params.fetch(:comet, {})
    end
end
