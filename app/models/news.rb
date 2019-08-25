class News < ApplicationRecord
    validates :title, presence: true
    validates :description, presence: true
    validates :author, presence: true
    validates :tags, presence: true
end