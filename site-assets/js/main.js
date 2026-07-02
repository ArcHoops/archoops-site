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

		// Framework section: scroll reveal + progress highlighting
		const frameworkSection = document.getElementById('the-framework');
		if (frameworkSection) {
			const revealElements = frameworkSection.querySelectorAll('.framework-reveal');
			const progressItems = frameworkSection.querySelectorAll('.framework-progress__item');
			const chapters = frameworkSection.querySelectorAll('.framework-chapter');
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			if (prefersReducedMotion) {
				revealElements.forEach(function(el) {
					el.classList.add('is-visible');
				});
			} else if ('IntersectionObserver' in window) {
				const revealObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							revealObserver.unobserve(entry.target);
						}
					});
				}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

				revealElements.forEach(function(el) {
					revealObserver.observe(el);
				});
			} else {
				revealElements.forEach(function(el) {
					el.classList.add('is-visible');
				});
			}

			if ('IntersectionObserver' in window && chapters.length && progressItems.length) {
				const loopSteps = ['study', 'predict', 'observe', 'reflect'];

				const stepObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							const step = entry.target.getAttribute('data-step');
							const activeIndex = loopSteps.indexOf(step);

							progressItems.forEach(function(item) {
								const itemStep = item.getAttribute('data-step');
								const itemIndex = loopSteps.indexOf(itemStep);
								item.classList.toggle('is-active', itemStep === step);
								item.classList.toggle('is-passed', itemIndex >= 0 && itemIndex < activeIndex);
							});

							chapters.forEach(function(chapter) {
								chapter.classList.toggle('is-in-view', chapter.getAttribute('data-step') === step);
							});
						}
					});
				}, { threshold: 0.45, rootMargin: '-20% 0px -35% 0px' });

				chapters.forEach(function(chapter) {
					stepObserver.observe(chapter);
				});
			}
		}
	});

})(jQuery);