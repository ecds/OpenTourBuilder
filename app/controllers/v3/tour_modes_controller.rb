# frozen_string_literal: true

# app/controllers/v3/tour_modes_controller.rb
module V3
  class TourModesController < ApplicationController
    # GET /tour_sets
    def index
      @tour_modes = TourMode.all

      render json: @tour_modes
    end
end
end
