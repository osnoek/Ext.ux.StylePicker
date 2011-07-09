Ext.define('Ext.ux.stylepicker.StylePicker', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Ext.ux.colorpicker.ColorPickerField', 'Ext.ux.stylepicker.Style' ],
	alias : 'widget.ux.stylepicker',
	width : 400,
	config : {
		styleConfig : null
	},

	constructor : function(config) {
		var me = this;

		me.initConfig(config);
		me.callParent(arguments);

		return me;
	},

	initStyle : function() {
		var me = this, styleConfig = me.styleConfig;

		me.styleConfig = Ext.create('Ext.ux.stylepicker.Style', Ext.apply({}, styleConfig));
	},

	initComponent : function() {
		var me = this;

		me.initStyle();
		me.items = me.buildItems();
		me.buttons = me.buildButtons();

		me.callParent();

		me.addEvents([ 'cancel', 'select' ]);
	},

	afterRender : function() {
		var me = this;

		me.callParent();

		me.applyStyle();
	},

	applyStyle : function() {
		var me = this;

		me.styleConfig.setStyle({
			'font-family' : me.down('#cmbFamily').getValue(),
			'font-size' : me.down('#txtSize').getValue() + me.down('#cmbUnit').getValue(),
			'text-decoration' : me.down('#cmbDecoration').getValue(),
			color : me.down('#clrColor').getValue(),
			'font-weight' : me.down('#chkBold').getValue() ? 'bold' : 'normal',
			'font-style' : me.down('#chkItalic').getValue() ? 'italic' : 'normal'
		});

		var cntExample = me.down('#cntExample'), lbl = cntExample.query('label')[0];

		lbl.setText(me.down('#cmbFamily').getRawValue());
		lbl.getEl().setStyle(me.styleConfig);
	},

	buildItems : function() {
		var me = this, style = me.styleConfig, fontSize = style.getFontSize();
		return [ {
			xtype : 'container',
			items : [ {
				xtype : 'container',
				height : 100,
				padding : 5,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [ {
					xtype : 'container',
					padding : '0 5 0 0',
					flex : 1,
					layout : 'anchor',
					items : [ {
						xtype : 'combo',
						itemId : 'cmbFamily',
						fieldLabel : 'Family',
						labelWidth : 60,
						anchor : '100%',
						queryMode : 'local',
						editable : true,
						valueField : 'val',
						displayField : 'lbl',
						value : style['font-family'],
						listeners : {
							change : me.applyStyle,
							scope : me
						},
						store : {
							fields : [ 'val', 'lbl' ],
							data : [ {
								val : 'arial, helvetica, sans-serif',
								lbl : 'Arial'
							}, {
								val : 'arial black, sans-serif',
								lbl : 'Arial Black'
							}, {
								val : 'trebuchet MS, sans-serif',
								lbl : 'Trebuchet MS'
							}, {
								val : 'courier new, courier, monospace',
								lbl : 'Courier'
							}, {
								val : 'helvetica, sans-serif',
								lbl : 'Helvetica'
							}, {
								val : 'verdana, sans-serif',
								lbl : 'Verdana'
							}, {
								val : 'georgia, serif',
								lbl : 'Georgia'
							}, {
								val : 'palatino linotype, palatino, serif',
								lbl : 'Palatino'
							}, {
								val : 'impact, sans-serif',
								lbl : 'Impact'
							}, {
								val : 'tahoma, verdana, arial, sans-serif',
								lbl : 'Tahoma'
							}, {
								val : 'times new roman, times, serif',
								lbl : 'Times New Roman'
							}, {
								val : 'lucida sans unicode, lucida grande, sans-serif',
								lbl : 'Lucida Sans'
							} ]
						}
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : 'Font Size',
						labelWidth : 60,
						anchor : '100%',
						layout : 'hbox',
						items : [ {
							xtype : 'numberfield',
							itemId : 'txtSize',
							minValue : 0,
							value : fontSize.size,
							flex : 1,
							listeners : {
								change : me.applyStyle,
								scope : me
							}
						}, {
							xtype : 'combo',
							itemId : 'cmbUnit',
							width : 40,
							queryMode : 'local',
							editable : true,
							forceSelection : true,
							valueField : 'val',
							displayField : 'lbl',
							value : fontSize.unit,
							listeners : {
								change : me.applyStyle,
								scope : me
							},
							store : {
								fields : [ 'val', 'lbl' ],
								data : [ {
									val : 'px',
									lbl : 'px'
								}, {
									val : '%',
									lbl : '%'
								}, {
									val : 'em',
									lbl : 'em'
								} ]
							}
						} ]
					}, {
						xtype : 'combo',
						itemId : 'cmbDecoration',
						fieldLabel : 'Decoration',
						labelWidth : 60,
						anchor : '100%',
						queryMode : 'local',
						editable : true,
						forceSelection : true,
						valueField : 'val',
						displayField : 'lbl',
						value : style['text-decoration'],
						listeners : {
							change : me.applyStyle,
							scope : me
						},
						store : {
							fields : [ 'val', 'lbl' ],
							data : [ {
								val : 'none',
								lbl : 'none'
							}, {
								val : 'line-through',
								lbl : 'line-through'
							}, {
								val : 'overline',
								lbl : 'overline'
							}, {
								val : 'underline',
								lbl : 'underline'
							} ]
						}
					} ]
				}, {
					xtype : 'container',
					flex : 1,
					layout : 'anchor',
					items : [ {
						xtype : 'ux.colorpickerfield',
						itemId : 'clrColor',
						fieldLabel : 'Text color',
						labelWidth : 60,
						anchor : '100%',
						value : style['color'],
						listeners : {
							select : me.applyStyle,
							scope : me
						}
					}, {
						xtype : 'checkbox',
						itemId : 'chkBold',
						fieldLabel : 'Bold',
						labelWidth : 60,
						anchor : '100%',
						height : 22,
						checked : (style['font-weight'] === 'bold'),
						listeners : {
							change : me.applyStyle,
							scope : me
						}
					}, {
						xtype : 'checkbox',
						itemId : 'chkItalic',
						fieldLabel : 'Italic',
						labelWidth : 60,
						anchor : '100%',
						height : 22,
						checked : (style['font-style'] === 'italic'),
						listeners : {
							change : me.applyStyle,
							scope : me
						}
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				title : 'Preview',
				layout : 'fit',				
				height : 75,
				padding : '0 5 0 5',
				margin : 5,
				items : {
					itemId : 'cntExample',
					border : false,
					layout : 'fit',
					autoScroll : true,
					items : {
						xtype : 'label',
						text : 'Example'
					}
				}
			} ]
		} ];
	},

	buildButtons : function() {
		var me = this;
		return [ {
			text : 'Cancel',
			handler : function() {
				me.fireEvent('cancel');
			},
			scope : me
		}, {
			text : 'OK',
			handler : function() {
				me.fireEvent('select', me, me.styleConfig);
			},
			scope : me
		} ];
	}
});