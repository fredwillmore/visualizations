class ScoreItemsController < ApplicationController
  before_action :set_score_item, only: [:show, :edit, :update, :destroy]

  # GET /score_items
  # GET /score_items.json
  def index
    @score_items = ScoreItem.all
  end

  # GET /score_items/1
  # GET /score_items/1.json
  def show
  end

  # GET /score_items/new
  def new
    @score_item = ScoreItem.new
  end

  # GET /score_items/1/edit
  def edit
  end

  # POST /score_items
  # POST /score_items.json
  def create
    @score_item = ScoreItem.new(score_item_params)

    respond_to do |format|
      if @score_item.save
        format.html { redirect_to @score_item, notice: 'Score item was successfully created.' }
        format.json { render :show, status: :created, location: @score_item }
      else
        format.html { render :new }
        format.json { render json: @score_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /score_items/1
  # PATCH/PUT /score_items/1.json
  def update
    respond_to do |format|
      if @score_item.update(score_item_params)
        format.html { redirect_to @score_item, notice: 'Score item was successfully updated.' }
        format.json { render :show, status: :ok, location: @score_item }
      else
        format.html { render :edit }
        format.json { render json: @score_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /score_items/1
  # DELETE /score_items/1.json
  def destroy
    @score_item.destroy
    respond_to do |format|
      format.html { redirect_to score_items_url, notice: 'Score item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_score_item
      @score_item = ScoreItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def score_item_params
      params.fetch(:score_item, {})
    end
end
