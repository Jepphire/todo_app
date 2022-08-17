class AuthenticationController < ApplicationController

    skip_before_action :authenticate_request

    def login
        @user = User.find_by email: params[:email]
        if @user&.authenticate(params[:password])
            exp = Time.now + 14.days
            token = encode({ user_id: @user.id }, exp)
            render json: { 
                id: @user.id,
                exp: exp,
                token: token
            }
        else
            render json: { errors: ['Invalid email/password'] }, status: :unauthorized
        end
    end

end
