{
    'name': 'uzumintegration',
    'version': '2.0',
    'depends': ['base', 'web', 'product'],
    'data': [
        'security/ir.model.access.csv',
        'views/ecommerce_product.xml',
        'views/product.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'uzumintegration/static/src/js/product.js',
        ],
    },
    'installable': True,
    'application': True,
}
