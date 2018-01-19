var KoreanZipcodeFinder;

KoreanZipcodeFinder = (function() {
  // constructor
  function KoreanZipcodeFinder() {
    this.init = $.proxy(this.init, this);
    this.zipcode_selected_handler = $.proxy(this.zipcode_selected_handler, this);
    this.find_zipcode_handler = $.proxy(this.find_zipcode_handler, this);
    // this.close_modal_handler = $.proxy(this.close_modal_handler, this);
    // this.escape_pressed_handler = $.proxy(this.escape_pressed_handler, this);
    this.paging_handler = $.proxy(this.paging_handler, this);

    $(document).on("focus", ".address_area .zipcode", this.init);
    $(document).on("focus", ".address_area .zipcode_01", this.init);
    $(document).on("focus", ".address_area .zipcode_02", this.init);
    $(document).on("click", ".address_area .find_zipcode_btn", this.init);

    $(document).on("submit", ".korean_zipcode_finder_modal_wrapper .find_zipcode_form", this.find_zipcode_handler);
    $(document).on("click", ".korean_zipcode_finder_modal_wrapper .zipcode_select", this.zipcode_selected_handler);
    // $(document).on("click", ".korean_zipcode_finder_modal_wrapper .close_modal_popup", this.close_modal_handler);
    $(document).on("click", ".korean_zipcode_finder_modal_wrapper a.page-link", this.paging_handler);
  }

  KoreanZipcodeFinder.prototype.init = function(e) {
    // address_ares 등록
    this.current_address_area = $(e.target).closest(".address_area");

    // zipcode modal 띄우기
    // $('body').append( $('<div/>', {'class': 'modal-backdrop'}) );
    $.get("/korean_zipcode_finder/zipcodes/new", function(html) {
      $("body").append(html);
      $("#zipcodeModalCenter").modal();
    });
    $("#dong").focus();

    // escape key handler
    // $(document).on('keydown', this.escape_pressed_handler );
    e.preventDefault();
  };

  // modal event handers
  // KoreanZipcodeFinder.prototype.close_modal_handler = function(e) {
  //   // $(".modal-backdrop").remove();
  //   $(".korean_zipcode_finder_modal_wrapper").remove();
  //   $(document).off('keydown');
  //   e.preventDefault();
  // };

  // KoreanZipcodeFinder.prototype.escape_pressed_handler = function(e) {
  //   if (e.keyCode == 27 ) { this.close_modal_handler(e) }
  // };

  KoreanZipcodeFinder.prototype.find_zipcode_handler = function(e) {
    $.get($(e.target).attr('action'), $(e.target).serialize(), function(html) {
      $(".zipcode_list_box").empty().append(html);
    });
    e.preventDefault();
  };

  KoreanZipcodeFinder.prototype.zipcode_selected_handler = function(e) {
    // .data() method를 사용할 경우 zipcode값이 integer로 들어온다. 001이 1로 들어옴
    var zipcode    = $(e.target).attr('data-zipcode');
    var zipcode_01 = $(e.target).attr('data-zipcode01');
    var zipcode_02 = $(e.target).attr('data-zipcode02');
    var address_01 = $(e.target).attr('data-address01');

    this.current_address_area.find(".zipcode").val(zipcode);
    this.current_address_area.find(".zipcode_01").val(zipcode_01);
    this.current_address_area.find(".zipcode_02").val(zipcode_02);
    this.current_address_area.find(".address_01").val(address_01);

    // this.close_modal_handler(e);
  };

  KoreanZipcodeFinder.prototype.paging_handler = function(e) {
    var countPerPage = $(e.target)[0].href.split('?').pop().split("&").find(function(ele){return ele.split('=')[0] == 'countPerPage'});
    var currentPage = $(e.target)[0].href.split('?').pop().split("&").find(function(ele){return ele.split('=')[0] == 'page'})
    var zipcode_form = $(".find_zipcode_form");
    if (currentPage === undefined) {
        currentPage = "1";
    } else {
      currentPage = currentPage.split('=')[1]
    }
    if (countPerPage === undefined) {
        countPerPage = "10";
    } else {
        countPerPage = countPerPage.split('=')[1]
    }

    $.get(zipcode_form.attr('action') + "?currentPage=" + currentPage + "&countPerPage=" + countPerPage, zipcode_form.serialize(), function(html) {
        $(".zipcode_list_box").empty().append(html);
    });
    e.preventDefault();
  };

  return KoreanZipcodeFinder;
})();
