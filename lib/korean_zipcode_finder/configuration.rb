# encoding: utf-8

module KoreanZipcodeFinder
  module Configuration
    URL = "http://biz.epost.go.kr/KpostPortal/openapi"
    
    attr_accessor :api_key, :twitter_bootstrap
    
    def configure
      yield self
    end
  end
end
