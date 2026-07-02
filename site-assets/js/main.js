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

		// Video section: scroll reveal + inline YouTube playback
		const videoSection = document.getElementById('watch-demo');
		const videoPlayer = videoSection ? videoSection.querySelector('.video-player') : null;

		if (videoSection) {
			const revealElements = videoSection.querySelectorAll('.video-reveal');
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			let videoRevealed = false;

			function revealVideoSection() {
				if (videoRevealed) return;
				videoRevealed = true;
				videoSection.classList.add('is-visible');
				revealElements.forEach(function(el) {
					el.classList.add('is-visible');
				});
			}

			function maybeRevealVideoSection() {
				if (videoRevealed) return;
				const rect = videoSection.getBoundingClientRect();
				const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
				if (inView) {
					revealVideoSection();
				}
			}

			if (prefersReducedMotion) {
				revealVideoSection();
			} else if ('IntersectionObserver' in window) {
				const videoObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							revealVideoSection();
							videoObserver.unobserve(entry.target);
						}
					});
				}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

				videoObserver.observe(videoSection);
				window.addEventListener('scroll', maybeRevealVideoSection, { passive: true });
			} else {
				revealVideoSection();
			}

			document.querySelectorAll('a[href="#watch-demo"]').forEach(function(link) {
				link.addEventListener('click', function() {
					window.setTimeout(maybeRevealVideoSection, 50);
					window.setTimeout(maybeRevealVideoSection, 400);
				});
			});

			window.addEventListener('hashchange', maybeRevealVideoSection);

			if (window.location.hash === '#watch-demo') {
				window.setTimeout(maybeRevealVideoSection, 100);
				window.setTimeout(maybeRevealVideoSection, 600);
			}
		}

		if (videoPlayer) {
			const trigger = videoPlayer.querySelector('.video-player__trigger');
			const embed = videoPlayer.querySelector('.video-player__embed');
			const thumb = videoPlayer.querySelector('.video-player__thumb');
			const videoId = videoPlayer.getAttribute('data-video-id');

			if (thumb) {
				thumb.addEventListener('error', function() {
					if (thumb.dataset.fallbackApplied) return;
					thumb.dataset.fallbackApplied = 'true';
					thumb.src = 'site-assets/images/hero-home-dashboard.png';
				});
			}

			if (trigger && embed && videoId) {
				trigger.addEventListener('click', function() {
					videoPlayer.classList.add('is-activating');
					window.requestAnimationFrame(function() {
						embed.innerHTML = '<iframe title="ArcHoops Demo Video" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
						embed.hidden = false;
						trigger.hidden = true;
						videoPlayer.classList.add('is-playing');
					});
				});
			}
		}

		// Team section: scroll reveal with staggered cards
		const teamSection = document.getElementById('our-team');
		if (teamSection) {
			const revealElements = teamSection.querySelectorAll('.team-reveal');
			const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			let teamRevealed = false;

			function revealTeamSection() {
				if (teamRevealed) return;
				teamRevealed = true;
				teamSection.classList.add('is-visible');
				revealElements.forEach(function(el) {
					el.classList.add('is-visible');
				});
			}

			if (prefersReducedMotion) {
				revealTeamSection();
			} else if ('IntersectionObserver' in window) {
				const teamObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							revealTeamSection();
							teamObserver.unobserve(entry.target);
						}
					});
				}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

				teamObserver.observe(teamSection);
			} else {
				revealTeamSection();
			}
		}
	});

})(jQuery);