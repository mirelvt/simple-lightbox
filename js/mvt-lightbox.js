/*
 * MVT-Lightbox v1.1
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2015-09-09
 */

var mvt_lightbox = (function(container) {
    'use strict';

    function lightBox(container) {
        var current_photo, target, img,
        thumbs = container.querySelectorAll('li'),
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
            target = evt.currentTarget.getAttribute('data-target');
            var photo = img_list.querySelector('[data-id="' +  target + '"]');
            lightbox.setAttribute('data-show-id', target);
            animateLightBox(photo, target);
        }

        // Start the animation and set the width + height of the lightbox based on the
        // image width/height
        function animateLightBox(photo, target) {
            TweenMax.to(lightbox, 0.5, {
                display: "block",
                opacity: 1,
                width: setImgWidth(photo),
                height: setImgHeight(photo),
                ease: Power2.easeOut
            });

            togglePhoto(target);
        }


        function setImgWidth(photo) {
            var p_width;

            if (window.innerWidth < photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth < photo.naturalHeight) {
                p_width = "auto";
            }
            else if (window.innerWidth > photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth < photo.naturalHeight) {
                p_width = "auto";
            }
            else if (window.innerWidth > photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth > photo.naturalHeight) {
                p_width = "auto";
            }
            else if (window.innerWidth > photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth < photo.naturalHeight) {
                p_width = "auto";
            }
            else if (window.innerWidth > photo.naturalWidth && window.innerHeight > photo.naturalHeight && photo.naturalWidth > photo.naturalHeight) {
                p_width = photo.naturalWidth;
            }

            return p_width;
        }

        function setImgHeight(photo) {
            var p_height;

            if (window.innerWidth < photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth < photo.naturalHeight) {
                p_height = "auto";
            }
            else if (window.innerWidth > photo.naturalWidth && window.innerHeight < photo.naturalHeight && photo.naturalWidth < photo.naturalHeight) {
                p_height = window.innerHeight;
            }
            else {
                p_height =  "auto";
            }

            return p_height;
        }

        // Show the target photo in the lightbox container
        function togglePhoto(target) {
            if (current_photo == null ) {
                current_photo = target;
                img = img_list.querySelector('[data-id="' + current_photo + '"]');

                TweenMax.to(img, 0.5, {
                    display: "block",
                    opacity: 1,
                });
            } else {
                TweenMax.to(img, 0.5, {
                    css:{
                        display: "none",
                        opacity: 0,
                        position: "absolute",
                    },
                    ease: Power2.easeOut
                });
                current_photo = target;
                img = img_list.querySelector('[data-id="' + current_photo + '"]');

                TweenMax.to(img, 0.5, {
                    display: "block",
                    opacity: 1,
                    position: "static",
                });
            }

            // Show the lightbox nav arrows
            toggleLightBoxNav(current_photo);
        }

        // Hide "prev" when the first photo is shown and hide "next" when the last
        // photo is shown.
        function toggleLightBoxNav(current) {
            var current_img = lightbox.querySelector('[data-id="' + current + '"]');
            if (current_img == img_list.lastElementChild) {
                nav_next.style.display = "None";
            } else if (current_img == img_list.firstElementChild) {
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
            var current = lightbox.querySelector('[data-id="' + current_photo + '"]'),
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

    return lightBox;
})();