(function() {
    'use strict';
    /* global TweenMax:false */

    function lightBox(container) {
        var thumbs = document.querySelectorAll('li'),
        lightbox = document.querySelector('.lightbox'),
        img_list = lightbox.querySelector('.img-list'),
        nav_next = lightbox.querySelector('.lightbox-nav-next'),
        nav_prev = lightbox.querySelector('.lightbox-nav-prev');

        lightbox.querySelector('.btn-close').addEventListener('click', closeLightBox, false);
        nav_next.addEventListener('click', navLightBox, false);
        nav_prev.addEventListener('click', navLightBox, false);

        // Assign click event on all the thumbs
        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].addEventListener('click', showLightBox, false);
        };

        // The lightbox and image photo is shown based on the value of data-show-id and data-id,
        // if they match show the lightbox + matched photo
        function showLightBox(evt) {
            // Update data-show-id attribute
            var target = evt.currentTarget.getAttribute('data-target');
            lightbox.setAttribute('data-show-id', target);
            showPhoto(target);

            var photo = img_list.querySelector('[data-id="' +  target + '"]');
            animateLightBox(photo);
        }

        // Start the animation and set the width + height of the lightbox based on the image width/height
        function animateLightBox(photo) {
            TweenMax.to(lightbox, 0.5, {
                css:{
                    display: "block",
                    opacity: 1,
                    "max-height": photo.naturalHeight + "px",
                    "max-width": photo.naturalWidth + "px"
                },
                ease: Power2.easeOut
            });

        }

        // Show the target photo in the lightbox container
        function showPhoto(target) {
            var img = img_list.querySelector('[data-id="' + target + '"]');
            var images = img_list.querySelectorAll('img');

            // first hide all images
            for (var i = 0; i < images.length; i++) {
                images[i].style.display = "none";
            }
            // Than show the selected image
            img.style.display = "block";
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
            lightbox.removeAttribute('style');
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
            animateLightBox(photo);
            showPhoto(next_id);
        }
    }

    function onReady() {
        lightBox(document.querySelector('.wrapper'));
    }

    document.addEventListener('DOMContentLoaded', onReady, false);
})();