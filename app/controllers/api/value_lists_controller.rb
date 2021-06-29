class Api::ValueListsController < Api::BaseController
  # Search columns
  search_attributes :table, :column_readable, :value, :comment

  # Preloads
  preloads :selections

  def index

    query = base_query
    query = build_query(query)
    query = apply_filters(query)
    query = apply_sort(query)

    if params[:search].present?
      query = apply_search(query)
    end

    list, items = pagy(query, items: params[:unpaginated].presence ? ValueList.all.count : 25, page: params[:page])
    metadata = pagy_metadata(list)

    serializer = serializer_class.new(current_user)
    serialized = items.map{ |i| serializer.render_index(i) }

    render json: {
      param_name.pluralize.to_sym => serialized,
      list: {
        count: metadata[:count],
        page: metadata[:page],
        pages: metadata[:pages]
      }
    }

  end

  def tables_list
    tables_list = Set.new(ValueList.all.pluck(:table).sort)

    render json: {
      tables: tables_list
    }
  end

  def columns_list
    columns_list = Set.new(ValueList.where(table: params[:table]).pluck(:column_readable).sort)

    render json: {
      columns: columns_list
    }
  end

  protected

    def apply_filters(query)
      query = apply_table_filter(query)
      query = apply_column_filter(query)
      query
    end

    def apply_search(query)
      return query unless params[:search].present?
      query_string = "#{self.class.search_attributes.map{|attr| attr + " ILIKE ?"}.join(" OR ")}"
      query_args = (self.class.search_attributes.count).times.map {"%#{params[:search]}%"}

      query.where(query_string, *query_args)
    end

    private

    def apply_table_filter(query)
      return query if params[:table_filter].blank?

      query.where(table: params[:table_filter])
    end

    def apply_column_filter(query)
      if params[:column_filter].presence
        query.where(column: params[:column_filter])
      elsif params[:column_readable_filter].presence
        query.where(column_readable: params[:column_readable_filter])
      else return
      end
    end

end
