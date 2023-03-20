from odoo import models, fields, api


class FishwrapperAdSize(models.Model):
    _name = 'fishwrapper.ad.size'

    name = fields.Char('Size', required=True)
