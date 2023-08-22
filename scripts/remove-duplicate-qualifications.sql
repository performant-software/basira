-- This SQL script will remove any "qualifications" records that are linked to the same "value_lists" for
-- a single qualifiable record.
  WITH duplicate_qualifications AS (
SELECT qualifications.qualifiable_id,
       qualifications.qualifiable_type,
       qualifications.form_field,
       qualifications.value_list_id,
       value_lists.object,
       value_lists.group,
       value_lists.human_name,
       COUNT(*),
       MIN(qualifications.id) AS min_id
  FROM qualifications
  JOIN value_lists ON value_lists.id = qualifications.value_list_id
 GROUP BY qualifications.qualifiable_id,
          qualifications.qualifiable_type,
          qualifications.form_field,
          qualifications.value_list_id,
          value_lists.object,
          value_lists.group,
          value_lists.human_name
   HAVING COUNT(*) > 1
    ORDER BY qualifications.qualifiable_id,
             qualifications.qualifiable_type,
             qualifications.value_list_id,
             value_lists.object,
             value_lists.group,
             value_lists.human_name
)
DELETE
  FROM qualifications
 USING duplicate_qualifications
 WHERE qualifications.qualifiable_id = duplicate_qualifications.qualifiable_id
   AND qualifications.qualifiable_type = duplicate_qualifications.qualifiable_type
   AND qualifications.form_field = duplicate_qualifications.form_field
   AND qualifications.value_list_id = duplicate_qualifications.value_list_id
   AND qualifications.id != duplicate_qualifications.min_id
;
