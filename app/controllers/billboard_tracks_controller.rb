class BillboardTracksController < ApplicationController
  before_action :set_billboard_track, only: [:show, :edit, :update, :destroy]

  # GET /billboard_tracks
  # GET /billboard_tracks.json
  def index
    @billboard_tracks = BillboardTrack.all
  end

  # GET /billboard_tracks/1
  # GET /billboard_tracks/1.json
  def show
  end

  # GET /billboard_tracks/new
  def new
    @billboard_track = BillboardTrack.new
  end

  # GET /billboard_tracks/1/edit
  def edit
  end

  # POST /billboard_tracks
  # POST /billboard_tracks.json
  def create
    @billboard_track = BillboardTrack.new(billboard_track_params)

    respond_to do |format|
      if @billboard_track.save
        format.html { redirect_to @billboard_track, notice: 'Billboard track was successfully created.' }
        format.json { render :show, status: :created, location: @billboard_track }
      else
        format.html { render :new }
        format.json { render json: @billboard_track.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /billboard_tracks/1
  # PATCH/PUT /billboard_tracks/1.json
  def update
    respond_to do |format|
      if @billboard_track.update(billboard_track_params)
        format.html { redirect_to @billboard_track, notice: 'Billboard track was successfully updated.' }
        format.json { render :show, status: :ok, location: @billboard_track }
      else
        format.html { render :edit }
        format.json { render json: @billboard_track.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /billboard_tracks/1
  # DELETE /billboard_tracks/1.json
  def destroy
    @billboard_track.destroy
    respond_to do |format|
      format.html { redirect_to billboard_tracks_url, notice: 'Billboard track was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_billboard_track
      @billboard_track = BillboardTrack.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def billboard_track_params
      params.require(:billboard_track).permit(:string, :artist_id)
    end
end
