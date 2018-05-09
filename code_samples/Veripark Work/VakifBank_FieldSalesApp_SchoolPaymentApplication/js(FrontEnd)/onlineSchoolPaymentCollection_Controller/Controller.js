/*
 * File: app/controller/onlineSchoolPaymentCollection/Controller.js
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

Ext.define('VeriBranch.controller.onlineSchoolPaymentCollection.Controller', {
    extend: 'Ext.app.Controller',

    config: {
    },

    initStart: function(view) {
        VeriBranch.Utilities.logDebug('onlineConsumerLoan.Controller.initStart');

        var me = this,
            flowModel = view.getFlowModel();

    },

    callGetMssCustomerTransaction: function(view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.callGetMssCustomerTransaction');

        var me = this,
            flowModel = view.getFlowModel(),
            response = null;

        VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetMssCustomerInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetMssCustomerInquiry),
                params: VeriBranch.ApiHelper.getMssCustomerRequest(flowModel.data.identityNumber, false),
                view:view
            }
        }, false, "")
        .then(function(result){

            flowModel.data.applicationId = VeriBranch.Utilities.generateGUID();
            flowModel.data.mainProductType = VeriBranch.Config.getMainProductTypes().SchoolPaymentCollection;
            flowModel.data.applicationDate = new Date();

            if(result.response.result.customerList){
                if(result.response.result.customerList !== 0){ //mevcut musteri
                    flowModel.data.isNewCustomer = false;
                    flowModel.data.stopFlow = false;
                    response = result.response.result.customerList[0];
                    flowModel.data.identityNumber = response.identityNo;
                    VeriBranch.Utilities.addObjectToTargetObject(response, flowModel.data);
                    flowModel.data.customerInfo = {name: response.name, surname: response.surname, customerNo: response.customerNo, potentialCustomerNo: response.potentialCustomerNo};
                    view.displayIntelPopup();
                }else if(result.response.result.customerList.length === 0){ //yeni musteri
                    flowModel.data.blockNavigateBack=true;
                    VeriBranch.Utilities.logInfo('onlineConsumerLoan - Existing customer did not return from the service. Stop flow..');
                    flowModel.data.isNewCustomer = true;
                    flowModel.data.stopFlow = true;
                    view.displayIntelPopup();
                }
            } else{
                VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - CustomerList can not be found.');
            }
        },function(result){
            if(result && result.footer && result.footer.error && result.footer.error.code == "CRM0001002"){
                view.setResult(null);
                var id = view.down('#identityNumber').getValue();
                VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                    VeriBranch.TransactionFlow.start('onlineAddNewCustomer', {identityNumber:id});
                }, view, false);
            }
        });
    },

    callGetIntelligenceForSchoolPaymentTransaction: function(view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.callGetIntelligenceForSchoolPayment');

        var me = this,
            flowModel = view.getFlowModel(),
            flow = view.getFlow();

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetIntelligenceForSchoolPaymentInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetIntelligenceForSchoolPaymentInquiry),
                params: VeriBranch.ApiHelper.GetIntelligenceForSchoolPaymentInquiryRequest(flowModel.data.identityNo, flowModel.data.customerInfo.customerNo),
                view:view
            }
        }, false, "").then(
            function(result){
                if(result.response.footer.informations.length && result.response.result){
                    flowModel.data.paymentPlans = [];

                    flowModel.data.accountList = result.response.result.accountList;
                    flowModel.data.accountStatusResult = result.response.result.accountStatusResult;
                    flowModel.data.hasAvailableAccount = result.response.result.hasAvailableAccount;
                    flowModel.data.hasEmail = result.response.result.hasEmail;
                    flowModel.data.hasMobilePhone = result.response.result.hasMobilePhone;
                    flowModel.data.isOccupationSuitable = result.response.result.isOccupationSuitable;
                    flowModel.data.isPaymentPerformanceSuitable = result.response.result.isPaymentPerformanceSuitable;
                    flowModel.data.isPersonel = result.response.result.isPersonel;
                    flowModel.data.isSuitableForGuarantor = result.response.result.isSuitableForGuarantor;
                    flowModel.data.intelligenceResult = result.response.result.result;
                    flowModel.data.intelligenceStatus = result.response.result.status;

                    if(result.response.footer.informations[0].code == "OTS0000084"){ //olumsuz garantorsuz
                        flowModel.data.isIntelligencePositive = false;
                        var buttons = [{
                            itemId: 'approve',
                            text: resources.getValue('trueText'),
                            cls: 'vp-session-continue-btn',
                            ui: 'action',
                            handler: function() {
                                this.hide();
                                flow.navigateNext();
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
                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBoxWithButtons("", result.response.footer.informations[0].message, buttons);

                    }else if(result.response.footer.informations[0].code == "OTS0000082"){ //olumsuz telefon eksik

                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.response.footer.informations[0].message, function(){
                            VeriBranch.TransactionFlow.start('onlineUpdateCustomer');
                        }, view, false);

                    }

                }

            },function(result){
                if(result.result && result.footer.error){
                    flowModel.data.paymentPlans = [];

                    flowModel.data.accountList = result.result.accountList;
                    flowModel.data.accountStatusResult = result.result.accountStatusResult;
                    flowModel.data.hasAvailableAccount = result.result.hasAvailableAccount;
                    flowModel.data.hasEmail = result.result.hasEmail;
                    flowModel.data.hasMobilePhone = result.result.hasMobilePhone;
                    flowModel.data.isOccupationSuitable = result.result.isOccupationSuitable;
                    flowModel.data.isPaymentPerformanceSuitable = result.result.isPaymentPerformanceSuitable;
                    flowModel.data.isPersonel = result.result.isPersonel;
                    flowModel.data.isSuitableForGuarantor = result.result.isSuitableForGuarantor;
                    flowModel.data.intelligenceResult = result.result.result;
                    flowModel.data.intelligenceStatus = result.result.status;


                    if(result.footer.error.code == "OTS0000077"){ //olumlu hesap eksik

                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            VeriBranch.TransactionFlow.start('onlineCheckingAccountOpening', {identityNumber:flowModel.data.identityNumber});
                        }, view, false);
                    }else if(result.footer.error.code == "OTS0000076"){ //olumlu telefon eksik

                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            VeriBranch.TransactionFlow.start('onlineUpdateCustomer', {identityNumber:flowModel.data.identityNumber});
                        }, view, false);
                    }else if(result.footer.error.code == "OTS0000083"){ //olumsuz hesap eksik

                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            VeriBranch.TransactionFlow.start('onlineCheckingAccountOpening', {identityNumber:flowModel.data.identityNumber});
                        }, view, false);

                    }else if(result.footer.error.code == "OTS0000078"){ //olumlu
                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            flowModel.data.isIntelligencePositive = true;
                            VeriBranch.UIProcess.getActiveView().getFlow().navigateNext();
                            this.hide();
                        }, view, false);
                    }else if(result.footer.error.code == "OTS0000079"){ //olumlu meslek uygun değil
                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            VeriBranch.UIProcess.getActiveView().getFlow().navigateNext();
                            this.hide();
                        }, view, false);
                    }else if(result.footer.error.code == "OTS0000080"){ //olumlu personel yakını
                        view.setResult(null);
                        VeriBranch.Utilities.showMessageBox('', result.footer.error.message, function(){
                            flowModel.data.isIntelligencePositive = false;
                            VeriBranch.UIProcess.getActiveView().getFlow().navigateNext();
                            this.hide();
                        }, view, false);
                    }
                }
            }
        );
    },

    callGetSchoolListTransaction: function(schoolName, view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.callGetSchoolListTransaction');

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetSchoolListInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetSchoolListInquiry),
                params: VeriBranch.ApiHelper.getSchoolListInquiryRequest(schoolName),
                view:view
            }
        }, false, "");
    },

    callGetStudentInformationTransaction: function(studentIdentityNumber, view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.callGetStudentInformation');

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetStudentInformationInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetStudentInformationInquiry),
                params: VeriBranch.ApiHelper.getStudentInformationInquiryRequest(studentIdentityNumber),
                view:view
            }
        }, false, "");
    },

    callCheckStudentDefinitionTransaction: function(view, schoolDefinitionId, schoolGroupName, schoolType, educationPeriod, isGuardian, identityNo, studentNo, studentIdentityNo, account, giveCreditLimit) {

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().CheckStudentDefinitionInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().CheckStudentDefinitionInquiry),
                params: VeriBranch.ApiHelper.checkStudentDefinitionInquiryRequest(
                    schoolDefinitionId,
                    schoolGroupName,
                    schoolType,
                    educationPeriod,
                    isGuardian,
                    identityNo,
                    studentNo,
                    studentIdentityNo,
                    account,
                    giveCreditLimit
                ),
                view:view
            }
        }, false, "");
    },

    initStart4: function(view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.initStart4');

        var me = this,
            flowModel = view.getFlowModel();

        if(flowModel.data.documentList && flowModel.data.documentList.length > 0){
            VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection - Documents uploaded without calling transaction.');
            view.updateDocumentUploadContainerData();
        } else{
            VeriBranch.Utilities.getOperationTypeFromScreenParameterCode()
            .then(
                function(result){
                    if(result){
                        var codelist = Ext.Array.filter(result.response.result.parameterList, function(item) {
                            return item.groupCode=== "DYSMSSScreenCode";
                        });
                        if(codelist && codelist.length > 0){
                            Ext.Array.each(codelist, function(item){
                                if(Number(item.detail5) === VeriBranch.Config.getMainProductTypes().SchoolPaymentCollection){
                                    flowModel.data.operationType = item.detail3;
                                    flowModel.data.subOperationType = item.detail1;
                                    return;
                                }
                            });
                            if(!flowModel.data.operationType){
                                VeriBranch.Utilities.logWarning('Operation type can not be found for onlineSchoolPaymentCollection');
                                view.setErrorText('Mevcut başvuru ile ilişkili servis parametresi bulunamadı.', 2);
                                return false;
                            }
                            VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection - Document parameter list is ready.');
                            return me.callGetApplicationMandatoryDocumentList(view);
                        }else{
                            VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - Document parameter list can not be found.');
                        }
                    }else{
                        VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - Document parameter list can not be found.');
                    }
                },
                function(){
                    VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - Document parameter list transaction has failed.');
                }
            )
            .then(
                function(result){
                    if(result && result.response && result.response.result && result.response.result.mandatoryDocumentList){
                        flowModel.data.mandatoryDocumentList = [];
                        Ext.Array.each(result.response.result.mandatoryDocumentList, function(item){
                            if(item.digital){
                                flowModel.data.digitalDocumentList.push(item);
                            }else{
                                flowModel.data.documentList.push(item);
                            }
                        });

                        Ext.Array.each(flowModel.data.documentList, function(item){
                            flowModel.data.mandatoryDocumentList.push({ attributeNameOrId: VeriBranch.Config.getDocumentAttributeStaticName(), attributeValue: item.mandatory, documentTypeId: item.documentType.id});
                            item.isCaptured = false;
                            if(item.mandatory === 4){
                                item.isRequired = true;
                            }else{
                                item.isRequired = false;
                            }
                        });
                        VeriBranch.Utilities.logInfo('onlineSchoolPaymentCollection - Mandatory document list is ready.');
                        view.updateDocumentUploadContainerData();
                    } else{
                        view.setErrorText(resources.getValue('DokumanListesiAlinamadi'), 2);
                        VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - Mandatory document list can not be found.');
                    }
                },
                function(){
                    view.setErrorText(resources.getValue('DokumanListesiAlinamadi'), 2);
                    VeriBranch.Utilities.logWarning('onlineSchoolPaymentCollection - Mandatory document list transaction has failed.');
                }
            );
        }

    },

    callGetApplicationMandatoryDocumentList: function(view) {
        VeriBranch.Utilities.logDebug('onlineCheckingAccountOpening.Controller.callGetApplicationMandatoryDocumentList');

        var flowModel = view.getFlowModel();

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetApplicationMandatoryDocumentListInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetApplicationMandatoryDocumentListInquiry),
                params: VeriBranch.ApiHelper.getApplicationMandatoryDocumentListRequest (
                    flowModel.data.customerNo ? flowModel.data.customerNo : null,
                    flowModel.data.identityNo ? flowModel.data.identityNo : null,
                    flowModel.data.operationType,
                    false, //Is address approved
                    flowModel.data.documentRequirements.isNonsalariedPrivateSector,
                    false, // Is sms approved ?
                    flowModel.data.documentRequirements.isStudent,
                    true,  // Is existing customer ?
                    false, // Is new customer ?
                    flowModel.data.documentRequirements.isPrivateSector ,
                    flowModel.data.documentRequirements.isNonsalariedCustomer,
                    flowModel.data.documentRequirements.isRetired,
                    flowModel.data.documentRequirements.hasVbNumber,
                    false,
                    false,
                    flowModel.data.digitalFlowSelected,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    0,
                    flowModel.data.giveLoanLimit
                ),
                view:view
            }
        }, false, "");
    },

    createExecuteTransaction: function(view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.createExecuteTransaction');

        var me = this,
            flowModel = view.getFlowModel();

        if (!flowModel.data.executePageData){
            flowModel.data.executePageData = {};
        }

        if(!flowModel.data.customerSearchDate && flowModel.raw){
            flowModel.data.customerSearchDate = flowModel.raw.customerSearchDate;
        }

        console.log(flowModel.data.executeTransaction);

        var schoolPaymentDefinition = {
            educationPeriod: flowModel.data.educationTerm,
            accountNumber: flowModel.data.accountField,
            intelligenceStatus: flowModel.data.intelligenceStatus,
            intelligenceResult: flowModel.data.intelligenceResult,
            giveCreditLimit: flowModel.data.giveLoanLimit,
            studentFirstName: flowModel.data.isSelfParent ? flowModel.data.name : flowModel.data.studentFirstName,
            studentNumber: flowModel.data.studentNumber,
            studentLastName: flowModel.data.isSelfParent ? flowModel.data.surname : flowModel.data.studentLastName,
            studentIdentityNumber: flowModel.data.studentIdentityNumberTextField,
            schoolPayments: flowModel.data.schoolPaymentsArray,
            schoolDefinitionId: flowModel.data.schoolDefinitionId,
            schoolType: flowModel.data.schoolType,
            paymentDefinitionId: flowModel.data.paymentDefinitionId,
            guardianFirstName: flowModel.data.name,
            guardianLastName: flowModel.data.surname,
            isGuardian: flowModel.data.isSelfParent,
            guardianIdentityNumber: flowModel.data.identityNo
        };

        flowModel.data.executePageData.transaction = {
            response:{
                transactionName: VeriBranch.Config.getApiServices().AddSchoolPaymentApplicationOperation,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().AddSchoolPaymentApplicationOperation),
                params: VeriBranch.ApiHelper.getAddSchoolPaymentApplicationRequest(
                    VeriBranch.Config.getMainProductTypes().SchoolPaymentCollection,
                    flowModel.data.documentCount,
                    [
                        {
                            applicationCreatedDate: flowModel.data.applicationDate,
                            productType: VeriBranch.Config.getMainProductTypes().SchoolPaymentCollection,
                            applicationId: flowModel.data.applicationId,
                            productApplicationId: VeriBranch.Utilities.generateGUID()
                        }
                    ],
                    false,
                    flowModel.data.customerSearchDate,
                    new Date().toVeriParkApiString(),
                    flowModel.data.identityNumber,
                    schoolPaymentDefinition,
                    flowModel.data.digitalFlowSelected,
                    flowModel.data.digitalDocumentList
                )
            },
            isCacheable: false,
            cacheKey:""
        };


    },

    callCreatePhysicalDocumentTransaction: function(view) {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Controller.callCreatePhysicalDocumentTransaction');

        var flowModel = view.getFlowModel();

        var params = {
            educationPeriod: flowModel.data.educationTerm,
            accountNumber: flowModel.data.accountField,
            intelligenceStatus: flowModel.data.intelligenceStatus,
            intelligenceResult: flowModel.data.intelligenceResult,
            giveCreditLimit: flowModel.data.giveLoanLimit,
            studentFirstName: flowModel.data.isSelfParent ? flowModel.data.name : flowModel.data.studentFirstName,
            studentNumber: flowModel.data.studentNumber,
            studentLastName: flowModel.data.isSelfParent ? flowModel.data.surname : flowModel.data.studentLastName,
            studentIdentityNumber: flowModel.data.studentIdentityNumberTextField,
            schoolPayments: flowModel.data.schoolPaymentsArray,
            schoolDefinitionId: flowModel.data.schoolDefinitionId,
            schoolType: flowModel.data.schoolType,
            paymentDefinitionId: flowModel.data.paymentDefinitionId,
            guardianFirstName: flowModel.data.name,
            guardianLastName: flowModel.data.surname,
            isGuardian: flowModel.data.isSelfParent,
            guardianIdentityNumber: flowModel.data.identityNo
        };

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().CreatePhysicalDocumentOperation,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().CreatePhysicalDocumentOperation),
                params: VeriBranch.ApiHelper.getCreatePhysicalDocumentRequest(params.accountNumber,
                                                                              params.educationPeriod,
                                                                              params.giveCreditLimit,
                                                                              params.guardianFirstName,
                                                                              params.guardianIdentityNumber,
                                                                              params.guardianLastName,
                                                                              params.intelligenceResult,
                                                                              params.intelligenceStatus,
                                                                              params.isGuardian,
                                                                              params.paymentDefinitionId,
                                                                              params.schoolDefinitionId,
                                                                              params.schoolPayments,
                                                                              params.schoolType,
                                                                              params.studentFirstName,
                                                                              params.studentIdentityNumber,
                                                                              params.studentLastName,
                                                                              params.studentNumber),
                view:view
            }
        }, false, "");


    }

});