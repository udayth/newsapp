class Api::V1::NewsController < ApplicationController
  def index
    news = News.all.order(created_at: :desc)
    render json: news
  end

  def create
    news = News.create!(news_params)
    if news
      render json: news
    else
      render json: news.errors
    end
  end

  def show
    if news
      render json: news
    else
      render json: news.errors
    end
  end

  def destroy
    news&.destroy
    render json: { message: 'News item deleted!' }
  end
  private

  def news_params
    params.permit(:title, :description, :author, :tags, :created_at, :updated_at)
  end
  def news
    @news ||= News.find(params[:id])
  end
end
