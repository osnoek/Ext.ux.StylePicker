Ext.define('Ext.ux.stylepicker.Style', {
	extend : 'Ext.Base', 
	
	'font-family' : 'verdana, sans-serif',
	'font-size' : '12px',
	'text-decoration' : 'none',
	color : '#000000',
	'font-weight' : 'normal',
	'font-style' : 'normal',
	
	constructor : function(config) {
		var me = this;

		config = config || {};
		Ext.apply(me, config);
		
		me.callParent([config]);
	},
	
	setStyle : function(cfg){
		Ext.applyIfChanged(this, cfg);
	},
	
	getFontSize : function(){
		var units, unit = 'px', sizes, size = 0;
				
		if(units = /(%|px|em)/gi.exec(this['font-size'])) {
			unit = units[0];
		}
				
		if(sizes = /\d*/g.exec(this['font-size'])) {
			size = parseInt(sizes[0]);
		}
		
		return({
			size : size,
			unit : unit
		});
		
	}
});