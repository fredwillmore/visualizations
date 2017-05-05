class BillboardArtistsController < ApplicationController
  before_action :set_billboard_artist, only: [:show, :edit, :update, :destroy]

  # GET /billboard_artists
  # GET /billboard_artists.json
  def index
    @billboard_artists = BillboardArtist.all
  end

  # GET /billboard_artists/1
  # GET /billboard_artists/1.json
  def show
  end

  # GET /billboard_artists/new
  def new
    @billboard_artist = BillboardArtist.new
  end

  # GET /billboard_artists/1/edit
  def edit
  end

  # POST /billboard_artists
  # POST /billboard_artists.json
  def create
    @billboard_artist = BillboardArtist.new(billboard_artist_params)

    respond_to do |format|
      if @billboard_artist.save
        format.html { redirect_to @billboard_artist, notice: 'Billboard artist was successfully created.' }
        format.json { render :show, status: :created, location: @billboard_artist }
      else
        format.html { render :new }
        format.json { render json: @billboard_artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /billboard_artists/1
  # PATCH/PUT /billboard_artists/1.json
  def update
    respond_to do |format|
      if @billboard_artist.update(billboard_artist_params)
        format.html { redirect_to @billboard_artist, notice: 'Billboard artist was successfully updated.' }
        format.json { render :show, status: :ok, location: @billboard_artist }
      else
        format.html { render :edit }
        format.json { render json: @billboard_artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /billboard_artists/1
  # DELETE /billboard_artists/1.json
  def destroy
    @billboard_artist.destroy
    respond_to do |format|
      format.html { redirect_to billboard_artists_url, notice: 'Billboard artist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_billboard_artist
      @billboard_artist = BillboardArtist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def billboard_artist_params
      params.require(:billboard_artist).permit(:string)
    end
end
