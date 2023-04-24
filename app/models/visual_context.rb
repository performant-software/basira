class VisualContext < ApplicationRecord
  # Includes
  include Attachable
  include Indexable
  include Qualifiable
  include Recordable

  attributes_to_index name: :tesi, height: :ssi, width: :ssi, depth: :ssi, notes: :tesi

  # Relationships
  belongs_to :physical_component
  has_many :documents, dependent: :destroy

  # Resourceable parameters
  allow_params :physical_component_id, :name, :height, :width, :depth, :notes, :beta

  def to_solr
    visual_context_solr = super

    pc_solr = self.physical_component.to_solr

    if self.primary_attachment
      visual_context_solr['visual_context_img'] = self.primary_attachment.file_url
    end

    if self.physical_component.primary_attachment
      visual_context_solr['physical_component_img'] = self.physical_component.primary_attachment.file_url
    end

    visual_context_solr
      .merge(pc_solr)
  end
end
