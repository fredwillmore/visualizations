class BusinessEntitiesController < ApplicationController

  def index
    @business_entities = BusinessEntity.page params[:page]
  end

  def show
  end

end
