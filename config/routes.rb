Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'news/index'
      post 'news/create'
      get '/show/:id', to: 'news#show'
      delete '/destroy/:id', to: 'news#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
