/*
 * File: app/view/onlineSchoolPaymentCollection/Start.js
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

Ext.define('VeriBranch.view.onlineSchoolPaymentCollection.Start', {
    extend: 'Ext.Container',

    mixins: {
        veribranchView: 'VeriBranch.ViewMixin'
    },
    requires: [
        'VeriBranch.view.control.ApplicationBackButton',
        'VeriBranch.view.control.Header',
        'VeriBranch.view.control.StepControlContainer',
        'VeriBranch.view.control.ResultControl',
        'VeriBranch.view.control.SearchCustomer',
        'Ext.Button',
        'Ext.Container'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'controlapplicationbackbutton',
                hidden: false,
                itemId: 'back'
            },
            {
                xtype: 'vpcontrolheader',
                itemId: 'header'
            },
            {
                xtype: 'vpstepcontrolcontainer',
                allowNavigateNext: false,
                allowNavigateBack: false,
                itemId: 'stepControl'
            },
            {
                xtype: 'vpresultcontrol',
                cls: 'vp-result-control',
                itemId: 'resultControl'
            },
            {
                xtype: 'container',
                flex: 1,
                cls: 'vpx-stepContentContainer',
                itemId: 'contentContainer',
                items: [
                    {
                        xtype: 'vpsearchcustomer',
                        itemId: 'searchCustomerContainer'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onSearchContainerSearchButtonTap',
                event: 'searchButtonTap',
                delegate: '#searchCustomerContainer'
            }
        ]
    },

    onSearchContainerSearchButtonTap: function(control, button) {
        var me = this,
            controller = me.getController();

        me.setResult(null);

        if(me.isValid()){
            controller.callGetMssCustomerTransaction(me);
        }
    },

    displayIntelPopup: function() {
        VeriBranch.Utilities.logInfo('onlineConsumerLoan.Start.displayIntelPopup');

        var me = this,
            flowModel = me.getFlowModel(),
            popupControl = Ext.create("VeriBranch.view.control.IntelligencePopupContainer");

        if(flowModel.data.isNewCustomer){
            popupControl.setNewCustomerFlow(true);
        }

        if(flowModel.data.stopFlow){
            popupControl.showPopup({message: resources.getValue('Popup.AllowIntelligenceQuery')});
        } else{
            popupControl.showPopup(flowModel.data);
        }
    },

    initialize: function() {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Start.initialize');

        this.callParent();

        var me = this;
        me.populateForms();
    }

});