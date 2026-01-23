/***************************************************
==================== JS INDEX ======================
****************************************************
Preloader js
Data js
Sticky Nav Js
Mobile Menu Js
Search Bar Js
Rating Js
Nice Select Js
Client-slider Js
Marquee slider Js
Project Slider Js
Project hover Js
Testimonial Slider Js
Testimonial Slider 2 Js
Testimonial Slider 3 Js
Hero slider Js
Service Slider Js
Accordion Js
Backtotop Js
CounterUp js
VenoBox Js
Progressbar js
GSAP Registration

****************************************************/

(function ($) {
	"use strict";

	// Preloader js
	$(window).on("load", function () {
		const tjPreloader = $(".preloader");
		if (tjPreloader?.length) {
			setTimeout(function () {
				tjPreloader.removeClass("is-loading").addClass("is-loaded");
				setTimeout(function () {
					tjPreloader.fadeOut(600);
					wowController();
					gsapController();
					counterController();
				});
			}, 1000);
		} else {
			wowController();
			gsapController();
			counterController();
		}
	});

	////////////////////////////////////////////////////
	// Data js
	$("[data-bg-image]").each(function () {
		var $this = $(this),
			$image = $this.data("bg-image");
		$this.css("background-image", "url(" + $image + ")");
	});

	////////////////////////////////////////////////////
	// Sticky Nav Js
	var lastScrollTop = "";
	function stickyMenu($targetMenu, $toggleClass) {
		var st = $(window).scrollTop();
		if ($(window).scrollTop() > 500) {
			if (st > lastScrollTop) {
				$targetMenu.removeClass($toggleClass);
			} else {
				$targetMenu.addClass($toggleClass);
			}
		} else {
			$targetMenu.removeClass($toggleClass);
		}

		lastScrollTop = st;
	}

	$(window).on("scroll", function () {
		if ($(".header-area").length) {
			stickyMenu($(".header-sticky"), "sticky");
		}
	});

	////////////////////////////////////////////////////
	// Mobile Menu Js
	$(".mobile_menu_bar").on("click", function () {
		$(this).toggleClass("on");
	});

	// Mobile Menu Js
	$("#mobile-menu").meanmenu({
		meanMenuContainer: ".mobile_menu",
		meanScreenWidth: "991",
		meanExpand: ['<i class="tji-arrow-menu"></i>'],
	});

	// Hamburger Menu Js
	$(".mobile_menu_bar").on("click", function () {
		$(".hamburger-area").addClass("opened");
		$(".body-overlay").addClass("opened");
		$("body").toggleClass("overflow-hidden");
	});

	// Offcanvas js
	$(".menu_offcanvas").on("click", function () {
		$(".tj-offcanvas-area").toggleClass("opened");
		$(".body-overlay").addClass("opened");
		$("body").toggleClass("overflow-hidden");
	});
	$(".hamburger_close_btn").on("click", function () {
		$(".tj-offcanvas-area").removeClass("opened");
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
		$("body").toggleClass("overflow-hidden");
	});
	$(".body-overlay").on("click", function () {
		$(".tj-offcanvas-area").removeClass("opened");
		$(".hamburger-area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
		$("body").toggleClass("overflow-hidden");
	});

	// Offcanvas 2 js
	$(".menu_offcanvas_2").on("click", function () {
		if ($(this).hasClass("opened")) {
			$(this).removeClass("opened");
		} else {
			$(this).addClass("opened");
		}
		$(this)
			.parents()
			.find(".tj-offcanvas-area-2")
			.slideToggle(600)
			.toggleClass("opened");
		$("body").toggleClass("overflow-hidden");
	});

	// Offcanvas submenu js
	$(".offcanvas-nav > ul > .has-dropdown > a").on("click", function (e) {
		e.preventDefault();
		if ($(this).parent(".has-dropdown").hasClass("opened")) {
			$(this).parent(".has-dropdown").removeClass("opened");
		} else {
			$(this).parent(".has-dropdown").addClass("opened");
		}
	});

	// Active all parent menu by default
	$(".offcanvas-nav > ul > li")
		.on("mouseenter", function () {
			$(this).addClass("active").siblings().removeClass("active");
		})
		.on("mouseleave", function () {
			$(this).siblings().addClass("active");
		})
		.addClass("active");

	////////////////////////////////////////////////////
	// Search Bar Js
	$(".header-search").on("click", function () {
		$(".search_popup").addClass("search-opened");
		$(".search-popup-overlay").addClass("opened");
	});
	$(".search_close_btn").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(".search-popup-overlay").removeClass("opened");
	});
	$(".search-popup-overlay").on("click", function () {
		$(".search_popup").removeClass("search-opened");
		$(this).removeClass("opened");
	});

	////////////////////////////////////////////////////
	// Rating Js
	if ($(".fill-ratings span").length > 0) {
		var star_rating_width = $(".fill-ratings span").width();
		$(".star-ratings").width(star_rating_width);
	}

	////////////////////////////////////////////////////
	// Nice Select Js
	if ($(".tj-select select").length > 0) {
		$(".tj-select select").niceSelect();
	}

	////////////////////////////////////////////////////
	// Client-slider Js
	if ($(".client-slider").length > 0) {
		var client = new Swiper(".client-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	////////////////////////////////////////////////////
	// Marquee slider Js
	if ($(".marquee-slider").length > 0) {
		var marquee = new Swiper(".marquee-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 7000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	////////////////////////////////////////////////////
	// Project Slider Js
	if ($(".project-slider").length > 0) {
		var project = new Swiper(".project-slider", {
			slidesPerView: 1.15,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 1.25,
					spaceBetween: 20,
					centeredSlides: true,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
					centeredSlides: false,
				},
			},
		});
	}

	// Project Slider 2 Js
	if ($(".project-slider-2").length > 0) {
		var project = new Swiper(".project-slider-2", {
			slidesPerView: 1,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				600: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
		});
	}

	// Project Slider 3 Js
	if ($(".project-slider-3").length > 0) {
		var project = new Swiper(".project-slider-3", {
			slidesPerView: 1,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			// autoplay: {
			// 	delay: 3000,
			// },
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				600: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});
	}

	// Project Slider 4 Js
	if ($(".project-slider-4").length > 0) {
		var project = new Swiper(".project-slider-4", {
			slidesPerView: 1.15,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			// autoplay: {
			// 	delay: 3000,
			// },
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 1.2,
					spaceBetween: 20,
					centeredSlides: true,
				},
				992: {
					slidesPerView: 1.5,
					spaceBetween: 30,
					centeredSlides: true,
				},
			},
		});
	}

	// Project hover Js
	if ($(".hover-item").length > 0) {
		$(".hover-item").on("mouseover", function () {
			$(this).addClass("active").siblings().removeClass("active");
		});
	}

	////////////////////////////////////////////////////
	// Testimonial Slider Js
	if ($(".testimonial-slider").length > 0) {
		var testimonial = new Swiper(".testimonial-slider", {
			slidesPerView: 1,
			spaceBetween: 28,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 5000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
		});
	}

	// Testimonial Slider 2 Js
	if ($(".testimonial-slider-2").length > 0) {
		var testimonial = new Swiper(".testimonial-slider-2", {
			slidesPerView: 3,
			spaceBetween: 28,
			centeredSlides: true,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1.15,
					spaceBetween: 15,
					centeredSlides: false,
				},
				576: {
					slidesPerView: 1.3,
					spaceBetween: 20,
					centeredSlides: false,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
					centeredSlides: false,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	// Testimonial Slider 3 Js
	if ($(".testimonial-slider-3").length > 0) {
		var testimonial = new Swiper(".testimonial-slider-3", {
			slidesPerView: 3,
			centeredSlides: true,
			loop: true,
			speed: 1500,
			// autoplay: {
			// 	delay: 3000,
			// },
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 15,
					centeredSlides: false,
				},
				576: {
					slidesPerView: 1.3,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 1.7,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 2.7,
					spaceBetween: 28,
				},
			},
		});
	}

	// Testimonial Slider 4 Js
	let verticalTestimonialSlider1;
	let thumbSlider4;
	function verticalTestimonialSlider() {
		const screenWidth = window.innerWidth;
		const direction = screenWidth >= 992 ? "vertical" : "horizontal";
		if (verticalTestimonialSlider1) {
			verticalTestimonialSlider1?.destroy(true, true);
		}
		if (thumbSlider4) {
			thumbSlider4?.destroy(true, true);
		}
		if (
			$(".client-thumb").length > 0 &&
			$(".testimonial-slider-4").length > 0
		) {
			thumbSlider4 = new Swiper(".client-thumb", {
				slidesPerView: 3,
				spaceBetween: 23,
				loop: true,
				speed: 1500,
				freeMode: true,
				watchSlidesProgress: true,
			});
			verticalTestimonialSlider1 = new Swiper(".testimonial-slider-4", {
				slidesPerView: "auto",
				spaceBetween: 15,
				loop: true,
				speed: 1500,
				direction: direction,
				autoplay: {
					delay: 4500,
				},
				navigation: {
					nextEl: ".slider-next",
					prevEl: ".slider-prev",
				},
				pagination: {
					el: ".h6-swiper-pagination",
					clickable: true,
				},

				breakpoints: {
					992: {
						slidesPerView: "auto",
						spaceBetween: 0,
					},
				},
			});

			// Connect the sliders
			verticalTestimonialSlider1.controller.control = thumbSlider4;
			thumbSlider4.controller.control = verticalTestimonialSlider1;
		}
	}

	verticalTestimonialSlider();
	// Reinitialize on resize
	window.addEventListener("resize", () => {
		verticalTestimonialSlider();
	});

	// Testimonial Slider 5 Js
	if ($(".testimonial-slider-5").length > 0) {
		var testimonial = new Swiper(".testimonial-slider-5", {
			slidesPerView: 1,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: ".testimonial-pagination",
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 1.25,
					spaceBetween: 20,
					centeredSlides: true,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 25,
					centeredSlides: false,
				},
				1400: {
					slidesPerView: "auto",
					spaceBetween: 30,
					centeredSlides: false,
				},
			},
		});
	}

	////////////////////////////////////////////////////
	// Team Slider Js
	if ($(".team-slider").length > 0) {
		var team = new Swiper(".team-slider", {
			slidesPerView: 4,
			spaceBetween: 28,
			centeredSlides: false,
			loop: true,
			speed: 800,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1.15,
					spaceBetween: 15,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	}
	////////////////////////////////////////////////////
	// Hero slider Js
	if ($(".hero-slider").length > 0) {
		var hero = new Swiper(".hero-slider", {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: "fade",
			loop: true,
			speed: 1400,
			autoplay: {
				delay: 4000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".hero-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return (
						'<span class="' + className + '">' + "0" + (index + 1) + "</span>"
					);
				},
			},
		});
	}

	////////////////////////////////////////////////////
	// Price box Js
	let year = $(".yearly");
	let month = $(".monthly");

	let price = $(".price-number");
	let period = $(".package-period");

	year.on("click", function () {
		$(this).addClass("active");
		month.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("year-price"));
		});
		period.each(function () {
			$(this).text($(this).data("year-period"));
		});
	});
	month.on("click", function () {
		$(this).addClass("active");
		year.removeClass("active");
		price.each(function () {
			$(this).text($(this).data("month-price"));
		});
		period.each(function () {
			$(this).text($(this).data("month-period"));
		});
	});

	// tj-tab-switcher Js
	$(".tj-tab-switcher__controller").on("change", function () {
		if ($(this).prop("checked")) {
			$("#tab1").removeClass("show active");
			$("#tab2").addClass("show active");
		} else {
			$("#tab2").removeClass("show active");
			$("#tab1").addClass("show active");
		}
	});

	////////////////////////////////////////////////////
	// Service Slider Js
	if ($(".service-slider").length > 0) {
		var service = new Swiper(".service-slider", {
			slidesPerView: 3,
			spaceBetween: 28,
			centeredSlides: false,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1.15,
					spaceBetween: 15,
				},
				420: {
					slidesPerView: 1.4,
					spaceBetween: 15,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	// Service Slider 2 Js
	if ($(".service-slider-2").length > 0) {
		var service = new Swiper(".service-slider-2", {
			slidesPerView: 1.15,
			spaceBetween: 15,
			loop: true,
			speed: 1500,
			arrow: false,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 1.25,
					spaceBetween: 20,
					centeredSlides: false,
				},
				992: {
					slidesPerView: 1.5,
					spaceBetween: 25,
					centeredSlides: true,
				},
				1200: {
					slidesPerView: "auto",
					spaceBetween: 25,
					centeredSlides: false,
				},
				1400: {
					slidesPerView: 2.1,
					spaceBetween: 30,
					centeredSlides: true,
				},
				1601: {
					slidesPerView: "auto",
					spaceBetween: 30,
					centeredSlides: false,
				},
			},
		});
	}

	////////////////////////////////////////////////////
	// Home 4 Hero slider
	const heroMarqueeSliders = {};

	function heroMarquee(selector, isReverse = false, speed = 8000) {
		// const screenWidth = window.innerWidth;
		// const direction = screenWidth >= 768 ? "vertical" : "horizontal";

		// Destroy previous instance if exists
		// if (heroMarqueeSliders[selector]) {
		// 	heroMarqueeSliders[selector].destroy(true, true);
		// }

		// Init if element exists
		if ($(selector).length > 0) {
			heroMarqueeSliders[selector] = new Swiper(selector, {
				slidesPerView: "auto",
				spaceBetween: 15,
				centeredSlides: true,
				loop: true,
				allowTouchMove: false,
				speed: speed,
				direction: "vertical",
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
					reverseDirection: isReverse,
				},
				breakpoints: {
					768: {
						spaceBetween: 18,
					},
				},
			});
		}
	}

	// Initialize both sliders
	heroMarquee(".h4-hero-slider-up");
	heroMarquee(".h4-hero-slider-down", true);

	// Reinitialize on resize
	// window.addEventListener("resize", () => {
	// 	heroMarquee(".h4-hero-slider-up");
	// 	heroMarquee(".h4-hero-slider-down", true);
	// });

	////////////////////////////////////////////////////
	// Accordion Js
	if ($(".accordion-item").length > 0) {
		$(".accordion-item button").on("click", function () {
			if ($(this).parent().hasClass("active")) {
				$(this).parent().removeClass("active");
			} else {
				$(this).parent().siblings().removeClass("active");
				$(this).parent().addClass("active");
			}
		});
	}

	////////////////////////////////////////////////////
	// Gallery-slider Js
	if ($(".gallery-slider").length > 0) {
		var gallery = new Swiper(".gallery-slider", {
			slidesPerView: "auto",
			spaceBetween: 0,
			freemode: true,
			centeredSlides: true,
			loop: true,
			speed: 5000,
			allowTouchMove: false,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	////////////////////////////////////////////////////
	// About Slider Js
	if ($(".about-slider").length > 0) {
		var about = new Swiper(".about-slider", {
			slidesPerView: 1,
			spaceBetween: 28,
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".about-pagination",
				clickable: true,
			},
		});
	}

	////////////////////////////////////////////////////
	// Blog Slider Js
	if ($(".blog-slider").length > 0) {
		var blog = new Swiper(".blog-slider", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			speed: 1200,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".slider-next",
				prevEl: ".slider-prev",
			},
			pagination: {
				el: ".swiper-pagination-area",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				576: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	////////////////////////////////////////////////////
	// Backtotop Js
	function back_to_top() {
		var btn = $("#back_to_top");
		var btn_wrapper = $(".back-to-top-wrapper");

		$(window).on("scroll", function () {
			if ($(window).scrollTop() > 300) {
				btn_wrapper.addClass("back-to-top-btn-show");
			} else {
				btn_wrapper.removeClass("back-to-top-btn-show");
			}
		});

		btn.on("click", function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "300");
		});
	}
	back_to_top();

	////////////////////////////////////////////////////
	// CounterUp js
	function counterController() {
		if (jQuery(".counter").length > 0) {
			$(".counter").counterUp({
				delay: 10,
				time: 1000,
			});
		}
	}

	////////////////////////////////////////////////////
	// wow js
	function wowController() {
		if ($(".wow").length > 0) {
			new WOW().init();
		}
	}

	////////////////////////////////////////////////////
	// VenoBox Js
	if ($(".gallery").length > 0) {
		new VenoBox({
			selector: ".gallery",
			numeration: true,
			// infinigall: true,
			spinner: "pulse",
		});
	}

	if ($(".video-popup").length > 0) {
		new VenoBox({
			selector: ".video-popup",
			numeration: true,
			// infinigall: true,
			spinner: "pulse",
		});
	}

	////////////////////////////////////////////////////
	// progress bar
	const progressBarController = () => {
		const progressContainers = document.querySelectorAll(".tj-progress");

		if (progressContainers?.length) {
			progressContainers.forEach(progressContainer => {
				const targetedProgressBar =
					progressContainer.querySelector(".tj-progress-bar");
				const completedPercent =
					parseInt(targetedProgressBar.getAttribute("data-percent", 10)) || 0;

				// Trigger animation when the element comes into view
				const observer = new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								// Animate the progress bar
								targetedProgressBar.style.transition = "width 2s ease-out";
								targetedProgressBar.style.width = `${completedPercent}%`;

								// Animate the percentage text
								const percentageText = progressContainer.querySelector(
									".tj-progress-percent"
								);
								if (percentageText) {
									let currentPercent = 0;

									const interval = setInterval(() => {
										currentPercent++;
										percentageText.textContent = `${currentPercent}%`;

										if (currentPercent >= completedPercent) {
											clearInterval(interval); // Stop the animation
										}
									}, 15); // Adjust the interval for animation speed
								}
							}
						});
					},
					{
						root: null, // Observing the viewport
						threshold: [0.3, 0.9], // Progress triggers based on visibility
					}
				);
				observer.observe(progressContainer);
			});
		}
	};

	// Call the function
	progressBarController();

	////////////////////////////////////////////////////
	// Topbar close
	$(".tj-close-btn").on("click", function () {
		$(this).parent(".header-top").remove();
	});

	////////////////////////////////////////////////////
	// Home 8 Process Js
	if ($(".h8-process-item").length > 0) {
		$(".h8-process-item").on("click", function () {
			if ($(this).hasClass("active")) {
				$(this).next().removeClass("active");
			} else {
				$(this).addClass("active");
			}
			$(this).siblings(".process-line").css({
				height: "80%",
			});
			// $(this)
			// 	.parents()
			// 	.find(".process-img-area .process-img:nth-child(2)")
			// 	.addClass("active")
			// 	.siblings()
			// 	.removeClass("active");
			$(this).children(".process-content").find(".desc").css({
				height: "auto",
				opacity: "1",
				visibility: "visible",
			});
			$(this).siblings().children(".process-content").find(".desc").css({
				height: "0",
				opacity: "0",
				visibility: "hidden",
			});
		});
		$(".h8-process-item:first").on("click", function () {
			$(this).siblings().removeClass("active");
			$(this).siblings(".process-line").css({
				height: "50%",
			});
			// $(this)
			// 	.parents()
			// 	.find(".process-img-area .process-img:first")
			// 	.addClass("active")
			// 	.siblings()
			// 	.removeClass("active");
		});
		$(".h8-process-item:last").on("click", function () {
			$(this).siblings(":not(.process-line)").addClass("active");
			$(this).siblings(".process-line").css({
				height: "100%",
			});
			// $(this)
			// 	.parents()
			// 	.find(".process-img-area .process-img:last")
			// 	.addClass("active")
			// 	.siblings()
			// 	.removeClass("active");
		});
	}

	// Hover image reveal Js
	const hoverItem = document.querySelectorAll(".anim-reveal-item");
	function moveImage(e, hoverItem, index) {
		const item = hoverItem.getBoundingClientRect();
		const x = e.clientX - item.x;
		const y = e.clientY - item.y;
		if (hoverItem.children[index]) {
			hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
		}
	}
	hoverItem.forEach((item, i) => {
		item.addEventListener("mousemove", e => {
			setInterval(moveImage(e, item, 1), 50);
		});
	});

	/* ------------- GSAP Registration -------------*/

	gsap.registerPlugin(ScrollTrigger, TweenMax, ScrollToPlugin);

	gsap.config({
		nullTargetWarn: false,
	});
	function gsapController() {
		/* ------------- Positon Sticky Js -------------*/
		let mediaMatch = gsap.matchMedia();

		/* Text Effect Animation */
		if ($(".text-anim").length) {
			let staggerAmount = 0.02,
				translateXValue = 20,
				delayValue = 0.3,
				easeType = "power2.out",
				animatedTextElements = document.querySelectorAll(".text-anim");

			animatedTextElements.forEach(element => {
				let animationSplitText = new SplitText(element, {
					type: "chars, words",
				});
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%" },
				});
			});
		}

		/* Title Animation */
		if ($(".title-anim").length) {
			let staggerAmount = 0.01,
				delayValue = 0.1,
				easeType = "power1.inout",
				animatedTitleElements = document.querySelectorAll(".title-anim");

			animatedTitleElements.forEach(element => {
				let animatedTitleElements = new SplitText(element, {
					types: "lines, words",
				});
				gsap.from(animatedTitleElements.chars, {
					y: "100%",
					duration: 0.5,
					delay: delayValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%" },
				});
			});
		}

		/* Service js */
		let device_width = window.innerWidth;
		const serviceStack = gsap.utils.toArray(".service-stack, .project-stack-2");
		if (serviceStack.length > 0) {
			if (device_width > 992) {
				serviceStack.forEach(item => {
					gsap.to(item, {
						opacity: 0,
						scale: 0.9,
						y: 50,
						scrollTrigger: {
							trigger: item,
							scrub: true,
							start: "top 70px",
							pin: true,
							pinSpacing: false,
							markers: false,
						},
					});
				});
			}
		}

		// right swipe
		document.querySelectorAll(".rightSwipeWrap").forEach((wrap, i) => {
			gsap.set(wrap.querySelectorAll(".right-swipe"), {
				transformPerspective: 1200,
				x: "10rem",
				rotateY: -20,
				opacity: 0,
				transformOrigin: "right center",
			});
			gsap.to(wrap.querySelectorAll(".right-swipe"), {
				transformPerspective: 1200,
				x: 0,
				rotateY: 0,
				opacity: 1,
				delay: 0.3,
				ease: "power3.out",
				scrollTrigger: {
					trigger: wrap,
					start: "top 80%",
					id: "rightSwipeWrap-" + i,
					toggleActions: "play none none none",
					// markers: true,
				},
			});
		});

		// left swipe
		document.querySelectorAll(".leftSwipeWrap").forEach((wrap, i) => {
			gsap.set(wrap.querySelectorAll(".left-swipe"), {
				transformPerspective: 1200,
				x: "-10rem",
				rotateY: 20,
				opacity: 0,
				transformOrigin: "left center",
			});
			gsap.to(wrap.querySelectorAll(".left-swipe"), {
				transformPerspective: 1200,
				x: 0,
				rotateY: 0,
				opacity: 1,
				delay: 0.4,
				ease: "power3.out",
				scrollTrigger: {
					trigger: wrap,
					start: "top 80%",
					id: "leftSwipeWrap-" + i,
					toggleActions: "play none none none",
					// markers: true,
				},
			});
		});

		// Text Invert
		if ($(".tj-text-invert").length) {
			const split = new SplitText(".tj-text-invert", { type: "lines" });
			split.lines.forEach(target => {
				gsap.to(target, {
					backgroundPositionX: 0,
					ease: "none",
					scrollTrigger: {
						trigger: target,
						scrub: 1,
						start: "top 75%",
						end: "bottom center",
					},
				});
			});
		}

		// Text Highlight
		if ($(".title-highlight").length) {
			const highlightText = new SplitText(".title-highlight", {
				type: "lines",
				linesClass: "line",
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".title-highlight",
					scrub: 1,
					start: "top 80%",
					end: "bottom center",
				},
			});
			tl.to(".line", {
				"--highlight-offset": "100%",
				stagger: 0.4,
			});
		}

		// button move hover animation
		var hoverBtns = gsap.utils.toArray(".btn-hover-wrapper");

		const hoverBtnItem = gsap.utils.toArray(".btn-hover-inner");
		hoverBtns.forEach((btn, span) => {
			$(btn).on("mousemove", function (e) {
				callParallax(e);
			});

			function callParallax(e) {
				parallaxIt(e, hoverBtnItem[span], 50);
			}

			function parallaxIt(e, target, movement) {
				var $this = $(btn);
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;

				gsap.to(target, 0.5, {
					x: ((relX - $this.width() / 2) / $this.width()) * movement,
					y: ((relY - $this.height() / 2) / $this.height()) * movement,
					ease: Power2.easeOut,
				});
			}
			$(btn).on("mouseleave", function (e) {
				gsap.to(hoverBtnItem[span], 0.5, {
					x: 0,
					y: 0,
					ease: Power2.easeOut,
				});
			});
		});

		// Images parallax
		gsap.utils.toArray(".img-parallax").forEach(container => {
			const img = container.querySelector("img");

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					scrub: 1,
					pin: false,
				},
			});

			tl.fromTo(
				img,
				{
					yPercent: 0,
					ease: "none",
				},
				{
					yPercent: -30,
					ease: "none",
				}
			);
		});

		// Project stack
		mediaMatch.add("(min-width: 992px)", () => {
			let tl = gsap.timeline();
			let projectItem = document.querySelectorAll(".project-stack");
			let baseOffset = 50;
			let offsetIncrement = 150;

			projectItem.forEach((item, index) => {
				let topOffset = baseOffset + index * offsetIncrement;
				tl.to(item, {
					scale: 0.8 + parseFloat(`.${index}`),
					scrollTrigger: {
						trigger: item,
						pin: item,
						scrub: true,
						start: `top ${topOffset}px`,
						end: "bottom 100%",
						endTrigger: ".project-stack-wrap",
						pinSpacing: false,
						markers: false,
					},
				});

				// Smooth fade for content
				if (index < projectItem.length - 1) {
					gsap.fromTo(
						item.querySelector(".project-item"),
						{ opacity: 1 },
						{
							opacity: 0.2,
							ease: "none",
							scrollTrigger: {
								trigger: item,
								start: `top ${topOffset + 100}px`, // when fade starts
								end: `top+=400 ${topOffset}px`, // extend fade distance
								scrub: true,
							},
						}
					);
				} else {
					// Last item always visible
					gsap.set(item.querySelector(".project-item"), { opacity: 1 });
				}
			});
		});
	}
})(jQuery);
