var ModuleCatalogList = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _obj, _objCallBack, _objCallBackFunction) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            this.obj = _obj;
            this.parent = _parent;
            this.timeOut = null;
            this.timerUpdate = null;
            this.timerUpdateRating = null;
            this.itemPosition = new Text("CatListPosTxt", this.conf.itemPosition);
            this.getModObj().appendChild(this.itemPosition.getObj());
            this.itemPosition.setTxt("");
            this.getModObj().appendChild(this.itemPosition.getObj());
            this.arrowDown = new Image("CatListDownImage", this.conf.arrowDown);
            this.arrowDown.setUrl("");
            this.getModObj().appendChild(this.arrowDown.getObj());
            this.arrowUp = new Image("CatListUpImage", this.conf.arrowUp);
            this.arrowUp.setUrl("");
            this.getModObj().appendChild(this.arrowUp.getObj());
            this.cover = new Image("CatListCoverImg", this.conf.coverImage);
            this.getModObj().appendChild(this.cover.getObj());
            this.cover.setUrl("");
            this.arrowDown.getObj().hide();
            this.arrowUp.getObj().hide();
            this.objCallBack = _objCallBack;
            this.objCallBackFunction = _objCallBackFunction;
            this.itemPosition.hide();
            this.isOttContent = false;
            this.isFocusOn = false;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, getIsFocusOn: function () {
        return this.isFocusOn
    }, setCallBackFunction: function (_objCallBack, _objCallBackFunction) {
    }, setLoadingMessage: function () {
        this.itemPosition.show();
        this.itemPosition.setTxt(eval("this.parent.appObj.messages." + this.conf.loadingMessage))
    }, verifyIsLocked: function (_movie) {
        try {
            if (this.allLock)return true;
            else return this.parent.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe)
        } catch (ex) {
            ex.errMethod = "verifyIsLocked";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, getNumElement: function () {
        try {
            return this.obj.length
        } catch (ex) {
            ex.errMethod = "getNumElement";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj != undefined && (this.obj != null && this.obj.length > 0)) {
                var conf = this.conf.grid;
                var elem = VodCatItemList;
                var gridType = GridPagePlus;
                if (this.isOttContent) {
                    conf = this.conf.gridOtt;
                    elem = ImageCursor;
                    gridType = GridPageFrame;
                    this.cover.hide();
                    this.arrowDown.getObj().hide();
                    this.arrowUp.getObj().hide()
                } else {
                    this.cover.show();
                    if (this.obj.length > this.conf.grid.numVisibleRows) {
                        this.arrowDown.getObj().show();
                        this.arrowUp.getObj().show()
                    } else {
                        this.arrowDown.getObj().hide();
                        this.arrowUp.getObj().hide()
                    }
                    this.itemPosition.setTxt("1 / " + this.obj.length + " video's");
                    var url = this.obj[0].jpeg;
                    if (this.verifyIsLocked(this.obj[0]))url = this.conf.coverImage.lockedUrl; else if (url == "")url = this.conf.coverImage.defaultImgUrl;
                    this.cover.setUrl(url)
                }
                this.gridCatalogList = new gridType("CatListContents", conf, elem, this.obj, this, this.gridCatalogListCallBack);
                this.gridCatalogList.visibleIndexPage = 0;
                this.getModObj().appendChild(this.gridCatalogList.getObj());
                this.isClean = false
            } else {
                this.itemPosition.setTxt(eval("this.parent.appObj.messages." + this.conf.noItemMessage));
                this.cover.hide()
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, setMenuList: function (_obj, _allLocked, _isCoverMode) {
        try {
            this.itemPosition.show();
            this.obj = _obj;
            this.allLock = _allLocked;
            if (_isCoverMode != undefined && _isCoverMode) {
                this.isOttContent = true;
                this.cover.hide();
                this.isClean = false;
                this.itemPosition.setTxt("Er zijn " + this.obj.length + " films in deze categorie")
            } else {
                this.cover.show();
                this.isOttContent = false
            }
            if (!this.isClean && this.gridCatalogList != undefined)this.clean();
            var _this = this;
            _this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, getList: function () {
        return this.gridCatalogList
    }, clean: function () {
        try {
            var _this =
                this;
            this.cover.hide();
            if (_this.gridCatalogList != undefined && _this.gridCatalogList != null) {
                if (!_this.isOttContent)_this.itemPosition.setTxt(eval("_this.parent.appObj.messages." + _this.conf.loadingMessage)); else _this.itemPosition.setTxt("");
                _this.getModObj().removeChild(_this.gridCatalogList.getObj());
                _this.gridCatalogList = null;
                _this.isClean = true;
                _this.arrowDown.getObj().hide();
                _this.arrowUp.getObj().hide()
            }
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, changePageDown: function () {
        this.gridCatalogList.goNextPage()
    },
    changePageUp: function () {
        this.gridCatalogList.goPreviusPage()
    }, clearRatingTimeout: function () {
        if (this.timerUpdateRating != null) {
            clearTimeout(this.timerUpdateRating);
            this.timerUpdateRating = null
        }
    }, updateUi: function (_totalPosition, _domElement, _dataElement) {
        try {
            if (!this.isOttContent) {
                var _url = this.conf.coverImage.defaultImgUrl;
                if (_dataElement.blockId != -1 && _dataElement.blockId != undefined)_url = this.conf.coverImage.defaultImgUrl; else if (this.verifyIsLocked(_dataElement))_url = this.conf.coverImage.lockedUrl;
                else if (this.obj[_totalPosition].jpeg != undefined && this.obj[_totalPosition].jpeg != "")_url = this.obj[_totalPosition].jpeg;
                this.cover.setUrl(_url)
            }
            if (this.objCallBack != undefined && (this.objCallBack != null && (this.objCallBackFunction != undefined && this.objCallBackFunction != null)))this.objCallBackFunction.apply(this.objCallBack, new Array(_domElement, _dataElement))
        } catch (ex) {
            ex.errMethod = "updateUi";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, gridCatalogListCallBack: function (_IndexPage, _totalPosition, _domElement,
                                          _dataElement, _inPagePosition) {
        try {
            var _this = this;
            this.dataElement = _dataElement;
            if (this.parent.appObj != undefined)this.parent.appObj.positionInCategory = _totalPosition;
            if (this.timerUpdate != null) {
                clearTimeout(this.timerUpdate);
                this.timerUpdate = null
            }
            if (!this.isOttContent)this.itemPosition.setTxt(_totalPosition + 1 + " / " + this.obj.length + " video's");
            _dataElement.isLocked = this.allLock;
            _dataElement.isOttContent = this.isOttContent;
            this.timerUpdate = setTimeout(function () {
                _this.updateUi(_totalPosition, _domElement,
                    _dataElement)
            }, 800)
        } catch (ex) {
            ex.errMethod = "gridCatalogListCallBack";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, setFocusOnElementByName: function (_labelName, _labelValue, _isSelect, _forceUpdate) {
        try {
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.gridCatalogList.selectElementByPosition(pos, _isSelect, _forceUpdate)
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, setElementByPosition: function (pos, _isSelect,
                                       _forceUpdate) {
        try {
            if (pos <= this.obj.length - 1)this.gridCatalogList.selectElementByPosition(pos, _isSelect, _forceUpdate); else this.focusToGrid()
        } catch (ex) {
            ex.errMethod = "setElementByPosition";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, getSelectItem: function () {
        return this.dataElement
    }, getSelectItemOld: function () {
        var obj = new Object;
        if (this.isFocusOnTopButton)obj.cont = "topElement"; else obj.cont = this.gridCatalogList.getSelectedItem().dataElement;
        return obj
    }, moveFocusToDown: function () {
        this.gridCatalogList.moveCursorToDown()
    },
    moveFocusToUp: function () {
        this.gridCatalogList.moveCursorToUp()
    }, moveFocusToRight: function () {
        this.gridCatalogList.moveCursorToRight()
    }, moveFocusToLeft: function () {
        this.gridCatalogList.moveCursorToLeft()
    }, isCursorInFirstPosition: function () {
        return this.gridCatalogList.isCursorInFirstPosition()
    }, focusToGrid: function () {
        try {
            if (this.gridCatalogList != null) {
                this.gridCatalogList.focusOn();
                this.isFocusOn = true
            }
        } catch (ex) {
            this.isFocusOn = false;
            ex.errMethod = "focusToGrid";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    },
    focusOff: function () {
        try {
            if (this.gridCatalogList != null) {
                this.gridCatalogList.focusOff();
                this.isFocusOn = false
            }
        } catch (ex) {
            this.isFocusOn = true;
            ex.errMethod = "focusToGrid";
            ex.errClass = "ModuleCatalogList";
            fw.err(ex)
        }
    }, getGrid: function () {
        return this.gridCatalogList
    }
});
