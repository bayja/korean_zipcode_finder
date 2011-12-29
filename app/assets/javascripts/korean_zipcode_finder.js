$(function() {
  new KoreanZipcodeFinder;
});

var KoreanZipcodeFinder;

KoreanZipcodeFinder = (function() {
  // constructor
  function KoreanZipcodeFinder() {
    this.init = $.proxy(this.init, this);
    this.zipcode_selected_handler = $.proxy(this.zipcode_selected_handler, this);
    this.find_zipcode_handler = $.proxy(this.find_zipcode_handler, this);
    this.close_modal_handler = $.proxy(this.close_modal_handler, this);
    this.escape_pressed_handler = $.proxy(this.escape_pressed_handler, this);

    $(".address_area .zipcode_01").live('click', this.init );
    $(".address_area .zipcode_02").live('click', this.init );
    $(".address_area .find_zipcode_btn").live('click', this.init );

    $(".modal_wrapper .find_zipcode_form").live("submit", this.find_zipcode_handler );
    $(".modal_wrapper .zipcode_select").live("click", this.zipcode_selected_handler );
    $(".modal_wrapper .close_modal_popup").live('click', this.close_modal_handler );
  }

  KoreanZipcodeFinder.prototype.init = function(e) {
    // address_ares 등록
    this.current_address_area = $(e.target).closest(".address_area");
    
    // zipcode modal 띄우기
    $('body').append( $('<div/>', {'class': 'modal_bg'}) );
    $.get("/korean_zipcode_finder/zipcodes/new", function(data) { 
      $('body').append( $('<div/>', {'class': 'modal_wrapper'}) );
      $(".modal_wrapper").append(data);
    });
    
    // escape key handler
    $(document).on('keydown', this.escape_pressed_handler );
    e.preventDefault();
  }
  
  
  // modal event handers
  KoreanZipcodeFinder.prototype.close_modal_handler = function(e) {
    $(".modal_bg").remove();
    $(".modal_wrapper").remove();
    $(document).off('keydown');
    e.preventDefault();
  }
  
  KoreanZipcodeFinder.prototype.escape_pressed_handler = function(e) {
    if (e.keyCode == 27 ) { this.close_modal_handler(e) }
  }

  KoreanZipcodeFinder.prototype.find_zipcode_handler = function(e) {
    $.get($(e.target).attr('action'), $(e.target).serialize(), function(data) {
      $(".zipcode_list_box").empty().append(data);
    });
    e.preventDefault();
  }
  
  KoreanZipcodeFinder.prototype.zipcode_selected_handler = function(e) {
    var $zipcode_node = $(e.target).closest(".zipcode_node");

    // .data() method를 사용할 경우 zipcode값이 integer로 들어온다. 001이 1로 들어옴zipcode 
    var zipcode_01 = $zipcode_node.attr('data-zipcode01');
    var zipcode_02 = $zipcode_node.attr('data-zipcode02');
    var address_01 = $zipcode_node.data('address01');
    
    this.current_address_area.find(".zipcode_01").val(zipcode_01);
    this.current_address_area.find(".zipcode_02").val(zipcode_02);
    this.current_address_area.find(".address_01").val(address_01);

    this.close_modal_handler(e);
  }
  
  return KoreanZipcodeFinder; 
})();

