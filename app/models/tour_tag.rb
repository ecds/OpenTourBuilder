# app/models/tour_tag.rb
class TourTag < ApplicationRecord
    validates :title, presence: true
end
