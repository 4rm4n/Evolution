/*
 * File: app/view/onlineSchoolPaymentCollection/Start4.js
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

Ext.define('VeriBranch.view.onlineSchoolPaymentCollection.Start4', {
    extend: 'Ext.Container',

    mixins: {
        veribranchView: 'VeriBranch.ViewMixin'
    },
    requires: [
        'VeriBranch.view.control.Header',
        'VeriBranch.view.control.StepControlContainer',
        'VeriBranch.view.control.DocumentUploadContainer',
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
                validateDocuments: true,
                itemId: 'stepControl'
            },
            {
                xtype: 'container',
                flex: 1,
                cls: 'vpx-stepContentContainer',
                itemId: 'contentContainer',
                items: [
                    {
                        xtype: 'vpformpanel',
                        cls: 'vp-documents',
                        itemId: 'formPanel',
                        scrollable: false,
                        items: [
                            {
                                xtype: 'vpdocumentupload',
                                pageSize: 6,
                                itemId: 'documentUploadContainer'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    updateDocumentUploadContainerData: function() {
        VeriBranch.Utilities.logDebug('onlineSchoolPaymentCollection.Start4.updateDocumentUploadContainerData');

        var me = this,
            flowModel = me.getFlowModel(),
            documentUploadContainer = me.down('#documentUploadContainer');

        documentUploadContainer.handleDocumentListCarousel(flowModel.data.documentList);
    }

});