class CreateBillboardChartEntries < ActiveRecord::Migration
  def change
    create_table :billboard_chart_entries do |t|
      t.integer :position
      t.integer :last_week_position
      t.integer :peak_position
      t.integer :weeks_on_chart
      t.belongs_to :billboard_track
      t.date :chart_entry_date
      t.integer :entry_position
      t.integer :overall_peak_position
      t.integer :overall_weeks_on_chart
      t.belongs_to :billboard_chart

      t.timestamps null: false
    end
  end
end
