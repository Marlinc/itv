var ModulePerZender = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _obj, _scenObj, _objCallBack, _objCallBackFunction) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            this.parent = _parent;
            this.obj = _obj;
            this.isClean = true;
            this.focusOn = false;
            this.arrowDown = new Image("_arrowDown", this.conf.arrowDown);
            this.objCallBack = _objCallBack;
            this.objCallBackFunction = _objCallBackFunction;
            this.getModObj().appendChild(this.arrowDown.getObj());
            this.arrowUp = new Image("_arrowUp", this.conf.arrowUp);
            this.getModObj().appendChild(this.arrowUp.getObj());
            this.arrowDown.hide();
            this.arrowUp.hide();
            this.loadList()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModulePerZender";
            fw.err(ex)
        }
    }, getGrid: function () {
        return this.catGridContents
    }, fullClean: function () {
        try {
            if (this.catGridContents != undefined && this.catGridContents != null) {
                this.catGridContents.clean();
                this.getModObj().removeChild(this.catGridContents.getObj());
                this.catGridContents = null;
                this.isClean = true;
                this.focusOn = false
            }
        } catch (ex) {
            ex.errMethod =
                "fullClean";
            ex.errClass = "ModulePerZender";
            fw.err(ex)
        }
    }, clean: function () {
        try {
            if (this.catGridContents != undefined && this.catGridContents != null) {
                this.getModObj().removeChild(this.catGridContents.getObj());
                this.catGridContents = null;
                this.isClean = true;
                this.focusOn = false
            }
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ModulePerZender";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj != undefined && (this.obj != null && this.obj.length > 0)) {
                if (this.catGridContents == null) {
                    this.catGridContents = new GridPageFrame("tvoy_CatGridContents",
                        this.conf.grid, ImageCursor, this.obj, this, this.catGridContentsCallBack);
                    this.getModObj().appendChild(this.catGridContents.getObj())
                } else this.catGridContents.reinit(this.obj);
                if (this.obj.length > this.conf.grid.numColumnInRow * this.conf.grid.numVisibleRows) {
                    this.arrowDown.show();
                    this.arrowUp.show()
                } else {
                    this.arrowDown.hide();
                    this.arrowUp.hide()
                }
                this.isClean = false
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModulePerZender";
            fw.err(ex)
        }
    }, catGridContentsCallBack: function (_IndexPage, _TotalPosition, _domElement,
                                          _dataElement, _inPagePosition) {
        try {
            this.dataCurrentItem = _dataElement;
            this.inPagePosition = _inPagePosition;
            var _this = this;
            if (_this.objCallBack != undefined && (_this.objCallBack != null && (_this.objCallBackFunction != undefined && _this.objCallBackFunction != null))) {
                _dataElement.isLocked = _this.allLock;
                _this.objCallBackFunction.apply(_this.objCallBack, new Array(_domElement, _dataElement))
            }
        } catch (ex) {
            ex.errMethod = "gridCallBack";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, setMenuList: function (_obj) {
        if (!this.isClean && this.catGridContents !=
            undefined)this.clean();
        this.obj = _obj;
        this.loadList()
    }, gridCallBack: function (_IndexPage, _TotalPosition, _domElement, _dataElement) {
        this.dataCurrentItem = _dataElement
    }, moveFocusToDown: function () {
        this.catGridContents.moveCursorToDown()
    }, moveFocusToUp: function () {
        this.catGridContents.moveCursorToUp()
    }, moveFocusToRight: function () {
        this.catGridContents.moveCursorToRight()
    }, moveFocusToLeft: function () {
        this.catGridContents.moveCursorToLeft()
    }, isCursorInFirstPosition: function () {
        return this.catGridContents.isCursorInFirstPosition()
    },
    focusToGrid: function () {
        this.focusOn = true;
        this.catGridContents.focusOn()
    }, focusOff: function () {
        try {
            this.focusOn = false;
            this.catGridContents.focusOff()
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getItem: function () {
        return this.catGridContents.getSelectedItem()
    }, setFocusOnElementByName: function (_labelName, _labelValue) {
        try {
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue) {
                pos = i;
                fw.log.info("ModulePerZender - setFocusOnElementByName- Found element at position : " +
                    i)
            }
            this.catGridContents.selectElementByPosition(pos);
            this.focusOn = true
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getCurrentSelectedElement: function () {
        try {
            var obj = new Object;
            obj = this.catGridContents.getSelectedItem();
            return obj
        } catch (ex) {
            ex.errMethod = "getCurrentSelectItem";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }
});
