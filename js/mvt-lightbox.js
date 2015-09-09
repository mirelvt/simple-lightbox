/*
 * MVT-Lightbox
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2015-09-08
 */
(function() {
    'use strict';
    /* global TweenMax:false */

    var mvtLightBox = function lightBox(container) {
        var thumbs = container.querySelectorAll('li'),
        lightbox = container.querySelector('.lightbox'),
        img_list = lightbox.querySelector('.img-list'),
        images = img_list.querySelectorAll('img'),
        nav_next = lightbox.querySelector('.lightbox-nav-next'),
        nav_prev = lightbox.querySelector('.lightbox-nav-prev');

        /* ***
         * Add click events to the thumbnails, close + prev/next elements
        *** */
        lightbox.querySelector('.btn-close').addEventListener('click', closeLightBox, false);
        nav_next.addEventListener('click', navLightBox, false);
        nav_prev.addEventListener('click', navLightBox, false);

        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].addEventListener('click', showLightBox, false);
            // Set data-target attribute
            thumbs[i].setAttribute('data-target', 'image-' + [i + 1]);
        };

        // Set data-id attribute on each gallery image
        for (var i = 0; i < images.length; i++) {
            images[i].setAttribute('data-id', 'image-' + [i + 1]);
        };

        /* ***
         * The lightbox and photo is shown based on the value of data-show-id and data-id,
         * if they match: show the lightbox + photo.
        *** */
        function showLightBox(evt) {
            // Update data-show-id attribute
            var target = evt.currentTarget.getAttribute('data-target');
            var photo = img_list.querySelector('[data-id="' +  target + '"]');
            lightbox.setAttribute('data-show-id', target);
            animateLightBox(photo, target);
        }

        // Start the animation and set the width + height of the lightbox based on the image width/height
        function animateLightBox(photo, target) {
            TweenMax.to(lightbox, 0.5, {
                css:{
                    display: "block",
                    opacity: 1,
                    "height": photo.naturalHeight + "px",
                    "width": photo.naturalWidth + "px"
                },
                ease: Power2.easeOut
            });

            togglePhoto(target);
        }

        // Show the target photo in the lightbox container
        function togglePhoto(target) {
            var img = img_list.querySelector('[data-id="' + target + '"]');

            // First animate all images to hidden state
            for (var i = 0; i < images.length; i++) {
                TweenMax.to(images[i], 0.5, {
                    css:{
                        display: "none",
                        opacity: 0,
                    },
                    ease: Power2.easeOut
                });
            }
            // Then show the selected image
            TweenMax.fromTo(img, 0.5,
                {
                    css:{
                        display: "none",
                        opacity: 0,
                    }
                },
                {
                    css:{
                        display: "block",
                        opacity: 1,
                    },
                    ease: Power2.easeOut
                }
            );

            // Show the lightbox nav arrows
            toggleLightBoxNav(img);
        }

        // Hide "prev" when the first photo is shown and hide "next" when the last photo is shown.
        function toggleLightBoxNav(img) {
            if (img == img_list.lastElementChild) {
                nav_next.style.display = "None";
            } else if (img == img_list.firstElementChild) {
                nav_prev.style.display = "None";
            }
            else {
                nav_prev.removeAttribute('style');
                nav_next.removeAttribute('style');
            }
        }

        // Remove all inline styles from the lightbox to hide it
        function closeLightBox() {
            TweenMax.to(lightbox, 0.5, {
                css:{
                    display: "none",
                    opacity: 0,
                    "height": 0,
                    "width": 0
                },
                ease: Power2.easeOut,
                onComplete: resetStyles
            })
        }

        // After the closing animation is done, remove the style attributes
        function resetStyles() {
            lightbox.removeAttribute('style');
            for (var i = 0; i < images.length; i++) {
                images[i].removeAttribute('style');
            }
        }

        // Handle the prev and next click event
        function navLightBox(evt) {
            var next_id, photo, next_elm;
            var current = lightbox.querySelector('[data-id="' + lightbox.getAttribute('data-show-id') + '"]'),
            next = current.nextElementSibling,
            prev = current.previousElementSibling;

            next_elm = evt.currentTarget.classList.contains('lightbox-nav-next') ?
                        next.getAttribute('data-id') : prev.getAttribute('data-id');

            lightbox.setAttribute('data-show-id', next_elm);
            next_id = lightbox.getAttribute('data-show-id');
            photo = lightbox.querySelector('[data-id="' +  next_id + '"]');
            animateLightBox(photo, next_id);
        }
    }

    function onReady() {
        mvtLightBox(document.querySelector('[data-lightbox="mvt-lightbox"]'));
    }

    document.addEventListener('DOMContentLoaded', onReady, false);
})();