module LocateableSerializer
  extend ActiveSupport::Concern

  included do
    show_attributes locations: [:id, :place_id, :description, :certainty,
                                :notes, :repository_work_url, place: PlacesSerializer,
                                qualifications: QualificationsSerializer]
  end
end
