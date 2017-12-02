class MessagesController < ApplicationController
  def index
    messages = Message.all
    ActionCable.server.broadcast 'room_channel',  {messages: messages}
  end

  def create
    message = Message.create(content: params[:message][:content])
    ActionCable.server.broadcast 'room_channel', {new_message: message}
  end
end
