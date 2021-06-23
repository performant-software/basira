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
    resources :visual_contexts, except: :index
  end

  # Default route for static front-end
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
