odoo.define('uzumintegration.ecommerce_product', function (require) {
    'use strict';

    var ajax = require('web.ajax');
    console.log("We are good to go");

    $(document).ready(function () {
        console.log("Document is ready, attaching event handler.");
        $(document).on('change', '#uzum_url', function () {
            var uzumUrl = $(this).val();
            if (uzumUrl) {
                console.log('Uzum URL changed:', uzumUrl);
                fetchProductData(uzumUrl);
            }
        });
    });

    function fetchProductData(uzumUrl) {
        console.log('Fetching product data from:', uzumUrl);

        $.ajax({
            type: 'GET',
            url: uzumUrl,
            success: function (data) {
                console.log('Product data fetched:', data);

                if (data && data.payload) {
                    var payload = data.payload;
                    $('#name').val(payload.title || '');
                    $('#description').val(payload.description || '');
                    $('#rating').val(payload.rating || 0.0);

                    if (payload.photos && payload.photos.length > 0) {
                        var photo = payload.photos[0].photo;
                        if (photo) {
                            var imageUrl = null;
                            if (photo['240'] && photo['240'].high) {
                                imageUrl = photo['240'].high;
                            } else if (photo['120'] && photo['120'].high) {
                                imageUrl = photo['120'].high;
                            } else if (photo['80'] && photo['80'].high) {
                                imageUrl = photo['80'].high;
                            } else if (photo['60'] && photo['60'].high) {
                                imageUrl = photo['60'].high;
                            }

                            if (imageUrl) {
                                fetchImageAndEncodeAsBase64(imageUrl);
                            }
                        }
                    }
                } else {
                    console.error('Invalid data structure received:', data);
                }
            },
            error: function (error) {
                console.error('Error fetching product data:', error);
            }
        });
    }

    function fetchImageAndEncodeAsBase64(imageUrl) {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                var reader = new FileReader();
                reader.onloadend = function () {
                    var base64Image = reader.result;
                    console.log('Image encoded as base64:', base64Image);

                    // Update the Odoo form field with the base64-encoded image
                    $('input[name="image_url"]').val(base64Image);
                    $('#image').attr('src', base64Image);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => console.error('Error fetching image:', error));
    }
});
