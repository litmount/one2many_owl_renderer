odoo.define('lmp_fishwrapper.relational_fields', function (require) {
    "use strict";

    const relational_fields = require('web.relational_fields');
    const OrderFormRendererOwl = require('lmp_fishwrapper.OrderFormRendererOwl');
    const RendererWrapper = require("web.RendererWrapper");
    var FieldRegistry = require('web.field_registry');
    var dom = require('web.dom');


    var OrderForm = relational_fields.FieldOne2Many.extend({

        _render: function () {
            var self = this;
            if (!this.view) {
                return this._super();
            }

            if (this.renderer) {
                this.currentColInvisibleFields = this._evalColumnInvisibleFields();
                return this.renderer.updateState(this.value, {
                    addCreateLine: this._hasCreateLine(),
                    addTrashIcon: this._hasTrashIcon(),
                    columnInvisibleFields: this.currentColInvisibleFields,
                    keepWidths: true,
                }).then(() => {
                    return this._updateControlPanel({ size: this.value.count });
                });
            }
            var arch = this.view.arch;
            var viewType;
            var rendererParams = {
                arch: arch,
            };

            if (arch.tag === 'tree') {
                viewType = 'list';
                this.currentColInvisibleFields = this._evalColumnInvisibleFields();
                _.extend(rendererParams, {
                    editable: this.mode === 'edit' && arch.attrs.editable,
                    addCreateLine: this._hasCreateLine(),
                    addTrashIcon: this._hasTrashIcon(),
                    isMany2Many: this.isMany2Many,
                    columnInvisibleFields: this.currentColInvisibleFields,
                });
            }

            if (arch.tag === 'kanban') {
                viewType = 'kanban';
                var record_options = {
                    editable: false,
                    deletable: false,
                    read_only_mode: this.isReadonly,
                };
                _.extend(rendererParams, {
                    record_options: record_options,
                    readOnlyMode: this.isReadonly,
                });
            }

            _.extend(rendererParams, {
                viewType: viewType,
            });

            var Renderer = this._getRenderer();

            let state = Object.assign({}, { data: this.value, rendererParams: rendererParams });

            this.renderer = new RendererWrapper(this, Renderer, state);

            this.$el.addClass('o_field_x2many o_field_x2many_' + viewType);
            if (this.renderer) {
                return this.renderer.mount(document.createDocumentFragment()).then(function () {
                    dom.append(self.$el, self.renderer.el, {
                        in_DOM: self.isInDOM,
                        callbacks: [{widget: self.renderer}],
                    });
                });
            } else {
                return this._super();
            }
        },

        /**
         * We want to use our custom renderer for the list.
         *
         * @override
         */
        _getRenderer: function () {
            if (this.view.arch.tag === 'tree') {
                return OrderFormRendererOwl;
            }
            return this._super.apply(this, arguments);
        },

    });

    FieldRegistry.add('order_form', OrderForm);


});