class FixTodoListItemAssociation < ActiveRecord::Migration[7.0]
  def change
    remove_column :todo_lists, :list_id
    add_column :todo_items, :todo_list_id, :int
  end
end
