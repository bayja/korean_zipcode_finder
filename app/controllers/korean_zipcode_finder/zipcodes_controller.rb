# encoding: utf-8

module KoreanZipcodeFinder

  class ZipcodesController < ApplicationController
    layout false

    def new
   		render 'new'
    end

    def search
      @zipcodes, page_info = KoreanZipcodeFinder.find_zipcode(params[:dong], params[:currentPage], params[:countPerPage] || 10)
      pages = []
      page_info[:totalPage].to_i.times do |page|
        pages << page
      end
      Rails.logger.debug pages
      @pages = pages.paginate(page: params[:currentPage], per_page: params[:countPerPage])
    end
  end
end
