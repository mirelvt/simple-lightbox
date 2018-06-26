/*
 * MVT-Lightbox v1.3
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2018-06-26
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

        for (let i = 0; i < thumbs.length; i++) {
            const elm = thumbs[i];
            elm.addEventListener('click', showLightBox, false);
            // Set data-target attribute
            elm.setAttribute('data-target', 'image-' + i);
        }

        // Set data-id attribute on each gallery image
        for (let i = 0; i < images.length; i++) {
            const elm = images[i];
            elm.setAttribute('data-id', 'image-' + i);
        }

        /* ***
         * The lightbox and photo is shown based on the value of data-show-id and data-id,
         * if they match: show the lightbox + photo.
         *** */
        function showLightBox(evt) {
            overlay.classList.remove('no-display');
            // Update data-show-id attribute
            const target = evt.currentTarget.getAttribute('data-target');
            // const photo = img_list.querySelector('[data-id="' + target + '"]');
            lightbox.setAttribute('data-show-id', target);
            animateLightBox(target);
        }

        // Show the lightbox container
        function animateLightBox(target) {
            lightbox.classList.remove('fade-out');
            lightbox.classList.add('show');
            togglePhoto(target);
        }

        // Show the target photo in the lightbox container
        function togglePhoto(target) {
            if (current_photo) {
                // First remove the class name of the previous current photo
                img.classList.remove('current-img');
                // Set the new current_photo based on target
                current_photo = target;
                img = img_list.querySelector('[data-id="' + target + '"]');
                img.classList.add('current-img');
            } else {
                current_photo = target;
                img = img_list.querySelector('[data-id="' + target + '"]');
                img.classList.add('current-img');
            }

            // Show the lightbox nav arrows
            toggleLightBoxNav(current_photo);
        }
        // Hide "prev" when the first photo is shown and hide "next" when the last
        // photo is shown.
        function toggleLightBoxNav(current) {
            const current_img = lightbox.querySelector('[data-id="' + current + '"]');
            if (current_img == img_list.lastElementChild) {
                nav_prev.classList.remove('no-display');
                nav_next.classList.add('no-display');
            } else if (current_img == img_list.firstElementChild) {
                nav_next.classList.remove('no-display');
                nav_prev.classList.add('no-display');
            } else {
                nav_prev.classList.remove('no-display');
                nav_next.classList.remove('no-display');
            }
        }

        function closeLightBox() {
            overlay.classList.add('no-display');
            lightbox.classList.remove('show');
            lightbox.classList.add('fade-out');
            img.classList.remove('current-img');
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
            togglePhoto(next_id);
        }
    }

    return lightBox;
})();
