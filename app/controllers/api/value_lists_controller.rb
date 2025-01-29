class Api::ValueListsController < Api::BaseController
  # Search columns
  search_attributes :object, :group, :human_name, :comment

  # Preloads
  preloads :qualifications, only: [:index, :show]

  # Actions
  skip_before_action :authenticate_user!, only: :index

  def objects_list
    objects_list = ValueList
                     .all
                     .order(:object)
                     .distinct
                     .pluck(:object)

    render json: {
      objects: objects_list
    }
  end

  def groups_list
    groups_list = ValueList
                    .where(object: params[:object])
                    .order(:group)
                    .distinct
                    .pluck(:group)

    render json: {
      groups: groups_list
    }
  end

  protected

    def apply_filters(query)
      query = apply_search(query)
      query = apply_object_filter(query)
      query = apply_group_filter(query)
      query
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
