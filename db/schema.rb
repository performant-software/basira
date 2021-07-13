# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_13_051839) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "artwork_titles", force: :cascade do |t|
    t.bigint "artwork_id", null: false
    t.string "title"
    t.string "title_type"
    t.boolean "primary", default: false, null: false
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["artwork_id"], name: "index_artwork_titles_on_artwork_id"
  end

  create_table "artworks", force: :cascade do |t|
    t.string "date_descriptor"
    t.integer "date_start"
    t.integer "date_end"
    t.integer "height", default: 0, null: false
    t.integer "width", default: 0, null: false
    t.integer "depth", default: 0, null: false
    t.text "notes_external"
    t.text "notes_internal"
    t.boolean "published", default: false, null: false
    t.string "repository_work_url"
    t.string "accession_number"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "attachments", force: :cascade do |t|
    t.string "attachable_type", null: false
    t.bigint "attachable_id", null: false
    t.boolean "primary", default: false, null: false
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attachable_type", "attachable_id"], name: "index_attachments_on_attachable_type_and_attachable_id"
  end

  create_table "documents", force: :cascade do |t|
    t.bigint "visual_context_id", null: false
    t.string "name"
    t.string "notes"
    t.boolean "sewing_supports_visible", default: false
    t.integer "number_sewing_supports"
    t.integer "number_fastenings"
    t.text "location_of_fastenings"
    t.boolean "inscriptions_on_binding", default: false
    t.text "inscription_text"
    t.boolean "endband_present", default: false
    t.boolean "uncut_fore_edges", default: false
    t.text "fore_edge_text"
    t.integer "bookmarks_registers", default: 0
    t.integer "text_columns", default: 1
    t.boolean "ruling", default: false
    t.boolean "rubrication", default: false
    t.text "identity"
    t.text "transcription"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["visual_context_id"], name: "index_documents_on_visual_context_id"
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.string "locateable_type", null: false
    t.bigint "locateable_id", null: false
    t.string "role"
    t.string "subrole"
    t.text "description"
    t.integer "certainty"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["locateable_type", "locateable_id"], name: "index_locations_on_locateable_type_and_locateable_id"
    t.index ["place_id"], name: "index_locations_on_place_id"
  end

  create_table "participations", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.string "participateable_type", null: false
    t.bigint "participateable_id", null: false
    t.string "role"
    t.string "subrole"
    t.text "description"
    t.integer "certainty"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["participateable_type", "participateable_id"], name: "index_participations_participateable_type_and_id"
    t.index ["person_id"], name: "index_participations_on_person_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.string "person_type"
    t.string "nationality"
    t.string "authorized_vocabulary"
    t.string "url"
    t.string "database_value"
    t.string "comment"
    t.integer "part_of"
    t.integer "same_as"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "physical_components", force: :cascade do |t|
    t.bigint "artwork_id", null: false
    t.string "name"
    t.integer "height"
    t.integer "width"
    t.integer "depth"
    t.string "notes"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["artwork_id"], name: "index_physical_components_on_artwork_id"
  end

  create_table "places", force: :cascade do |t|
    t.string "name"
    t.string "place_type"
    t.float "lat"
    t.float "long"
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "url"
    t.string "database_value"
    t.text "notes"
    t.integer "same_as"
    t.integer "part_of"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "qualifications", force: :cascade do |t|
    t.string "qualifiable_type"
    t.bigint "qualifiable_id"
    t.bigint "value_list_id"
    t.json "notes"
    t.boolean "persistent", default: false, null: false
    t.string "form_field", default: ""
    t.index ["qualifiable_type", "qualifiable_id"], name: "index_qualifications_on_qualifiable_type_and_qualifiable_id"
    t.index ["value_list_id"], name: "index_qualifications_on_value_list_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "value_lists", force: :cascade do |t|
    t.string "object"
    t.string "group"
    t.string "human_name"
    t.string "url_database_value"
    t.json "comment"
    t.string "authorized_vocabulary"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "qualifications_count", default: 0, null: false
  end

  create_table "visual_contexts", force: :cascade do |t|
    t.bigint "physical_component_id", null: false
    t.string "name"
    t.integer "height"
    t.integer "width"
    t.integer "depth"
    t.string "notes"
    t.string "airtable_id"
    t.datetime "airtable_timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "beta", default: false, null: false
    t.index ["physical_component_id"], name: "index_visual_contexts_on_physical_component_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "artwork_titles", "artworks"
  add_foreign_key "documents", "visual_contexts"
  add_foreign_key "locations", "places"
  add_foreign_key "participations", "people"
  add_foreign_key "physical_components", "artworks"
  add_foreign_key "visual_contexts", "physical_components"
end
