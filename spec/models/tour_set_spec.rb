require 'rails_helper'

RSpec.describe TourSet, type: :model do
    it { should validate_presence_of(:name) }
end
