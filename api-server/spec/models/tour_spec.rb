# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tour, type: :model do
  # it { should validate_presence_of(:title) }
  # it { expect(subject).to validate_presence_of :title }
  it { expect(subject).to have_many(:stops) }
  it { expect(subject).to have_many(:tour_stops) }
  it { expect(Tour.reflect_on_association(:theme).macro).to eq(:belongs_to) }
  it { expect(Tour.reflect_on_association(:mode).macro).to eq(:belongs_to) }
end
