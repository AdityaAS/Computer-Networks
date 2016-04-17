$jq(document).ready(function(){
	$jq(window).scroll(function(event_info){
		var scroll_position = $jq(window).scrollTop();
		var content = $jq('.content')
		var content_top = content.offset().top;
		var content_height = content.innerHeight();
		var content_bottom = content_top + content_height;
		var social_cont = $jq('#sticky_social')
		var social_height = social_cont.innerHeight();
		if(content_height > social_height){
    		if(scroll_position >= (content_top-75) && social_cont.attr('class') == 'static_cont'){
    			social_cont.addClass('fixed_cont').removeClass('static_cont');
    		}else if(scroll_position <= (content_top-75) && social_cont.attr('class') == 'fixed_cont'){
    			social_cont.addClass('static_cont').removeClass('fixed_cont');
    		}else if (scroll_position >= (content_bottom - social_height - 75) && social_cont.attr('class') == 'fixed_cont' ){
    			social_cont.addClass('relative_cont').removeClass('fixed_cont');
    			social_cont.attr('style', 'top:'+(content_bottom-(social_height+content_top))+'px;');
    		}else if (scroll_position <= (content_bottom - social_height - 75) && social_cont.attr('class') == 'relative_cont' ){
				social_cont.addClass('fixed_cont').removeClass('relative_cont');
    			social_cont.attr('style', 'top:0px;');
    		}
    	}else if ( social_cont.attr('class') == 'fixed_cont' ) {
    		social_cont.addClass('static_cont').removeClass('fixed_cont');
		}else if ( social_cont.attr('class') == 'relative_cont' ) {
			social_cont.addClass('static_cont').removeClass('relative_cont');
		}
	});
});