# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "korean_zipcode_finder/version"

Gem::Specification.new do |s|
  s.name        = "korean_zipcode_finder"
  s.version     = KoreanZipcodeFinder::VERSION
  s.authors     = ["KunHa"]
  s.email       = ["potato9@gmail.com"]
  s.homepage    = ""
  s.summary     = %q{Korean zipcode finder}
  s.description = %q{Korean zipcode finder}

  s.rubyforge_project = "korean_zipcode_finder"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  
  s.add_runtime_dependency 'nokogiri'
end
