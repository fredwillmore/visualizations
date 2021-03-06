# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_04_17_165321) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "asteroids", force: :cascade do |t|
    t.string "full_name"
    t.decimal "a", precision: 16, scale: 8
    t.decimal "e", precision: 16, scale: 8
    t.decimal "i", precision: 16, scale: 8
    t.decimal "om", precision: 16, scale: 8
    t.decimal "w", precision: 16, scale: 8
    t.decimal "q", precision: 16, scale: 8
    t.decimal "ad", precision: 16, scale: 8
    t.decimal "per_y", precision: 16, scale: 8
    t.integer "data_arc"
    t.integer "condition_code"
    t.integer "n_obs_used"
    t.integer "n_del_obs_used"
    t.integer "n_dop_obs_used"
    t.decimal "h", precision: 16, scale: 8
    t.decimal "diameter", precision: 16, scale: 8
    t.string "extent"
    t.decimal "albedo", precision: 16, scale: 8
    t.decimal "rot_per", precision: 16, scale: 8
    t.decimal "gm", precision: 16, scale: 8
    t.decimal "bv", precision: 16, scale: 8
    t.decimal "ub", precision: 16, scale: 8
    t.string "spec_b"
    t.string "spec_t"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "density", precision: 8, scale: 8
  end

  create_table "billboard_artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "billboard_chart_entries", force: :cascade do |t|
    t.integer "position"
    t.integer "last_week_position"
    t.integer "peak_position"
    t.integer "weeks_on_chart"
    t.bigint "billboard_track_id"
    t.date "chart_entry_date"
    t.integer "entry_position"
    t.integer "overall_peak_position"
    t.integer "overall_weeks_on_chart"
    t.bigint "billboard_chart_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["billboard_chart_id"], name: "index_billboard_chart_entries_on_billboard_chart_id"
    t.index ["billboard_track_id"], name: "index_billboard_chart_entries_on_billboard_track_id"
  end

  create_table "billboard_charts", force: :cascade do |t|
    t.date "chart_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "billboard_tracks", force: :cascade do |t|
    t.string "name"
    t.bigint "billboard_artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["billboard_artist_id"], name: "index_billboard_tracks_on_billboard_artist_id"
  end

  create_table "business_entities", force: :cascade do |t|
    t.string "structure"
    t.string "status"
    t.string "collection_status"
    t.string "language"
    t.string "established_country"
    t.string "established_state"
    t.string "address_street"
    t.string "address_street2"
    t.string "address_city"
    t.string "address_state"
    t.string "address_country"
    t.string "address_postal_code"
    t.string "phone_number"
    t.string "email_address"
    t.string "business_entity_name"
  end

  create_table "comets", force: :cascade do |t|
    t.string "full_name"
    t.decimal "e", precision: 16, scale: 8
    t.decimal "q", precision: 16, scale: 8
    t.decimal "i", precision: 16, scale: 8
    t.decimal "om", precision: 16, scale: 8
    t.decimal "w", precision: 16, scale: 8
    t.decimal "ad", precision: 16, scale: 8
    t.decimal "tp_cal", precision: 16, scale: 8
    t.decimal "per_y", precision: 16, scale: 8
    t.string "comet_class"
    t.integer "data_arc"
    t.integer "condition_code"
    t.integer "n_obs_used"
    t.string "two_body"
    t.decimal "a1", precision: 16, scale: 8
    t.decimal "a2", precision: 16, scale: 8
    t.decimal "a3", precision: 16, scale: 8
    t.decimal "dt", precision: 16, scale: 8
    t.decimal "m1", precision: 16, scale: 8
    t.integer "k1"
    t.decimal "m2", precision: 16, scale: 8
    t.integer "k2"
    t.decimal "pc", precision: 16, scale: 8
    t.decimal "diameter", precision: 16, scale: 8
    t.string "extent"
    t.decimal "albedo", precision: 16, scale: 8
    t.decimal "rot_per", precision: 16, scale: 8
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "score_categories", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.string "description"
    t.bigint "scores_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["scores_id"], name: "index_score_categories_on_scores_id"
  end

  create_table "score_items", force: :cascade do |t|
    t.bigint "score_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["score_id"], name: "index_score_items_on_score_id"
  end

  create_table "scores", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "score_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["score_category_id"], name: "index_scores_on_score_category_id"
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "billboard_tracks", "billboard_artists"
end
