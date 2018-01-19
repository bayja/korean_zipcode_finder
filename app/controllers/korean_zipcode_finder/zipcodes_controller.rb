# encoding: utf-8

module KoreanZipcodeFinder

  class ZipcodesController < ApplicationController
    layout false

    def new
   		render 'new'
    end

    def search
      currentPage = params[:currentPage] || 1
      countPerPage = params[:countPerPage] || 10
      @zipcodes, page_info = KoreanZipcodeFinder.find_zipcode(params[:dong], currentPage, countPerPage)
      pages = [*1..page_info[:totalPage].to_i]
      @pages = pages.paginate(page: currentPage, per_page: countPerPage)
    end
  end
end
