class AddListIdToTodoItems < ActiveRecord::Migration[7.0]
  def change
    add_column :todo_lists, :list_id, :int
  end
end
