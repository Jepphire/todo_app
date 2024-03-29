Rails.application.routes.draw do

  resources :todo_lists
  get 'todo_lists/user/:user_id', to: 'todo_lists#lists_where'

  resources :todo_items
  get 'todo_items/items/:todo_list_id', to: 'todo_items#items_where'

  resources :users

  post 'auth/login', to: 'authentication#login'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
