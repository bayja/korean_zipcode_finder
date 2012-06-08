# encoding: utf-8

module KoreanZipcodeFinder
  class ZipcodesController < ApplicationController
    layout false
    
    def new
   		render 'new'
    end

    def search
      @zipcodes = KoreanZipcodeFinder.find_zipcode(params[:dong])
    end
  end
end