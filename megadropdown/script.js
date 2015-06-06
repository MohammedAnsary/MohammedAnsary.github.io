$( document ).ready(function() {
	$( '#dropbtn' ).click(function() {
		$( '#dropbtn').toggleClass('active');
		$( '#dropmenu').toggleClass('is-active');
	});
	$('.dropdown-wrapper > .dropdown-main > li > a').hover(function() {
		$(this).addClass('active');
		}, function() {
		$(this).removeClass('active');
	});
	$('input[type=text]').focusin(function() {
		$(this).addClass('active');
	});
	$('input[type=text]').focusout(function() {
		$(this).removeClass('active');
	});
});




