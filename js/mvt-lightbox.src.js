/*
 * MVT-Lightbox v2.0
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2018-07-03
 */

var mvt_lightbox = (function() {
    'use strict';

    function lightBox(container) {
        let current_photo, img,
            active_thumb, target;

        const overlay = container.querySelector('.mvt-lightbox-overlay'),
            thumbs_list = container.querySelector('.mvt-thumbs-list'),
            thumbs = container.querySelectorAll('li'),
            lightbox = container.querySelector('.mvt-lightbox'),
            img_list = lightbox.querySelector('.mvt-img-list'),
            images = img_list.querySelectorAll('img'),
            nav_next = lightbox.querySelector('.lightbox-nav-next'),
            nav_prev = lightbox.querySelector('.lightbox-nav-prev');

        (function() {
            lightbox.querySelector('.mvt-btn-close').addEventListener('click', closeLightBox);
            document.addEventListener('keyup', keyNavigation);
            nav_next.addEventListener('click', navLightBoxClick);
            nav_prev.addEventListener('click', navLightBoxClick);

            for (let i = 0; i < thumbs.length; i++) {
                const elm = thumbs[i];
                elm.setAttribute('data-target', 'image-' + i); // Set data-target attribute
                elm.addEventListener('click', onThumbClick, false);
            }
            // @End click events
            // -----------------

            // Set data-id attribute on each gallery image
            for (let i = 0; i < images.length; i++) {
                const elm = images[i];
                elm.setAttribute('data-id', 'image-' + i);
            }
        })();

        function onThumbClick(evt) {
            target = evt.currentTarget.getAttribute('data-target');
            showLightBox(target);
        }

        /* ***
         * The lightbox and photo is shown based on the value of data-show-id and data-id,
         * if they match: show the lightbox + photo.
         *** */
        function showLightBox(target) {
            overlay.classList.remove('no-display');

            // Update data-show-id attribute
            lightbox.setAttribute('data-show-id', target);
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

        // -------------------------
        // Start Keyboard navigation
        function keyNavigation(evt) {
            // 37 = ArrowLeft
            // 39 = ArrowRight
            // 13 = Enter
            // 27 = ESC
            active_thumb = container.querySelector('li[tabindex="0"]');

            const the_key = evt.keyCode,
                thumb_hasfocus = document.activeElement == active_thumb;

            if (thumb_hasfocus && !lightbox.classList.contains('show')) {
                // Navigate through thumbnails
                thumbKeyNav(the_key);
                // Show lightbox on Enter key
                if (the_key == 13)
                    showLightBox(active_thumb.getAttribute('data-target'));
            }

            // Prev/next navigation with the arrow keys
            if (current_photo && the_key == 39 || current_photo && the_key == 37)
                prevNextKeyNav(the_key);

            if (the_key == 27)
                closeLightBox();
        }

        function thumbKeyNav(the_key) {
            // 37 = ArrowLeft
            // 39 = ArrowRight
            if (the_key == 37 || the_key == 39)
                active_thumb.setAttribute('tabindex', '-1');
            if (the_key == 37 && active_thumb !== thumbs_list.firstElementChild)
                active_thumb = active_thumb.previousElementSibling;
            if (the_key == 39 && active_thumb !== thumbs_list.lastElementChild)
                active_thumb = active_thumb.nextElementSibling;

            active_thumb.setAttribute('tabindex', '0');
            active_thumb.focus();
        }

        function prevNextKeyNav(the_key) {
            const current = lightbox.querySelector('[data-id="' + current_photo + '"]'),
                next = current.nextElementSibling,
                prev = current.previousElementSibling;

            let next_elm;
            if (the_key == 39 && next)
                next_elm = next.getAttribute('data-id');
            if (the_key == 37 && prev)
                next_elm = prev.getAttribute('data-id');

            if (next_elm)
                navLightBox(next_elm);

        }
        // @End key navigation
        // -------------------

        // Handle the prev and next click event
        function navLightBoxClick(evt) {
            const current = lightbox.querySelector('[data-id="' + current_photo + '"]'),
                next = current.nextElementSibling,
                prev = current.previousElementSibling;

            const next_elm = evt.currentTarget.classList.contains('lightbox-nav-next')
                            ? next.getAttribute('data-id') : prev.getAttribute('data-id');

            navLightBox(next_elm);
        }

        // set and get lightbox attribute to be able to toggle the
        function navLightBox(next) {
            lightbox.setAttribute('data-show-id', next);
            const next_id = lightbox.getAttribute('data-show-id');
            togglePhoto(next_id);
        }
    }

    return lightBox;
})();
