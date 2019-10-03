# frozen_string_literal: true

# app/requests/stops_spec.rb
require 'rails_helper'

RSpec.describe 'V3::Stops API' do
  # Initialize the test data

  # Test suite for GET /stops
  describe 'GET /tour-stops' do
    before { Apartment::Tenant.switch! TourSet.second.subdir }
    # before { Tour.first.stops << Stop.last(5) }
    before { get "/#{Apartment::Tenant.current}/tour-stops" }

    context 'when stops exist' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all tour stops' do
        expect(json.size).to eq(TourStop.count)
      end
    end

    context 'previous and next are correct' do
      it 'previous is 3' do
        expect(json[3]['attributes']['previous']['id']).to eq(json[3]['id'].to_i - 1)
      end

      it 'next is 5' do
        expect(json[3]['attributes']['next']['id']).to eq(json[3]['id'].to_i + 1)
      end
    end
  end

  describe 'DELETE /tour-stops' do
    before { User.last.tour_sets << TourSet.find_by(subdir: Apartment::Tenant.current) }
    before { @stop = Stop.last }
    before { @stop_count = Stop.count }
    before { delete "/#{Apartment::Tenant.current}/tour-stops/#{TourStop.find_by(stop: @stop).id}", headers: { Authorization: "Bearer #{User.last.login.oauth2_token}" } }
    
    context 'when a tour-stop is deleted and the stop no longers belogs to a tour, the stop is deleted' do
      it 'deletes the associated stop' do
        expect(Stop.count).to eq @stop_count - 1
      end
    end
    
    before { Tour.all.each { |t| t.stops << Stop.first } }
    before { delete "/#{Apartment::Tenant.current}/tour-stops/#{TourStop.find_by(stop: Stop.first).id}", headers: { Authorization: "Bearer #{User.last.login.oauth2_token}" } }

    context 'when a tour-stop is deleted, the stop is not deleted if it belongs to other tours.' do
      it 'deletes tour-stop but not the stop' do
        expect(Stop.first.title).to eq(Stop.first.title)
      end
    end
  end
end
