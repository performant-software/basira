module Indexable
  extend ActiveSupport::Concern

  # For auto-detecting suffixes in value list fields
  SUFFIXES = {
    'String': "_ssi",
    'Integer': "_isi",
    'Float': "_fsi",
    'Boolean': "_bsi",
  }

  def to_solr(omit_value_list_suffixes = false)
    model = self.class

    prefix = "#{self.class.name.underscore}_"

    unless model.attributes_to_index.empty?
      solr_obj = {}

      # Index the regular record attributes
      model.attributes_to_index.each do |key, suffix|
        if suffix
          solr_obj["#{prefix}#{key}_#{suffix}"] = self[key]
        else
          solr_obj["#{prefix}#{key}"] = self[key]
        end
      end

      # Index value list attributes
      if model.method_defined?(:value_lists)
        self.value_lists.each do |vl|
          if omit_value_list_suffixes
            suffix = ''
          else
            suffix = SUFFIXES[vl[:human_name].class.to_s.to_sym]
          end

          if suffix
            # Example key: visual_context_general_subject_genre_ssi
            solr_obj["#{prefix}#{vl[:group].downcase.gsub(/[^0-9a-z]/i, "_")}#{suffix}"] = vl[:human_name]
          end
        end
      end

      solr_obj
    end
  end

  class << self
    def included(base)
      base.extend ClassMethods
    end
  end

  module ClassMethods
    def attributes_to_index(*attrs)
      @attributes_to_index ||= []
      @attributes_to_index += attrs
      @attributes_to_index[0]
    end
  end
end
