class BusinessEntity < ActiveRecord::Base

  # belongs_to :structure
  # belongs_to :legal_structure
  # belongs_to :status
  # belongs_to :collection_status
  # belongs_to :language
  # belongs_to :credit_limit_type
  # belongs_to :established_country, class_name: 'Country', foreign_key: :established_country_id
  # belongs_to :established_state, class_name: 'State', foreign_key: :established_state_id
  #
  # has_many :addresses, as: :addressable, dependent: :destroy, autosave: true
  # # has_one :primary_address, -> { where address_type: { name: 'Primary' } }, class_name: 'Address', as: :addressable
  # # has_one :secondary_address, -> { where address_type_id: 7 }, class_name: 'Address', as: :addressable
  # # has_one :billing_address, -> { where address_type_id: 2 }, class_name: 'Address', as: :addressable
  #
  # has_many :phones, as: :phoneable
  # # has_one :primary_phone, -> { where phone_type_id: 1 }, class_name: 'Phone', as: :phoneable
  # # has_one :mobile_phone, -> { where phone_type_id: 3 }, class_name: 'Phone', as: :phoneable
  # # has_one :work_phone, -> { where phone_type_id: 6 }, class_name: 'Phone', as: :phoneable
  #
  # has_many :email_addresses, as: :emailable, dependent: :destroy
  # # has_one :primary_email_address, -> { where email_address_type: 1 }, class_name: 'EmailAddress', as: :emailable
  #
  # # has_many :type_rels, class_name: 'EntityTypeRel', dependent: :delete_all
  # has_and_belongs_to_many :business_entity_types
  #
  # has_many :contacts, class_name: 'EntityContact', dependent: :destroy
  # has_one :primary_contact, -> { where entity_contact_type_id: 1 }, class_name: 'EntityContact'

  # has_many :names, class_name: 'EntityName', dependent: :destroy
  # has_one :primary_name, -> { where entity_name_type_id: 1 }, class_name: 'EntityName'
  # has_one :primary_short_name, -> { where entity_name_type_id: 4 }, class_name: 'EntityName'
  # has_one :primary_dba_name, -> { where entity_name_type_id: 2 }, class_name: 'EntityName'

end
