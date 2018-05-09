/*
 * File: app/view/field/FilteredDropDownSchoolField.js
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

Ext.define('VeriBranch.view.field.FilteredDropDownSchoolField', {
    extend: 'Ext.Container',
    alias: 'widget.vpfiltereddropdownschoolfield',

    requires: [
        'VeriBranch.view.field.TextField',
        'VeriBranch.view.control.List',
        'Ext.field.Text',
        'Ext.Panel',
        'Ext.dataview.List'
    ],

    config: {
        entityKey: '',
        groupCode: 'School',
        mainGroupCode: ' ',
        value: ' ',
        listItemAlias: ' ',
        selectedItem: '',
        displayField: '',
        valueField: '',
        name: '',
        required: false,
        isWorking: false,
        detail2Filter: ' ',
        sector: ' ',
        cls: 'vp-customerSelect',
        layout: 'vbox',
        items: [
            {
                xtype: 'vptextfield',
                cls: [
                    'vpx-searchField',
                    'vpx-textField'
                ],
                itemId: 'searchText',
                inputCls: 'vp-customerselect-textfield-input',
                labelCls: 'vp-general-textfield',
                name: 'searchText'
            },
            {
                xtype: 'panel',
                cls: 'vpx-searchResultContainer',
                itemId: 'resultPanel',
                zIndex: 99,
                hideOnMaskTap: true,
                modal: true,
                items: [
                    {
                        xtype: 'vplist',
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        itemId: 'resultList',
                        minHeight: 180,
                        itemHeight: 40,
                        useSimpleItems: false
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onTextfieldClearicontap',
                event: 'clearicontap',
                delegate: '#searchText'
            },
            {
                fn: 'onTextfieldFocus',
                event: 'focus',
                delegate: '#searchText'
            },
            {
                fn: 'onTextfieldKeyup',
                buffer: 500,
                event: 'keyup',
                delegate: '#searchText'
            },
            {
                fn: 'onSelectDestroy',
                event: 'destroy'
            }
        ]
    },

    onTextfieldClearicontap: function(textfield, e, eOpts) {
        this.setValue(null);
    },

    onTextfieldFocus: function(textfield, e, eOpts) {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.focus');

        var me = this,
            value = me.getValue(),
            resultPanel = me.getResultPanel(),
            resultList = resultPanel.down('#resultList'),
            groupCode = me.getGroupCode();

        /*if(value && Ext.isObject(value)){
            return;
        }*/

        VeriBranch.Utilities.logInfo('field.FilteredDropDown.focus groupcode: ' + me.getGroupCode());

        var resultArray = [],
            store = Ext.data.StoreManager.get(groupCode);

        if(!store){
            me.getDropDownData()
            .then(
                function(result){
                    var items = result.response.result.schoolGroups;
                    items.sort(function(a, b){
                        var nameA=a.toLowerCase(), nameB=b.toLowerCase();
                        return nameA.localeCompare(nameB);
                    });
                    if(items && items.length && items.length > 0 ){
                        resultList.setHidden(false);
                        var parameterList = items;
                        parameterList = parameterList.map(function(obj){return {description:obj};});
                        VeriBranch.Data.createStoreWithName(me.getGroupCode(), parameterList, false);
                        me.setDropDownData(parameterList, resultList, resultPanel);
                    }
                }
            );
        } else{
            me.setDropDownStore(store, resultList, resultPanel);
        }

    },

    onTextfieldKeyup: function(textfield, e, eOpts) {
        //<debug>
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.onTextFieldKeyUp');
        //</debug>

        var me = this,
            dataQuery = me.getSearchText().getValue(),
            resultPanel = me.getResultPanel(),
            oldValue = me.getValue(),
            resultList = resultPanel.down('#resultList');
        /*
        if(oldValue !== dataQuery){
            me.getSearchText().setValue("");
            me.setValue(null);
            return;
        }
        */
        if(dataQuery.length < 2) {
            return;
        }

        var resultArray = [],
            store = Ext.data.StoreManager.get(me.getGroupCode());

        if(!store){
            VeriBranch.Utilities.logInfo('field.FilteredDropDown.onTextFieldKeyUp store is not defined for that groupcode: ' + me.getGroupCode());
            me.getDropDownData()
            .then(
                function(result){
                    var items = result.response.result.schoolGroups;
                    if(items && items.length && items.length > 0 ){
                        resultList.setHidden(false);
                        var parameterList = items;
                        parameterList = parameterList.map(function(obj){return {description:obj};});

                        VeriBranch.Data.createStoreWithName(me.getGroupCode(), parameterList, false);
                        resultArray = Ext.Array.filter(parameterList, function(item){
                            return item.trToLower().indexOf(dataQuery.trToLower()) > -1;
                        });
                        if(resultArray && resultArray.length === 0){
                            resultPanel.hide();
                            me.getSearchText().setValue("");
                            me.setValue(null);
                        }else{
                            VeriBranch.Utilities.logInfo('field.FilteredDropDown.onTextFieldKeyUp setDropDownData 1 - Bug 578');
                            me.setDropDownData(resultArray, resultList, resultPanel);
                        }
                    }
                }, function(result){
                    VeriBranch.Utilities.logWarning('field.FilteredDropDown.onTextFieldKeyUp parameter list transaction has failed. GroupCode: ' + me.getGroupCode());
                }
            );
        }else{
            if(store.getData()){
                VeriBranch.Utilities.logInfo('field.FilteredDropDown.onTextFieldKeyUp store is defined for that groupcode: ' + me.getGroupCode());
                var items = store.getData().all;

                for(var i=0; i<items.length; i++){
                    if(items[i].getData().description.trToLower().indexOf(dataQuery.trToLower()) > -1){
                        resultArray.push(items[i].getData());
                    }
                }

            }
            VeriBranch.Utilities.logInfo('field.FilteredDropDown.onTextFieldKeyUp resultArray.length: ' + resultArray.length);
            if(resultArray.length > 0){
                resultList.setHidden(false);
                VeriBranch.Utilities.logInfo('field.FilteredDropDown.onTextFieldKeyUp setDropDownData 2 - Bug 578');
                me.setDropDownData(resultArray, resultList, resultPanel);
            }else{
                resultPanel.hide();
                me.getSearchText().setValue("");
                me.setValue(null);
            }
        }
    },

    onSelectDestroy: function(eOpts) {
        //<debug>
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.onCustomerSelectDestroy');
        //</debug>

        var me = this,
            resultPanel = me.getResultPanel();

        if(resultPanel){
            resultPanel.destroy();
        }
    },

    setSelectedData: function(description) {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.setSelectedData');

        var me = this;

        var searchText = me.getSearchText();
        searchText.setValue(description);
    },

    initialize: function() {
        var me = this,
            searchText = me.down("#searchText");
        me.callParent();

        var resultPanel = me.down('#resultPanel');
        var resultList = resultPanel.down('#resultList');
        var itemid = me.getItemId();

        resultPanel.setItemId("#" + itemid + "_resultPanel");
        searchText._cls.push("searchText_" + itemid);
        resultList.addListener('select', me.onResultListSelect, me);
        resultList.addListener('refresh', me.onListRefresh, me);
        // Hack: (Erdem) there is a problem in windows store version about alignment. Add this beforehand to fix it.
        resultPanel.showBy(searchText);
        resultPanel.hide();

        resultList._defaultType = resultList.config.defaultType = me.getListItemAlias();

        // Add initial display & value fields if it's not set
        /*
        if(!me.getDisplayField())
            me.setDisplayField("description");

        if(!me.getValueField())
            me.setValueField("code");
        */
        me.setRequiredText(me.getRequired());

        resultPanel.on('hide', function(){
            if(!me.getSelectedItem() && searchText){
                searchText.setValue("");
            }
        });
    },

    onResultListSelect: function(dataview, record, eOpts) {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.onResultListSelect');

        var me = this;

        record.data = record.data;
        me.setSelectedData(record.data.description);
        me.setSelectedItem(record.data.description);
        me.fireEvent("change", me, record.data.value, "");
        var resultPanel = me.getResultPanel();
        //setTimeout(function(){
            resultPanel.hide();
        //}, 3000);
    },

    getDropDownData: function() {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.getDropDownData');

        var me = this;

        return VeriBranch.Integration.call({
            response:
            {
                transactionName: VeriBranch.Config.getApiServices().GetSchoolGroupInquiry,
                apiUrl: VeriBranch.Config.getFullApiUrl(VeriBranch.Config.getApiServices().GetSchoolGroupInquiry),
                params: VeriBranch.ApiHelper.getSchoolGroupInquiryRequest()
            }
        },true);

    },

    setDropDownData: function(itemList, resultList, resultPanel) {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.setDropDownData');

        var me = this,
            searchText = me.getSearchText();

        searchText.removeErrorLabel();

        resultPanel.setWidth(me.element.getWidth());

        VeriBranch.Utilities.logInfo('field.FilteredDropDown.setDropDownData groupCode: ' + me.getGroupCode());

        if(itemList.length === 0 && resultPanel) {
            VeriBranch.Utilities.logInfo('field.FilteredDropDown.setDropDownData itemList or resultPanel undefined.');
            resultList.setHidden(true);
            searchText.addError({_message: resources.getValue('NoRecordFound')});
        }
        else{
            VeriBranch.Utilities.logInfo('field.FilteredDropDown.setDropDownData setStore itemList.length: ' + itemList.length);

            resultList.setStore(VeriBranch.Data.createStore(itemList));
            resultPanel.showBy(me.down("#searchText"));
        }

        resultList.deselectAll();
        resultList.refresh();
    },

    setDropDownStore: function(store, resultList, resultPanel) {
        VeriBranch.Utilities.logDebug('field.FilteredDropDown.setDropDownStore');

        var me = this,
            searchText = me.getSearchText();

        searchText.removeErrorLabel();
        resultPanel.setWidth(me.element.getWidth());

        VeriBranch.Utilities.logInfo('field.FilteredDropDown.setDropDownStore groupcode: ' + me.getGroupCode());

        if(!store && resultPanel) {
            resultList.setHidden(true);
            searchText.addError({_message: resources.getValue('NoRecordFound')});
        }
        else{
            resultList.setStore(store);
            resultPanel.showBy(me.down("#searchText"));
        }

        resultList.deselectAll();
        resultList.refresh();
    },

    getValue: function() {
        return this.getSelectedItem();
    },

    addError: function(error) {
        if (this.getHidden() === true) {
            return;
        }

        //remove old error label
        this.removeErrorLabel();

        this.addCls("vp-validErrorField");

        var errorLabel = Ext.create('VeriBranch.view.control.ValidationErrorLabel');
        errorLabel.updateData(error);
        //errorLabel.element.insertAfter(this.element);

        //Make an appropriate implementation later.
        this.element.getFirstChild().getFirstChild().getFirstChild().appendChild(errorLabel.element);

        this.element.on('tap', function(e, t, eOpts) {
            this.removeErrorLabel();
        }, this);
    },

    setValue: function(value) {
        var me = this;

        VeriBranch.Utilities.logInfo('field.FilteredDropDown.setValue value: ' + value);
        if(value && value !== " " && typeof(value) === "object"){

            //value.value = value[me.getValueField()];
            me.setSelectedItem(value);
            me.setSelectedData(value);
        }
        else if(value && value !== " " && (typeof(value) === "string" || typeof(value) === "number"))
        {
            var store = Ext.data.StoreManager.get(me.getGroupCode());

            if(!store){
                me.getDropDownData()
                .then(function(result){
                    var items = result.response.result.schoolGroups;

                    if(items && items.length && items.length > 0){
                        var parameterList = items;
                         parameterList = parameterList.map(function(obj){return {description:obj};});
                        VeriBranch.Data.createStoreWithName(me.getGroupCode(), parameterList, false);

                        var resultArray = [];

                        resultArray = Ext.Array.filter(parameterList, function(item){
                            if(typeof(value) === "string") {
                                return item.trToLower().indexOf(value.trToLower()) > -1;
                            }
                            else if(typeof(value) === "number"){
                                return item[me.getValueField()] == value;
                            }
                        });

                        if(resultArray && resultArray.length > 0){

                            var selectedValue = resultArray[0];
                            //selectedValue.value = selectedValue[me.getValueField()];
                            me.setSelectedItem(selectedValue);
                            me.setSelectedData(selectedValue);
                        }
                    }

                }, function(result){
                    VeriBranch.Utilities.logWarning('field.FilteredDropDown.setValue parameter list transaction has failed. GroupCode: ' + me.getGroupCode());
                });
            }
            else{

                var resultArray = [];

                if(store.getData()){
                    var items = store.getData().all;

                    for(var i=0; i<items.length; i++){
                        if(typeof(value) === "string" && items[i].getData().trToLower().indexOf(value.trToLower()) > -1){
                            resultArray.push(items[i].getData());
                        }
                        else if(typeof(value) === "number" && items[i].getData()[me.getValueField()] == value){
                            resultArray.push(items[i].getData());
                        }
                    }
                }
                if(resultArray && resultArray.length > 0){
                    var selectedValue = resultArray[0];
                    //selectedValue.value = selectedValue[me.getValueField()];
                    me.setSelectedItem(selectedValue);
                    me.setSelectedData(selectedValue);
                }
            }
        }else {
            me.setSelectedItem(null);
            if(me.getSearchText()){
                me.getSearchText().setValue(null);
            }
        }
    },

    getResultPanel: function() {
        var panelList = Ext.ComponentQuery.query("panel");
        var itemId = "#" + this.getItemId() + "_resultPanel";

        var panel = Ext.Array.filter(panelList, function(item){
            if(item.getItemId() === itemId) {
                return true;
            }
            else {
                return false;
            }
        });

        if(panel){
            return panel[0];
        } else{
            VeriBranch.Utilities.logWarning('field.FilteredDropDown.getResultPanel panel is undefined.');
            return null;
        }
    },

    getSearchText: function() {
        var textfieldList = Ext.ComponentQuery.query("vptextfield");
        var itemId = this.getItemId();

        var cls = "searchText_" + itemId;

        var textfield = Ext.Array.filter(textfieldList, function(item){
            if(item.getCls().indexOf(cls) !== -1) {
                return true;
            }
            else {
                return false;
            }
        });

        return textfield[0];
    },

    setRequiredText: function(value) {
        var me = this,
            searchText = me.getSearchText();

        if(searchText)
        {
            searchText.setRequired(value);
        }
    },

    setDisabled: function(value, clearSearchText) {
        var me = this,
            searchText = me.getSearchText();

        searchText.setDisabled(value);
        /*
        if(clearSearchText){
            searchText.setValue(null);
        }
        */
    }

});