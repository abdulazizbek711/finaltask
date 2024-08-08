from odoo import models, fields, api


class EcommerceProduct(models.Model):
    _name = 'ecommerce.product'
    _description = 'Ecommerce Product'

    name = fields.Char(string='Name')
    uzum_url = fields.Char(string='Uzum URL')
    description = fields.Text(string='Description')
    rating = fields.Float(string='Rating')
    image_url = fields.Binary(string='Image')