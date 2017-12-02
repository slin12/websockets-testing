Rails.application.routes.draw do
  mount ActionCable.server, at: '/cable'

  get '/messages', to: 'messages#index'
  post '/messages', to: 'messages#create'
end
