/*
 * MVT-Lightbox v1.2.2
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2017-05-31
 */

var mvt_lightbox = (function() {
    'use strict';

    function lightBox(container) {
        let current_photo, img;
        const overlay = container.querySelector('.mvt-lightbox-overlay'),
            thumbs = container.querySelectorAll('li'),
            lightbox = container.querySelector('.mvt-lightbox'),
            img_list = lightbox.querySelector('.mvt-img-list'),
            images = img_list.querySelectorAll('img'),
            nav_next = lightbox.querySelector('.lightbox-nav-next'),
            nav_prev = lightbox.querySelector('.lightbox-nav-prev');

        /* ***
         * Add click events to the thumbnails, close + prev/next elements
         *** */
        lightbox.querySelector('.mvt-btn-close').addEventListener('click', closeLightBox, false);
        nav_next.addEventListener('click', navLightBox, false);
        nav_prev.addEventListener('click', navLightBox, false);

        Array.prototype.forEach.call(thumbs, function(elm, index) {
            elm.addEventListener('click', showLightBox, false);
            // Set data-target attribute
            elm.setAttribute('data-target', 'image-' + [index + 1]);
        });

        // Set data-id attribute on each gallery image
        Array.prototype.forEach.call(images, function(elm, index) {
            elm.setAttribute('data-id', 'image-' + [index + 1]);
        });

        /* ***
         * The lightbox and photo is shown based on the value of data-show-id and data-id,
         * if they match: show the lightbox + photo.
         *** */
        function showLightBox(evt) {
            overlay.classList.remove('no-display');
            // Update data-show-id attribute
            const target = evt.currentTarget.getAttribute('data-target');
            const photo = img_list.querySelector('[data-id="' + target + '"]');
            lightbox.setAttribute('data-show-id', target);
            animateLightBox(photo, target);
        }

        // Show the lightbox container
        function animateLightBox(photo, target) {
            Velocity(lightbox, 'fadeIn', 500);
            togglePhoto(target);
        }

        // Show the target photo in the lightbox container
        function togglePhoto(target) {
            if (current_photo) {
                // Set position attribute for the image, this does not work as property in velocityjs.
                img.style.position = 'absolute';
                // animate
                Velocity(img, 'fadeOut', 500);

                // Set current_photo and show the image
                current_photo = target;
                img = img_list.querySelector('[data-id="' + current_photo + '"]');
                img.style.position = 'static';

                Velocity(img, 'fadeIn', 500);
            } else {
                current_photo = target;
                img = img_list.querySelector('[data-id="' + current_photo + '"]');

                Velocity(img, 'fadeIn', 500);
            }

            // Show the lightbox nav arrows
            toggleLightBoxNav(current_photo);
        }

        // Hide "prev" when the first photo is shown and hide "next" when the last
        // photo is shown.
        function toggleLightBoxNav(current) {
            const current_img = lightbox.querySelector('[data-id="' + current + '"]');
            if (current_img == img_list.lastElementChild) {
                nav_next.style.display = "None";
            } else if (current_img == img_list.firstElementChild) {
                nav_prev.style.display = "None";
            } else {
                nav_prev.removeAttribute('style');
                nav_next.removeAttribute('style');
            }
        }

        // Remove all inline styles from the lightbox to hide it
        function closeLightBox() {
            overlay.classList.add('no-display');
            Velocity(lightbox, 'fadeOut', {complete: resetStyles}, 500);
        }

        // After the closing animation is done, remove the style attributes
        function resetStyles() {
            lightbox.removeAttribute('style');

            Array.prototype.forEach.call(images, function(elm) {
                elm.removeAttribute('style');
            });
        }

        // Handle the prev and next click event
        function navLightBox(evt) {
            const current = lightbox.querySelector('[data-id="' + current_photo + '"]'),
                next = current.nextElementSibling,
                prev = current.previousElementSibling;

            const next_elm = evt.currentTarget.classList.contains('lightbox-nav-next')
                            ? next.getAttribute('data-id') : prev.getAttribute('data-id');

            lightbox.setAttribute('data-show-id', next_elm);
            const next_id = lightbox.getAttribute('data-show-id');
            const photo = lightbox.querySelector('[data-id="' + next_id + '"]');
            animateLightBox(photo, next_id);
        }
    }

    return lightBox;
})();
