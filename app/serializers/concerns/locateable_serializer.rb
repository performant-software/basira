module LocateableSerializer
  extend ActiveSupport::Concern

  included do
    show_attributes locations: [:id, :place_id, :role, :subrole, :description, :certainty, :notes, :repository_work_url, place: PlacesSerializer]
  end
end
