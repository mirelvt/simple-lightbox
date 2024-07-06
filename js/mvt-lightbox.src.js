/*
 * MVT-Lightbox v3.0
 * https://github.com/mirelvt/mvt-lightbox
 *
 * Released under the MIT license
 *
 * Date: 2024-07-06
 */

var mvt_lightbox = (function() {
    'use strict';

    function lightBox(container) {
        let current_photo, img, target;

        const thumbs_list = container.querySelector('.mvt-thumbs-list'),
            thumbs = container.querySelectorAll('a'),
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
                elm.addEventListener('click', onThumbClick);
                elm.addEventListener('keyup', onKeyThumbClick);
            }

            // Set data-id attribute on each gallery image
            for (let i = 0; i < images.length; i++) {
                const elm = images[i];
                elm.setAttribute('data-id', 'image-' + i);
            }
        })();

        function onThumbClick(evt) {
            evt.preventDefault();
            target = evt.currentTarget.getAttribute('data-target');
            showLightBox(target);
        }

        function onKeyThumbClick(evt) {
            // 13 = Enter
            // 32 = Spacebar
            target = evt.currentTarget.getAttribute('data-target');
            if (evt.keyCode == 13 || evt.keyCode == 32)
                showLightBox(target);
        }

        /* ***
         * The lightbox and photo is shown based on the value of data-show-id
         * and data-id. If they match: show the lightbox + photo.
         *** */
        function showLightBox(target) {
            // Update data-show-id attribute
            lightbox.setAttribute('data-show-id', target);
            lightbox.classList.remove('fade-out');
            lightbox.classList.add('show');
            document.body.classList.add('lightbox-active');
            togglePhoto(target);
        }

        // Show the target photo in the lightbox container
        function togglePhoto(target) {
            if (current_photo) {
                // First remove the class name of the previous current photo
                img.classList.remove('current-img');
                // Set the new current_photo based on target
                current_photo = target;
                img = img_list.querySelector(`[data-id="${target}"]`);
                img.classList.add('current-img');
            } else {
                current_photo = target;
                img = img_list.querySelector(`[data-id="${target}"]`);
                img.classList.add('current-img');
            }

            // Show the lightbox nav arrows
            toggleLightBoxNav(current_photo);
        }
        // Hide "prev" when the first photo is shown and hide "next" when the last
        // photo is shown.
        function toggleLightBoxNav(current) {
            const current_img = lightbox.querySelector(`[data-id="${current}"]`);
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
            lightbox.classList.remove('show');
            lightbox.classList.add('fade-out');
            img.classList.remove('current-img');
            document.body.classList.remove('lightbox-active');
        }

        // -------------------------
        // Start Keyboard navigation
        function keyNavigation(evt) {
            // 32 = Spacebar
            // 13 = Enter
            // 27 = ESC

            const the_key = evt.keyCode;

            // Prev/next navigation with the arrow keys
            if (current_photo && the_key == 39 || current_photo && the_key == 37)
                prevNextKeyNav(the_key);

            if (the_key == 27)
                closeLightBox();
        }

        function prevNextKeyNav(the_key) {
            const current = lightbox.querySelector(`[data-id="${current_photo}"]`),
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
            const current = lightbox.querySelector(`[data-id="${current_photo}"]`),
                next = current.nextElementSibling,
                prev = current.previousElementSibling;

            const next_elm = evt.currentTarget.classList.contains('lightbox-nav-next')
                            ? next.getAttribute('data-id') : prev.getAttribute('data-id');

            navLightBox(next_elm);
        }

        // Set and get lightbox attribute to be able to toggle the next image
        function navLightBox(next) {
            lightbox.setAttribute('data-show-id', next);
            const next_id = lightbox.getAttribute('data-show-id');
            togglePhoto(next_id);
        }
    }

    return lightBox;
})();
