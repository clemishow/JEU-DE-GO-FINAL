var pause = document.getElementById('animation_nuage_1');
var pause2 = document.getElementById('animation_nuage_2');
var pause3 = document.getElementById('nuage_1');
var pause4 = document.getElementById('nuage_2');
var pause5 = document.getElementById('nuage_3');
var compteur_play = 0;
var compteur_player = 0;
var compteur_j1 = 0;
var compteur_j2 = 0;

$(document).ready(function() {
			$('#fullpage').fullpage({
				'verticalCentered': false,
				'css3': true,
				'sectionsColor': ['#0B1228', '#FFF', '#0B1228', '#0B1228'],
				'navigation': false,
				'navigationPosition': 'center',
				'slidesNavigation': false,
        		'slidesNavPosition': 'bottom',
				'keyboardScrolling': false,
				'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
				anchors: ['firstPage', 'secondPage', 'thirdPage'],
				
				afterLoad: function(anchorLink, index){
            	var loadedSection = $(this);

		            // USING SECTION 1
		            if(anchorLink == 'firstPage'){
		                $("#logo").css('opacity', '1'); 
		                $("#team").css({'opacity' : '1', 'color' : 'white'});
		                $("#rules").css({'opacity' : '1', 'color' : 'white'}); 
		                $.fn.fullpage.setScrollingSpeed(1000); // SPEED SCROLL
		                $.fn.fullpage.setAllowScrolling(false, 'down'); // OFF SCROLL DOWN
		                setTimeout(function() {
		                	$('#fond').css('display', 'none')
		                },2000)
		                /* OPTIMISATION DURING TRANSITION PAGE*/
		                pause.style.webkitAnimationPlayState="paused";
						pause2.style.webkitAnimationPlayState="paused";
						pause3.style.webkitAnimationPlayState="paused";
						pause4.style.webkitAnimationPlayState="paused";
						pause5.style.webkitAnimationPlayState="paused";
						setTimeout(function() {
							pause.style.webkitAnimationPlayState="running";
							pause2.style.webkitAnimationPlayState="running";
							pause3.style.webkitAnimationPlayState="running";
							pause4.style.webkitAnimationPlayState="running";
							pause5.style.webkitAnimationPlayState="running";
						},4000);
		            }

		            if (anchorLink == 'firstPage' && compteur_play == 0) {
		            	$.fn.fullpage.moveSlideRight();
		                setTimeout(function() {
		                	compteur_play++;
		                },100)
		            }



		            // USING SECTION 2
		            if(anchorLink == 'secondPage'){
		            	/*$("#logo_black").css('opacity', '1');
		            	$("#team").css('opacity', '1');
		                $("#rules").css('opacity', '1');
		            	$.fn.fullpage.setAllowScrolling(false, 'up'); A ACTiVER A LA FIN */
		            	if (compteur_j1 == 1) {
		            	window.location = '/j1.html';
		            	}

		            	if (compteur_j2 == 1) {
		            	window.location = '/j2.html';
		            	}
		            }
        		},

				onLeave: function(index, nextIndex, direction){

		            // AFTER LEAVING SECTION 1
		            if(index == 1 && direction =='down'){
		            	$("#team").css({'opacity' : '0', 'color' : 'black'});
		                $("#rules").css({'opacity' : '0', 'color' : 'black'});
		                $("#logo").css('opacity', '0'); // lorsqu'on quitte la section on enleve le logo blanc
		                $.fn.fullpage.setScrollingSpeed(2000); // SCROOL SPEED
		            }

		            // AFTER LEAVING SECTION 2
		            if(index == 2 && direction =='up'){
		            	$("#team").css('opacity', '0');
		                $("#rules").css('opacity', '0');
		                $("#logo_black").css('opacity', '0');
		            }
        		}
				
			});

		//CLICK BUTTON PLAY 
		$('#play').on('click', function() {
			$.fn.fullpage.setAllowScrolling(true, 'down'); // ON SCROLL SECTION DOWN
			$.fn.fullpage.moveSectionDown(); // MOVE SECTION DOWN
			/* OPTIMISATION DURING TRANSITION PAGE */
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
		});

		// MENU CLICK TEAM
		$('#team').on('click', function() {
			$.fn.fullpage.moveTo('firstPage', 0);
			$('#logo').css('width', '80px');
			$('#logo').css('margin-left', '-75px');
			setTimeout(function() {
				$('#home').css('opacity', '1');
			}, 200);
			/* OPTIMISATION DURING TRANSITION PAGE */
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
		});

		// MENU CLICK RULES
		$('#rules').on('click', function() {	
			$.fn.fullpage.moveTo('firstPage', 2);
			$('#logo').css('width', '80px');
			$('#logo').css('margin-left', '-75px');
			setTimeout(function() {
				$('#home').css('opacity', '1');
			}, 200);
			/* OPTIMISATION DURING TRANSITION PAGE*/
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
		});

		// MENU CLICK LOGO
		$('#click_logo').on('click', function() {
			$.fn.fullpage.moveTo('firstPage', 1);
			$('#logo').css('width', '136px');
			$('#logo').css('margin-left', '-100px');
			$('#home').css('opacity', '0');
			/* OPTIMISATION DURING TRANSITION PAGE*/
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
		});

		// CLICK J1
		$('#J1').on('click', function() {
		if (compteur_player == 0) {
			compteur_player = 1;
			$('#play').css('display', 'block');
			$('#J1').css({'background-color' : 'white', 'color' : 'black'})
			compteur_j1 = 1;
			compteur_j2 = 0;
		}
		if (compteur_player == 1) {
			compteur_player = 0;
			$('#play').css('display', 'block');
			$('#J1').css({'background-color' : 'white', 'color' : 'black'})
			$('#J2').css({'background-color' : 'transparent', 'color' : 'white'})
			compteur_j1 = 1;
			compteur_j2 = 0;
		}
		});

		// CLICK J2
		$('#J2').on('click', function() {
		if (compteur_player == 0) {
			compteur_player = 1;
			$('#play').css('display', 'block');
			$('#J2').css({'background-color' : 'white', 'color' : 'black'})
			compteur_j1 = 0;
			compteur_j2 = 1;
		}
		if (compteur_player == 1) {
			compteur_player = 0;
			$('#play').css('display', 'block');
			$('#J2').css({'background-color' : 'white', 'color' : 'black'})
			$('#J1').css({'background-color' : 'transparent', 'color' : 'white'})
			compteur_j1 = 0;
			compteur_j2 = 1;
		}
		});

		// HOVER IMG 
		$('.photo').hover(
  		function() {
   			/* OPTIMISATION DURING TRANSITION PAGE*/
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
  		}, function() {
    		/* OPTIMISATION DURING TRANSITION PAGE*/
			pause.style.webkitAnimationPlayState="paused";
			pause2.style.webkitAnimationPlayState="paused";
			pause3.style.webkitAnimationPlayState="paused";
			pause4.style.webkitAnimationPlayState="paused";
			pause5.style.webkitAnimationPlayState="paused";
			setTimeout(function() {
				pause.style.webkitAnimationPlayState="running";
				pause2.style.webkitAnimationPlayState="running";
				pause3.style.webkitAnimationPlayState="running";
				pause4.style.webkitAnimationPlayState="running";
				pause5.style.webkitAnimationPlayState="running";
			},1500);
  		}
);
});