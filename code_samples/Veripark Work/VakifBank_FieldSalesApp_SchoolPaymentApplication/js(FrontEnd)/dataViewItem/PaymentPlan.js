/*
 * File: app/view/dataViewItem/PaymentPlan.js
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

Ext.define('VeriBranch.view.dataViewItem.PaymentPlan', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.vppaymentplandataviewitem',

    requires: [
        'Ext.Component'
    ],

    config: {
        layout: 'hbox',
        items: [
            {
                xtype: 'component',
                flex: 8,
                cls: 'vpx-textCenter',
                itemId: 'installmentOrder'
            },
            {
                xtype: 'component',
                flex: 8,
                cls: 'vpx-textCenter',
                itemId: 'installmentDate'
            },
            {
                xtype: 'component',
                flex: 15,
                itemId: 'dummyTwo2'
            },
            {
                xtype: 'component',
                flex: 8,
                cls: 'vpx-textCenter',
                itemId: 'installmentAmount'
            },
            {
                xtype: 'component',
                flex: 1,
                itemId: 'dummyTwo3'
            }
        ]
    },

    updateRecord: function(record) {
        var me = this,
            installmentOrder = me.down('#installmentOrder'),
            installmentDate = me.down('#installmentDate'),
            installmentAmount = me.down('#installmentAmount');

        if(record){
            installmentOrder.setHtml(record.data.order);
            installmentDate.setHtml(VeriBranch.Utilities.isTemplateItemHasValue(VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(record.data.date))));
            installmentAmount.setHtml(VeriBranch.Utilities.isTemplateItemHasValue(record.data.amount) + " " + resources.getValue("Tl"));
        }
    }

});