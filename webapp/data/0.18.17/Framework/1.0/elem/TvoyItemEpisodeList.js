var TvoyItemEpisodeList = Class.create({
    id: null, css: null, btnObj: null, rectObj: null, textObj: null, getObj: function () {
        return this.btnObj
    }, initialize: function (_id, _css) {
        this.id = _id;
        this.css = _css;
        this.btnObj = fw.cssBuilder.createDiv(_id + "_Button", this.css.styleItemCont.style);
        this.btnObj.show();
        this.rectObj = fw.cssBuilder.createRect(_id + "_ButtonBg", this.css.styleItemBgUnSelect.style);
        this.textLeftObj = fw.cssBuilder.createText(_id + "_ButtonLeftTxt", this.css.styleItemLeftTxtUnSelect.style);
        this.textRightObj = fw.cssBuilder.createText(_id +
            "_ButtonRightTxt", this.css.styleItemRightTxtUnSelect.style);
        this.textSchedObj = fw.cssBuilder.createText(_id + "_ButtonSchedTxt", this.css.styleItemSchedTxtUnSelect.style);
        this.btnObj.appendChild(this.rectObj);
        this.btnObj.appendChild(this.textLeftObj);
        this.btnObj.appendChild(this.textRightObj);
        this.btnObj.appendChild(this.textSchedObj);
        this.btnObj.obj = this;
        this.isSelect = false;
        this.appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app
    }, setDataObj: function (_index, _obj) {
        try {
            fw.log.info("TVoYItemEpisodeList : setDataObj : Setting episode element : ",
                _obj[_index]);
            this.textLeftObj.setTxt(_obj[_index].name);
            var descr = "";
            if (_obj.shortDescription != undefined)descr = _obj[_index].shortDescription;
            this.textRightObj.setTxt(descr)
        } catch (ex) {
            fw.log.error("TvoyItemList|setDataObj|" + ex)
        }
    }, setItem: function (_obj, _val1, _val2) {
        try {
            if (_obj == undefined || (_obj == null || _obj.blockId != undefined && (_obj.blockId != null && _obj.blockId != -1)))this.textLeftObj.setTxt(this.css.styleItemLeftTxtUnSelect.defaultTitle); else this.setDataFromObj(_obj)
        } catch (ex) {
            fw.log.error("TvoyItemList|setItem|" +
                ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            fw.log.info("TVoYItemEpisodeList : setDataFromObj : Setting episode element : ", _obj);
            var title = "";
            if (_obj.name != undefined)title = _obj.name; else if (_obj.title != undefined)title = _obj.title;
            this.textLeftObj.setTxt(title);
            var descr = "";
            if (_obj.shortDescription != undefined)descr = _obj.shortDescription;
            if (_obj.licenceBeginDate != undefined)this.textSchedObj.setTxt(fw.util.getFormattedDate(_obj.licenceBeginDate)); else {
                date = "";
                this.textSchedObj.setTxt("")
            }
            this.textRightObj.setTxt(descr)
        } catch (ex) {
            fw.log.error("TvoyItemList|setDataFromObj|" +
                ex)
        }
    }, setLeftTxt: function (_txt) {
        this.textLeftObj.setTxt(_txt)
    }, setSchedulationTxt: function (_txt) {
        this.textSchedObj.setTxt(_txt)
    }, setRightTxt: function (_txt) {
        this.textRightObj.setTxt(_txt)
    }, setX: function (_x) {
        this.btnObj.setX(_x)
    }, setY: function (_y) {
        this.btnObj.setY(_y)
    }, setW: function (_w) {
        this.btnObj.setW(_w);
        this.rectObj.setW(_w)
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.rectObj.setStyle(this.css.styleItemBgSelect.style);
        this.textLeftObj.setStyle(this.css.styleItemLeftTxtSelect.style);
        this.textRightObj.setStyle(this.css.styleItemRightTxtSelect.style);
        this.textSchedObj.setStyle(this.css.styleItemSchedTxtSelect.style);
        this.isSelect = true
    }, focusOff: function () {
        this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
        this.textLeftObj.setStyle(this.css.styleItemLeftTxtUnSelect.style);
        this.textRightObj.setStyle(this.css.styleItemRightTxtUnSelect.style);
        this.textSchedObj.setStyle(this.css.styleItemSchedTxtUnSelect.style);
        this.isSelect = false
    }, isSelect: function () {
        return this.isSelect
    }, focusOnShowTxt: function () {
        this.rectObj.setStyle(this.css.styleItemBgSelect.style);
        this.textLeftObj.show();
        this.textRightObj.show()
    }, focusOffHideTxt: function () {
        this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
        this.textLeftObj.hide();
        this.textRightObj.hide()
    }, selected: function () {
        if (this.css.styleItemBgSelected.style != null)this.rectObj.setStyle(this.css.styleItemBgSelected.style);
        if (this.css.styleItemTxtSelected.style != null) {
            this.textLeftObj.setStyle(this.css.styleItemLeftTxtSelected.style);
            this.textRightObj.setStyle(this.css.styleItemRightTxtSelected.style);
            this.textSchedObj.setStyle(this.css.styleItemSchedTxtSelected.style)
        }
    },
    changeLeftTextColor: function (_color) {
        this.textLeftObj.setFill(_color)
    }, changeRightTextColor: function (_color) {
        this.textRightObj.setFill(_color)
    }, getWidthTxt: function () {
        return $j("#" + this.id + "_ButtonLeftTxt").width()
    }, getHeightTxt: function () {
        return $j("#" + this.id + "_ButtonLeftTxt").height()
    }, hide: function () {
        this.btnObj.hide()
    }, show: function () {
        this.btnObj.show()
    }
});
