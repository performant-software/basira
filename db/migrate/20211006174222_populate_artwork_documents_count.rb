class PopulateArtworkDocumentsCount < ActiveRecord::Migration[6.0]
  def up
    Artwork.find_each do |artwork|
      artwork.documents_count = 0
      artwork.physical_components.find_each do |pc|
        pc.visual_contexts.find_each do |vc|
          artwork.documents_count += vc.documents.count
        end
      end
      artwork.save!
    end
  end

  def down
    Artwork.find_each do |artwork|
      artwork.documents_count = 0
      artwork.save!
    end
  end
end
