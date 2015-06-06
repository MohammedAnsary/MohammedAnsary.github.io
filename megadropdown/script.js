$( document ).ready(function() {
	$( '#dropbtn' ).click(function() {
		$( '#dropbtn').toggleClass('active');
		$( '#dropmenu').toggleClass('is-active');
	});
	$('.dropdown-wrapper > .dropdown-menu > li > a').hover(function() {
		$(this).addClass('active');
		}, function() {
		$(this).removeClass('active');
	});
	$('.dropdown-wrapper > .dropdown-menu > li > a.has-sub-menu').hover(function() {
		var target = "#" + $(this).attr('data-target');
		$(target).addClass('is-active');
		}, function() {
		var target = "#" + $(this).attr('data-target');
		if(!($( target + ':hover').length == 1)) {
			$(target).removeClass('is-active');
		}
	});
	$('.sub-menu').hover(function() {
		$(this).addClass('is-active');
		}, function() {
		$(this).removeClass('is-active');
	});
	$('.dropdown-wrapper > .dropdown-menu > li input[type=text]').focusin(function() {
		$(this).addClass('active');
	});
	$('.dropdown-wrapper > .dropdown-menu > li input[type=text]').focusout(function() {
		$(this).removeClass('active');
	});
});




