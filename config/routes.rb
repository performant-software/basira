Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    
    resources :artworks do
      member do
        get :nested
      end
    end

    resources :documents, except: :index
    resources :home, only: :index
    resources :physical_components, except: :index
    resources :value_lists
    resources :visual_contexts, except: :index

    get 'value_lists_tables' => "value_lists#tables_list"
    get 'value_lists_columns' => "value_lists#columns_list"

  end

  # Default route for static front-end
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
