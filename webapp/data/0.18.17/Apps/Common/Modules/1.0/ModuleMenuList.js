var ModuleMenuList = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf, _itemToUse, _obj, _callBackObj, _callBackObjFunction, _defaultStartGrid) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            this.parent = _parent;
            this.obj = _obj;
            this.itemToUse = _itemToUse;
            this.scenCallBackObj = _callBackObj;
            this.scenCallBackObjFunction = _callBackObjFunction;
            this.defaultStartGrid = _defaultStartGrid;
            this.isClean = false;
            this.isFocusOnTopButton = false;
            this.isPresentToButton = false;
            this.isFocusOnBottomButton =
                false;
            this.isPresentBottomButton = false;
            this.dataElement = null;
            this.itemSelected = new Object;
            this.itemSelected.domElement = null;
            this.itemSelected.dataElement = null;
            this.itemSelected_indexPage = 0;
            this.itemSelected_indexInPage = 0;
            this.indexPage = 0;
            if (this.conf.MenuListTopElem != undefined) {
                this.menuListTopElem = cssUtil.addElementToDom(Button, this.prop.id + "_MenuListTopElem", this.conf.MenuListTopElem, this.getModObj());
                this.menuListTopElem.hide();
                this.menuListTopElem.dataElement = new Object;
                this.menuListTopElem.dataElement.id =
                    "topElement"
            }
            this.arrowDown = cssUtil.addElementToDom(Image, this.prop.id + "_ModuleMenuListDownImage", this.conf.MenuListArrowDown, this.getModObj());
            this.arrowUp = cssUtil.addElementToDom(Image, this.prop.id + "_ModuleMenuListUpImage", this.conf.MenuListArrowUp, this.getModObj());
            this.arrowDown.getObj().hide();
            this.arrowUp.getObj().hide();
            this.isFocusOn = false;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getIsFocusOn: function () {
        return this.isFocusOn
    }, getSelectedItem: function () {
        try {
            if (this.itemSelected !=
                undefined)return this.itemSelected
        } catch (ex) {
            ex.errMethod = "getSelectedItem";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getFocusItem: function () {
        try {
            var itemSelect = new Object;
            if (this.isPresentBottomButton && this.isFocusOnBottomButton) {
                itemSelect.domElement = this.menuListBottomElem;
                itemSelect.dataElement = this.menuListBottomElem.dataElement
            } else if (this.isPresentToButton && this.isFocusOnTopButton) {
                itemSelect.domElement = this.menuListTopElem;
                itemSelect.dataElement = this.menuListTopElem.dataElement
            } else {
                itemSelect.domElement =
                    this.grid.getDomElementItemSelect();
                itemSelect.dataElement = this.grid.getDataElementItemSelect()
            }
            return itemSelect
        } catch (ex) {
            ex.errMethod = "getFocusItem";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, selectedOn: function () {
        try {
            this.grid.getDomElementItemSelect().setSelected();
            this.itemSelected.domElement = this.grid.getDomElementItemSelect();
            this.itemSelected.dataElement = this.grid.getDataElementItemSelect()
        } catch (ex) {
            ex.errMethod = "selectedOn";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, selectedOff: function () {
        try {
            this.grid.getDomElementItemSelect().setUnSelected();
            this.itemSelected.domElement = null;
            this.itemSelected.dataElement = null
        } catch (ex) {
            ex.errMethod = "selectedOff";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setItemUnSelected: function () {
        try {
            if (this.itemSelected.domElement != null)this.itemSelected.domElement.setUnSelected()
        } catch (ex) {
            ex.errMethod = "setItemUnSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setSelected: function () {
        try {
            if (this.grid != undefined) {
                this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage).setSelected();
                this.itemSelected.domElement =
                    this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage);
                this.itemSelected.dataElement = this.grid.getDataElementItemVisibleByPosition(this.itemSelected_indexInPage)
            }
        } catch (ex) {
            ex.errMethod = "setSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setItemSelected: function (_isFocusOn) {
        try {
            this.setItemUnSelected();
            this.itemSelected_indexPage = this.indexPage;
            this.itemSelected_indexInPage = this.indexInPage;
            this.setSelected();
            if (_isFocusOn != undefined && _isFocusOn)this.domElement.focusOn()
        } catch (ex) {
            ex.errMethod =
                "setItemSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getItemSelectPosition: function () {
        return this.grid.getItemSelectPosition()
    }, loadList: function () {
        try {
            if (this.obj != null && this.obj.length > 0) {
                this.grid = new GridPagePlus(this.prop.id + "_ModuleMenuListContents", this.conf.grid, this.itemToUse, this.obj, this, this.gridCallBack, this.defaultStartGrid);
                this.getModObj().appendChild(this.grid.getObj());
                this.grid.parentObjFunctionSelected = this.gridCallBackSelected;
                if (this.obj.length > this.conf.grid.numVisibleRows) {
                    this.arrowDown.getObj().show();
                    this.arrowUp.getObj().show()
                } else {
                    this.arrowDown.getObj().hide();
                    this.arrowUp.getObj().hide()
                }
                this.isClean = false
            }
        } catch (ex) {
            ex.errMethod = "loadList";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setBottomButtonSelected: function () {
        try {
            this.isFocusOnBottomButton = true;
            this.menuListBottomElem.setSelected()
        } catch (ex) {
            ex.errMethod = "setBottomButtonSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setTopButtonSelected: function () {
        try {
            this.isFocusOnTopButton = true;
            this.menuListTopElem.setSelected()
        } catch (ex) {
            ex.errMethod =
                "setTopButtonSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setFocusOnElementByName: function (_labelName, _labelValue, _isSelect) {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnBottomButton = false;
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.grid.selectElementByPosition(pos, _isSelect)
        } catch (ex) {
            ex.errMethod = "setFocusOnElementByName";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setFocusOnFirstElement: function (_isSelect) {
        try {
            this.isFocusOnTopButton =
                false;
            this.isFocusOnBottomButton = false;
            this.grid.selectElementByPosition(0, _isSelect)
        } catch (ex) {
            ex.errMethod = "setFocusOnFirstElement";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getNumElement: function () {
        try {
            return this.obj.length
        } catch (ex) {
            ex.errMethod = "getNumElement";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getItemList: function () {
        return this.obj
    }, isTopElementSelected: function () {
        try {
            return this.isFocusOnTopButton
        } catch (ex) {
            ex.errMethod = "isTopElementSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    },
    getSelectItem: function () {
        try {
            var obj = new Object;
            if (this.isFocusOnTopButton)obj.cont = this.menuListTopElem.dataElement.id; else obj.cont = this.dataElement;
            return obj
        } catch (ex) {
            ex.errMethod = "getSelectItem";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setMenuList: function (_obj) {
        try {
            if (!this.isClean && this.grid != undefined)this.clean();
            this.obj = _obj;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setMeerTvButton: function (_category, _movie, _name) {
        try {
            this.menuListBottomElem =
                cssUtil.addElementToDom(MeerTvButton, this.prop.id + "_MenuListBottomElem", this.conf.MenuListBottomElem, this.getModObj());
            this.menuListBottomElem.hide();
            this.menuListBottomElem.setCallBack(this, this.meerTvButtonCallback);
            this.menuListBottomElem.dataElement = new Object;
            this.menuListBottomElem.dataElement.id = "_bottomElem";
            this.menuListBottomElem.dataElement.action = "SmartView";
            this.menuListBottomElem.dataElement.name = _name;
            this.menuListBottomElem.dataElement.displayName = _name;
            var posY = (this.conf.grid.item.styleItemCont.h +
                this.conf.grid.distVerImgageGrid) * this.obj.length + this.conf.grid.topMargin;
            if (posY != undefined && posY > 0)this.menuListBottomElem.setY(posY);
            fw.mwManager.getContextApplicationsForMovie(_movie.title, _category.name, this.showSmartViewCallBack, this, null)
        } catch (ex) {
            ex.errMethod = "setMeerTvButton";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, showSmartViewCallBack: function (_callerCallbackParams, _applicationsList) {
        if (_applicationsList.length > 0) {
            this.menuListBottomElem.setImages(_applicationsList);
            this.isPresentBottomButton =
                true
        }
    }, meerTvButtonCallback: function (_result) {
        this.menuListBottomElem.show()
    }, setTopButton: function (_txt) {
        try {
            this.menuListTopElem.show();
            this.menuListTopElem.setTxt(_txt);
            this.menuListTopElem.dataElement.name = _txt;
            this.menuListTopElem.dataElement.displayName = _txt;
            this.menuListTopElem.dataElement.action = "top_button";
            this.isPresentToButton = true
        } catch (ex) {
            ex.errMethod = "setTopButton";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, hideTopButton: function () {
        try {
            this.isPresentToButton = false;
            this.menuListTopElem.focusOff();
            this.isFocusOnTopButton = false;
            this.menuListTopElem.hide()
        } catch (ex) {
            ex.errMethod = "hideTopButton";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, showTopButton: function (_setTopFocus) {
        try {
            this.menuListTopElem.show();
            this.isPresentToButton = true;
            if (_setTopFocus != undefined && _setTopFocus) {
                this.grid.focusOff();
                this.menuListTopElem.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "showTopButton";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, gridCallBackSelected: function (_dataElement, _domElement) {
        try {
            this.itemSelected.domElement =
                _domElement;
            this.itemSelected.dataElement = _dataElement
        } catch (ex) {
            ex.errMethod = "gridCallBackSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, isSelectSelected: function () {
        try {
            if (this.itemSelected_indexPage == this.indexPage && this.itemSelected_indexInPage == this.indexInPage)return true;
            return false
        } catch (ex) {
            ex.errMethod = "isSelectSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, gridCallBack: function (_IndexPage, _TotalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            if (this.indexPage != _IndexPage)if (this.itemSelected_indexPage ==
                _IndexPage) {
                this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage).setSelected();
                this.itemSelected.domElement = this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage);
                this.itemSelected.dataElement = this.grid.getDataElementItemVisibleByPosition(this.itemSelected_indexInPage)
            }
            this.indexPage = _IndexPage;
            this.itemPosition = _TotalPosition;
            this.domElement = _domElement;
            this.dataElement = _dataElement;
            this.indexInPage = _inPagePosition;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction !=
                null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(_TotalPosition, _domElement, _dataElement))
        } catch (ex) {
            ex.errMethod = "gridCallBack";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setTopButtonFocusOff: function () {
        try {
            if (this.isPresentToButton && this.isFocusOnTopButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false
            }
        } catch (ex) {
            ex.errMethod = "setTopButtonFocusOn";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setTopButtonFocusOn: function () {
        try {
            this.menuListTopElem.focusOn();
            this.grid.focusOff();
            this.isFocusOnTopButton = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(-1, this.menuListTopElem, this.menuListTopElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setTopButtonFocusOn";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setBottomButtonFocusOn: function () {
        try {
            this.menuListBottomElem.focusOn();
            this.grid.focusOff();
            this.isFocusOnBottomButton = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj,
                new Array(-1, this.menuListBottomElem, this.menuListBottomElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setTopButtonFocusOn";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setTopButtonFocusOffUp: function () {
        try {
            this.menuListTopElem.focusOff();
            this.isFocusOnTopButton = false;
            if (this.isPresentBottomButton) {
                this.menuListBottomElem.focusOn();
                this.isFocusOnBottomButton = true
            } else if (this.grid != undefined)this.grid.selectElementByPosition(this.obj.length - 1, true, false)
        } catch (ex) {
            ex.errMethod = "setTopButtonFocusOff";
            ex.errClass =
                "ModuleMenuList";
            fw.err(ex)
        }
    }, setTopButtonFocusOffDown: function () {
        try {
            this.menuListTopElem.focusOff();
            if (this.grid != undefined) {
                this.grid.selectElementByPosition(0, true, false);
                this.isFocusOnTopButton = false
            }
        } catch (ex) {
            ex.errMethod = "setTopButtonFocusOff";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setBottomButtonFocusOffDown: function () {
        try {
            this.menuListBottomElem.focusOff();
            this.isFocusOnBottomButton = false;
            if (this.isPresentToButton) {
                this.menuListTopElem.focusOn();
                this.isFocusOnTopButton = true
            } else if (this.grid !=
                undefined)this.grid.selectElementByPosition(0, true, false)
        } catch (ex) {
            ex.errMethod = "setBottomButtonFocusOffDown";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setBottomButtonFocusOff: function () {
        try {
            if (this.isPresentBottomButton && this.isFocusOnBottomButton) {
                this.menuListBottomElem.focusOff();
                this.isFocusOnBottomButton = false
            }
        } catch (ex) {
            ex.errMethod = "setBottomButtonFocusOff";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setBottomButtonFocusOffUp: function () {
        try {
            this.menuListBottomElem.focusOff();
            if (this.grid !=
                undefined) {
                this.grid.selectElementByPosition(this.obj.length - 1, true, false);
                this.isFocusOnBottomButton = false
            }
        } catch (ex) {
            ex.errMethod = "setBottomButtonFocusOffUp";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, moveFocusToDown: function () {
        try {
            if (this.isFocusOnBottomButton)this.setBottomButtonFocusOffDown(); else if (this.isFocusOnTopButton)this.setTopButtonFocusOffDown(); else if (this.indexPage == 0 && (this.itemPosition == this.obj.length - 1 && this.isPresentBottomButton))this.setBottomButtonFocusOn(); else if (this.grid !=
                undefined)this.grid.moveCursorToDown()
        } catch (ex) {
            ex.errMethod = "moveFocusToDown";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, moveFocusToUp: function () {
        try {
            if (this.isFocusOnBottomButton)this.setBottomButtonFocusOffUp(); else if (this.isFocusOnTopButton)this.setTopButtonFocusOffUp(); else if (this.indexPage == 0 && (this.itemPosition == 0 && this.isPresentToButton))this.setTopButtonFocusOn(); else if (this.indexPage == 0 && (this.itemPosition == 0 && this.isPresentBottomButton))this.setBottomButtonFocusOn(); else if (this.grid !=
                undefined)this.grid.moveCursorToUp()
        } catch (ex) {
            ex.errMethod = "moveFocusToUp";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            if (this.isFocusOnTopButton && this.isPresentToButton)this.menuListTopElem.focusOn(); else if (this.isPresentBottomButton && this.isFocusOnBottomButton)this.menuListBottomElem.focusOn(); else if (this.grid != undefined && this.grid != null)this.grid.focusOn();
            this.isFocusOn = true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (this.isPresentToButton &&
                this.isFocusOnTopButton)this.menuListTopElem.focusOff(); else if (this.isFocusOnBottomButton && this.isFocusOnBottomButton)this.menuListBottomElem.focusOff(); else if (this.grid != undefined && this.grid != null)this.grid.focusOff();
            this.isFocusOn = false
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setPageDown: function () {
        if (this.grid.getNumPage() > 1) {
            if (this.isFocusOnTopButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false
            }
            this.getMenuList().changePageUp()
        }
    }, setPageUp: function () {
        if (this.grid.getNumPage() >
            1) {
            if (this.isFocusOnTopButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false
            }
            this.getMenuList().changePageDown()
        }
    }, getMenuList: function () {
        return this.grid
    }, showArrowUp: function () {
        this.ItemDetsUpImg.show()
    }, showArrowDown: function () {
        this.ItemDetsDownImg.show()
    }, hideArrowUp: function () {
        this.ItemDetsUpImg.hide()
    }, hideArrowDown: function () {
        this.ItemDetsDownImg.hide()
    }, clean: function () {
        try {
            var _this = this;
            _this.arrowDown.getObj().hide();
            _this.arrowUp.getObj().hide();
            if (_this.isFocusOnTopButton) {
                _this.menuListTopElem.focusOff();
                _this.isFocusOnTopButton = false
            }
            _this.setItemUnSelected();
            if (_this.grid != null) {
                _this.getModObj().removeChild(_this.grid.getObj());
                _this.grid = null
            }
            if (this.isPresentBottomButton && this.menuListBottomElem != null) {
                this.isPresentBottomButton = false;
                this.getModObj().removeChild(this.menuListBottomElem.getObj());
                this.menuListBottomElem = null
            }
            _this.isClean = true
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        switch (_evt.keyCode) {
            case fw.keys.code.RIGHT:
                break;
            case fw.keys.code.DOWN:
                this.moveFocusToDown();
                break;
            case fw.keys.code.UP:
                this.moveFocusToUp();
                break
        }
    }
});
