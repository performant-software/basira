class ConvertLocationsOfFasteningsToValueList < ActiveRecord::Migration[6.0]
  def up
    execute <<-SQL.squish
        WITH fastening_documents AS ( 
      SELECT documents.id AS document_id, value_lists.id AS value_list_id
        FROM documents
        JOIN value_lists ON value_lists.OBJECT = 'Document'
                        AND value_lists.GROUP = 'Location of Fastenings'
                        AND LOWER(value_lists.human_name) = LOWER(documents.location_of_fastenings)
       WHERE location_of_fastenings IS NOT NULL
     )
    INSERT INTO qualifications (qualifiable_type, qualifiable_id, value_list_id)
    SELECT 'Document', document_id, value_list_id
      FROM fastening_documents
    SQL
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
