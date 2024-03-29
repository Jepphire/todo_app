require "jwt"

module JsonWebToken
    extend ActiveSupport::Concern

    SECRET_KEY = Rails.application.secret_key_base

    def encode(payload, exp)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end

    def decode(token)
        decoded = JWT.decode(token, SECRET_KEY)[0]
        HashWithIndifferentAccess.new decoded
    end
end