/*
 * File: app/view/control/SchoolPaymentPlanPopupContainer.js
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

Ext.define('VeriBranch.view.control.SchoolPaymentPlanPopupContainer', {
    extend: 'Ext.Container',
    alias: 'widget.vpschoolpaymentplanpopupcontainer',

    mixins: {
        veribranchView: 'VeriBranch.ControlMixin'
    },
    requires: [
        'VeriBranch.view.field.DropDownField',
        'VeriBranch.view.control.RadioButtonGroup',
        'VeriBranch.view.field.AmountField',
        'VeriBranch.view.field.DropDownRangeField',
        'VeriBranch.view.field.CheckboxField',
        'VeriBranch.view.field.TextField',
        'VeriBranch.view.control.Button',
        'VeriBranch.view.control.PaymentPlanDataView',
        'Ext.Container',
        'Ext.field.Select',
        'Ext.Label',
        'Ext.field.Checkbox',
        'Ext.Button'
    ],

    config: {
        categoryName: '',
        uniquePaymentPlanId: '',
        isInitializedForUpdate: false,
        centered: true,
        itemId: 'phonePopupContainer',
        maxHeight: 970,
        top: '',
        hideOnMaskTap: true,
        layout: 'vbox',
        modal: true,
        view: null,
        institution: null,
        paymentInfo: null,
        cls: [
            'vp-schoolpopupcontainer',
            'vp-popupCheck'
        ],
        data: null,
        items: [
            {
                xtype: 'container',
                cls: 'vp-formContainer',
                items: [
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpdropdownfield',
                                disabled: false,
                                itemId: 'paymentType',
                                required: true,
                                displayField: 'paymentTypeName',
                                valueField: 'id'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        height: 80
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'label',
                                height: 30,
                                itemId: 'guarantorLabel'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'label',
                                height: 30,
                                itemId: 'guarantorCost'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'label',
                                height: 30,
                                itemId: 'guarantorStartDateLabel'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'label',
                                height: 30,
                                itemId: 'guarantorEndDateLabel'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-4',
                        items: [
                            {
                                xtype: 'vpradiobuttongroup',
                                name: 'installmentChoice',
                                buttonItems: [
                                    {
                                        label: 'Eşit Taksitli',
                                        id: 'equalInstallmentChoice',
                                        value: true,
                                        cls: 'vpx-radioButtonField',
                                        selected: true
                                    },
                                    {
                                        label: 'Esnek',
                                        id: 'customInstallmentChoice',
                                        value: false,
                                        cls: 'vpx-radioButtonField',
                                        selected: false
                                    }
                                ],
                                required: true,
                                updateButtonsAfterInitialize: true,
                                itemId: 'installmentChoice'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpamountfield',
                                fixedCount: 0,
                                itemId: 'schoolFee',
                                name: 'schoolFee',
                                required: true,
                                maxLength: 11
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpamountfield',
                                currencySymbol: ' ',
                                fixedCount: 0,
                                itemId: 'installmentQuantity',
                                name: 'installmentQuantity',
                                required: true,
                                maxLength: 11
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpdropdownrangefield',
                                minValue: 1,
                                maxValue: 31,
                                itemId: 'regularPaymentDay',
                                name: 'regularPaymentDay',
                                required: true
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpdropdownfield',
                                disabled: true,
                                itemId: 'firstInstallmentDate',
                                name: 'firstInstallmentDate',
                                required: true,
                                displayField: 'name',
                                valueField: 'code'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-6',
                        items: [
                            {
                                xtype: 'vpcheckboxfield',
                                itemId: 'advancePaymentAvailableCheckbox',
                                name: 'advancePaymentAvailableCheckbox'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpdatepickerfield',
                                showFuture: true,
                                cls: 'vpx-selectField',
                                disabled: true,
                                itemId: 'advancePaymentDate',
                                name: 'advancePaymentDate',
                                readOnly: false
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        items: [
                            {
                                xtype: 'vpamountfield',
                                fixedCount: 0,
                                disabled: true,
                                itemId: 'advancePaymentCost',
                                name: 'advancePaymentCost',
                                required: true,
                                maxLength: 11
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        height: 60,
                        itemId: 'errorContainer',
                        items: [
                            {
                                xtype: 'label',
                                height: 30,
                                itemId: 'errorLabel'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-3',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'vpbutton',
                                docked: 'right',
                                height: 50,
                                itemId: 'createInstallmentsButton',
                                width: '80%'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-6',
                        hidden: false,
                        itemId: 'paymentPlanInfoContainer',
                        items: [
                            {
                                xtype: 'vppaymentplandataview',
                                columns: [
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
                                listItemType: 'vppaymentplandataviewitem',
                                cls: 'vp-datagridiview',
                                height: 250,
                                hidden: true,
                                itemId: 'paymentPlanInfo'
                            },
                            {
                                xtype: 'vppaymentplandataview',
                                columns: [
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
                                listItemType: 'vpeditablepaymentplandataviewitem',
                                cls: 'vp-datagridiview',
                                height: 250,
                                hidden: true,
                                itemId: 'editablePaymentPlanInfo'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-form-col-6',
                        height: 80,
                        margin: '0% 0% 0% 35%',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'vpbutton',
                                cls: [
                                    'vp-blueButton',
                                    'vpx-button'
                                ],
                                height: 50,
                                hidden: true,
                                itemId: 'addToPlanButton'
                            },
                            {
                                xtype: 'vpbutton',
                                height: 50,
                                hidden: true,
                                itemId: 'saveButton'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'vpbutton',
                cls: 'vp-popupClose',
                itemId: 'closeButton'
            }
        ],
        listeners: [
            {
                fn: 'onPaymentTypeChange',
                event: 'change',
                delegate: '#paymentType'
            },
            {
                fn: 'onInstallmentChoiceChange',
                event: 'selectedChange',
                delegate: '#installmentChoice'
            },
            {
                fn: 'onRegularPaymentChange',
                event: 'change',
                delegate: '#regularPaymentDay'
            },
            {
                fn: 'onFirstInstallmentDateChange',
                event: 'change',
                delegate: '#firstInstallmentDate'
            },
            {
                fn: 'onAdvancePaymentAvailableCheckboxChange',
                event: 'change',
                delegate: '#advancePaymentAvailableCheckbox'
            },
            {
                fn: 'onCreateInstallmentsButtonTap',
                event: 'tap',
                delegate: '#createInstallmentsButton'
            },
            {
                fn: 'onAddToPlanButtonTap',
                event: 'tap',
                delegate: '#addToPlanButton'
            },
            {
                fn: 'onSaveButtonTap',
                event: 'tap',
                delegate: '#saveButton'
            },
            {
                fn: 'onSchoolPaymentPlanPopupContainerHide',
                event: 'hide'
            },
            {
                fn: 'onCloseButtonTap',
                event: 'tap',
                delegate: '#closeButton'
            },
            {
                fn: 'onPopupContainerPainted',
                event: 'painted'
            }
        ]
    },

    onPaymentTypeChange: function(selectfield, newValue, oldValue, eOpts) {
        var paymentPlanView = VeriBranch.UIProcess.getActiveView(),
            flowModel = paymentPlanView.getFlowModel(),
            me = this,
            paymentTypeDropdown = me.down('#paymentType'),
            uniquePaymentPlanId = me.getUniquePaymentPlanId();


        if(flowModel.data.paymentPlans !== null){
            Ext.Array.each(flowModel.data.paymentPlans,function(paymentPlan){
                if(paymentPlan.paymentTypeId == newValue && paymentPlan.uniquePaymentPlanId != uniquePaymentPlanId){
                    VeriBranch.Utilities.showMessageBox('', resources.getValue('DuplicatePaymentType'),
                                                        function(){
                                                            paymentTypeDropdown.setValue(null);
                                                        },'',true);
                }
            });
        }

        me.setGuarantorLabelsByPaymentType(newValue);
    },

    onInstallmentChoiceChange: function(container) {
        var me = this,
            installmentChoice = me.down('#installmentChoice'),
            regularPaymentDay = me.down('#regularPaymentDay'),
            firstInstallmentDay = me.down('#firstInstallmentDate');

        if(installmentChoice.getSelectedItem().value){
            regularPaymentDay.setDisabled(false);
            firstInstallmentDay.setRequired(true);
            regularPaymentDay.setRequired(true);
        }else{
            regularPaymentDay.setDisabled(true);
            regularPaymentDay.setValue(null);
            regularPaymentDay.setRequired(false);
            firstInstallmentDay.setDisabled(true);
            firstInstallmentDay.setValue(null);
            firstInstallmentDay.setRequired(false);
        }
    },

    onRegularPaymentChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel= me.getFlowModel(),
            firstInstallmentDate = me.down("#firstInstallmentDate");

        firstInstallmentDate.setValue(null);

        if(newValue){
            firstInstallmentDate.setDisabled(false);
            flowModel.data.firstInstallmentDateList = me.getFirstInstallmentDateList(newValue);

            if(flowModel.data.firstInstallmentDateList && flowModel.data.firstInstallmentDateList.length > 0){
                for(var i=0; i<flowModel.data.firstInstallmentDateList.length; i++){
                    flowModel.data.firstInstallmentDateList[i].code.setHours(0,0,0);
                }
                var store = VeriBranch.Data.createStoreWithName("", flowModel.data.firstInstallmentDateList, false);
                firstInstallmentDate.setStore(store);
                if(newValue == flowModel.data.regularPaymentDay && oldValue === null)
                {
                    var record = store.findRecord('code', flowModel.data.firstInstallmentDate);
                    if(record)
                    {
                        firstInstallmentDate.setValue(record.data.code);
                        firstInstallmentDate.dataChanged();
                    }
                }
                firstInstallmentDate.removeErrorLabel();
            }
            else{
                firstInstallmentDate.setStore(null);
                firstInstallmentDate.dataChanged();
                firstInstallmentDate.setDisabled(true);
                firstInstallmentDate.addError({_message: resources.getValue('FirstInstallmentDateError')});
            }
        }else{
            firstInstallmentDate.addError({_message: resources.getValue('FirstInstallmentDateError')});
            firstInstallmentDate.setDisabled(true);
        }

        if(newValue !== oldValue){
            flowModel.data.fieldsChanged = true;
        }
    },

    onFirstInstallmentDateChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel= me.getFlowModel();

        flowModel.data.selectedLateInstallmentDate = false;

        newValue = newValue ? newValue : flowModel.data.firstInstallmentDate;

        if(newValue && !(newValue instanceof Date)){
            newValue = new Date().setVeriParkApiString(newValue);
        }

        var diff = VeriBranch.Utilities.getDayDifference(newValue, new Date());
        if(diff > 1){
            flowModel.data.selectedLateInstallmentDate = true;
        }

        if(newValue && newValue !== oldValue){
            flowModel.data.fieldsChanged = true;
        }
    },

    onAdvancePaymentAvailableCheckboxChange: function(checkboxfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            advancePaymentDate = me.down('#advancePaymentDate'),
            advancePaymentCost = me.down('#advancePaymentCost');

        if(checkboxfield.getChecked()){
            advancePaymentDate.setDisabled(false);
            advancePaymentDate.setRequired(true);
            advancePaymentCost.setDisabled(false);
            advancePaymentCost.setRequired(true);
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            advancePaymentDate.setValue(currentDate);
        }else{
            advancePaymentDate.setDisabled(true);
            advancePaymentDate.setRequired(false);
            advancePaymentCost.setDisabled(true);
            advancePaymentCost.setRequired(false);
            advancePaymentCost.setValue(null);
            advancePaymentDate.setValue(null);
        }
    },

    onCreateInstallmentsButtonTap: function(button, e, eOpts) {
        var me = this;

        if(me.arePopupFieldsValid()){
            var installmentChoice = me.down('#installmentChoice'),
                addToPlanButton = me.down('#addToPlanButton'),
                saveButton = me.down('#saveButton'),
                paymentTableData = [];

            if(installmentChoice.getSelectedItem().id == "equalInstallmentChoice"){
                me.populateAndShowReadOnlyPaymentTable();
            }else if(installmentChoice.getSelectedItem().id === "customInstallmentChoice"){
                me.populateAndShowEditablePaymentTable();
            }

            if(me.getIsInitializedForUpdate()){
                saveButton.setHidden(false);
            }else{
                addToPlanButton.setHidden(false);
            }
        }
    },

    onAddToPlanButtonTap: function(button, e, eOpts) {
        var me = this;

        if(me.areTableDataValid()){
            var activeView = VeriBranch.UIProcess.getActiveView(),
                flowModel = activeView.getFlowModel(),
                paymentTypeField = me.down('#paymentType'),
                schoolFeeField = me.down('#schoolFee'),
                installmentCountField = me.down('#installmentQuantity'),
                installmentChoice = me.down('#installmentChoice'),
                regularPaymentDayField = me.down('#regularPaymentDay'),
                firstInstallmentDayField = me.down('#firstInstallmentDate'),
                isAdvancePaymentAvailableCheckbox = me.down('#advancePaymentAvailableCheckbox'),
                advancePaymentDateField = me.down('#advancePaymentDate'),
                advancePaymentCostField = me.down('#advancePaymentCost'),
                dataViewTable = installmentChoice.getSelectedItem().id == "equalInstallmentChoice" ? me.down('#paymentPlanInfo') : me.down('#editablePaymentPlanInfo'),
                gridData = dataViewTable.getGridData(),
                footerData = dataViewTable.getFooter();

            flowModel.data.paymentPlans.push(
                {
                    paymentTypeId: paymentTypeField.getValue(),
                    paymentTypeName: paymentTypeField.record && paymentTypeField.record.data ? paymentTypeField.record.data.paymentTypeName : null,
                    isGuarantorAvailable: flowModel.data.currentInstallmentAmount > 0 ? true : false,
                    guarantorAmount: flowModel.data.currentInstallmentAmount,
                    guarantorStartDate: VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorStartDate)),
                    guarantorEndDate: VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorEndDate)),
                    installmentChoiceId: installmentChoice.getSelectedItem().id == "equalInstallmentChoice" ? 0 : 1,
                    schoolFee: schoolFeeField.getAmountValue(),
                    installmentQuantity: installmentCountField.getAmountValue(),
                    regularPaymentDay: regularPaymentDayField.getDisabled() ? null : regularPaymentDayField.getValue(),
                    firstInstallmentDate: firstInstallmentDayField.getDisabled() ? null : firstInstallmentDayField.getValue(),
                    isAdvancePaymentAvailable: isAdvancePaymentAvailableCheckbox.getChecked(),
                    advancePaymentDate: advancePaymentDateField.getDisabled() ? null : new Date(advancePaymentDateField.getValue()),
                    advancePaymentCost: advancePaymentCostField.getDisabled() ? null : advancePaymentCostField.getAmountValue(),
                    uniquePaymentPlanId: VeriBranch.Utilities.generateGUID(),
                    paymentPlanGridData: gridData,
                    paymentPlanFooterData: footerData
                }
            );

            me.onCloseButtonTap();
        }
    },

    onSaveButtonTap: function(button, e, eOpts) {
        var me = this;

        if(me.areTableDataValid()){
            var activeView = VeriBranch.UIProcess.getActiveView(),
                flowModel = activeView.getFlowModel(),
                paymentTypeField = me.down('#paymentType'),
                schoolFeeField = me.down('#schoolFee'),
                installmentCountField = me.down('#installmentQuantity'),
                installmentChoice = me.down('#installmentChoice'),
                regularPaymentDayField = me.down('#regularPaymentDay'),
                firstInstallmentDayField = me.down('#firstInstallmentDate'),
                isAdvancePaymentAvailableCheckbox = me.down('#advancePaymentAvailableCheckbox'),
                advancePaymentDateField = me.down('#advancePaymentDate'),
                advancePaymentCostField = me.down('#advancePaymentCost'),
                dataViewTable = installmentChoice.getSelectedItem().id == "equalInstallmentChoice" ? me.down('#paymentPlanInfo') : me.down('#editablePaymentPlanInfo'),
                gridData = dataViewTable.getGridData(),
                footerData = dataViewTable.getFooter();

            Ext.Array.each(flowModel.data.paymentPlans, function(paymentPlan){
                if(paymentPlan.uniquePaymentPlanId == me.getUniquePaymentPlanId()){
                    paymentPlan.paymentTypeId = paymentTypeField.getValue();
                    paymentPlan.paymentTypeName = paymentTypeField.record && paymentTypeField.record.data ? paymentTypeField.record.data.paymentTypeName : null;
                    paymentPlan.isGuarantorAvailable = flowModel.data.currentInstallmentAmount > 0 ? true : false;
                    paymentPlan.guarantorAmount = flowModel.data.currentInstallmentAmount;
                    paymentPlan.guarantorStartDate = VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorStartDate));
                    paymentPlan.guarantorEndDate = VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorEndDate));
                    paymentPlan.installmentChoiceId = installmentChoice.getSelectedItem().id == "equalInstallmentChoice" ? 0 : 1;
                    paymentPlan.schoolFee = schoolFeeField.getAmountValue();
                    paymentPlan.installmentQuantity = installmentCountField.getAmountValue();
                    paymentPlan.regularPaymentDay = regularPaymentDayField.getDisabled() ? null : regularPaymentDayField.getValue();
                    paymentPlan.firstInstallmentDate = firstInstallmentDayField.getDisabled() ? null : firstInstallmentDayField.getValue();
                    paymentPlan.isAdvancePaymentAvailable = isAdvancePaymentAvailableCheckbox.getChecked();
                    paymentPlan.advancePaymentDate = advancePaymentDateField.getDisabled() ? null : new Date(advancePaymentDateField.getValue());
                    paymentPlan.advancePaymentCost = advancePaymentCostField.getDisabled() ? null : advancePaymentCostField.getAmountValue();
                    paymentPlan.uniquePaymentPlanId = paymentPlan.uniquePaymentPlanId;
                    paymentPlan.paymentPlanGridData = gridData;
                    paymentPlan.paymentPlanFooterData = footerData;
                }
            });

            me.onCloseButtonTap();
        }



    },

    onSchoolPaymentPlanPopupContainerHide: function(component, eOpts) {
        var me = this;

        Ext.Viewport.remove(me);
    },

    onCloseButtonTap: function(button, e, eOpts) {
        var me = this,
            activeView = VeriBranch.UIProcess.getActiveView();
        activeView.removeAllTables();
        activeView.createTables();

        Ext.Viewport.remove(me);
    },

    onPopupContainerPainted: function(element, eOpts) {
        var me = this;

        if(me.getIsInitializedForUpdate()){
            var activeView = VeriBranch.UIProcess.getActiveView(),
                flowModel = activeView.getFlowModel(),
                uniquePaymentPlanId = me.getUniquePaymentPlanId();

            var paymentPlanArray = Ext.Array.filter(flowModel.data.paymentPlans, function(paymentPlan){
                return paymentPlan.uniquePaymentPlanId == uniquePaymentPlanId;
            });

            var paymentPlanDataToBeUpdated = paymentPlanArray[0];
            var installmentChoiceId = paymentPlanDataToBeUpdated.installmentChoiceId;

            if(installmentChoiceId === 0){
                me.down('#equalInstallmentChoiceField').setChecked(true);
            }else if(installmentChoiceId === 1){
                me.down('#customInstallmentChoiceField').setChecked(true);
            }
        }
    },

    initialize: function() {
        var paymentPlanView = VeriBranch.UIProcess.getActiveView(),
            flowModel = paymentPlanView.getFlowModel(),
            schoolList = flowModel.data.schoolList,
            educationTerm = flowModel.data.educationTerm,
            schoolTypeId = flowModel.data.schoolTypeId;

        var me = this,
            paymentTypeDropdown = me.down('#paymentType');


        //paymentTypeDropdown population start
        var filteredByPaymentTypeArray = Ext.Array.filter(schoolList ,function(school){
            if(school.educationPeriod == educationTerm && school.schoolType == schoolTypeId){

                return school.paymentType;
            }
        });

        var paymentTypeStoreArray = [];

        Ext.Array.each(filteredByPaymentTypeArray, function(item){
            if(item.paymentType == 1){
                pushToArray(item.paymentType, "Egitim");
            }else if(item.paymentType == 2){
                pushToArray(item.paymentType, "Yemek");
            }else if(item.paymentType == 3){
                pushToArray(item.paymentType, "Servis");
            }else if(item.paymentType == 4){
                pushToArray(item.paymentType, "Diger");
            }
        });


        function pushToArray(id, name){
            if(paymentTypeStoreArray.length === 0){
                paymentTypeStoreArray.push({id: id, paymentTypeName: name});
            }else{
                var isIncluded;
                for(var i = 0; i < paymentTypeStoreArray.length; i ++){
                    if(paymentTypeStoreArray[i].paymentTypeName == name){
                        isIncluded = true;
                    }
                }
                if(isIncluded !== true){
                    paymentTypeStoreArray.push({id: id, paymentTypeName: name});
                }
            }
        }

        paymentTypeDropdown.setValue(null);
        var store = VeriBranch.Data.createStoreWithName("", paymentTypeStoreArray, false);
        paymentTypeDropdown.setStore(store);

        //paymentTypeDropdown population end


    },

    getFirstInstallmentDateList: function(regularPaymentDay) {
        var me = this,
            dateList = [];

        var currentMonth = new Date();
        currentMonth.setDate(regularPaymentDay);
        if(me.checkDate(currentMonth, regularPaymentDay)){
            dateList.push({name:currentMonth.toLocaleDateString("tr-TR"), code:currentMonth});
        }

        var oneMonthFromToday = new Date().addMonths(1);
        oneMonthFromToday.setDate(regularPaymentDay);
        if(me.checkDate(oneMonthFromToday, regularPaymentDay)){
            dateList.push({name:oneMonthFromToday.toLocaleDateString("tr-TR"), code:oneMonthFromToday});
        }

        var twoMonthFromToday = new Date().addMonths(2);
        twoMonthFromToday.setDate(regularPaymentDay);
        if(me.checkDate(twoMonthFromToday, regularPaymentDay)){
            dateList.push({name:twoMonthFromToday.toLocaleDateString("tr-TR"), code:twoMonthFromToday});
        }

        return dateList;

    },

    checkDate: function(date, regularPaymentDay) {
        var me = this,
            maxDate = me.getMaxDate();

        if(date < maxDate && date > new Date() && date.getDate() == regularPaymentDay){
            return true;
        }
        return false;
    },

    getMaxDate: function() {
        var today = new Date();

        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        var maxDate = new Date(),
            daysToAdd = parseFloat(parameters.getValue('TikMaksTaksitOtelemeGunSayisi'));

        maxDate = today.addDaysToDate(daysToAdd);

        return maxDate;
    },

    arePopupFieldsValid: function() {
        var me = this,
            flowModel = me.getFlowModel(),
            isPaymentPlanDataValid = true,
            paymentTypeField = me.down('#paymentType'),
            schoolFeeField = me.down('#schoolFee'),
            installmentCountField = me.down('#installmentQuantity'),
            installmentChoice = me.down('#installmentChoice'),
            regularPaymentDayField = me.down('#regularPaymentDay'),
            firstInstallmentDayField = me.down('#firstInstallmentDate'),
            isAdvancePaymentAvailableCheckbox = me.down('#advancePaymentAvailableCheckbox'),
            advancePaymentDateField = me.down('#advancePaymentDate'),
            advancePaymentCostField = me.down('#advancePaymentCost'),
            paymentPlanInfoTable = me.down('#paymentPlanInfo'),
            editablePaymentPlanInfoTable = me.down('#editablePaymentPlanInfo'),
            isGuarantorAvailable = flowModel.data.isGuarantorAvailable;

        paymentTypeField.removeErrorLabel();
        schoolFeeField.removeErrorLabel();
        regularPaymentDayField.removeErrorLabel();
        firstInstallmentDayField.removeErrorLabel();
        installmentCountField.removeErrorLabel();
        advancePaymentDateField.removeErrorLabel();
        advancePaymentCostField.removeErrorLabel();
        isAdvancePaymentAvailableCheckbox.removeErrorLabel();

        if(paymentTypeField.getValue() === null){
            paymentTypeField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
            isPaymentPlanDataValid = false;
        }

        if(schoolFeeField.getValue() === ""){
            schoolFeeField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
            isPaymentPlanDataValid = false;
        }

        if(schoolFeeField.getAmountValue() < installmentCountField.getAmountValue()){
            schoolFeeField.addError({_message: resources.getValue('Validation.InValidSchoolFee')});
            isPaymentPlanDataValid = false;
        }

        if(installmentChoice.getSelectedItem().id == "equalInstallmentChoice"){
            if(regularPaymentDayField.getValue() === null){
                regularPaymentDayField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
                isPaymentPlanDataValid = false;
            }

            if(firstInstallmentDayField.getValue() === null){
                firstInstallmentDayField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
                isPaymentPlanDataValid = false;
            }
        }

        if(installmentCountField.getValue() === ""){
            installmentCountField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
            isPaymentPlanDataValid = false;
        }else{
            if(isGuarantorAvailable && installmentCountField.getAmountValue() > flowModel.data.currentInstallmentCount){
                installmentCountField.addError({_message: resources.getValue('Validation.InstallmentIntervalError').stringFormat(flowModel.data.currentInstallmentCount)});
                isPaymentPlanDataValid = false;
            }
            if(!isAdvancePaymentAvailableCheckbox.getChecked()){
                if(installmentCountField.getAmountValue() === 0){
                    installmentCountField.addError({_message: resources.getValue('Validation.InstallmentCountIsZero')});
                    isPaymentPlanDataValid = false;
                }
            }
        }

        if(isAdvancePaymentAvailableCheckbox.getChecked()){
            if(advancePaymentDateField.getValue() === null){
                advancePaymentDateField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
                isPaymentPlanDataValid = false;
            }

            if(advancePaymentCostField.getValue() === ""){
                advancePaymentCostField.addError({_message: resources.getValue('Validation.GenericTextFieldError')});
                isPaymentPlanDataValid = false;
            }
            if(advancePaymentCostField.getValue() !== "" && advancePaymentDateField.getValue() !== null){
                if(parseInt(advancePaymentCostField.getAmountValue()) > parseInt(schoolFeeField.getAmountValue())){
                    isAdvancePaymentAvailableCheckbox.addError({_message: resources.getValue('Validation.MaxAdvancePaymentAmountError')});
                    isPaymentPlanDataValid = false;
                }
            }

            var advancePaymentDate = new Date(advancePaymentDateField.getValue());
            var currentGuarantorStartDate = new Date(flowModel.data.currentGuarantorStartDate);
            var currentGuarantorEndDate = new Date(flowModel.data.currentGuarantorEndDate);
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(0,0,0,0);
            if(!(advancePaymentDate < currentGuarantorEndDate && advancePaymentDate > currentGuarantorStartDate)){
                isAdvancePaymentAvailableCheckbox.addError({_message: resources.getValue('Validation.WrongDateIntervalForAdvancePaymentDate')});
                isPaymentPlanDataValid = false;
            }else if(advancePaymentDate < currentDate){
                isAdvancePaymentAvailableCheckbox.addError({_message: resources.getValue('Validation.PastDateChoiceForAdvancePaymentDate')});
                isPaymentPlanDataValid = false;
            }

            if(installmentChoice.getSelectedItem().id == "equalInstallmentChoice"){
                if(firstInstallmentDayField.getValue() < new Date(advancePaymentDateField.getValue())){
                    isAdvancePaymentAvailableCheckbox.addError({_message: resources.getValue('Validation.AdvancePaymentDateShouldBeBeforeFirstInstallmentDate')});
                    isPaymentPlanDataValid = false;
                }
            }

            if(installmentCountField.getAmountValue() == 0 && schoolFeeField.getAmountValue() != advancePaymentCostField.getAmountValue()){
                installmentCountField.addError({_message: resources.getValue('Validation.InstallmentCountIsZero')});
                isPaymentPlanDataValid = false;
            }

            if(schoolFeeField.getAmountValue() - advancePaymentCostField.getAmountValue() < installmentCountField.getAmountValue()){
                schoolFeeField.addError({_message: resources.getValue('Validation.InValidSchoolFee')});
                isPaymentPlanDataValid = false;
            }

            if(advancePaymentCostField.getAmountValue() == 0){
                advancePaymentCostField.addError({_message: resources.getValue('Validation.AdvancePaymentCostCantBeZero')});
                isPaymentPlanDataValid = false;
            }
        }

        return isPaymentPlanDataValid;
    },

    populateAndShowReadOnlyPaymentTable: function() {

        var me = this,
            paymentTypeField = me.down('#paymentType'),
            isAdvancePaymentAvailableCheckbox = me.down('#advancePaymentAvailableCheckbox'),
            paymentPlanInfoTable = me.down('#paymentPlanInfo'),
            editablePaymentPlanInfoTable = me.down('#editablePaymentPlanInfo'),
            installmentCount = me.down('#installmentQuantity') ? me.down('#installmentQuantity').getAmountValue() : null,
            schoolFee = me.down('#schoolFee') ? me.down('#schoolFee').getAmountValue(): null,
            firstInstallmentDate = me.down('#firstInstallmentDate').getValue(),
            advancePaymentDate = me.down('#advancePaymentDate').getValue(),
            advancePaymentCost = me.down('#advancePaymentCost').getAmountValue();

        var paymentTableData = [],
            installmentCountInt = parseInt(installmentCount),
            decimalInstallmentAmountPerPayment,
            nonDecimalInstallmentAmount,
            decimalRemainderofInstallment,
            lastInstallmentAmount;

        if(isAdvancePaymentAvailableCheckbox.getChecked()){

            decimalInstallmentAmountPerPayment =  (schoolFee - advancePaymentCost) / installmentCount;
            nonDecimalInstallmentAmount = parseInt(decimalInstallmentAmountPerPayment);
            decimalRemainderofInstallment = decimalInstallmentAmountPerPayment - nonDecimalInstallmentAmount;
            lastInstallmentAmount = nonDecimalInstallmentAmount + Math.round(decimalRemainderofInstallment*installmentCount);

            var date = new Date(advancePaymentDate);

            paymentTableData.push({order: 0, date: date, amount: advancePaymentCost, isDownPayment: true, paymentType: paymentTypeField.getValue()});

            if(decimalInstallmentAmountPerPayment != 0){
                for(var i = 1; i < installmentCountInt + 1; i++){
                    var date = new Date(firstInstallmentDate.getTime());
                    if(i == installmentCountInt){
                        paymentTableData.push({order: i, date: VeriBranch.Utilities.addMonths(date, i - 1), amount: parseInt(lastInstallmentAmount), isDownPayment: false, paymentType: paymentTypeField.getValue()});
                    }else{
                        paymentTableData.push({order: i, date: VeriBranch.Utilities.addMonths(date, i - 1), amount: nonDecimalInstallmentAmount, isDownPayment: false, paymentType: paymentTypeField.getValue()});
                    }

                }
            }

        }else{

            decimalInstallmentAmountPerPayment =  schoolFee / installmentCount;
            nonDecimalInstallmentAmount = parseInt(decimalInstallmentAmountPerPayment);
            decimalRemainderofInstallment = decimalInstallmentAmountPerPayment - nonDecimalInstallmentAmount;
            lastInstallmentAmount = nonDecimalInstallmentAmount + Math.round(decimalRemainderofInstallment*installmentCount);

            for(var i = 0; i < installmentCountInt; i++){
                var date = new Date(firstInstallmentDate.getTime());
                if(i == installmentCountInt - 1){
                    paymentTableData.push({order: i + 1, date: VeriBranch.Utilities.addMonths(date, i), amount: parseInt(lastInstallmentAmount), isDownPayment: false, paymentType: paymentTypeField.getValue()});
                }else{
                    paymentTableData.push({order: i + 1, date: VeriBranch.Utilities.addMonths(date, i), amount: nonDecimalInstallmentAmount, isDownPayment: false, paymentType: paymentTypeField.getValue()});
                }

            }
        }

        paymentPlanInfoTable.setGridData(paymentTableData);
        paymentPlanInfoTable.setFooter(schoolFee);
        editablePaymentPlanInfoTable.setHidden(true);
        paymentPlanInfoTable.setHidden(false);


    },

    populateAndShowEditablePaymentTable: function() {
        var me = this,
            paymentTypeField = me.down('#paymentType'),
            isAdvancePaymentAvailableCheckbox = me.down('#advancePaymentAvailableCheckbox'),
            paymentPlanInfoTable = me.down('#paymentPlanInfo'),
            editablePaymentPlanInfoTable = me.down('#editablePaymentPlanInfo'),
            installmentCount = me.down('#installmentQuantity') ? me.down('#installmentQuantity').getAmountValue() : null,
            schoolFee = me.down('#schoolFee') ? me.down('#schoolFee').getAmountValue(): null,
            advancePaymentDate = me.down('#advancePaymentDate').getValue(),
            advancePaymentCost = me.down('#advancePaymentCost').getAmountValue(),
            paymentTableData = [],
            installmentCountInt = parseInt(installmentCount);

        if(isAdvancePaymentAvailableCheckbox.getChecked()){

            installmentAmountPerPayment =  (schoolFee - advancePaymentCost) / installmentCount;
            var advanceDate = new Date(advancePaymentDate);
            paymentTableData.push({order: 0, date: advanceDate, amount: advancePaymentCost, isDownPayment: true, paymentType: paymentTypeField.getValue()});

            if(installmentAmountPerPayment != 0){
                for(var i = 1; i < installmentCountInt + 1; i++){
                    var date = new Date(advanceDate.getTime());
                    paymentTableData.push({order: i, date: VeriBranch.Utilities.addMonths(date, i), amount: 0, isDownPayment: false, paymentType: paymentTypeField.getValue()});
                }
            }

        }else{
            for(var i = 0; i < installmentCountInt; i++){
                var date = new Date(new Date().getTime());
                paymentTableData.push({order: i + 1, date: VeriBranch.Utilities.addMonths(date, i), amount: 0, isDownPayment: false, paymentType: paymentTypeField.getValue()});
            }
        }

        editablePaymentPlanInfoTable.setGridData(paymentTableData);
        editablePaymentPlanInfoTable.setFooter(0);
        paymentPlanInfoTable.setHidden(true);
        editablePaymentPlanInfoTable.setHidden(false);
    },

    areTableDataValid: function() {
        var me = this,
            activeView = VeriBranch.UIProcess.getActiveView(),
            flowModel = activeView.getFlowModel(),
            installmentChoice = me.down('#installmentChoice'),
            schoolFeeField = me.down('#schoolFee'),
            errorLabel = me.down('#errorLabel'),
            currentGuarantorEndDate = new Date(flowModel.data.currentGuarantorEndDate),
            isGuarantorAvailable = flowModel.data.isGuarantorAvailable,
            isValid = true;

        var dataViewTable;
        if(installmentChoice.getSelectedItem().id == "equalInstallmentChoice"){
            dataViewTable = me.down('#paymentPlanInfo');
            var gridData = dataViewTable.getGridData();
            var footerData = dataViewTable.getFooter();

            Ext.Array.each(gridData, function(data){
                if(isGuarantorAvailable){
                    if(data.date > currentGuarantorEndDate){
                        errorLabel.addError({_message: resources.getValue('Validation.WrongLastInstallmentDateInterval')});
                        isValid = false;
                    }
                }
            });

            if(gridData[0].order == 0 && gridData[1].order == 1){
                if(gridData[0].date >= gridData[1].date){
                    errorLabel.addError({_message: resources.getValue('Validation.AdvancePaymentDateShouldBeBeforeFirstInstallmentDate')});
                    isValid = false;
                }
            }

        }else if(installmentChoice.getSelectedItem().id === "customInstallmentChoice"){
            dataViewTable = me.down('#editablePaymentPlanInfo');
            var gridData = dataViewTable.getGridData();
            var footerData = dataViewTable.getFooter();

            Ext.Array.each(gridData, function(data){
                if(!data.amount){
                    errorLabel.addError({_message: resources.getValue('Validation.EmptyTableField')});
                    isValid = false;
                }

                if(data.amount == "0" || data.amount == 0){
                    errorLabel.addError({_message: resources.getValue('Validation.InstallmentAmountCantBeZero')});
                    isValid = false;
                }

                if(data.date < new Date()){
                    errorLabel.addError({_message: resources.getValue('Validation.InstallmentDateCantBePastDate')});
                    isValid = false;
                }

                if(isGuarantorAvailable){
                    if(data.date > currentGuarantorEndDate){
                        errorLabel.addError({_message: resources.getValue('Validation.WrongLastInstallmentDateInterval')});
                        isValid = false;
                    }
                }
            });

            if(parseInt(footerData) != parseInt(schoolFeeField.getAmountValue())){
                errorLabel.addError({_message: resources.getValue('Validation.WrongTotalSum')});
                isValid = false;
            }

            if(gridData.length > 1 && gridData[0].order == 0 ){
                var advancePaymentDate = gridData[0].date;
                for(var i = 1; i < gridData.length; i++){
                    if(advancePaymentDate >= gridData[i].date){
                        errorLabel.addError({_message: resources.getValue('Validation.AdvancePaymentDateShouldBeBeforeFirstInstallmentDate')});
                        isValid = false;
                    }
                }
            }

        }

        return isValid;
    },

    setGuarantorLabelsByPaymentType: function(paymentType) {

        var paymentPlanView = VeriBranch.UIProcess.getActiveView(),
            flowModel = paymentPlanView.getFlowModel(),
            schoolList = flowModel.data.schoolList,
            educationTerm = flowModel.data.educationTerm,
            schoolTypeId = flowModel.data.schoolTypeId,
            me = this,
            guarantorStartDateLabel = me.down('#guarantorStartDateLabel'),
            guarantorEndDateLabel = me.down('#guarantorEndDateLabel'),
            guarantorLabel = me.down('#guarantorLabel'),
            guarantorCost = me.down('#guarantorCost'),
            paymentTypeDropdown = me.down('#paymentType');

        if(paymentType !== null){
            Ext.Array.each(schoolList ,function(school){
                if(school.educationPeriod == educationTerm && school.schoolType == schoolTypeId && school.paymentType == paymentType){
                    flowModel.data.currentGuarantorStartDate = school.guarantorStartDate;
                    flowModel.data.currentGuarantorEndDate = school.guarantorEndDate;
                    flowModel.data.currentInstallmentAmount = school.installmentAmount;
                    flowModel.data.currentInstallmentCount = school.installmentCount;

                }
            });

            if(flowModel.data.currentInstallmentAmount > 0){
                guarantorLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorLabel') +  '</span> ' + '<span class="vp-value">' + 'Var' + '</span></div>');
                guarantorCost.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorCost') +  '</span> ' + '<span class="vp-value">' + flowModel.data.currentInstallmentAmount + " TL" + '</span></div>');
            }else if(flowModel.data.currentInstallmentAmount === 0){
                guarantorLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorLabel') +  '</span> ' + '<span class="vp-value">' + "Yok" + '</span></div>');
                guarantorCost.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorCost') +  '</span> ' + '<span class="vp-value">' + flowModel.data.currentInstallmentAmount + " TL" + '</span></div>');
            }
            guarantorStartDateLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorStartDateLabel') +  '</span> ' + '<span class="vp-value">' + VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorStartDate)) + '</span></div>');
            guarantorEndDateLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorEndDateLabel') +  '</span> ' + '<span class="vp-value">' + VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(flowModel.data.currentGuarantorEndDate)) + '</span></div>');
        }else{
            guarantorStartDateLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorStartDateLabel') +  '</span> ' + '<span class="vp-value">' + '-' + '</span></div>');
            guarantorEndDateLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorEndDateLabel') +  '</span> ' + '<span class="vp-value">' + '-' + '</span></div>');
            guarantorLabel.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorLabel') +  '</span> ' + '<span class="vp-value">' + "-" + '</span></div>');
            guarantorCost.setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('guarantorCost') +  '</span> ' + '<span class="vp-value">' + "-" + '</span></div>');
        }
    }

});