from odoo import models, fields, api


class AdOrderLine(models.Model):
    _name = 'ad.order.line'

    order_id = fields.Many2one('ad.order')

    product_id = fields.Many2one('product.product', compute='_compute_product_id', store=True)
    name = fields.Char('Name', related='product_id.name', store=True)

    area_id = fields.Many2one('fishwrapper.area', string='Area')
    size_id = fields.Many2one('fishwrapper.ad.size', string='Size')

    is_color = fields.Boolean(string='4')
    is_front = fields.Boolean(string='F')
    is_back = fields.Boolean(string='B')

    month_code = fields.Selection(
        [
            ('ja', 'JA'),
            ('fe', 'Fe'),
            ('ma', 'MA'),
            ('ap', 'AP'),
            ('my', 'MY'),
            ('ju', 'JU'),
            ('jy', 'JY'),
            ('au', 'AU'),
            ('se', 'SE'),
            ('oc', 'OC'),
            ('no', 'NO'),
            ('de', 'DE'),
        ],
        string='Month Code',
    )

    issue_number = fields.Integer(string='Issue Number')

    @api.depends('area_id', 'size_id', 'is_color', 'is_front', 'is_back', 'month_code', 'issue_number')
    def _compute_product_id(self):
        for order_line in self:

            size_name, area_code, location, is_color, month_code, issue_number = order_line.get_default_code_vals()

            default_code = f'{size_name}{area_code}{location}{is_color}-{month_code}{issue_number}'
            product_id = self.env['product.product'].search([(
                'default_code', '=', default_code),
            ])

            order_line.product_id = product_id.id

    def get_default_code_vals(self):
        size_name = self.size_id.name
        area_code = self.area_id.code
        location = f'-{"F" if self.is_front else "B"}P' if any([self.is_front, self.is_back]) else ''
        is_color = '-C' if self.is_color else ''
        month_code = self.month_code
        issue_number = self.issue_number

        return size_name, area_code, location, is_color, month_code, issue_number


class AdOrder(models.Model):
    _name = 'ad.order'

    name = fields.Char()

    customer_id = fields.Many2one('res.partner', string='Customer')
    partner_id = fields.Many2one('res.partner', string='Ad For')

    date = fields.Date('Order Date', help='When the order was placed.')

    start_date = fields.Date('Start Date', help='When the ads should start.')
    validity_date = fields.Date('End Date', help='When the ads should end.')

    order_line_ids = fields.One2many('ad.order.line', 'order_id', string='Order Lines')

    def default_get(self, fields_list):
        fields = super().default_get(fields_list)

        fields['order_line_ids'] = [(0, 0, {'order_id': self.id}) for _ in range(4)]

        return fields

