class AsteroidsController < ApplicationController
  before_action :set_asteroid, only: [:show, :edit, :update, :destroy]

  # GET /asteroids
  # GET /asteroids.json
  def index
    @asteroids = Asteroid.all
  end

  # GET /asteroids/1
  # GET /asteroids/1.json
  def show
  end

  # GET /asteroids/new
  def new
    @asteroid = Asteroid.new
  end

  # GET /asteroids/1/edit
  def edit
  end

  # POST /asteroids
  # POST /asteroids.json
  def create
    @asteroid = Asteroid.new(asteroid_params)

    respond_to do |format|
      if @asteroid.save
        format.html { redirect_to @asteroid, notice: 'Asteroid was successfully created.' }
        format.json { render :show, status: :created, location: @asteroid }
      else
        format.html { render :new }
        format.json { render json: @asteroid.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /asteroids/1
  # PATCH/PUT /asteroids/1.json
  def update
    respond_to do |format|
      if @asteroid.update(asteroid_params)
        format.html { redirect_to @asteroid, notice: 'Asteroid was successfully updated.' }
        format.json { render :show, status: :ok, location: @asteroid }
      else
        format.html { render :edit }
        format.json { render json: @asteroid.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /asteroids/1
  # DELETE /asteroids/1.json
  def destroy
    @asteroid.destroy
    respond_to do |format|
      format.html { redirect_to asteroids_url, notice: 'Asteroid was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_asteroid
      @asteroid = Asteroid.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def asteroid_params
      params.fetch(:asteroid, {})
    end
end
