# 0.2.6

* 주소 선택시 상세주소 초기화

  # 0.2.5

* Bootstrap 4.1 호환

  # 0.2.4

* 우편번호 찾기 서밋 버튼 disable-with option 제거

  # 0.2.3

* `zipcode_list_box` 스타일 클래스 업데이트

  # 0.2.2

* `iconv` 젬을 의존성 젬으로 등록함.

  # 0.2.1

* Bootstrap 용 will_paginate 젬을 의존성 젬에 등록함.
* will_paginate 젬에서 배열 요소를 페이징할 수 있도록 설정파일을 추가함.

  # 0.2.0

* Rails 5.1+ 호환성
* Bootstrap v4.0.0 호환 주소검색 모달 폼으로 업데이트
* 주소검색 결과 페이징 기능 추가

  # 0.1.3

* conv to iconv, jruby 호환 https://github.com/bayja/korean_zipcode_finder/issues/2
* original address 에서 산 00~00 형식 빼고 address_01 에 표시
* original address 에서 서울 성북구 성북동 145-(48~156)와 같은 복잡한 번지수 제거 후 표시

# 0.1.2

* encoding: utf-8 표시

# 0.1.1

* address_01 필드에 아파트 동 제거하고 표시 ex) "문촌마을 6 단지아파트 601~609 동" --> "문촌마을 6 단지아파트"
