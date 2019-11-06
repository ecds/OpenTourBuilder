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

  describe 'GET /tour-stops?slug=slug&tour=X' do
    before { Apartment::Tenant.switch! TourSet.second.subdir }
    before { get "/#{Apartment::Tenant.current}/tour-stops?slug=#{Tour.first.stops.first.stop_slugs.first.slug}&tour=#{Tour.first.id}" }
    
    context 'get tour stop by slug and tour'do
        it 'responds with the tour stop' do
          expect(json['id'].to_i).to eq(Tour.first.stops.first.id)
        end
    end
  end

  describe 'GET /tour-stops?slug=duplicated_slug&tour=X' do
    before { Apartment::Tenant.switch! TourSet.last.subdir }
    # before { create_list(:tour_with_stops, 5, theme: create(:theme), mode: create(:mode)) }
    let!(:tour1) { Tour.first }
    let!(:stop1) { tour1.stops.second }
    let!(:tour2) { Tour.last }
    let!(:stop2) { tour2.stops.last }
    let!(:new_title) { "#{Faker::Movies::Lebowski.character}" }
    
    before{
      tour1.stops = [Stop.create(title: new_title)]
      tour1.save
      tour2.stops = [Stop.create(title: new_title)]
      tour2.save
    }
    
    
    context 'get stop with duplicate title/slug in correct tour' do
      before { get "/#{Apartment::Tenant.current}/tour-stops?slug=#{new_title.parameterize}&tour=#{tour1.id}" }
      it 'is true' do
        expect(json['id'].to_i).to eq(tour1.stops.first.id)
        expect(json['attributes']['title']).to eq(tour1.stops.first.title)
        expect(json['relationships']['tours']['data'][0]['id'].to_i).to eq(tour1.id)
      end
    end

    
    context 'get stop with duplicate title/slug in correct tour' do
      before { get "/#{Apartment::Tenant.current}/tour-stops?slug=#{new_title.parameterize}&tour=#{tour2.id}" }
      it 'is true' do
        expect(json['id'].to_i).to eq(tour2.stops.first.id)
        expect(json['attributes']['title']).to eq(tour2.stops.first.title)
        expect(json['relationships']['tours']['data'][0]['id'].to_i).to eq(tour2.id)
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
