class CreateBillboardCharts < ActiveRecord::Migration
  def change
    create_table :billboard_charts do |t|
      t.date :chart_date 

      t.timestamps null: false
    end
  end
end
