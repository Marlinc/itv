var ModuleEpisodesList = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _obj, _baseElement, _objCallBack, _objCallBackFunction, _parentAppObj) {
        $super(_parent, _prop);
        this.prop = _prop;
        this.parent = _parent;
        this.appObj = _parentAppObj;
        this.conf = _modConf;
        this.obj = _obj;
        this.timeOut = null;
        this.baseElement = _baseElement;
        this.isClean = true;
        this.indexPage = -1;
        this.objCallBack = _objCallBack;
        this.objCallBackFunction = _objCallBackFunction;
        this.isLeafElement = false;
        this.episodesStringLabel = _parentAppObj.messages.afleveringEpisodeSuffix
    },
    setMenuList: function (_obj, _sortType, _isLeafElement) {
        try {
            if (!this.isClean && this.gridTVoY != undefined)this.clean();
            this.isLeafElement = _isLeafElement;
            this.obj = _obj;
            this.sortType = _sortType;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, getMenuList: function () {
        try {
            return this.obj
        } catch (ex) {
            ex.errMethod = "getMenuList";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, updateUi: function (_totalPosition, _domElement, _dataElement) {
        try {
            if (this.objCallBack != undefined &&
                (this.objCallBack != null && (this.objCallBackFunction != undefined && this.objCallBackFunction != null)))this.objCallBackFunction.apply(this.objCallBack, new Array(_domElement, _dataElement))
        } catch (ex) {
            ex.errMethod = "updateUi";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj.length > 0) {
                this.gridTVoY = new GridPagePlus(this.prop.id + "_CatalogGrid_List", this.conf.grid, this.baseElement, this.obj, this, this.episodesGridCallBack, true);
                this.getModObj().appendChild(this.gridTVoY.getObj());
                this.arrowDown = new Image(this.prop.id + "_arrowDown", this.conf.arrowDown);
                this.arrowDown.setUrl(fw.conf.CLEAR_IMAGE);
                this.getModObj().appendChild(this.arrowDown.getObj());
                if (this.obj.length > this.conf.grid.numVisibleRows)this.arrowDown.getObj().show(); else this.arrowDown.getObj().hide();
                this.arrowUp = new Image(this.prop.id + "_arrowUp", this.conf.arrowUp);
                this.arrowUp.setUrl(fw.conf.CLEAR_IMAGE);
                this.getModObj().appendChild(this.arrowUp.getObj());
                if (this.obj.length > this.conf.grid.numVisibleRows)this.arrowUp.getObj().show();
                else this.arrowUp.getObj().hide();
                if (this.obj.length == 0) {
                    this.arrowDown.getObj().hide();
                    this.arrowUp.getObj().hide()
                }
                this.isClean = false;
                this.indexPage = 0
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, getList: function () {
        return this.gridTVoY
    }, clean: function () {
        try {
            if (this.gridTVoY != undefined && this.gridTVoY != null) {
                this.getModObj().removeChild(this.gridTVoY.getObj());
                this.gridTVoY = null;
                this.isClean = true;
                this.arrowDown.getObj().hide();
                this.arrowUp.getObj().hide()
            }
        } catch (ex) {
            ex.errMethod =
                "clean";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, getItem: function () {
        try {
            return this.gridTVoY.getSelectedItem()
        } catch (ex) {
            ex.errMethod = "getItem";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, getGrid: function () {
        try {
            return this.gridTVoY
        } catch (ex) {
            ex.errMethod = "getGrid";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, episodesGridCallBack: function (_IndexPage, _TotalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            this.dataCurrentItem = _dataElement;
            var _this = this;
            if (_this.objCallBack != undefined &&
                (_this.objCallBack != null && (_this.objCallBackFunction != undefined && _this.objCallBackFunction != null))) {
                _dataElement.isLocked = _this.allLock;
                fw.log.info("applying callback function");
                _this.objCallBackFunction.apply(_this.objCallBack, new Array(_domElement, _dataElement))
            }
        } catch (ex) {
            ex.errMethod = "episodesGridCallBack";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, updateInfoPg: function (_visibleProgram) {
        try {
            this.counter = -1;
            var _this = this;
            (function update() {
                setTimeout(function () {
                    if (_this.counter++ < _visibleProgram.length -
                        1)if (_visibleProgram[_this.counter].dataElement.isLeaf != undefined) {
                        fw.mwManager.getPGFromCategoryId(_visibleProgram[_this.counter].dataElement.categoryId, 0, _this.sortType, _this.updateitemListCallBackEpisodes, _this, new Array(_visibleProgram[_this.counter], _this.counter));
                        update()
                    }
                }, 10)
            })()
        } catch (ex) {
            ex.errMethod = "updateInfoPg";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }, updateitemListCallBackEpisodes: function (_callerCallbackParams, _movies, _totalMoviesCount, _parentCategory) {
        try {
            if (_callerCallbackParams[0].dataElement.isLeaf !=
                null && _callerCallbackParams[0].dataElement.isLeaf != undefined) {
                _callerCallbackParams[0].dataElement.shortDescription = _movies[0].shortDescription;
                _callerCallbackParams[0].dataElement.longDescription = _movies[0].shortDescription;
                _callerCallbackParams[0].dataElement.extendedRating = _movies[0].extendedRating;
                _callerCallbackParams[0].dataElement.ratingType = null;
                _callerCallbackParams[0].dataElement.ratingCode = null;
                _callerCallbackParams[0].dataElement.hdContent = null;
                _callerCallbackParams[0].dataElement.isSurroundSound =
                    null;
                _callerCallbackParams[0].dataElement.licenceBeginDate = null;
                _callerCallbackParams[0].dataElement.licenceEndDate = null;
                _callerCallbackParams[0].dataElement.runtime = null;
                _callerCallbackParams[0].dataElement.logoChannelUrl = null
            } else {
                _callerCallbackParams[0].dataElement.shortDescription = _movies[0].shortDescription;
                _callerCallbackParams[0].dataElement.longDescription = _movies[0].longDescription;
                _callerCallbackParams[0].dataElement.extendedRating = _movies[0].extendedRating;
                _callerCallbackParams[0].dataElement.ratingType =
                    _movies[0].ratingType;
                _callerCallbackParams[0].dataElement.ratingCode = _movies[0].ratingCode;
                _callerCallbackParams[0].dataElement.hdContent = _movies[0].hdContent;
                _callerCallbackParams[0].dataElement.isSurroundSound = _movies[0].isSurroundSound;
                _callerCallbackParams[0].dataElement.licenceBeginDate = _movies[0].licenceBeginDate;
                _callerCallbackParams[0].dataElement.licenceEndDate = _movies[0].licenceEndDate;
                _callerCallbackParams[0].dataElement.runtime = _movies[0].runtime;
                _callerCallbackParams[0].dataElement.logoChannelUrl =
                    ""
            }
            _callerCallbackParams[0].dataElement.isPCSafe = _movies[0].isPCSafe;
            fw.log.debug("updateitemListCallBackEpisodes : is callerCallbackParams[0] : ", _callerCallbackParams[0].dataElement);
            _callerCallbackParams[0].domElement.setRightTxt(_movies[0].shortDescription);
            fw.log.debug("ModuleEpisodesList - calling getFormattedDate with param : daysArray =>", this.conf.daysArray);
            _callerCallbackParams[0].domElement.setSchedulationTxt(this.getFormattedDate(this.conf.daysArray, _movies[0].licenceBeginDate));
            if (this.inPagePosition ==
                _callerCallbackParams[1])this.parent.retrievedInfoPgCallback(_callerCallbackParams[0].dataElement)
        } catch (ex) {
            ex.errMethod = "updateitemListCallBack";
            ex.errClass = "ModuleEpisodesList";
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
    },
    focusToGrid: function () {
        if (this.gridTVoY != null && this.gridTVoY != undefined)this.gridTVoY.focusOn()
    }, focusOff: function () {
        if (this.gridTVoY != null && this.gridTVoY != undefined)this.gridTVoY.focusOff()
    }, setFocusOnElementByName: function (_labelName, _labelValue) {
        try {
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.gridTVoY.selectElementByPosition(pos)
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getCurrentSelectItem: function () {
        try {
            var obj =
                new Object;
            obj = this.gridTVoY.getSelectedItem();
            return obj
        } catch (ex) {
            ex.errMethod = "getCurrentSelectItem";
            ex.errClass = "ModuleList";
            fw.err(ex)
        }
    }, getFormattedDate: function (_daysArray, _unixTimestamp) {
        try {
            var day = (new Date(_unixTimestamp)).getDate();
            if (day <= 9)day = "0" + day;
            var month = parseInt((new Date(_unixTimestamp)).getMonth() + 1);
            if (month <= 9)month = "0" + month;
            var dayOfWeek = (new Date(_unixTimestamp)).getDay();
            var dayTranslation = eval("this.appObj.messages." + _daysArray[dayOfWeek]);
            return dayTranslation.substring(0,
                    2).toLowerCase() + " " + day + "-" + month
        } catch (ex) {
            ex.errMethod = "getFormattedDate";
            ex.errClass = "ModuleEpisodesList";
            fw.err(ex)
        }
    }
});
