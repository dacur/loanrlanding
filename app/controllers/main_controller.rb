class MainController < ApplicationController
  def index
  	@users = User.all
  end

  def savesignup
  	email = params[:email]

  	u = User.new(email: email)

  	u.save

  	render json: u

  	head :ok

  end

end
