class Api::V1::LinksController < ApplicationController

  def create
    @link = Link.new

      if @link.save_link(link_params, current_user)
        render json: @link
      else
        render json: @link.errors.full_messages, status: 500
      end
  end

  def update
    @link = Link.find(params[:id])
    if @link.update_attributes(link_params)
      render json: @link
    else
      render json: @link.errors.full_messages, status: 500
    end
  end

  private

  def link_params
    params.permit(:read, :title, :url, :id, :status)
  end
end
