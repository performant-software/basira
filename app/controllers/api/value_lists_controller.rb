class Api::ValueListsController < Api::BaseController
  # Search columns
  search_attributes 'value_lists.value'

  def index

    query = base_query
    query = build_query(query)

    # if params[:search].present?
    #   ValueList.find_by_sql((query))
    # end
    #
    # query = apply_filters(query)

    serializer = serializer_class.new
    serialized = query.map{ |i| serializer.render_index(i) }

    tables_list = Set.new(ValueList.all.pluck(:table).sort)

    render json: { param_name.pluralize.to_sym => serialized, list: { page: 1, pages: 1 }, tables: tables_list }

  end

  protected

  def apply_filters(query)
    query = filter_search(query)
    query
  end

    private

    def filter_search(query)
    return query if params[:search].blank?

    query.merge(
      ValueList.by_legal_formula(params[:search])
        .or(Canon.by_title(params[:search]))
    )
  end

end
