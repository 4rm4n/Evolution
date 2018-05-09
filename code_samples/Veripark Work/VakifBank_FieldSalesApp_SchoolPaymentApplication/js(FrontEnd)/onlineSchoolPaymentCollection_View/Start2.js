/*
 * File: app/view/onlineSchoolPaymentCollection/Start2.js
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

Ext.define('VeriBranch.view.onlineSchoolPaymentCollection.Start2', {
    extend: 'Ext.Container',

    mixins: {
        veribranchView: 'VeriBranch.ViewMixin'
    },
    requires: [
        'VeriBranch.view.control.Header',
        'VeriBranch.view.control.StepControlContainer',
        'VeriBranch.view.control.ResultControl',
        'VeriBranch.view.field.FilteredDropDownSchoolField',
        'VeriBranch.view.field.DropDownField',
        'VeriBranch.view.field.CheckboxField',
        'VeriBranch.view.field.NumericField',
        'VeriBranch.view.control.Button',
        'VeriBranch.view.field.DropDownCustomerAccountField',
        'Ext.Label',
        'Ext.form.Panel',
        'Ext.field.Select',
        'Ext.field.Checkbox',
        'Ext.Button'
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
                        xtype: 'label',
                        cls: 'vpx-infolabel',
                        itemId: 'infoLabel'
                    },
                    {
                        xtype: 'vpformpanel',
                        flex: 1,
                        itemId: 'formPanel',
                        layout: 'vbox',
                        scrollable: false,
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
                                                xtype: 'vpfiltereddropdownschoolfield',
                                                listItemAlias: 'vpfiltereddropdownlistitem',
                                                displayField: 'displayField',
                                                valueField: 'displayField',
                                                name: 'school',
                                                required: true,
                                                itemId: 'school'
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
                                                itemId: 'educationTerm',
                                                required: true,
                                                displayField: 'description',
                                                valueField: 'description'
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
                                                itemId: 'schoolType',
                                                name: 'schoolType',
                                                required: true,
                                                displayField: 'schoolTypeName',
                                                valueField: 'id'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-3',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'vpx-infolabel',
                                                height: 80,
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
                                                cls: 'vpx-infolabel',
                                                height: 30,
                                                itemId: 'protocolStartDateLabel'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-3',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'vpx-infolabel',
                                                height: 30,
                                                itemId: 'protocolEndDateLabel'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-6',
                                        items: [
                                            {
                                                xtype: 'vpcheckboxfield',
                                                itemId: 'selfParentCheckbox',
                                                name: 'selfParentCheckbox'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-3',
                                        items: [
                                            {
                                                xtype: 'vpnumerictext',
                                                cls: 'vpx-textField',
                                                itemId: 'studentIdentityNumberTextField',
                                                name: 'studentIdentityNumberTextField',
                                                required: true,
                                                maxLength: 50
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-3',
                                        height: 80,
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'vpbutton',
                                                docked: 'left',
                                                height: 50,
                                                itemId: 'searchButton',
                                                width: 100,
                                                iconCls: 'search'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-3',
                                        items: [
                                            {
                                                xtype: 'vptextfield',
                                                cls: 'vpx-textField',
                                                disabled: true,
                                                itemId: 'studentNameSurnameTextField',
                                                name: 'studentNameSurnameTextField',
                                                maxLength: 50
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
                                                xtype: 'vptextfield',
                                                cls: 'vpx-textField',
                                                itemId: 'studentNumberTextField',
                                                name: 'studentNumberTextField',
                                                required: true,
                                                maxLength: 19
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-6',
                                        items: [
                                            {
                                                xtype: 'vpdropdowncustomeraccountfield',
                                                hidden: false,
                                                itemId: 'accountField',
                                                name: 'accountField',
                                                required: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        cls: 'vp-form-col-6',
                                        items: [
                                            {
                                                xtype: 'vpcheckboxfield',
                                                disabled: true,
                                                itemId: 'giveLoanLimitCheckbox',
                                                name: 'giveLoanLimitCheckbox'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                fn: 'onSelectfieldChange',
                event: 'change',
                delegate: '#school'
            },
            {
                fn: 'onEducationTermChange',
                event: 'change',
                delegate: '#educationTerm'
            },
            {
                fn: 'onSchoolTypeChange',
                event: 'change',
                delegate: '#schoolType'
            },
            {
                fn: 'onSelfParentCheckboxChange',
                event: 'change',
                delegate: '#selfParentCheckbox'
            },
            {
                fn: 'onSearchButtonTap',
                event: 'tap',
                delegate: '#searchButton'
            },
            {
                fn: 'onStudentNumberTextFieldFocus',
                event: 'focus',
                delegate: '#studentNumberTextField'
            },
            {
                fn: 'onAccountfieldChange',
                event: 'change',
                delegate: '#accountField'
            },
            {
                fn: 'onGiveLoanLimitCheckboxChange',
                event: 'change',
                delegate: '#giveLoanLimitCheckbox'
            }
        ]
    },

    onContainerNextButtonTap: function(container) {
        var me = this,
            flowModel = me.getFlowModel(),
            controller = me.getController(),
            flow = me.getFlow(),
            stepControl = me.down('#stepControl');

        stepControl.setPreventNext(true);
        var params = me.getCheckStudentDefinitionParameters();

        if(me.isValid('studentTCKN')){
            controller.callCheckStudentDefinitionTransaction(me,
                                                             params.schoolDefinitionId,
                                                             params.schoolGroupName,
                                                             params.schoolType,
                                                             params.educationPeriod,
                                                             params.isGuardian,
                                                             params.identityNo,
                                                             params.studentNo,
                                                             params.studentIdentityNo,
                                                             params.account,
                                                             params.giveCreditLimit).then(
                function(result){
                    if(result.response.footer.isSuccess && result.response.footer.error === null && result.response.footer.informations.length == 0){
                        flow.navigateNext();
                    }
                });
        }


    },

    onSelectfieldChange: function(selectfield, newValue, oldValue, eOpts) {
        VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection.Start2.onSelectfieldChange');

        var me = this,
            controller = me.getController(),
            flowModel = me.getFlowModel(),
            currentSchoolValue = me.down('#school').getValue();

            me.setResult(null);

        if(flowModel.data.school != currentSchoolValue){
            flowModel.data.school = currentSchoolValue;
            controller.callGetSchoolListTransaction(currentSchoolValue, me).then(
                function(result){
                    if(result.response.result.schools.length){
                        flowModel.data.schoolList = result.response.result.schools;
                        flowModel.data.schoolValue = me.down('#school').getValue();
                        me.setSchoolTypeDropdownData(flowModel.data.schoolList);
                    }else{
                        VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection.Controller.callGetSchoolListTransaction - schoolList is empty');
                    }
                }
            );
        }



    },

    onEducationTermChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            guarantorLabel = me.down('#guarantorLabel'),
            protocolStartDateLabel = me.down('#protocolStartDateLabel'),
            protocolEndDateLabel = me.down('#protocolEndDateLabel'),
            giveLoanLimitCheckbox = me.down('#giveLoanLimitCheckbox');

        flowModel.data.educationTerm = newValue;
        me.setResult(null);

        if(newValue != oldValue){
            var isGuarantorAvailable;
            var filteredSchoolListItem;

            Ext.Array.each(flowModel.data.schoolList, function(item){
                if(item.schoolType == flowModel.data.schoolTypeId && item.educationPeriod == flowModel.data.educationTerm){
                    if(item.installmentAmount > 0){
                        isGuarantorAvailable = true;
                    }else if(item.installmentAmount === 0){
                        isGuarantorAvailable = false;
                    }
                    filteredSchoolListItem = item;
                    flowModel.data.paymentDefinitionId = item.paymentDefinitionId;
                }

            });

            if(filteredSchoolListItem !== null && filteredSchoolListItem !== undefined){
                flowModel.data.protocolStartDate = VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(filteredSchoolListItem.agreementStartDate));
                flowModel.data.protocolEndDate = VeriBranch.Utilities.getFormattedShortDate(new Date().setVeriParkApiString(filteredSchoolListItem.agreementEndDate));
                protocolStartDateLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.protocolStartDateLabel.html') + flowModel.data.protocolStartDate);
                protocolEndDateLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.protocolEndDateLabel.html') + flowModel.data.protocolEndDate);
            }else{
                protocolStartDateLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.protocolStartDateLabel.html') + "-");
                protocolEndDateLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.protocolEndDateLabel.html') + "-");
            }

            if(isGuarantorAvailable){
                flowModel.data.isGuarantorAvailable = true;
                guarantorLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.guarantorLabel.html') + "Var" );
                if(flowModel.data.isIntelligencePositive)
                    giveLoanLimitCheckbox.setDisabled(false);
            }else if(isGuarantorAvailable === false){
                flowModel.data.isGuarantorAvailable = false;
                guarantorLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.guarantorLabel.html') + "Yok");
                giveLoanLimitCheckbox.setDisabled(true);
                giveLoanLimitCheckbox.setChecked(false);
            }else{
                guarantorLabel.setHtml(resources.getValue('onlineSchoolPaymentCollection.Start2.guarantorLabel.html') + "-");
            }

        }
    },

    onSchoolTypeChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            educationTermDropdown = me.down('#educationTerm');

        me.setResult(null);

        flowModel.data.schoolTypeId = newValue;

        if(newValue !== null && newValue != oldValue){
            if(selectfield.record.data){
                flowModel.data.schoolTypeText = selectfield.record.data.schoolTypeName;
            }

            var filteredArrayBySchoolType = Ext.Array.filter(flowModel.data.schoolList, function(item) {
                return item.schoolType === newValue;
            });

            var educationTermArray = [];
            Ext.Array.each(filteredArrayBySchoolType, function(element){
                    pushToArray(educationTermArray.length, element.educationPeriod);
            });

            function pushToArray(id, name){
                if(educationTermArray.length === 0){
                    educationTermArray.push({id: id, description: name});
                }else{
                    var isIncluded;
                    for(var i = 0; i < educationTermArray.length; i ++){
                        if(educationTermArray[i].description == name){
                            isIncluded = true;
                        }
                    }
                    if(isIncluded !== true){
                        educationTermArray.push({id: id, description: name});
                    }
                }
            }

            var store = VeriBranch.Data.createStoreWithName("", educationTermArray, false);
            educationTermDropdown.setStore(store);
            educationTermDropdown.setDisabled(false);
            educationTermDropdown.setValue(null);
        }else if(newValue === null){
            educationTermDropdown.setValue(null);
            educationTermDropdown.setDisabled(true);
        }



    },

    onSelfParentCheckboxChange: function(checkboxfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            studentIdentityNumberField = me.down('#studentIdentityNumberTextField'),
            studentNameSurnameTextField = me.down('#studentNameSurnameTextField'),
            searchButton = me.down('#searchButton');

        me.setResult(null);

        if(checkboxfield.getChecked()){
            flowModel.data.isSelfParent = true;
            studentIdentityNumberField.setValue(flowModel.data.identityNumber);
            studentIdentityNumberField.setDisabled(true);
            studentNameSurnameTextField.setValue(flowModel.data.name + " " + flowModel.data.surname);
            searchButton.setDisabled(true);
        }else{
            flowModel.data.isSelfParent = false;
            studentIdentityNumberField.setValue(null);
            studentNameSurnameTextField.setValue(null);
            studentIdentityNumberField.setDisabled(false);
            searchButton.setDisabled(false);
        }
    },

    onSearchButtonTap: function(button, e, eOpts) {
        var me = this,
            flowModel = me.getFlowModel(),
            controller = me.getController(),
            studentIdentityNumber = me.down('#studentIdentityNumberTextField').getValue(),
            selfParentCheckbox = me.down('#selfParentCheckbox'),
            studentNameSurnameTextField = me.down('#studentNameSurnameTextField');

        if(me.isValid('studentTCKN')){
            me.setResult(null);
            controller.callGetStudentInformationTransaction(studentIdentityNumber, me).then(
                function(result){
                    if(selfParentCheckbox.getChecked() === false){
                        studentNameSurnameTextField.setValue(result.response.result.studentFullName);
                    }
                    flowModel.data.validStudentIdentityNo = studentIdentityNumber;
                });
        }
    },

    onStudentNumberTextFieldFocus: function(textfield, e, eOpts) {
        var me = this;

        me.setResult(null);
    },

    onAccountfieldChange: function(selectfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel();

        me.setResult(null);
        flowModel.data.accountField = newValue;
    },

    onGiveLoanLimitCheckboxChange: function(checkboxfield, newValue, oldValue, eOpts) {
        var me = this,
            flowModel = me.getFlowModel();

        me.setResult(null);

        if(checkboxfield.getChecked()){
            flowModel.data.giveLoanLimit = true;
        }else{
            flowModel.data.giveLoanLimit = false;
        }
    },

    initialize: function() {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Start2.initialize');

        var me = this,
            flowModel = me.getFlowModel(),
            accountField = me.down('#accountField'),
            giveLoanLimitCheckbox = me.down('#giveLoanLimitCheckbox'),
            branchCode = VeriBranch.Config.getAuthenticatedUser() ? VeriBranch.Config.getAuthenticatedUser().userBranch : null;

        accountField.setDropDownData(flowModel.data.customerNo, true, branchCode);

        if(flowModel.raw && flowModel.raw.temporarySaved){
            me.setSchoolTypeDropdownData(flowModel.data.schoolList);
            me.down('#school').setSelectedData(flowModel.data.school);
            me.down('#schoolType').setValue(flowModel.raw.schoolTypeId);
            me.down('#educationTerm').setValue(flowModel.raw.educationTerm);
            me.down('#accountField').setValue(flowModel.raw.accountField);
            me.down('#selfParentCheckbox').setChecked(flowModel.raw.isSelfParent);
            me.down('#studentNumberTextField').setValue(flowModel.raw.studentNumberTextField);
            me.down('#giveLoanLimitCheckbox').setChecked(flowModel.raw.giveLoanLimit);
        }
    },

    setSchoolTypeDropdownData: function(schoolList) {
        var me = this,
            schoolTypeDropdown = me.down('#schoolType');

        var schoolTypeArray = [];
        Ext.Array.each(schoolList, function(school){
            if(school.schoolType == 1){
                pushToArray(school.schoolType, "Kres");
            }else if(school.schoolType == 2){
                pushToArray(school.schoolType, "Anaokulu");
            }else if(school.schoolType == 3){
                pushToArray(school.schoolType, "Ilkokul");
            }else if(school.schoolType == 4){
                pushToArray(school.schoolType, "Ortaokul");
            }else if(school.schoolType == 5){
                pushToArray(school.schoolType, "Lise");
            }else if(school.schoolType == 6){
                pushToArray(school.schoolType, "Universite");
            }else if(school.schoolType == 7){
                pushToArray(school.schoolType, "Dershane");
            }else if(school.schoolType == 8){
                pushToArray(school.schoolType, "Tasimacilik");
            }else if(school.schoolType == 9){
                pushToArray(school.schoolType, "Yurt");
            }
        });

        function pushToArray(id, name){
            if(schoolTypeArray.length === 0){
                schoolTypeArray.push({id: id, schoolTypeName: name});
            }else{
                var isIncluded;
                for(var i = 0; i < schoolTypeArray.length; i ++){
                    if(schoolTypeArray[i].schoolTypeName == name){
                        isIncluded = true;
                    }
                }
                if(isIncluded !== true){
                    schoolTypeArray.push({id: id, schoolTypeName: name});
                }
            }
        }
        schoolTypeDropdown.setValue(null);
        var store = VeriBranch.Data.createStoreWithName("", schoolTypeArray, false);
        schoolTypeDropdown.setStore(store);
        schoolTypeDropdown.setDisabled(false);
    },

    getCheckStudentDefinitionParameters: function() {
        var me = this,
            flowModel = me.getFlowModel(),
            schoolGroupName = me.down('#school').getValue(),
            schoolType = flowModel.data && flowModel.data.schoolTypeId ? flowModel.data.schoolTypeId : null,
            educationPeriod = me.down('#educationTerm').getValue(),
            isGuardian = me.down('#selfParentCheckbox').getChecked(),
            identityNo = flowModel.data ? flowModel.data.identityNo : null,
            studentNo = me.down('#studentNumberTextField').getValue(),
            studentNameSurname = me.down('#studentNameSurnameTextField').getValue(),
            studentIdentityNo = isGuardian ? flowModel.data.identityNo : me.down('#studentIdentityNumberTextField').getValue(),
            accountField = me.down('#accountField').getValue(),
            giveCreditLimit = me.down('#giveLoanLimitCheckbox').getChecked();

        flowModel.data.studentNumber = studentNo;

        if(studentNameSurname !== null)
        {
            var splittedString = studentNameSurname.split(" ");
            if(splittedString.length == 3){
                flowModel.data.studentFirstName = splittedString[0];
                flowModel.data.studentLastName = splittedString[1] + " " +splittedString[2];
            }else if(splittedString.length == 2){
                flowModel.data.studentFirstName = splittedString[0];
                flowModel.data.studentLastName = splittedString[1];
            }else if(splittedString.length == 1){
                flowModel.data.studentFirstName = splittedString[0];
            }
        }

        Ext.Array.each(flowModel.data.schoolList, function(item){
            if(item.schoolType == schoolType && item.educationPeriod == educationPeriod){
                flowModel.data.schoolDefinitionId = item.schoolDefinitionId;
            }
        });

        var params = {
            schoolDefinitionId: flowModel.data.schoolDefinitionId,
            schoolGroupName: schoolGroupName,
            schoolType: schoolType,
            educationPeriod: educationPeriod,
            isGuardian: isGuardian,
            identityNo: identityNo,
            studentNo: studentNo,
            studentIdentityNo: studentIdentityNo,
            account: accountField,
            giveCreditLimit: giveCreditLimit
        };

        return params;
    }

});