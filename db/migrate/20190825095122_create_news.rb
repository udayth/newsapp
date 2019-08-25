class CreateNews < ActiveRecord::Migration[5.2]
  def change
    create_table :news do |t|
      t.text :title
      t.text :description
      t.text :author
      t.text :tags
      t.string :created_at
      t.string :updated_at

      t.timestamps
    end
  end
end
