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
  
  def self.find_zipcode(dong_name)
    iconv = Iconv.new("euc-kr", "utf-8//IGNORE")
    keyword = iconv.conv(dong_name.strip)

    response = Net::HTTP.post_form URI.parse(Configuration::URL), {'regkey' => api_key, 'target' => 'post', 'query' => keyword}
    nodes = Nokogiri::XML(response.body).css("item")

    nodes.map do |node|
      original_address = node.css("address").text
      address = original_address.strip.sub(/\s(\d+)(~?)(\d+)(동|)\z/, "")
      zipcode = node.css("postcd").text
      zipcode_01 = zipcode[0..2]
      zipcode_02 = zipcode[-3..-1]

      Struct::KoreanZipcodeFinder.new(zipcode, zipcode_01, zipcode_02, address, original_address)
    end
  end
end
