class Player < ApplicationRecord
  validates :username, presence: true, uniqueness: true
end
