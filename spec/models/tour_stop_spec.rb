require 'rails_helper'

RSpec.describe TourStop, type: :model do
    it { should belong_to(:tour) }
    it { should belong_to(:stop) }
end
