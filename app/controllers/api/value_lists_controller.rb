class Api::ValueListsController < Api::BaseController
  # Search columns
  search_attributes :object, :group, :human_value, :comment

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

  def objects_list
    objects_list = Set.new(ValueList.all.pluck(:object).sort)

    render json: {
      objects: objects_list
    }
  end

  def groups_list
    groups_list = Set.new(ValueList.where(object: params[:object]).pluck(:group).sort)

    render json: {
      groups: groups_list
    }
  end

  protected

    def apply_filters(query)
      query = apply_object_filter(query)
      query = apply_group_filter(query)
      query
    end

    def apply_search(query)
      return query unless params[:search].present?
      query_string = "#{self.class.search_attributes.map{|attr| attr + " ILIKE ?"}.join(" OR ")}"
      query_args = (self.class.search_attributes.count).times.map {"%#{params[:search]}%"}

      query.where(query_string, *query_args)
    end

    private

    def apply_object_filter(query)
      return query if params[:object_filter].blank?

      query.where(object: params[:object_filter])
    end

    def apply_group_filter(query)
      return query if params[:group_filter].blank?

      query.where(group: params[:group_filter])
    end

end
