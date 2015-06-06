$( document ).ready(function() {
	$( '#dropbtn' ).click(function() {
		$( '#dropbtn').toggleClass('active');
		$( '#dropmenu').toggleClass('is-active');
	});
	$('.dropdown-wrapper > .dropdown-main > li > a').hover(function(){
		$(this).addClass('active');
		}, function(){
		$(this).removeClass('active');
	});
});




