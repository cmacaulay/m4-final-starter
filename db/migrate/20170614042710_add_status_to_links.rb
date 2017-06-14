class AddStatusToLinks < ActiveRecord::Migration[5.0]
  def change
    add_column :links, :status, :integer, default: 0
  end
end
