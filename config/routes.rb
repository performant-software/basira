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
    resources :people
    resources :physical_components, except: :index
    resources :places
    resources :value_lists
    resources :visual_contexts, except: :index
    resources :users

    get 'authorized_vocabularies' => "value_lists#authorized_vocabularies"
    get 'value_lists_groups' => "value_lists#groups_list"
    get 'value_lists_objects' => "value_lists#objects_list"
  end

  # Default route for static front-end
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
