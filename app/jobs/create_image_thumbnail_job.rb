class CreateImageThumbnailJob < ApplicationJob
  queue_as :default

  def perform(id)
    attachment = Attachment.find(id)
    attachment.file.variant(resize_to_fit: [250, nil]).processed
  end
end
