# frozen_string_literal: true

class V3::ModeSerializer < ActiveModel::Serializer
  has_many :tours
  attributes :id, :title, :icon
end
