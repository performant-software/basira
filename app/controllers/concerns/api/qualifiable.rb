module Api::Qualifiable
  extend ActiveSupport::Concern

  included do
    preloads qualifications: :value_list, only: :show

    def apply_sort(query)
      return super unless params[:sort_by_object].present? && params[:sort_by_group].present?

      if params[:sort_direction] == 'descending'
        sort_column = ValueList.arel_table[:human_name].desc
      else
        sort_column = ValueList.arel_table[:human_name].asc
      end

      query
        .joins(qualifications: :value_list)
        .where(value_lists: { object: params[:sort_by_object], group: params[:sort_by_group] })
        .order(sort_column)
    end
  end
end
