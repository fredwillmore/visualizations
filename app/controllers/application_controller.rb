class ApplicationController < ActionController::Base

  def use_flat_file
    Rails.env == 'production' || params[:use_flat_file] 
    # true # just always use flat file for now - tune db queries later
  end

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
