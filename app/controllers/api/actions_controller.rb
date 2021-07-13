class Api::ActionsController < Api::BaseController
  preloads entity_qualifications: :value_list

  protected

  def base_query
    return Action.none unless params[:entity_id].present?

    value_lists_query = Qualification
                          .joins(:value_list)
                          .merge(ValueList.entity_description)
                          .where(qualifiable_type: Action.to_s)
                          .group(:value_list_id)
                          .select('DISTINCT MIN(qualifiable_id)')

    entity_query = Qualification
                     .where(Qualification.arel_table[:qualifiable_id].eq(Action.arel_table[:id]))
                     .where(qualifiable_type: Action.to_s)
                     .where(value_list_id: params[:entity_id])

    Action.where(id: value_lists_query).where(entity_query.arel.exists)
  end

end
