class Api::ActionsController < Api::BaseController
  # Preloads
  preloads :value_lists

  protected

  def base_query
    return Action.none unless params[:entity_id].present?

    # Subquery to find actions that involve the passed entity
    entity_query = Qualification
                     .where(Qualification.arel_table[:qualifiable_id].eq(Action.arel_table[:id]))
                     .where(qualifiable_type: Action.to_s)
                     .where(value_list_id: params[:entity_id])

    Action
      .where("id IN ( #{distinct_descriptors_sql} )")
      .where(entity_query.arel.exists)
  end

  private

  def distinct_descriptors_sql
    <<-SQL.squish
      WITH grouped_actions AS (
    SELECT qualifications.qualifiable_id AS action_id, array_agg(value_lists.id ORDER BY value_lists.id) AS value_list_ids
      FROM qualifications
      JOIN value_lists ON value_lists.id = qualifications.value_list_id
                      AND value_lists.object = 'Action'
                      AND value_lists.group = 'Characteristic'
     WHERE qualifications.qualifiable_type = 'Action'
     GROUP BY qualifications.qualifiable_id
    )
    SELECT MIN(action_id) AS id
      FROM grouped_actions
     GROUP BY value_list_ids
    SQL
  end
end
