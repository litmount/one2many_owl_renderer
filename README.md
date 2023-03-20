# one2many_owl_renderer

### Usage after app install

![image](https://user-images.githubusercontent.com/20094358/226367695-28bf27d5-2d10-4404-88da-71b638f76d18.png)
![image](https://user-images.githubusercontent.com/20094358/226367857-687c760d-039c-4822-9ac2-e22ad04bffd8.png)
![image](https://user-images.githubusercontent.com/20094358/226367974-2bc37b15-09f9-467d-a08f-e3ef8cb4f230.png)

### The Goal
Is to populate a One2many with Owl renderer

### The attempt we are trying to make
1. Make our own custom Owl Renderer
1. Extend One2many widget and override [_getRenderer](https://github.com/odoo/odoo/blob/14f8c49f0e0fdfc861ac7ed2fb75434159fe9d7b/addons/web/static/src/js/fields/relational_fields.js#L1318) method to return our Owl Renderer

### Important files
- Here is the [custom widget](https://github.com/litmount/one2many_owl_renderer/blob/main/static/src/js/fields/relational_fields.js)
- Here is the [owl renderer](https://github.com/litmount/one2many_owl_renderer/blob/main/static/src/js/order_form/order_form_renderer_owl.js) (Template is in same dir)

### The Problem
It will let set values on create, but when we **edit** the record it does not save the changes when we save the form view. It will "save" without throwing an error, but as soon as you try to leave the form view it says there are uncommitted changes.

![image](https://user-images.githubusercontent.com/20094358/226366362-7f23f9bd-e764-47cb-88fd-911325f450e9.png)



