# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20170319172551) do

  create_table "asteroids", force: :cascade do |t|
    t.string   "full_name"
    t.decimal  "a",              precision: 16, scale: 16
    t.decimal  "e",              precision: 16, scale: 16
    t.decimal  "i",              precision: 16, scale: 16
    t.decimal  "om",             precision: 16, scale: 16
    t.decimal  "w",              precision: 16, scale: 16
    t.decimal  "q",              precision: 16, scale: 16
    t.decimal  "ad",             precision: 16, scale: 16
    t.decimal  "per_y",          precision: 16, scale: 16
    t.integer  "data_arc"
    t.integer  "condition_code"
    t.integer  "n_obs_used"
    t.integer  "n_del_obs_used"
    t.integer  "n_dop_obs_used"
    t.decimal  "h",              precision: 8,  scale: 8
    t.decimal  "diameter",       precision: 8,  scale: 8
    t.string   "extent"
    t.decimal  "albedo",         precision: 8,  scale: 8
    t.decimal  "rot_per",        precision: 8,  scale: 8
    t.decimal  "gm",             precision: 8,  scale: 8
    t.decimal  "bv",             precision: 8,  scale: 8
    t.decimal  "ub",             precision: 8,  scale: 8
    t.string   "spec_b"
    t.string   "spec_t"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.decimal  "density",        precision: 8,  scale: 8
  end

  create_table "business_entities", force: :cascade do |t|
    t.string "structure"
    t.string "legal_structure"
    t.string "status"
    t.string "collection_status"
    t.string "language"
    t.string "credit_limit_type"
    t.string "established_country"
    t.string "established_state"
    t.string "address_street"
    t.string "address_street2"
    t.string "address_city"
    t.string "address_state"
    t.string "address_country"
    t.string "address_postal_code"
    t.string "phone_country_code"
    t.string "phone_number"
    t.string "email_address"
    t.string "business_entity_type"
    t.string "business_entity_name"
  end

  create_table "comets", force: :cascade do |t|
    t.string   "full_name"
    t.decimal  "e",              precision: 16, scale: 16
    t.decimal  "q",              precision: 16, scale: 16
    t.decimal  "i",              precision: 16, scale: 16
    t.decimal  "om",             precision: 16, scale: 16
    t.decimal  "w",              precision: 16, scale: 16
    t.decimal  "ad",             precision: 16, scale: 16
    t.decimal  "tp_cal",         precision: 16, scale: 16
    t.decimal  "per_y",          precision: 16, scale: 16
    t.string   "comet_class"
    t.integer  "data_arc"
    t.integer  "condition_code"
    t.integer  "n_obs_used"
    t.string   "two_body"
    t.decimal  "a1",             precision: 16, scale: 16
    t.decimal  "a2",             precision: 16, scale: 16
    t.decimal  "a3",             precision: 16, scale: 16
    t.decimal  "dt",             precision: 16, scale: 16
    t.decimal  "m1",             precision: 8,  scale: 8
    t.integer  "k1"
    t.decimal  "m2",             precision: 8,  scale: 8
    t.integer  "k2"
    t.decimal  "pc",             precision: 8,  scale: 8
    t.decimal  "diameter",       precision: 8,  scale: 8
    t.string   "extent"
    t.decimal  "albedo",         precision: 8,  scale: 8
    t.decimal  "rot_per",        precision: 8,  scale: 8
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

end
