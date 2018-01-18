Rails.application.routes.draw do
  get '/korean_zipcode_finder/zipcodes/new' => 'korean_zipcode_finder/zipcodes#new'
  get '/korean_zipcode_finder/zipcodes/search' => 'korean_zipcode_finder/zipcodes#search'
  get '/korean_zipcode_finder/add_bootstrap_css' => 'korean_zipcode_finder/zipcodes#add_bootstrap_css'
end