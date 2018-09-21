class CreateBillboardCharts < ActiveRecord::Migration[5.2]
  def change
    create_table :billboard_charts do |t|
      t.date :chart_date 

      t.timestamps null: false
    end
  end
end
