
  var box_down = false;
  function slide_up(){
    if (box_down == true){
      $("#top_side").animate({
        top: '-86',
        opacity: 1
      },{queue: false, duration: "slow"}, "easein");
      box_down = false;
      if(!!stickybar_items) { stickybar_items(''); }
    }
  }
  function slide_down(){
    if (box_down == false){
      $("#top_side").animate({
        top: '+0',
        opacity: 1
      },{queue: false, duration: "slow"}, "easein");
      box_down = true;
    }
  }
  if (jQuery.browser.msie == true && jQuery.browser.version <= 6){
    /* IE6 Hack - Start */
    $(document).ready(function(){
      function resize_for_ie6(){
        $("#top_side").width($(".ie6_wrapper").width()-20);
      }
      resize_for_ie6();
      $(".ie6_wrapper").resize(function (){
        resize_for_ie6();
      });
      $(".ie6_wrapper").scroll(function(event_info){
        debugging = $(".ie6_wrapper").scrollTop();
        check_scroll_position = $(".ie6_wrapper").scrollTop();
        if(check_scroll_position<=$("#main_header")[0].offsetHeight){
          setTimeout("slide_up()", 500);
          //slide_up();
        }else{
          setTimeout("slide_down()", 500);
          //slide_down();
        }

        $('#event_info_text').html('<div>.scroll called.</div>'+debugging);
        return false;
      });
    });
    /* IE6 Hack - End */
  }else{
    $(document).ready(function(){
      $(window).scroll(function(event_info){
        debugging = $(window).scrollTop();
        check_scroll_position = $(window).scrollTop();
        if(check_scroll_position<=$("#main_header")[0].offsetHeight){
          slide_up();
        }else{
          slide_down();
        }

        $('#event_info_text').html('<div>.scroll called.</div>'+debugging);
        return true;
      });
    });
  }

  function stickybar_items(item,type) {
    if(type != 3 || document.activeElement != $('#fixed-bar-search-box')[0]) {
      $('#fixed-bar-search-bar').hide();
      $('#fixed-bar-social-bar').hide();
      var searchIcon = $('#fixed-bar-search-icon')[0];
      var socialIcon = $('#fixed-bar-social-icons')[0];
      searchIcon.className=searchIcon.className.replace('fixed-bar-active-icon','fixed-bar-inactive-icon');
      socialIcon.className=socialIcon.className.replace('fixed-bar-active-social','fixed-bar-inactive-social');
      if(type == 1) {
          if(item == 'search') {
              searchIcon.className=searchIcon.className.replace('fixed-bar-inactive-icon','fixed-bar-active-icon');
              $('#fixed-bar-search-bar').show();
          }
          if(item == 'social') {
              $('#fixed-bar-search-box')[0].blur();
              socialIcon.className=socialIcon.className.replace('fixed-bar-inactive-social','fixed-bar-active-social');
              $('#fixed-bar-social-bar').show();
          }
      }
    }
}
