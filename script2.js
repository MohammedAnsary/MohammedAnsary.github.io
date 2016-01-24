var arr = [ "A", "N", "S", "A", "R", "Y" ];
var i = 1;
var loaded = false;
var navbar = $('#navbar');
var content = $('#content');
var projects = $('#projects');
var selector = $('#selector');
var pens = $('#pens');
window.onload = function() {
					loaded = true;
				}
setTimeout(function(){ $("#loading").removeClass("load"); setTimeout(function(){ $("#loading").html(arr[i++]); again();}, 1500); }, 1500);
function again() {
	if (loaded) { letsrocknroll(); return;}
    if (i == 6) i = 0;
	$("#loading").addClass("load");
	setTimeout(function(){ $("#loading").removeClass("load"); setTimeout(function(){ $("#loading").html(arr[i++]); again();}, 1500); }, 1500);
}
function letsrocknroll() {
	navbar.detach();
	content.detach();
	projects.detach();
	selector.detach();
	pens.detach();
	$(".outer .middle .inner").html("");
	$(".outer").animate({height: '10%', backgroundColor: '#2F2F2F', position: 'fixed', top: '0px'}, 500);
	$(".right").animate({height: '90%', bottom: '0px'}, 500);
	setTimeout(function(){ $(".outer").css("position", "fixed"); }, 501);
	setTimeout(function(){
		$(".outer .middle .inner").append(navbar);
		navbar.addClass('shown');
		//$('.navbar-name').animate({opacity: '1'}, 300);
		setTimeout(function(){ $('.navbar-name').animate({opacity: '1'}, 300); }, 0);
		setTimeout(function(){ $('.me').animate({opacity: '1'}, 300); }, 300);
		setTimeout(function(){ $('.github').animate({opacity: '1'}, 300); }, 600);
		setTimeout(function(){ $('.linkedin').animate({opacity: '1'}, 300); }, 900);
		setTimeout(function(){ $('.facebook').animate({opacity: '1'}, 300); }, 1200);
		setTimeout(function(){ $('.twitter').animate({opacity: '1'}, 300); }, 1500);

		// var delay = 300;
		// $('.navbar .navbar-list ul li').each(function(){
			// var obj = this;
			// setTimeout(function(){ $(obj).animate({opacity: '1'}, 200); }, delay);
			// delay += 300;
		// });
	}, 1002);
	setTimeout(function(){
		$(".right").append(content);
		content.addClass('shown');
		$(".right-scroller div").append(selector);
		selector.addClass('shown');
		$('.navbar-name').animate({opacity: '1'}, 500);
		setTimeout(function(){ $('.right-scroller').animate({opacity: '1'}, 500); }, 0);
		setTimeout(function(){ $('.section-footer').animate({opacity: '1'}, 500); }, 600);
	}, 2500);
}
function hideSelector(callback) {
	selector.animate({opacity: '0'}, 500, function(){ selector.detach(); callback();});
}
$( document ).ready(function(){
	$('.selection-projects').click(function(){
		hideSelector(function() {
			$(".right-scroller div").append(projects);
			projects.addClass('shown');
			projects.animate({opacity: '1'}, 500);
			$(".section-header").html('<span class="fa fa-code"></span> Projects <a class="back"><span class="fa fa-close"></span></a>');
			$(".section-header").animate({opacity: '1'}, 500);
		});
	});
	$('.selection-pens').click(function(){
		hideSelector(function(){
			$(".right-scroller div").append(pens);
			pens.addClass('shown');
			pens.animate({opacity: '1'}, 500);
			$(".section-header").html('<span class="fa fa-codepen"></span> Plyground <a class="back"><span class="fa fa-close"></span></a>');
			$(".section-header").animate({opacity: '1'}, 500);
		});
	});
	$(document).on('click', '.back',function(){
		console.log('');
		$(".section-header").animate({opacity: '0'}, 500, function() {
			$(".section-header").html('');
		});
		if(projects.parent().length > 0) {
			projects.animate({opacity: '0'}, 500, function(){
				projects.detach();
				$(".right-scroller div").append(selector);
				selector.animate({opacity: '1'}, 500);
			});
		}
		if(pens.parent().length > 0) {
			pens.animate({opacity: '0'}, 500, function(){
				pens.detach();
				$(".right-scroller div").append(selector);
				selector.animate({opacity: '1'}, 500);
			});
		}
	});
});
