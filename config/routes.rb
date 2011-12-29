Rails.application.routes.draw do
  match '/korean_zipcode_finder/zipcodes/new' => 'korean_zipcode_finder/zipcodes#new'
  match '/korean_zipcode_finder/zipcodes/search' => 'korean_zipcode_finder/zipcodes#search'
end