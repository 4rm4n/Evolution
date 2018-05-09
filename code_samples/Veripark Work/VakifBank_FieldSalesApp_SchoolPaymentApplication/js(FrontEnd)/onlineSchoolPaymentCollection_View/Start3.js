/*
 * File: app/view/onlineSchoolPaymentCollection/Start3.js
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

Ext.define('VeriBranch.view.onlineSchoolPaymentCollection.Start3', {
    extend: 'Ext.Container',

    mixins: {
        veribranchView: 'VeriBranch.ViewMixin'
    },
    requires: [
        'VeriBranch.view.control.Header',
        'VeriBranch.view.control.StepControlContainer',
        'VeriBranch.view.control.ResultControl',
        'VeriBranch.view.control.Button',
        'Ext.Button',
        'Ext.form.Panel'
    ],

    config: {
        cls: 'vpx-stepContainer',
        layout: 'vbox',
        items: [
            {
                xtype: 'vpcontrolheader',
                itemId: 'header'
            },
            {
                xtype: 'vpstepcontrolcontainer',
                showBottomContainer: true,
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
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        cls: 'vp-formContainer',
                        itemId: 'paymentPlanTableContainer',
                        items: [
                            {
                                xtype: 'container',
                                cls: 'vp-form-col-6',
                                items: [
                                    {
                                        xtype: 'vpbutton',
                                        height: 50,
                                        itemId: 'newPaymentPlanButton',
                                        margin: '0% 0% 0% 28.5%',
                                        width: '40%'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'vpformpanel',
                        flex: 1,
                        itemId: 'formPanel',
                        layout: 'vbox',
                        scrollable: 'vertical'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onContainerNextButtonTap',
                event: 'nextButtonTap',
                delegate: '#stepControl'
            },
            {
                fn: 'onNewPaymentPlanButtonTap',
                event: 'tap',
                delegate: '#newPaymentPlanButton'
            },
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onContainerNextButtonTap: function(container) {
        var me = this;

        //me.setResult(null);
        me.down("#stepControl").setPreventNext(true);
        me.populateSchoolPaymentsArrayForExecution();
        me.handleDigitalDocumentPopup();
    },

    onNewPaymentPlanButtonTap: function(button, e, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            controller = me.getController();

        var popupControl = Ext.create('VeriBranch.view.control.SchoolPaymentPlanPopupContainer');
        Ext.Viewport.add(popupControl);
    },

    onContainerPainted: function(element, eOpts) {
        var me = this,
            flowModel = me.getFlowModel();

        flowModel.data.documentList = [];
        flowModel.data.digitalDocumentList = [];
    },

    initialize: function() {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Start3.initialize');

        var me = this,
            flowModel = me.getFlowModel();

        me.createTables();

        if(flowModel.raw && flowModel.raw.temporarySaved === true){
            if(!(flowModel.raw.addressList && flowModel.raw.phoneList && flowModel.raw.phoneParameterList && flowModel.raw.documentRequirements)){
                me.callTransactions();
            }
        }else{
            if(!(flowModel.data.addressList && flowModel.data.phoneList && flowModel.data.phoneParameterList && flowModel.data.documentRequirements)){
                me.callTransactions();
            }
        }


    },

    removeAllTables: function() {
        var me = this,
            formPanel = me.down('#formPanel');

        formPanel.removeAll();
    },

    createTables: function() {
        var me = this,
            flowModel = me.getFlowModel(),
            flowModelData = flowModel.data,
            formPanel = me.down('#formPanel');

        if(flowModelData.paymentPlans.length > 0){
            Ext.Array.each(flowModelData.paymentPlans, function(paymentPlan){

                var table = formPanel.add(
                    Ext.create('VeriBranch.view.control.PaymentPlanDataView',{
                        listItemType: 'vppaymentplandataviewitem',
                        columns:[
                            {
                                resourceKey: 'InstallmentOrder',
                                columnType: 'text',
                                fieldName: 'installmentOrder',
                                flex: 8
                            },
                            {
                                resourceKey: 'InstallmentDate',
                                columnType: 'text',
                                fieldName: 'installmentDate',
                                flex: 8
                            },
                            {
                                resourceKey: 'emptyText',
                                columnType: 'text',
                                fieldName: 'installmentDate',
                                flex: 15
                            },
                            {
                                resourceKey: 'InstallmentAmount',
                                columnType: 'text',
                                fieldName: 'installmentAmount',
                                flex: 8
                            },
                            {
                                resourceKey: 'emptyText',
                                columnType: 'text',
                                fieldName: 'installmentDate',
                                flex: 1
                            }
                        ],
                        cls: 'vp-datagridiview',
                        height: 250,
                        isModificationButtonsVisible: true,
                        margin: 10
                    })
                );

                table.setGridData(paymentPlan.paymentPlanGridData);
                table.setFooter(paymentPlan.paymentPlanFooterData);
                table.setUniquePaymentPlanId(paymentPlan.uniquePaymentPlanId);
                table.setTitle(paymentPlan.paymentTypeName);
            });
        }

    },

    handleDigitalDocumentPopup: function() {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Start3.handleDigitalDocumentPopup');

        var me = this,
            flowModel = me.getFlowModel(),
            flow = me.getFlow(),
            controller = me.getController(),
            stepControl = me.down('#stepControl');

        var buttonList = [{
            itemId: 'doc',
            text: resources.getValue("DokumanIleDevam"),
            cls: 'vp-session-continue-btn vp-msgbox-button-no-Vpadding vp-msgbox-verylargebutton-margin vp-msgbox-button-no-Hmargin',
            ui: 'action',
            handler: function() {
                this.hide();
                VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection - Document option has selected for the documents step.');
                flowModel.data.smsFlowSelected = false;
                flowModel.data.digitalFlowSelected = false;

                controller.callCreatePhysicalDocumentTransaction(me).then(
                    function(result){
                        flow.navigateNext();
                    });
            }
        }, {
            itemId: 'digital',
            text: resources.getValue("DijitalOnayIleDevam"),
            cls: 'vp-session-continue-btn vp-msgbox-button-no-Vpadding vp-msgbox-largebutton-margin vp-msgbox-button-no-Hmargin',
            ui: 'action',
            handler: function() {
                this.hide();
                VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection - Digital mobile option has selected for the documents step.');
                flowModel.data.smsFlowSelected = false;
                flowModel.data.digitalFlowSelected = true;
                flow.navigateNext();
            }
        }, {
            itemId: 'close',
            text: resources.getValue('Picker.doneText'),
            cls: 'vp-session-close-btn',
            ui: 'action',
            handler: function() {
                this.hide();
            }
        }];

        VeriBranch.Utilities.showMessageBoxWithButtons("", "PopUp.Message.DevamIcınSec", buttonList);
    },

    populateSchoolPaymentsArrayForExecution: function() {
        var me = this,
            flowModel = me.getFlowModel(),
            paymentPlans = flowModel.data.paymentPlans;

        var schoolPaymentsArray = [];

        Ext.Array.each(paymentPlans, function(paymentPlan){
            Ext.Array.each(paymentPlan.paymentPlanGridData, function(item){
                var cloneItem = JSON.parse(JSON.stringify(item));
                cloneItem.order = parseInt(cloneItem.order);
                cloneItem.paymentType = parseInt(cloneItem.paymentType);
                cloneItem.amount = parseFloat(cloneItem.amount);
                cloneItem.date = new Date(cloneItem.date).toVeriParkApiString();
                schoolPaymentsArray.push(cloneItem);
            });
        });

        flowModel.data.schoolPaymentsArray = schoolPaymentsArray;
    },

    setTransactions: function() {
        VeriBranch.Utilities.logDebug('schoolPaymentCollection.setTransactions');

        var me = this,
            transactions = [],
            flowModel = me.getFlowModel(),
            customerNo = flowModel.data.customerNo;

        var getParameterByCodeTransaction = VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetParameterByCodeInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetParameterByCodeInquiry),
                params: VeriBranch.ApiHelper.getParameterByCodeRequest(null),
                view:me
            }
        },true, "TumParametreKodlari");
        transactions.push(getParameterByCodeTransaction);

        var readCustomerProfileTransaction = VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().ReadCustomerProfileByCustomerNoInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().ReadCustomerProfileByCustomerNoInquiry),
                params: VeriBranch.ApiHelper.readCustomerProfileByCustomerNoRequest(customerNo),
                view:me
            }
        }, false, "");
        transactions.push(readCustomerProfileTransaction);

        var readCustomerContactTransaction = VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().ReadCustomerContactByCustomerNoInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().ReadCustomerContactByCustomerNoInquiry),
                params: VeriBranch.ApiHelper.readCustomerContactByCustomerNoRequest(customerNo),
                view:me
            }
        }, false, "");
        transactions.push(readCustomerContactTransaction);

        var getProductOwnershipTransaction = VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetProductOwnershipByCustomerNoInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetProductOwnershipByCustomerNoInquiry),
                params: VeriBranch.ApiHelper.getProductOwnershipByCustomerNoRequest(customerNo),
                view:me
            }
        }, false, "");
        transactions.push(getProductOwnershipTransaction);

        return transactions;
    },

    callTransactions: function() {
        var me = this,
            flowModel = me.getFlowModel(),
            transactions = me.setTransactions();

        VeriBranch.Promise.allSettled(transactions)
        .then(function(results){
            Ext.Array.each(results, function(result){
                if (result.state === 'fulfilled')
                {
                    if(result.value.response.result.customer){
                        var customer = result.value.response.result.customer;
                        //---------------------------------------------
                        //Set mandatory document transaction parameters
                        //---------------------------------------------
                        if(!flowModel){
                            return;
                        }

                        var hasVbNumber = true;
                        var isStudent = false;
                        if(customer.occupationCode == 36){
                            isStudent = true;
                        }

                        var isNonsalariedCustomer = true;
                        if(customer.isSalaryCustomer){
                            isNonsalariedCustomer = false;
                        }

                        var isPrivateSector = false,
                            isNonsalariedPrivateSector = false,
                            isNonsalariedPublicSector = false;

                        if(customer.sectorCode == 2 || (flowModel.raw && flowModel.raw.sector == 2)){
                            isPrivateSector = true;
                            if(isNonsalariedCustomer){
                                isNonsalariedPrivateSector = true;
                            }
                        }

                        if(customer.sectorCode == 1 || (flowModel.raw && flowModel.raw.sector == 1)){
                            if(isNonsalariedCustomer){
                                isNonsalariedPublicSector = true;
                            }
                        }

                        var isRetired = false;
                        if(customer.occupationCode == 15){
                            isRetired = true;
                        }

                        flowModel.data.documentRequirements = {
                            isStudent : isStudent,
                            isNonsalariedCustomer : isNonsalariedCustomer,
                            isPrivateSector : isPrivateSector,
                            isNonsalariedPrivateSector : isNonsalariedPrivateSector,
                            isRetired : isRetired,
                            hasVbNumber : hasVbNumber,
                            isNonsalariedPublicSector : isNonsalariedPublicSector
                        };
                    }else if(result.value.response.result.addressList && result.value.response.result.emailAddressList && result.value.response.result.phoneList){
                        var contactData = result.value.response.result;
                        flowModel.data.addressList = contactData.addressList;
                        flowModel.data.emailAddressList = contactData.emailAddressList;
                        flowModel.data.phoneList = contactData.phoneList;
                        controller.callGetParameterByCodeTransaction(view);
                    }else if(result.value.response.result.productOwnershipList){
                        Ext.Array.each(customerProductOwnershipList, function(item){
                            if(item.product === 9 && item.ownership === "Var"){
                                hasVbNumber = false;
                                if(flowModel && flowModel.data.documentRequirements){
                                    flowModel.data.documentRequirements.hasVbNumber = hasVbNumber;
                                }
                            }
                        });
                    }else if(result.value.response.result.parameterList){
                        var phone = Ext.Array.filter(result.value.response.result.parameterList, function(item) {
                            return item.groupCode=== "MSTTelefonTipi";
                        });
                        if(phone && phone.length > 0){
                            flowModel.data.phoneParameterList = phone;
                        }
                    }
                }  else if (result.state === 'rejected') {
                    VeriBranch.Utilities.logDebug('schoolPaymenCollection.Start3.callCustomerTransactions rejected!');
                }
            });
        });
    }

});