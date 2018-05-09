/*
 * File: app/view/onlineSchoolPaymentCollection/Confirm.js
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

Ext.define('VeriBranch.view.onlineSchoolPaymentCollection.Confirm', {
    extend: 'Ext.Container',

    mixins: {
        veribranchView: 'VeriBranch.ViewMixin'
    },
    requires: [
        'VeriBranch.view.control.Header',
        'VeriBranch.view.control.StepControlContainer',
        'VeriBranch.view.control.AddressContainer',
        'VeriBranch.view.control.PhoneContainer',
        'VeriBranch.view.field.CheckboxField',
        'Ext.Container',
        'Ext.Label',
        'Ext.field.Checkbox'
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
                validateDocuments: true,
                showSaveTemporaryButton: false,
                itemId: 'stepControl'
            },
            {
                xtype: 'container',
                flex: 1,
                cls: 'vpx-stepContentContainer',
                itemId: 'contentContainer',
                layout: 'vbox',
                scrollable: 'vertical',
                items: [
                    {
                        xtype: 'container',
                        cls: 'vp-infoDetailArea',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'vpx-subHeader',
                                itemId: 'info1'
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'identityNo'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'nameSurname'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'fatherName'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'birthDate'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'birthPlace'
                                    }
                                ]
                            },
                            {
                                xtype: 'vpaddresscontainer',
                                displayAps: true
                            },
                            {
                                xtype: 'vpphonecontainer'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-infoDetailArea',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'vpx-subHeader',
                                itemId: 'info2'
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'school'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'schoolType'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'protocolStartDate'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'protocolEndDate'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'isGuarantorAvailable'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'educationTerm'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'vpcheckboxfield',
                                        disabled: true,
                                        itemId: 'selfParentCheckbox',
                                        name: 'selfParentCheckbox'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        hidden: true,
                                        itemId: 'studentIdentityNumber'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        hidden: true,
                                        itemId: 'studentNameSurname'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'studentNumber'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'account'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
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
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-infoDetailArea',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'vpx-subHeader',
                                itemId: 'info'
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                itemId: 'paymentPlanContainer',
                                layout: 'vbox'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        cls: 'vp-infoDetailArea',
                        items: [
                            {
                                xtype: 'label',
                                cls: 'vpx-subHeader',
                                itemId: 'info3'
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'documents'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                cls: 'vp-labelContainer',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        itemId: 'digitalDocuments'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },

    initialize: function() {
        VeriBranch.Utilities.logDebug('onlineInstantAutomatApplication.Confirm.initialize');

        var me = this,
            flowModel = this.getFlowModel(),
            flowModelData = flowModel.data,
            formData = flowModel.data.confirmPageData.formData,
            paymentPlanContainer = me.down('#paymentPlanContainer');

        var setData = function(itemid, id, value, label, isMoney){
            var currentLabel = label!==null && label!==undefined ? label : (formData && formData[0] && formData[0].fields && formData[0].fields[id] ? formData[0].fields[id].label : resources.getValue("EmptyField")),
                currentValue = value!==null && value!==undefined ? value : (formData && formData[0] && formData[0].fields && formData[0].fields[id] ? formData[0].fields[id].value : null);

            currentValue = currentValue ? currentValue : resources.getValue("EmptyField");

            if(isMoney && Ext.isNumber(currentValue)){
                currentValue = currentValue.toMoney();
            }

            var html = "<div class='vp-row'>"+
                "<span class='vp-title'>"+ currentLabel +"</span>"+
                "<span class='vp-value'>"+ currentValue +"</span>"+
                "</div>";
            me.down(itemid).setHtml(html);
        };

        //Kimlik Bilgileri
        me.down("#identityNo").setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('TCKN') +  '</span> ' + '<span class="vp-value">' + flowModel.data.identityNo + '</span></div>');
        me.down("#nameSurname").setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue(('AdSoyad')) + '</span> ' + '<span class="vp-value">'  + flowModel.data.name + " " + flowModel.data.customerInfo.surname + '</span></div>');
        me.down("#fatherName").setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('BabaAdi') +  '</span> ' + '<span class="vp-value">' + flowModel.data.fatherName + '</span></div>');
        me.down("#birthDate").setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('DogumTarihi') +  '</span> ' + '<span class="vp-value">' + VeriBranch.Utilities.getFormattedShortDate(new Date(flowModel.data.birthDate)) + '</span></div>');
        me.down("#birthPlace").setHtml('<div class="vp-row"><span class="vp-title">' + resources.getValue('DogumYeri') +  '</span> ' + '<span class="vp-value">' + flowModel.data.birthPlace + '</span></div>');
        me.down('#customerAddress').setAddressData(flowModel.data.addressList);
        me.down('#customerPhone').setPhoneData(flowModel.data.phoneList, flowModel.data.phoneParameterList);

        //İslem Bilgileri
        if(flowModel.data.isGuarantorAvailable){
            setData('#isGuarantorAvailable', null,"Var", resources.getValue("onlineSchoolPaymentCollection.Start2.guarantorLabel.html"));
        }else{
            setData('#isGuarantorAvailable', null,"Yok", resources.getValue("onlineSchoolPaymentCollection.Start2.guarantorLabel.html"));
        }

        if(flowModel.data.isSelfParent){
            me.down("#selfParentCheckbox").setChecked(true);
            setData('#studentIdentityNumber', null,flowModel.data.identityNo, resources.getValue("onlineSchoolPaymentCollection.Start2.studentIdentityNumberTextField.label"));
            setData('#studentNameSurname', null,flowModel.data.name + " " + flowModel.data.customerInfo.surname, resources.getValue("onlineSchoolPaymentCollection.Start2.studentNameSurnameTextField.label"));
            me.down("#studentIdentityNumber").setHidden(false);
            me.down("#studentNameSurname").setHidden(false);
        }

        if(flowModel.data.giveLoanLimit){
            me.down("#giveLoanLimitCheckbox").setChecked(true);
        }

        setData('#school', null,flowModel.data.school, resources.getValue("onlineSchoolPaymentCollection.Start2.school.label"));
        setData('#schoolType', null,flowModel.data.schoolTypeText, resources.getValue("onlineSchoolPaymentCollection.Start2.schoolType.label"));
        setData('#protocolStartDate', null,flowModel.data.protocolStartDate, resources.getValue("onlineSchoolPaymentCollection.Start2.protocolStartDateLabel.html"));
        setData('#protocolEndDate', null,flowModel.data.protocolEndDate, resources.getValue("onlineSchoolPaymentCollection.Start2.protocolEndDateLabel.html"));
        setData('#educationTerm', null,flowModel.data.educationTerm, resources.getValue("onlineSchoolPaymentCollection.Start2.educationTerm.label"));
        setData('#studentNumber', null,flowModel.data.studentNumber, resources.getValue("onlineSchoolPaymentCollection.Start2.studentNumberTextField.label"));
        setData('#account', 7, null, resources.getValue("onlineSchoolPaymentCollection.Start2.account.label"));

        //Odeme Plani Bilgileri
        if(flowModelData.paymentPlans.length > 0){
            Ext.Array.each(flowModelData.paymentPlans, function(paymentPlan){

                var table = paymentPlanContainer.add(
                    Ext.create('VeriBranch.view.control.PaymentPlanDataView',{
                        listItemType: 'vppaymentplandataviewitem',
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
                        cls: 'vp-datagridiview',
                        height: 250,
                        isModificationButtonsVisible: false,
                        margin: 10
                    })
                );

                table.setGridData(paymentPlan.paymentPlanGridData);
                table.setFooter(paymentPlan.paymentPlanFooterData);
            });
        }

        //Dokumanlar
        var documentsText = "";
        Ext.Array.each(flowModel.data.documentList, function(item){
            if(item.isCaptured){
                documentsText += item.documentType.name + ", ";
            }
        });
        documentsText = documentsText.substring(0, documentsText.lastIndexOf(","));
        setData('#documents',null, documentsText, resources.getValue('Dokumanlar'));

        if(flowModel.data.digitalDocumentList && flowModel.data.digitalDocumentList.length > 0){
            var digitalDocumentsText = "";
            Ext.Array.each(flowModel.data.digitalDocumentList, function(item){
                digitalDocumentsText += item.documentType.name + ", ";
            });
            digitalDocumentsText = digitalDocumentsText.substring(0, digitalDocumentsText.lastIndexOf(","));
            setData('#digitalDocuments',null, digitalDocumentsText, resources.getValue('DijitalDokumanlar'));
        }

    }

});