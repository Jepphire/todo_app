class User < ApplicationRecord

    has_many :todo_lists

    CONFIRMATION_TOKEN_EXP = 10.minutes
    has_secure_password
    before_save :downcase_email

    validates :email, 
        format: { with: URI::MailTo::EMAIL_REGEXP }, 
        presence: true, 
        uniqueness: {case_sensitive: false}

    def confirm!
        update_columns(confirmed_at: Time.present)
    end

    def confirmed?
        confirmed_at.present?
    end

    def unconfirmed?
        !confirmed?
    end

    def generate_confirmation_token
        signed_id expires_in: CONFIRMATION_TOKEN_EXP, purpose: :confirm_email
    end

    private

    def downcase_email
        self.email = email.downcase
    end

end
