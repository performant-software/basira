class AddFormFieldToQualifications < ActiveRecord::Migration[6.0]
  def change
    add_column :qualifications, :form_field, :string, default: ''
  end
end
