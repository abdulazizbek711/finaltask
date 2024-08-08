from odoo import http
from odoo.http import request
import base64
import requests
import logging

_logger = logging.getLogger(__name__)

class EcommerceProduct(http.Controller):
    @http.route('/ecommerce_product/save', type='http', auth='public', methods=['POST'], csrf=False)
    def save_product(self, **kwargs):
        product_name = kwargs.get('name')
        product_description = kwargs.get('description')
        product_rating = kwargs.get('rating')
        product_image = kwargs.get('image')

        _logger.info("Received data from form: name=%s, description=%s, rating=%s, image=%s", product_name, product_description, product_rating, product_image)

        # Validate that we have the required data
        if not product_name or not product_image:
            return "Invalid data received!"

        try:
            image_content = requests.get(product_image).content if product_image else None
            encoded_image = base64.b64encode(image_content) if image_content else False

            # Save the product data to the database
            product_model = request.env['ecommerce.product']
            product_model.create({
                'name': product_name,
                'description': product_description,
                'rating': float(product_rating) if product_rating else 0.0,
                'image': encoded_image,
            })

            _logger.info("Product saved successfully: %s", product_name)
            return 'Product saved successfully!'
        except Exception as e:
            _logger.error("Error saving product: %s", e)
            return "Error saving product!"

