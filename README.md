# MVT-Lightbox 3.0

This simple lightbox uses vanilla Javascript and CSS animations. The lightbox is
tested in Edge, Chrome, Safari and Firefox. For the arrows + close button I use
inline svg. You can replace them with your own images or icons.

The lightbox is also keyboard accessible. Use TAB keys to navigate through the
thumbnails. Hit enter or spacebar to open the lightbox. Use arrow keys to navigate
through the images. Hit ESC to close the lightbox.

The thumbnails are now wrapped in a-tags to be more logical accessible, instead
of setting tabindexes on div elements.

There is now a dark mode version.

# MVT-Lightbox 2.0

This simple lightbox uses vanilla Javascript and CSS animations. The lightbox is tested in IE11, Edge, latest Chrome, Safari and Firefox.
For the arrows + close button I use inline svg. You can replace them with your own images or icons.

The lightbox is also keyboard accessible. Use TAB key for focus on first thumbnail. Use arrow keys to navigate through the thumbnails. Hit enter to open the lightbox. Use arrow keys to navigate through the images. Hit ESC to close the lightbox.

## Dependencies

- mvt-lightbox.min.js
- mvt-lightbox.min.css

I created a simple [demo page](http://www.mirellavanteulingen.nl/demos/lightbox/).

## Usage

mvt-lightbox.min.js at the bottom of the body of your html page:
```html
<script src="js/mvt-lightbox.min.js" type="text/javascript"></script>
```

Add mvt-lightbox.min.css file to your html page:
```html
<link rel="stylesheet" type="text/css" href="mvt-lightbox.min.css">
```

The html structure of the lightbox is as follows:
```html
<section data-lightbox="mvt-lightbox">
    <ul class="mvt-thumbs-list">
        <li>
            <img src="[path to your thumbnail image]" alt="">
        </li>
        <li>
            <img src="[path to your thumbnail image]" alt="">
        </li>
        <li>
            <img src="[path to your thumbnail image]" alt="">
        </li>
        <li>
            <img src="[path to your thumbnail image]" alt="">
        </li>
        <li>
            <img src="[path to your thumbnail image]" alt="">
        </li>
    </ul>
    <div class="mvt-lightbox-overlay no-display"></div>
    <div class="mvt-lightbox" data-show-id="">
        <div class="mvt-img-list">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
        </div>
        <div class="mvt-btn-close">
            <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                <title>Close</title>
                <path d="M27.344,4.287 L23.531,0.474 L14,10.005 L4.469,0.474 L0.656,4.287 L10.187,13.818 L0.656,23.349 L4.469,27.162 L14,17.631 L23.531,27.162 L27.344,23.349 L17.813,13.818 L27.344,4.287 Z"></path>
            </svg>
        </div>
        <div class="lightbox-nav-next">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <title>Next</title>
                <path d="M181.683 512.5L96.35 427.203l170.632-170.67L96.352 85.868 181.68.5 437.65 256.534 181.682 512.5z" />
            </svg>
        </div>
        <div class="lightbox-nav-prev">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <title>Previous</title>
                <path d="M85.683,512.5 L0.35,427.203 L170.982,256.533 L0.352,85.868 L85.68,0.5 L341.65,256.534 L85.682,512.5 L85.683,512.5 Z" transform="translate(171.000000, 256.500000) scale(-1, 1) translate(-171.000000, -256.500000) "/>
            </svg>
        </div>
    </div>
</section>
```

To initialize the lightbox, add the following line to your javascript file in DOMContentLoaded:
```js
document.addEventListener('DOMContentLoaded', function() {
    mvt_lightbox(document.querySelector('[data-lightbox="mvt-lightbox"]'));
}, false);
```

## Releases
2018-07-03: v2.0: Make lightbox keyboard accessible.

2018-06-26 v1.3: Remove velocity.js, use CSS animation for the fading effect.

2017-05-31 v1.2.2: Update velocity.js from 1.3.1 to 1.5.0. Use ES6 let and const. Remove prefixes for transition and transform.

2016-09-29 v1.2.1: Update velocity.js from 1.2.3 to 1.3.1. Clean up code. Move
velocity.js to ui-libs directory. Update Makefile to generate minified js.

2016-01-05 v1.2: Replace GSAP with velocity.js. Clean up code.

2015-09-28 v1.1: Fixes the responsive width + height

2015-09-09 v1.0: First release
