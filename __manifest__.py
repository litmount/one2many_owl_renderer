{
    'name': "One2many Owl Renderer",
    'description': """
        Save One2many values from owl renderer.
    """,

    'author': "Denver Risser",
    'website': "denver@littlemountainprinting.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': [
        'contacts',
        'product',
        'web',
    ],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/ad_order_views.xml',
        'views/webclient_templates.xml',
    ],
    'qweb': [
        "static/src/js/order_form/ad_order_form.xml",
    ],
    'application': True,
}
