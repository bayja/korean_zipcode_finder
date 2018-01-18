Korean Zipcode Finder
=====================

* 인터넷 우체국 제공 우편번호 찾기 API를 사용한 우편번호 찾기 gem
* http://biz.epost.go.kr/eportal/custom/custom_10.jsp?subGubun=sub_4&subGubun_1=cum_20


사용법 (Usage)
-----------

* gem 설치
* 인터넷우체국에서 api_key를 발급
* api_key config설정에 추가

``` ruby
gem install korean_zipcode_finder

KoreanZipcodeFinder.configure do |config|
  config.api_key = "#{YOUR_API_KEY}"
end

KoreanZipcodeFinder.find_zipcode('망원동')
```


Rails 3 Engine
--------------

**기본 설정**

* Gemfile에 추가
* Rails config 폴더에 api_key config 추가 (위의 경우와 동일)
* application.js / application.css.scss 에서 파일 로드

``` javascript
//= require korean_zipcode_finder/core
```

``` css
*= require korean_zipcode_finder/core
```

**twitter bootstrap 호환**
* twitter bootstrap를 사용하는 경우에는 css파일을 include할 필요 없음.
* core.css 파일은 twitter bootstrap의 기본 설정 중 필요한 것만 가져온 파일임.
* (팝업용 스크립트는 bootstrap것을 사용하지 않음)

**html 마크업**

* ".address_area" class를 가진 wrapper 속에 ".zipcode_01", ".zipcode_02", ".address_01" 클라스를 가진 text_area 생성
* ".find_zipcode_btn" class를 가진 우편번호 찾기 링크

``` html
<div class="address_area">
  <%= f.label :address %> <br />
  <%= f.text_field :zipcode_01, :class => "zipcode_01" %> - <%= f.text_field :zipcode_02, :class => "zipcode_02" %> <%= link_to '우편번호 찾기', '#', :class => "find_zipcode_btn" %><br />
  <%= f.text_field :address_01, :class => "address_01" %> <br />
  <%= f.text_field :address_02, :class => "address_02" %>
</div>
```

**적용하기**

``` javascript
new KoreanZipcodeFinder;
``` 

