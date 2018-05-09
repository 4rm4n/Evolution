/*
 * File: app/view/control/PaymentPlanDataView.js
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

Ext.define('VeriBranch.view.control.PaymentPlanDataView', {
    extend: 'Ext.Container',
    alias: 'widget.vppaymentplandataview',

    requires: [
        'Ext.Label',
        'Ext.Button',
        'Ext.dataview.DataView'
    ],

    config: {
        listItemType: '',
        pageable: false,
        pageSize: 0,
        pagingIndex: 0,
        disableFieldSet: false,
        isModificationButtonsVisible: false,
        uniquePaymentPlanId: '',
        layout: 'vbox',
        contentScrollable: {
            direction: 'vertical',
            directionLock: true
        },
        columns: null,
        items: [
            {
                xtype: 'container',
                margin: 5,
                layout: {
                    type: 'hbox',
                    pack: 'end'
                },
                items: [
                    {
                        xtype: 'label',
                        cls: 'vpx-smallHeader',
                        docked: 'left',
                        hidden: true,
                        itemId: 'tableTitle'
                    },
                    {
                        xtype: 'vpbutton',
                        cls: 'vp-updatePaymentPlanInfoButton',
                        hidden: true,
                        itemId: 'updateTableButton'
                    },
                    {
                        xtype: 'vpbutton',
                        cls: 'vp-deletePaymentPlanInfoButton',
                        hidden: true,
                        itemId: 'deleteTableButton',
                        icon: 'true',
                        iconAlign: 'center',
                        iconCls: 'trash'
                    }
                ]
            },
            {
                xtype: 'container',
                cls: 'vpx-dataView-headerView',
                height: 40,
                itemId: 'headerContainer',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                }
            },
            {
                xtype: 'dataview',
                flex: 1,
                cls: 'vp-dataView-contentView',
                itemId: 'contentView',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true,
                    indicators: {
                        y: {
                            autoHide: false
                        }
                    }
                },
                deselectOnContainerClick: false,
                emptyText: 'Gösterilecek sonuç bulunamadı',
                useComponents: true
            },
            {
                xtype: 'container',
                cls: 'vpx-dataView-footerView',
                height: 40,
                itemId: 'footerContainer',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                }
            }
        ],
        listeners: [
            {
                fn: 'onUpdateTableButtonTap',
                event: 'tap',
                delegate: '#updateTableButton'
            },
            {
                fn: 'onDeletePaymentPlanButtonTap',
                event: 'tap',
                delegate: '#deleteTableButton'
            },
            {
                fn: 'onDataviewItemTap',
                event: 'itemtap',
                delegate: '#contentView'
            }
        ]
    },

    onUpdateTableButtonTap: function(button, e, eOpts) {
        var me = this,
            activeView = VeriBranch.UIProcess.getActiveView(),
            flowModel = activeView.getFlowModel();

        var popupControl = Ext.create('VeriBranch.view.control.SchoolPaymentPlanPopupContainer');
        popupControl.setUniquePaymentPlanId(me.getUniquePaymentPlanId());
        popupControl.setIsInitializedForUpdate(true);

        var uniquePaymentPlanId = me.getUniquePaymentPlanId();

        var paymentPlanArray = Ext.Array.filter(flowModel.data.paymentPlans, function(paymentPlan){
            return paymentPlan.uniquePaymentPlanId == uniquePaymentPlanId;
        });

        var paymentTypeField = popupControl.down('#paymentType'),
            installmentChoiceField = popupControl.down('#installmentChoice'),
            schoolFeeField = popupControl.down('#schoolFee'),
            installmentQuantityField = popupControl.down('#installmentQuantity'),
            regularPaymentDayField = popupControl.down('#regularPaymentDay'),
            firstInstallmentDateField = popupControl.down('#firstInstallmentDate'),
            advancePaymentAvailableCheckboxField = popupControl.down('#advancePaymentAvailableCheckbox'),
            advancePaymentDateField = popupControl.down('#advancePaymentDate'),
            advancePaymentCostField = popupControl.down('#advancePaymentCost'),
            paymentPlanInfoTable = popupControl.down('#paymentPlanInfo'),
            editablePaymentPlanInfoTable = popupControl.down('#editablePaymentPlanInfo'),
            saveButton = popupControl.down('#saveButton');

        var paymentPlanDataToBeUpdated = paymentPlanArray[0];

        paymentTypeField.setValue(paymentPlanDataToBeUpdated.paymentTypeId);
        schoolFeeField.setValue(paymentPlanDataToBeUpdated.schoolFee);
        installmentQuantityField.setValue(paymentPlanDataToBeUpdated.installmentQuantity);
        regularPaymentDayField.setValue(paymentPlanDataToBeUpdated.regularPaymentDay);
        firstInstallmentDateField.setValue(new Date(paymentPlanDataToBeUpdated.firstInstallmentDate));
        advancePaymentAvailableCheckboxField.setChecked(paymentPlanDataToBeUpdated.isAdvancePaymentAvailable);
        if(advancePaymentAvailableCheckboxField.getChecked()){
            advancePaymentDateField.setValue(new Date(paymentPlanDataToBeUpdated.advancePaymentDate));
            advancePaymentCostField.setValue(paymentPlanDataToBeUpdated.advancePaymentCost);
        }

        if(paymentPlanDataToBeUpdated.installmentChoiceId === 0){
            Ext.Viewport.add(popupControl);
        }else if(paymentPlanDataToBeUpdated.installmentChoiceId == 1){
            editablePaymentPlanInfoTable.setGridData(paymentPlanDataToBeUpdated.paymentPlanGridData);
            editablePaymentPlanInfoTable.setFooter(paymentPlanDataToBeUpdated.paymentPlanFooterData);
            paymentPlanInfoTable.setHidden(true);
            editablePaymentPlanInfoTable.setHidden(false);
            saveButton.setHidden(false);
            Ext.Viewport.add(popupControl);
        }
    },

    onDeletePaymentPlanButtonTap: function(button, e, eOpts) {
        var me = this;

        var buttons = [{
            itemId: 'approve',
            text: resources.getValue('trueText'),
            cls: 'vp-session-continue-btn',
            ui: 'action',
            handler: function() {
                me.deleteThisTable();
                this.hide();
                VeriBranch.Utilities.showMsgBox('', resources.getValue('PaymentPlanHasBeenDeletedInfoMessage'));
            }
        },{
            itemId: 'decline',
            text: resources.getValue('falseText'),
            cls: 'vp-session-continue-btn',
            ui: 'action',
            handler: function() {
                this.hide();
            }
        }];


        VeriBranch.Utilities.showMessageBoxWithButtons('', resources.getValue('PaymentPlanDeleteTableWarningQuestion'), buttons);
    },

    onDataviewItemTap: function(dataview, index, target, record, e, eOpts) {
        var me = this;

        me.fireEvent("listItemTap", me, record, e);

        return true;
    },

    setGridData: function(data) {
        var me = this,
            contentView = me.down("#contentView");

        if (data && data.length > 0){

            contentView.emptyTextCmp.hide();

            if(data && data.length > 0 ){
                var store = VeriBranch.Data.createStore(data);
                contentView.setStore(store);
            }
        }else{
            me.down("#contentView").emptyTextCmp.show();
        }
    },

    setHeader: function() {
        var me = this,
            headerContainer = me.down("#headerContainer");

        headerContainer.removeAll();

        var columns = me.getColumns();

        Ext.Array.each(columns, function(item){

            var columnComponent = Ext.create('VeriBranch.view.control.TapComponent', {
                html: resources.getValue(item.resourceKey),
                cls: "vpx-gridView-HeaderItem",
                flex:item.flex ? item.flex : 1
            });

            headerContainer.add(columnComponent);
        });
    },

    initialize: function() {
        //this.callParent();

        var me = this,
            dataView = me.down('#contentView');

        var listItemAlias = me.config.listItemType;
        dataView._defaultType = dataView.config.defaultType = listItemAlias;

        me.setHeader();

        me.down('#updateTableButton').setHidden(!me.getIsModificationButtonsVisible());
        me.down('#deleteTableButton').setHidden(!me.getIsModificationButtonsVisible());

    },

    setFooter: function(totalSum) {
        var me = this,
            footerContainer = me.down("#footerContainer");

        footerContainer.removeAll();

        var columnComponent = Ext.create('VeriBranch.view.control.TapComponent', {
            html: "Toplam: " + totalSum + " TL",
            cls: "vpx-gridView-FooterItem",
            flex: 3
        });

        footerContainer.add(columnComponent);

    },

    changeListItemType: function(newListItemType) {
        var me = this,
            dataView = me.down('#contentView');
        me.config.listItemType = newListItemType;
        dataView._defaultType = dataView.config.defaultType = newListItemType;
    },

    getGridData: function() {
        var me = this,
            contentView = me.down('#contentView');
        var dataViewTableData = [];

        if(me.getListItemType() == 'vpeditablepaymentplandataviewitem'){
            var viewItems = contentView.getViewItems();
            var contentViewStoreDataItems = contentView.getStore().getData().items;
            var viewItemArray = [];

            Ext.Array.each(contentViewStoreDataItems, function(contentViewStoreDataItem){
                dataViewTableData.push(JSON.parse(JSON.stringify(contentViewStoreDataItem.raw)));
            });

            Ext.Array.each(viewItems, function(viewItem){
                if(viewItem.items && viewItem.items.items && viewItem.items.items.length && viewItem.items.items.length > 3){
                    var installmentOrder = viewItem.items.items[0].getHtml();
                    var installmentDate = viewItem.items.items[1].getValue();
                    var installmentAmount = viewItem.items.items[3].getAmountValue();

                    viewItemArray.push({order: installmentOrder, date: new Date(installmentDate), amount: installmentAmount});
                }
            });

            for(var i = 0; i < viewItemArray.length; i ++){
                dataViewTableData[i].order = viewItemArray[i].order;
                dataViewTableData[i].date = viewItemArray[i].date;
                dataViewTableData[i].amount = viewItemArray[i].amount;
            }

        }else if(me.getListItemType() == 'vppaymentplandataviewitem'){
            var contentViewStoreDataItems = contentView.getStore().getData().items;
            Ext.Array.each(contentViewStoreDataItems, function(contentViewStoreDataItem){
                dataViewTableData.push(contentViewStoreDataItem.raw);
            });
        }

        //To convert all date hours to noon 12 for them to not to be affected by GMT conversions:
        if(dataViewTableData.length > 0){
            Ext.Array.each(dataViewTableData, function(data){
                if(data.date){
                    data.date = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), 12, 0, 0);
                }
            });
        }

        return dataViewTableData;
    },

    getFooter: function() {
        var me = this,
            footerContainer = me.down('#footerContainer');

        var dataViewTableFooterData;

        if(footerContainer.innerItems && footerContainer.innerItems.length && footerContainer.innerItems[0].config && footerContainer.innerItems[0].config.html){
            dataViewTableFooterData = footerContainer.innerItems[0].config.html.match(/\d+/g)[0];
        }

        return dataViewTableFooterData;
    },

    deleteThisTable: function() {
        var me = this,
            activeView = VeriBranch.UIProcess.getActiveView(),
            flowModel = activeView.getFlowModel();

        var uniquePaymentPlanId = me.getUniquePaymentPlanId();
        var paymentPlans = Ext.Array.filter(flowModel.data.paymentPlans, function(paymentPlan){
            return paymentPlan.uniquePaymentPlanId != uniquePaymentPlanId;
        });

        flowModel.data.paymentPlans = paymentPlans;

        activeView.removeAllTables();
        activeView.createTables();
    },

    setTitle: function(name) {
        var me = this;
        me.down('#tableTitle').setHtml(resources.getValue('OdemePlanıHeader') + " (" + name + ")");
        me.down('#tableTitle').setHidden(!me.getIsModificationButtonsVisible());
    }

});