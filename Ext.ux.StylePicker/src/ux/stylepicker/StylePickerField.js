Ext.define('Ext.ux.stylepicker.StylePickerField', {
	extend : 'Ext.form.field.Picker',
	requires : [ 'Ext.ux.stylepicker.StylePicker' ],
	alias : 'widget.ux.stylepickerfield',
	matchFieldWidth : false,

	createPicker : function() {
		var me = this, picker;

		picker = me.picker = Ext.create('Ext.ux.stylepicker.StylePicker', {
			floating : true,
			focusOnShow : true,
			listeners : {
				scope : me,
				select : me.onSelect,
				cancel : me.collapse
			},
			styleConfig : me.styleConfig
		});

		return picker;
	},

	collapseIf : function(e) {
	},

	onSelect : function(picker, styleConfig) {
		var me = this;
		me.styleConfig = styleConfig;
		me.collapse();
	}
});