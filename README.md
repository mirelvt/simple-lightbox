# MVT-Lightbox 1.2

This simple lightbox uses Javascript, CSS and [Velocity.js](http://julian.com/research/velocity/).
For the arrows + close button I use inline svg. You can replace them with your own
images or icons.

## Dependencies

- mvt-lightbox.min.js
- velocity-1.2.3.min.js
- mvt-lightbox.min.css

## Usage

Add velocity-1.2.3.min.js and mvt-lightbox.min.js at the bottom of the body of your html page:
```html
<script src="js/velocity-1.2.3.min.js" type="text/javascript"></script>
<script src="js/mvt-lightbox.min.js" type="text/javascript"></script>
```

Add mvt-lightbox.min.css file to your html page:
```html
<link rel="stylesheet" type="text/css" href="mvt-lightbox.min.css">
```

The html structure of the lightbox is as follows:
```html
<section data-lightbox="mvt-lightbox">
    <ul>
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
    <div class="lightbox" data-show-id="">
        <div class="img-list">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
            <img src="[path to your image]" alt="">
        </div>
        <div class="btn-close">
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
mvt_lightbox(document.querySelector('[data-lightbox="mvt-lightbox"]'));
```

## Releases
2016-01-05 v1.2: Replace GSAP with Velocity.js. Clean up code.

2015-09-28 v1.1: Fixes the responsive width + height

2015-09-09 v1.0: First release
