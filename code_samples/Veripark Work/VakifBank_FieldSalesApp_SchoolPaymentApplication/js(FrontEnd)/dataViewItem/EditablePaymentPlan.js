/*
 * File: app/view/dataViewItem/EditablePaymentPlan.js
 *
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('VeriBranch.view.dataViewItem.EditablePaymentPlan', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.vpeditablepaymentplandataviewitem',

    requires: [
        'VeriBranch.view.field.DatePicker',
        'VeriBranch.view.field.AmountField',
        'Ext.field.DatePicker'
    ],

    config: {
        height: 50,
        margin: '7px 0 0 0',
        layout: 'hbox',
        items: [
            {
                xtype: 'component',
                flex: 8,
                cls: 'vpx-textCenter',
                itemId: 'installmentOrder'
            },
            {
                xtype: 'vpdatepickerfield',
                showFuture: true,
                itemId: 'installmentDate',
                readOnly: false,
                defaultPhonePickerConfig: null,
                defaultTabletPickerConfig: null,
                flex: 8
            },
            {
                xtype: 'component',
                flex: 15,
                itemId: 'dummyTwo'
            },
            {
                xtype: 'vpamountfield',
                cls: [
                    'vpx-textField',
                    'vp-paddingModifier'
                ],
                itemId: 'installmentAmount',
                flex: 8
            },
            {
                xtype: 'component',
                flex: 1,
                itemId: 'dummyTwo1'
            }
        ],
        listeners: [
            {
                fn: 'onTextfieldKeyup',
                event: 'keyup',
                delegate: '#installmentAmount'
            }
        ]
    },

    onTextfieldKeyup: function(textfield, e, eOpts) {
        if(textfield.getValue() != ""){
            var editablePaymentPlanTable = textfield.getParent().getParent().getParent().getParent();

            var gridData = editablePaymentPlanTable.getGridData();
            var amountSum = 0;

            Ext.Array.each(gridData, function(data){
                var amount = parseInt(data.amount);
                if(!isNaN(amount)){
                    amountSum = amountSum + amount;
                }
            });

            editablePaymentPlanTable.setFooter(amountSum);
        }
    },

    updateRecord: function(record) {
        var me = this,
            installmentOrder = me.down('#installmentOrder'),
            installmentDate = me.down('#installmentDate'),
            installmentAmount = me.down('#installmentAmount');

        if(record){
            installmentOrder.setHtml(record.data.order);
            installmentDate.setValue(new Date(record.data.date));
            installmentAmount.setValue(record.data.amount);
        }
    }

});