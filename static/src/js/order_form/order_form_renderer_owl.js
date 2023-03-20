odoo.define("lmp_fishwrapper.OrderFormRendererOwl", function (require) {
    "use strict";

    const AbstractRendererOwl = require("web.AbstractRendererOwl");
    const patchMixin = require("web.patchMixin");
    const QWeb = require("web.QWeb");
    const session = require("web.session");
    const core = require("web.core");

    const { useState, onMounted, willUpdateProps, useRef } = owl.hooks;

    const { FieldBoolean } = require('web.basic_fields_owl');


    class OrderFormRendererOwl extends AbstractRendererOwl {
        constructor(parent, props) {
            super(...arguments);

            this.qweb = new QWeb(this.env.isDebug(), { _s: session.origin });
            this.state = useState({ data: props.data.data || [], editable: this.props.rendererParams.editable})
            this.currentRow = null;
            this.viewType = 'list';

            this.orderListRef = useRef('order_list');

        }
        willUpdateProps(nextProps) {
            Object.assign(this.state, { data: nextProps.data.data });
        }

    }


    Object.assign(OrderFormRendererOwl, {
        defaultProps: {
            data: [],
        },
        props: {
            rendererParams: {
                type: Object,
            },
            data: {
                type: Object,
            },
        },
        components: { FieldBoolean },
        template: "lmp_fishwrapper.OrderFormRenderer",
    });

    return patchMixin(OrderFormRendererOwl);

});
