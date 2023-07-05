class RemoveParticipationAndLocationRoles < ActiveRecord::Migration[6.0]
  def change
    remove_column :participations, :role, :string
    remove_column :participations, :subrole, :string
    remove_column :locations, :subrole, :string
  end
end
