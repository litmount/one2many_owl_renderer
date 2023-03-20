from odoo import models, fields, api


class FishwrapperZone(models.Model):
    _name = 'fishwrapper.zone'

    name = fields.Char()
    area_ids = fields.One2many('fishwrapper.area', 'zone_id', string='Areas')

class FishwrapperArea(models.Model):
    _name = 'fishwrapper.area'

    name = fields.Char()
    zone_id = fields.Many2one('fishwrapper.zone', string='Zone')
    code = fields.Char(string='Code', help='Short area abbreviation.')