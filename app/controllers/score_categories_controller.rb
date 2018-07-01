class ScoreCategoriesController < ApplicationController
  before_action :set_score_category, only: [:show, :edit, :update, :destroy]

  # GET /score_categories
  # GET /score_categories.json
  def index
    @score_categories = ScoreCategory.all
  end

  # GET /score_categories/1
  # GET /score_categories/1.json
  def show
  end

  # GET /score_categories/new
  def new
    @score_category = ScoreCategory.new
  end

  # GET /score_categories/1/edit
  def edit
  end

  # POST /score_categories
  # POST /score_categories.json
  def create
    @score_category = ScoreCategory.new(score_category_params)

    respond_to do |format|
      if @score_category.save
        format.html { redirect_to @score_category, notice: 'Score category was successfully created.' }
        format.json { render :show, status: :created, location: @score_category }
      else
        format.html { render :new }
        format.json { render json: @score_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /score_categories/1
  # PATCH/PUT /score_categories/1.json
  def update
    respond_to do |format|
      if @score_category.update(score_category_params)
        format.html { redirect_to @score_category, notice: 'Score category was successfully updated.' }
        format.json { render :show, status: :ok, location: @score_category }
      else
        format.html { render :edit }
        format.json { render json: @score_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /score_categories/1
  # DELETE /score_categories/1.json
  def destroy
    @score_category.destroy
    respond_to do |format|
      format.html { redirect_to score_categories_url, notice: 'Score category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_score_category
      @score_category = ScoreCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def score_category_params
      params.fetch(:score_category, {})
    end
end
