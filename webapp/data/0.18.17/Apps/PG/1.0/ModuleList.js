var ModuleList = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _obj, _baseElement, _objCallBack, _objCallBackFunction) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.parent = _parent;
            this.conf = _modConf;
            this.obj = _obj;
            this.timeOut = null;
            this.baseElement = _baseElement;
            this.isClean = true;
            this.indexPage = -1;
            this.isLeafElement = false;
            this.objCallBack = _objCallBack;
            this.objCallBackFunction = _objCallBackFunction
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, setMenuList: function (_obj,
                              _sortType, _isLeafElement) {
        try {
            if (!this.isClean && this.gridTVoY != undefined)this.clean();
            this.isLeafElement = _isLeafElement;
            this.obj = _obj;
            this.sortType = _sortType;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getMenuList: function () {
        try {
            return this.obj
        } catch (ex) {
            ex.errMethod = "getMenuList";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj.length > 0) {
                this.gridTVoY = new GridPagePlus(this.prop.id + "_CatalogGrid_List", this.conf.grid, this.baseElement,
                    this.obj, this, this.gridProgramsCallBack, true);
                this.getModObj().appendChild(this.gridTVoY.getObj());
                this.arrowDown = new Image(this.prop.id + "_arrowDown", this.conf.arrowDown);
                this.arrowDown.setUrl(fw.conf.CLEAR_IMAGE);
                this.getModObj().appendChild(this.arrowDown.getObj());
                if (this.obj.length > this.conf.grid.numVisibleRows)this.arrowDown.getObj().show(); else this.arrowDown.getObj().hide();
                this.arrowUp = new Image(this.prop.id + "_arrowUp", this.conf.arrowUp);
                this.arrowUp.setUrl(fw.conf.CLEAR_IMAGE);
                this.getModObj().appendChild(this.arrowUp.getObj());
                if (this.obj.length > this.conf.grid.numVisibleRows)this.arrowUp.getObj().show(); else this.arrowUp.getObj().hide();
                if (this.obj.length == 0) {
                    this.arrowDown.getObj().hide();
                    this.arrowUp.getObj().hide()
                }
                this.isClean = false;
                this.indexPage = 0;
                this.updateInfoPg(this.gridTVoY)
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, clean: function () {
        try {
            if (this.gridTVoY != undefined && this.gridTVoY != null) {
                fw.log.info("this.gridTVoY : clean : " + this.prop.id);
                this.getModObj().removeChild(this.gridTVoY.getObj());
                this.gridTVoY = null;
                this.isClean = true;
                this.arrowDown.getObj().hide();
                this.arrowUp.getObj().hide()
            }
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getItem: function () {
        try {
            return this.gridTVoY.getSelectedItem()
        } catch (ex) {
            ex.errMethod = "getItem";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getGrid: function () {
        try {
            return this.gridTVoY
        } catch (ex) {
            ex.errMethod = "getGrid";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, gridProgramsCallBack: function (_IndexPage, _TotalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            fw.log.info("_IndexPage -> " +
                _IndexPage + "  - _TotalPosition -> " + _TotalPosition + " _domElement  -> " + _domElement + " _dataElement -> " + _dataElement + " _inPagePosition -> " + _inPagePosition);
            fw.log.info("gridProgramsCallBack");
            this.dataCurrentItem = _dataElement;
            this.inPagePosition = _inPagePosition;
            if (_IndexPage != this.indexPage) {
                this.indexPage = _IndexPage;
                this.counter = this.gridTVoY.getVisibleContentItemsLength();
                var _this = this;
                if (this.time != null)fw.util.clearTimeout(this.time);
                this.time = setTimeout(function () {
                        _this.updateInfoPg(_this.gridTVoY)
                    },
                    1E3)
            } else fw.log.info("gridProgramsCallBack - IndexPage == this.indexPage")
        } catch (ex) {
            ex.errMethod = "gridProgramsCallBack";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, updateInfoPg: function (_grid) {
        try {
            this.counter = -1;
            var _this = this;
            (function update() {
                setTimeout(function () {
                    if (_this.counter++ < _grid.getVisibleContentItemsLength() - 1)if (_grid.getDataElementItemVisibleByPosition(_this.counter).isLeaf != undefined) {
                        var domElemRightTxt = _grid.getDomElementItemVisibleByPosition(_this.counter).getRightTxt();
                        if (domElemRightTxt ==
                            null || (domElemRightTxt == undefined || domElemRightTxt == "")) {
                            fw.mwManager.getPGFromCategoryId(_grid.getDataElementItemVisibleByPosition(_this.counter).categoryId, 0, _this.sortType, _this.updateitemListCallBack, _this, new Array(_grid.getDataElementItemVisibleByPosition(_this.counter), _grid.getDomElementItemVisibleByPosition(_this.counter), _this.counter));
                            update()
                        }
                    }
                }, 10)
            })()
        } catch (ex) {
            ex.errMethod = "updateInfoPg";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, updateitemListCallBack: function (_callerCallbackParams, _movies,
                                         _totalMoviesCount, _parentCategory) {
        try {
            fw.log.debug("ModuleList : updateitemListCallBack : " + _totalMoviesCount);
            if (_movies != null && (_movies != undefined && _movies.length > 0)) {
                if (_callerCallbackParams[0].isLeaf != null && _callerCallbackParams[0].isLeaf != undefined) {
                    _callerCallbackParams[0].shortDescription = _movies[0].shortDescription;
                    _callerCallbackParams[0].longDescription = _movies[0].shortDescription;
                    _callerCallbackParams[0].extendedRating = _movies[0].extendedRating;
                    _callerCallbackParams[0].ratingType = _movies[0].ratingType;
                    _callerCallbackParams[0].ratingCode = _movies[0].ratingCode;
                    _callerCallbackParams[0].hdContent = null;
                    _callerCallbackParams[0].isSurroundSound = null;
                    _callerCallbackParams[0].licenceBeginDate = null;
                    _callerCallbackParams[0].licenceEndDate = null;
                    _callerCallbackParams[0].runtime = null;
                    _callerCallbackParams[0].logoChannelUrl = null;
                    _callerCallbackParams[0].subElements = _totalMoviesCount
                } else {
                    _callerCallbackParams[0].shortDescription = _movies[0].shortDescription;
                    _callerCallbackParams[0].longDescription = _movies[0].longDescription;
                    _callerCallbackParams[0].extendedRating = _movies[0].extendedRating;
                    _callerCallbackParams[0].ratingType = _movies[0].ratingType;
                    _callerCallbackParams[0].ratingCode = _movies[0].ratingCode;
                    _callerCallbackParams[0].hdContent = _movies[0].hdContent;
                    _callerCallbackParams[0].isSurroundSound = _movies[0].isSurroundSound;
                    _callerCallbackParams[0].licenceBeginDate = _movies[0].licenceBeginDate;
                    _callerCallbackParams[0].licenceEndDate = _movies[0].licenceEndDate;
                    _callerCallbackParams[0].runtime = _movies[0].runtime;
                    _callerCallbackParams[0].logoChannelUrl =
                        "";
                    _callerCallbackParams[0].subElements = _totalMoviesCount
                }
                _callerCallbackParams[0].isPCSafe = _movies[0].isPCSafe
            } else fw.log.info("updateitemListCallBack : category movies are not major or equals to 0");
            if (_totalMoviesCount > 0) {
                _callerCallbackParams[1].setRightTxt(_movies[0].shortDescription);
                if (this.inPagePosition == _callerCallbackParams[2]) {
                    fw.log.debug("updateitemListCallBack : invoking scenario callback");
                    this.parent.retrievedInfoPgCallback(_callerCallbackParams[0], _totalMoviesCount)
                }
            } else {
                fw.log.info("category movies are not major or equals to 0");
                _callerCallbackParams[1].setRightTxt("")
            }
        } catch (ex) {
            ex.errMethod = "updateitemListCallBack";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, moveFocusToDown: function () {
        this.gridTVoY.moveCursorToDown()
    }, moveFocusToUp: function () {
        this.gridTVoY.moveCursorToUp()
    }, moveFocusToRight: function () {
        this.gridTVoY.moveCursorToRight()
    }, moveFocusToLeft: function () {
        this.gridTVoY.moveCursorToLeft()
    }, isCursorInFirstPosition: function () {
        return this.gridTVoY.isCursorInFirstPosition()
    }, focusToGrid: function () {
        if (this.gridTVoY != null && this.gridTVoY !=
            undefined)this.gridTVoY.focusOn()
    }, focusOff: function () {
        if (this.gridTVoY != null && this.gridTVoY != undefined)this.gridTVoY.focusOff()
    }, setFocusOnElementByName: function (_labelName, _labelValue, _isSelect) {
        try {
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.gridTVoY.selectElementByPosition(pos, _isSelect)
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getCurrentSelectItem: function () {
        try {
            var obj = new Object;
            obj = this.gridTVoY.getSelectedItem();
            return obj
        } catch (ex) {
            ex.errMethod = "getCurrentSelectItem";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }
});
