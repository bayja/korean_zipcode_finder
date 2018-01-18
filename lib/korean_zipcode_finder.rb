# encoding: utf-8

require "korean_zipcode_finder/version"
require 'korean_zipcode_finder/configuration'
require 'engine' if defined?(Rails)

require 'net/http'
require 'open-uri'
require 'iconv'
require 'nokogiri'


module KoreanZipcodeFinder
  extend Configuration
  Struct.new("KoreanZipcodeFinder", "zipcode", "zipcode_01", "zipcode_02", "address", "original_address")

  def self.find_zipcode(dong_name, page = 1, per_page = 10)
    keyword = Iconv.new("euc-kr", "utf-8//IGNORE").iconv(dong_name.strip)

    response = Net::HTTP.post_form URI.parse(Configuration::URL), {'regkey': api_key, 'target': 'postNew', 'query': keyword, 'currentPage': page, 'countPerPage': per_page }

    page_info = {
        totalCount: Nokogiri::XML(response.body).css("totalCount").text,
        totalPage: Nokogiri::XML(response.body).css("totalPage").text,
        countPerPage: Nokogiri::XML(response.body).css("countPerPage").text,
        currentPage: Nokogiri::XML(response.body).css("currentPage").text
    }
    # Rails.logger.debug page_info

    nodes = Nokogiri::XML(response.body).css("item")

    zipcodes = nodes.map do |node|
      original_address = node.css("address").text
      address = original_address.strip.sub(/\s(산|)(\d+)(~?)(\d+)(동|)\z/, "").sub(/\s(\d+)(-?)\((\d+)(~?)(\d+)\)\z/, "")
      zipcode = node.css("postcd").text
      zipcode_01 = zipcode[0..2]
      zipcode_02 = zipcode[-3..-1]

      Struct::KoreanZipcodeFinder.new(zipcode, zipcode_01, zipcode_02, address, original_address)
    end

    return zipcodes, page_info
  end
end