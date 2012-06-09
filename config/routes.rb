Rails.application.routes.draw do
  match '/korean_zipcode_finder/zipcodes/new' => 'korean_zipcode_finder/zipcodes#new'
  match '/korean_zipcode_finder/zipcodes/search' => 'korean_zipcode_finder/zipcodes#search'
  match '/korean_zipcode_finder/add_bootstrap_css' => 'korean_zipcode_finder/zipcodes#add_bootstrap_css'
end