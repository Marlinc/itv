var ModuleCatalogGrid = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _obj) {
        $super(_parent, _prop);
        this.prop = _prop;
        this.conf = _modConf;
        this.parent = _parent;
        this.obj = _obj;
        this.isClean = true;
        this.timerUpdate = null;
        this.catGridPosTxt = cssUtil.addElementToDom(Text, "CatGridPosTxt", this.conf.catGridPosTxt, this.getModObj());
        this.catGridPosTxt.hide();
        this.catGridContents = null;
        this.isFocusOn = false;
        this.loadList()
    }, getIsFocusOn: function () {
        return this.isFocusOn
    }, setMenuList: function (_obj, _isAllLocked) {
        try {
            this.obj =
                _obj;
            this.allLocked = _isAllLocked;
            if (!this.isClean && this.catGridContents != undefined)this.clean();
            this.catGridPosTxt.show();
            this.setLoadingMessage();
            this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, setElementByPosition: function (pos, _isSelect) {
        this.catGridContents.selectElementByPosition(pos, _isSelect)
    }, setLoadingMessage: function () {
        this.catGridPosTxt.setTxt(".. / ..")
    }, setFocusOnElementByName: function (_labelName, _labelValue, _isSelect) {
        try {
            var pos = -1;
            for (var i =
                0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.catGridContents.selectElementByPosition(pos, _isSelect)
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, clean: function (_fullClean) {
        try {
            if (this.catGridContents != undefined && this.catGridContents != null) {
                this.catGridContents.clean();
                if (_fullClean) {
                    this.getModObj().removeChild(this.catGridContents.getObj());
                    this.catGridContents = null
                }
                this.isClean = true;
                this.catGridPosTxt.setTxt("")
            }
        } catch (ex) {
            ex.errMethod =
                "clean";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, getList: function () {
        return this.catGridContents
    }, getNumElement: function () {
        try {
            return this.obj.length
        } catch (ex) {
            ex.errMethod = "getNumElement";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj != undefined && (this.obj != null && this.obj.length > 0)) {
                if (this.catGridContents == null) {
                    this.catGridContents = new GridPageFrame("CatGridContents", this.conf.grid, ImageCoverText, this.obj, this, this.gridCallBack);
                    this.getModObj().appendChild(this.catGridContents.getObj())
                } else this.catGridContents.reinit(this.obj);
                this.catGridPosTxt.setTxt("1 / " + this.catGridContents.getNumPage());
                this.isClean = false
            } else {
                this.clean(true);
                this.catGridPosTxt.setTxt("0 / 0")
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, gridCallBack: function (_numPage, _totalPosition, _domElement, _dataElement) {
        try {
            this.dataElement = _dataElement;
            var _this = this;
            if (this.timerUpdate != null) {
                clearTimeout(this.timerUpdate);
                this.timerUpdate = null
            }
            this.timerUpdate = setTimeout(function () {
                _this.catGridPosTxt.setTxt(_numPage + 1 +
                    " / " + _this.catGridContents.getNumPage());
                if (_domElement.isSet != undefined && _domElement.isSet == false)if (_dataElement.blockId == -1) {
                    fw.log.debug("UPDATE GRID");
                    _this.catGridContents.updateGrid(_this.catGridContents, false)
                }
            }, 900);
            if (this.parent.appObj != undefined)this.parent.appObj.positionInCategory = _totalPosition
        } catch (ex) {
            ex.errMethod = "gridCallBack";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, getSelectItem: function () {
        return this.dataElement
    }, changePageDown: function () {
        try {
            this.catGridContents.goNextPage()
        } catch (ex) {
            ex.errMethod =
                "changePageDown";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, changePageUp: function () {
        try {
            this.catGridContents.goPreviusPage()
        } catch (ex) {
            ex.errMethod = "changePageUp";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, moveFocusToDown: function () {
        try {
            this.catGridContents.moveCursorToDown()
        } catch (ex) {
            ex.errMethod = "moveFocusToDown";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, moveFocusToUp: function () {
        try {
            this.catGridContents.moveCursorToUp()
        } catch (ex) {
            ex.errMethod = "moveFocusToUp";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, moveFocusToRight: function () {
        this.catGridContents.moveCursorToRight()
    }, moveFocusToLeft: function () {
        this.catGridContents.moveCursorToLeft()
    }, isCursorInFirstPosition: function () {
        return this.catGridContents.isCursorInFirstPosition()
    }, focusToGrid: function () {
        try {
            if (this.catGridContents != null) {
                this.catGridContents.focusOn();
                this.isFocusOn = true
            }
        } catch (ex) {
            this.isFocusOn = false;
            ex.errMethod = "focusToGrid";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (this.catGridContents !=
                null) {
                this.catGridContents.focusOff();
                this.isFocusOn = false
            }
        } catch (ex) {
            this.isFocusOn = false;
            ex.errMethod = "focusOff";
            ex.errClass = "ModuleCatalogGrid";
            fw.err(ex)
        }
    }
});
