/*
 * File: app/model/onlineSchoolPaymentCollection/Model.js
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

Ext.define('VeriBranch.model.onlineSchoolPaymentCollection.Model', {
    extend: 'Ext.data.Model',

    mixins: {
        veriBranchModel: 'VeriBranch.ModelMixin'
    },
    requires: [
        'Ext.data.Field'
    ],

    config: {
        flowConfig: {
            transaction: {
                transactionName: '',
                transactionAction: ''
            },
            steps: [
                {
                    step: 'Start',
                    title: 'Kimlik Sorgulama',
                    nextStep: 'Start2',
                    validations: [
                        {
                            type: 'presence',
                            field: 'identityNumber',
                            name: 'identityNumber',
                            errorText: 'Validation.SearchCriteriaError'
                        },
                        {
                            type: 'length',
                            field: 'identityNumber',
                            name: 'identityNumber',
                            errorText: 'Validation.LengthError',
                            min: 11
                        },
                        {
                            type: 'custom',
                            field: 'identityNumber',
                            name: 'identityNumber',
                            errorText: 'Validation.TCKNFormatError',
                            functionName: 'isTCKNValid'
                        }
                    ]
                },
                {
                    step: 'Start2',
                    title: 'İşlem Bilgileri',
                    nextStep: 'Start3',
                    previousStep: 'Start',
                    validations: [
                        {
                            type: 'presence',
                            field: 'School',
                            name: 'School',
                            errorText: 'Validation.GenericTextFieldError'
                        },
                        {
                            type: 'presence',
                            field: 'schoolType',
                            name: 'schoolType',
                            errorText: 'Validation.GenericTextFieldError'
                        },
                        {
                            type: 'presence',
                            field: 'educationTerm',
                            name: 'educationTerm',
                            errorText: 'Validation.GenericTextFieldError'
                        },
                        {
                            type: 'presence',
                            field: 'studentIdentityNumberTextField',
                            name: 'studentIdentityNumberTextField',
                            errorText: 'Validation.SearchCriteriaError'
                        },
                        {
                            type: 'custom',
                            field: 'studentIdentityNumberTextField',
                            name: 'studentIdentityNumberTextField',
                            errorText: 'Validation.TCKNFormatError',
                            functionName: 'isTCKNValid',
                            validationGroup: 'studentTCKN'
                        },
                        {
                            type: 'presence',
                            field: 'studentNumberTextField',
                            name: 'studentNumberTextField',
                            errorText: 'Validation.GenericTextFieldError'
                        },
                        {
                            type: 'presence',
                            field: 'accountField',
                            name: 'accountField',
                            errorText: 'Validation.GenericTextFieldError'
                        }
                    ]
                },
                {
                    step: 'Start3',
                    title: 'Ödeme Planı',
                    nextStep: 'Start4',
                    previousStep: 'Start2',
                    validations: [
                        {
                            type: 'custom',
                            field: 'paymentPlanTableContainer',
                            name: 'paymentPlanTableContainer',
                            errorText: 'Validation.NoPaymentPlanFound',
                            functionName: 'hasPaymentPlan'
                        }
                    ]
                },
                {
                    step: 'Start4',
                    title: 'Dökümanlar',
                    nextStep: 'Confirm',
                    previousStep: 'Start3',
                    
                },
                {
                    step: 'Confirm',
                    title: 'Özet',
                    nextStep: 'Execute',
                    previousStep: 'Start4'
                },
                {
                    step: 'Execute',
                    title: 'Sonuç',
                    previousStep: 'Confirm'
                }
            ]
        },
        fields: [
            {
                name: 'account'
            },
            {
                name: 'sector'
            },
            {
                name: 'isSalaryCustomer'
            },
            {
                name: 'address'
            },
            {
                name: 'emailList'
            },
            {
                name: 'addressList'
            },
            {
                name: 'applicationDate'
            },
            {
                name: 'applicationId'
            },
            {
                name: 'birthDate'
            },
            {
                name: 'birthPlace'
            },
            {
                name: 'branch'
            },
            {
                name: 'branchCode'
            },
            {
                name: 'branchName'
            },
            {
                name: 'branchNote'
            },
            {
                name: 'branchOpininon'
            },
            {
                name: 'confirmPageData'
            },
            {
                name: 'customerInfo'
            },
            {
                name: 'customerNo'
            },
            {
                name: 'customerType'
            },
            {
                name: 'customerTypeText'
            },
            {
                defaultValue: [
                    
                ],
                name: 'documentList'
            },
            {
                name: 'documentRequirements'
            },
            {
                name: 'educationalBackground'
            },
            {
                name: 'emailAddressList'
            },
            {
                name: 'executePageData'
            },
            {
                name: 'fatherName'
            },
            {
                name: 'gender'
            },
            {
                name: 'homePhoneField'
            },
            {
                name: 'identityNo'
            },
            {
                name: 'identityNumber'
            },
            {
                name: 'identitySerialNo'
            },
            {
                name: 'identityType'
            },
            {
                name: 'isActive'
            },
            {
                name: 'isNewCustomer'
            },
            {
                name: 'isPotential'
            },
            {
                name: 'isWorking'
            },
            {
                name: 'mainProductType'
            },
            {
                name: 'mannerOfWork'
            },
            {
                name: 'marialStatus'
            },
            {
                name: 'mobilePhoneField'
            },
            {
                name: 'motherMaidenName'
            },
            {
                name: 'motherName'
            },
            {
                name: 'name'
            },
            {
                name: 'occupationCode'
            },
            {
                name: 'phoneList'
            },
            {
                name: 'phoneParameterList'
            },
            {
                name: 'portfolioBranchCode'
            },
            {
                name: 'portfolioBranchName'
            },
            {
                name: 'potentialCustomerNo'
            },
            {
                name: 'salary'
            },
            {
                name: 'sectorCode'
            },
            {
                name: 'segmentCode'
            },
            {
                name: 'surname'
            },
            {
                name: 'taxNo'
            },
            {
                name: 'title'
            },
            {
                name: 'workPhone'
            },
            {
                name: 'email'
            },
            {
                name: 'invalidDocumentList'
            },
            {
                name: 'blockNavigateBack'
            },
            {
                name: 'updateApplication'
            },
            {
                name: 'productApplicationId'
            },
            {
                name: 'sectorCodeText'
            },
            {
                name: 'customerDetail'
            },
            {
                name: 'mandatoryDocumentList'
            },
            {
                name: 'operationType'
            },
            {
                name: 'subOperationType'
            },
            {
                name: 'campaignInterestRate'
            },
            {
                name: 'minMontlyIncome'
            },
            {
                name: 'intelApplicationNo'
            },
            {
                name: 'isRetired'
            },
            {
                name: 'score'
            },
            {
                name: 'isDocumentsDirty'
            },
            {
                name: 'creditTgRate'
            },
            {
                name: 'currentTgRate'
            },
            {
                name: 'mobileNumber'
            },
            {
                defaultValue: [
                    
                ],
                name: 'digitalDocumentList'
            },
            {
                name: 'digitalFlowSelected'
            },
            {
                name: 'selectedAccount'
            },
            {
                name: 'nameSurnameTitle'
            },
            {
                name: 'nameSurname'
            },
            {
                name: 'sectorText'
            },
            {
                name: 'occupationText'
            },
            {
                name: 'educationalBackgroundText'
            },
            {
                name: 'schoolList'
            },
            {
                name: 'school'
            },
            {
                name: 'educationTerm'
            },
            {
                name: 'schoolTypeId'
            },
            {
                name: 'isIntelligencePositive'
            },
            {
                name: 'isGuarantorAvailable'
            },
            {
                name: 'validStudentIdentityNo'
            },
            {
                name: 'guarantorStartDate'
            },
            {
                name: 'guarantorEndDate'
            },
            {
                defaultValue: [
                    
                ],
                name: 'paymentPlans'
            },
            {
                name: 'currentInstallmentCount'
            },
            {
                name: 'isSelfParent'
            },
            {
                name: 'protocolStartDate'
            },
            {
                name: 'protocolEndDate'
            },
            {
                name: 'studentIdentityNumber'
            },
            {
                name: 'studentNameSurname'
            },
            {
                name: 'studentNumber'
            },
            {
                name: 'giveLoanLimit'
            },
            {
                name: 'accountList'
            },
            {
                name: 'accountStatusResult'
            },
            {
                name: 'hasAvailableAccount'
            },
            {
                name: 'hasEmail'
            },
            {
                name: 'hasMobilePhone'
            },
            {
                name: 'isOccupationSuitable'
            },
            {
                name: 'isPaymentPerformanceSuitable'
            },
            {
                name: 'isPersonel'
            },
            {
                name: 'isSuitableForGuarantor'
            },
            {
                name: 'intelligenceResult'
            },
            {
                name: 'intelligenceStatus'
            },
            {
                name: 'studentFirstName'
            },
            {
                name: 'studentLastName'
            },
            {
                name: 'paymentDefinitionId'
            },
            {
                name: 'schoolPaymentsArray'
            },
            {
                name: 'accountDisplayValue'
            },
            {
                name: 'accountField'
            },
            {
                name: 'schoolDefinitionId'
            },
            {
                name: 'schoolType'
            },
            {
                name: 'studentIdentityNumberTextField'
            }
        ]
    },

    hasPaymentPlan: function() {
        var me = this,
            data = me.getData();

        if(data.paymentPlans.length > 0){
            return true;
        }

        return false;
    }

});