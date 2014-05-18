class MainController < ApplicationController
  def index
  	# @users = User.all
  end

  def savesignup
  	email = params[:email]

  	u = User.new(email: email)

    if (u.valid?)
  	  u.save
    	render json: u
     	head :ok
    else
      render json: nil
    end

  end

end
