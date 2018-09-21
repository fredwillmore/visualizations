class CreateBusinessEntity < ActiveRecord::Migration[5.2]
  def change
    create_table :business_entities do |t|
      t.string :structure
      t.string :status
      t.string :collection_status
      t.string :language
      t.string :established_country
      t.string :established_state
      t.string :address_street
      t.string :address_street2
      t.string :address_city
      t.string :address_state
      t.string :address_country
      t.string :address_postal_code
      t.string :phone_number
      t.string :email_address
      t.string :business_entity_name
    end
  end
end
