namespace :solr do
  desc "Index BASIRA documents into Solr"
  task index: :environment do
    if ENV["SOLR_URL"]
      solr = RSolr.connect(url: ENV["SOLR_URL"])

      value_lists = ValueList.group(:object, :group).pluck(:object, :group)

      value_list_fields = {}

      # Create a hash for quick lookup of which fields
      # to index for each item.
      value_lists.each do |vl|
        if !value_list_fields[vl[0]]
          value_list_fields[vl[0]] = [vl[1]]
        else
          value_list_fields[vl[0]].push vl[1]
        end
      end

      docs_to_index = []

      def add_docs(solr, docs)
        id_range = [docs[0]['id'], docs[docs.length - 1]['id']]

        solr.add docs

        if id_range[0] == id_range[1]
          puts "Added document #{id_range[0]}"
        else
          puts "Added documents #{id_range[0]} - #{id_range[1]}"
        end
      end

      Document.preload(
        primary_attachment: { file_attachment: :blob} ,
        actions: { qualifications: :value_list },
        visual_context: {
          primary_attachment: { file_attachment: :blob },
          physical_component: { primary_attachment: { file_attachment: :blob } },
          qualifications: :value_list
        },
        artwork: {
          primary_attachment: { file_attachment: :blob },
          artwork_titles: { qualifications: :value_list },
          participations: {
            qualifications: :value_list,
            person: { qualifications: :value_list } },
          locations: [:place, qualifications: :value_list],
          qualifications: :value_list
        },
        qualifications: :value_list
      ).find_each(batch_size: 250).with_index do |doc, index|
        docs_to_index.push(doc.to_solr(value_list_fields, 'Document'))

        # Batch calls to solr to prevent memory issues
        if (index > 1 && index % 100 == 0)
          add_docs(solr, docs_to_index)
          docs_to_index = []
        end
      end

      # Finish up the remainder
      add_docs(solr, docs_to_index)

      solr.commit
      puts "Documents committed!"
    else
      raise "Missing the SOLR_URL environment variable"
    end
  end
end
