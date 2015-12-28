var HorizontalImageGrid = Class.create({
    getObj: function () {
        try {
            return this.contGrid
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, initialize: function (_id, _conf, _list, _callBackObj, _callBackFunction) {
        try {
            this.id = _id;
            this.conf = _conf;
            this.callBackObj = _callBackObj;
            this.callBackFunction = _callBackFunction;
            this.list = _list;
            this.imgList = new Array;
            this.numElem = this.conf.numVisibleImages <= this.list.length ? this.conf.numVisibleImages - 1 : this.list.length - 1;
            this.focusInListPosition = 0;
            this.focusInPagePosition =
                this.numElem;
            this.contGrid = fw.cssBuilder.createDiv(_id + "_ContHorizontalScroll", this.conf.style);
            this.contGrid.style.position = "relative";
            for (var i = this.numElem; i >= 0; i--) {
                var img = cssUtil.addElementRelativeInLineToDom(ImageCursorOtt, _id + "_HorizontalScrollImg_" + i, this.conf.item, this.contGrid);
                img.getObj().setFill("none");
                img.getObj().setFillAlpha(0);
                img.setImageCursorUrl(_list[i].iconURL);
                this.imgList.push(img)
            }
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, isNumItemsMoreThanShown: function () {
        try {
            return this.conf.numVisibleImages <
                this.list.length
        } catch (ex) {
            ex.errMethod = "isNumItemsMoreThanShown";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, focusOn: function (_isSelect) {
        try {
            if (_isSelect == undefined || _isSelect != undefined && !_isSelect)this.imgList[this.focusInPagePosition].focusOn();
            if (this.callBackFunction != null && this.callBackObj != null)this.callBackFunction.apply(this.callBackObj, new Array(0, this.focusInListPosition, this.imgList[this.focusInPagePosition], this.list[this.focusInListPosition], this.focusInPagePosition))
        } catch (ex) {
            ex.errMethod =
                "focusOn";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            this.imgList[this.focusInPagePosition].focusOff()
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, isCursorInFirstPosition: function () {
        try {
            if (this.focusInPagePosition == this.numElem && this.focusInListPosition == 0)return true;
            return false
        } catch (ex) {
            ex.errMethod = "isCursorInFirstPosition";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, moveCursorToRight: function () {
        try {
            if (this.focusInPagePosition > 0) {
                this.focusOff();
                this.focusInPagePosition--;
                this.focusInListPosition++;
                this.focusOn()
            } else if (this.focusInListPosition < this.list.length - 1) {
                this.focusInListPosition++;
                for (var i = 0; i <= this.numElem; i++)this.imgList[i].setImageCursorUrl(this.list[this.focusInListPosition - i].iconURL);
                this.focusOn(false)
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToRight";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }, moveCursorToLeft: function () {
        try {
            if (this.focusInPagePosition < this.numElem) {
                this.focusOff();
                this.focusInPagePosition++;
                this.focusInListPosition--;
                this.focusOn()
            } else if (this.focusInListPosition > 0) {
                this.focusInListPosition--;
                for (var i = this.numElem; i >= 0; i--)this.imgList[i].setImageCursorUrl(this.list[this.focusInListPosition + (this.numElem - i)].iconURL);
                this.focusOn(false)
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToLeft";
            ex.errClass = "HorizontalGrid";
            fw.err(ex)
        }
    }
});
