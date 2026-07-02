/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile menu toggle + transparent header scroll state
	$(document).ready(function() {
		const $navToggle = $('.nav-toggle');
		const $nav = $('.nav');
		const $header = $('.site-header');
		const $hero = $('#hero');

		function updateHeaderState() {
			if (!$header.length) return;
			const threshold = $hero.length ? Math.min($hero.outerHeight() * 0.12, 80) : 40;
			$header.toggleClass('is-scrolled', $(window).scrollTop() > threshold);
		}

		updateHeaderState();
		$(window).on('scroll', updateHeaderState);

		$navToggle.on('click', function(e) {
			e.preventDefault();
			const isVisible = $nav.attr('data-visible') === 'true';
			$nav.attr('data-visible', (!isVisible).toString());
			$navToggle.attr('aria-expanded', (!isVisible).toString());
		});

		// Close menu when clicking a link
		$('.nav-list a').on('click', function() {
			$nav.attr('data-visible', 'false');
			$navToggle.attr('aria-expanded', 'false');
		});

		// Hero entrance animations
		if ($hero.length) {
			window.requestAnimationFrame(function() {
				$hero.addClass('is-ready');
			});
		}
	});

})(jQuery);