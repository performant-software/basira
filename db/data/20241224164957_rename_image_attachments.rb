# frozen_string_literal: true

class RenameImageAttachments < ActiveRecord::Migration[7.0]
  def up
    # Update documents
    execute <<-SQL.squish
      WITH 
      update_documents AS (
        SELECT active_storage_blobs.id AS blob_id,
               'Document' || documents.id || '.' || SPLIT_PART(active_storage_blobs.filename, '.', -1) AS filename
          FROM documents
          JOIN attachments ON attachments.attachable_id = documents.id
                          AND attachments.attachable_type = 'Document'
          JOIN active_storage_attachments ON active_storage_attachments.record_id = attachments.id
                                         AND active_storage_attachments.record_type = 'Attachment'
                                         AND active_storage_attachments.name = 'file'
          JOIN active_storage_blobs ON active_storage_blobs.id = active_storage_attachments.blob_id
      )
      UPDATE active_storage_blobs
         SET filename = update_documents.filename
        FROM update_documents
       WHERE update_documents.blob_id = active_storage_blobs.id
    SQL

    # Update visual contexts
    execute <<-SQL.squish
      WITH 
      update_visual_contexts AS (
        SELECT active_storage_blobs.id AS blob_id,
               'VisualContext' || visual_contexts.id || '.' || SPLIT_PART(active_storage_blobs.filename, '.', -1) AS filename
          FROM visual_contexts
          JOIN attachments ON attachments.attachable_id = visual_contexts.id
                          AND attachments.attachable_type = 'VisualContext'
          JOIN active_storage_attachments ON active_storage_attachments.record_id = attachments.id
                                         AND active_storage_attachments.record_type = 'Attachment'
                                         AND active_storage_attachments.name = 'file'
          JOIN active_storage_blobs ON active_storage_blobs.id = active_storage_attachments.blob_id
      )
      UPDATE active_storage_blobs
         SET filename = update_visual_contexts.filename
        FROM update_visual_contexts
       WHERE update_visual_contexts.blob_id = active_storage_blobs.id
    SQL

    # Update physical components
    execute <<-SQL.squish
      WITH 
      update_physical_components AS (
        SELECT active_storage_blobs.id AS blob_id,
               'PhysicalComponent' || physical_components.id || '.' || SPLIT_PART(active_storage_blobs.filename, '.', -1) AS filename
          FROM physical_components
          JOIN attachments ON attachments.attachable_id = physical_components.id
                          AND attachments.attachable_type = 'PhysicalComponent'
          JOIN active_storage_attachments ON active_storage_attachments.record_id = attachments.id
                                         AND active_storage_attachments.record_type = 'Attachment'
                                         AND active_storage_attachments.name = 'file'
          JOIN active_storage_blobs ON active_storage_blobs.id = active_storage_attachments.blob_id
      )
      UPDATE active_storage_blobs
         SET filename = update_physical_components.filename
        FROM update_physical_components
       WHERE update_physical_components.blob_id = active_storage_blobs.id
    SQL

    # Update artworks
    execute <<-SQL.squish
      WITH 
      update_artworks AS (
        SELECT active_storage_blobs.id AS blob_id,
               'Artwork' || artworks.id || '-' || row_number() OVER (PARTITION BY artworks.id) || '.' || SPLIT_PART(active_storage_blobs.filename, '.', -1) AS filename
          FROM artworks
          JOIN attachments ON attachments.attachable_id = artworks.id
                          AND attachments.attachable_type = 'Artwork'
          JOIN active_storage_attachments ON active_storage_attachments.record_id = attachments.id
                                         AND active_storage_attachments.record_type = 'Attachment'
                                         AND active_storage_attachments.name = 'file'
          JOIN active_storage_blobs ON active_storage_blobs.id = active_storage_attachments.blob_id
      )
      UPDATE active_storage_blobs
         SET filename = update_artworks.filename
        FROM update_artworks
       WHERE update_artworks.blob_id = active_storage_blobs.id
    SQL

    # Update variants
    execute <<-SQL.squish
      WITH
      update_variants AS (
        SELECT variant_blobs.id AS blob_id, active_storage_blobs.filename AS filename
          FROM active_storage_blobs
          JOIN active_storage_variant_records ON active_storage_variant_records.blob_id = active_storage_blobs.id
          JOIN active_storage_attachments ON active_storage_attachments.record_id = active_storage_variant_records.id
                                         AND active_storage_attachments.record_type = 'ActiveStorage::VariantRecord'
          JOIN active_storage_blobs variant_blobs ON variant_blobs.id = active_storage_attachments.blob_id
      )
      UPDATE active_storage_blobs
         SET filename = update_variants.filename
        FROM update_variants
       WHERE update_variants.blob_id = active_storage_blobs.id
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
