var ModuleMenuDetailList = Class.create(Module, {
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
            this.isFocusOnMeerTvButton =
                false;
            this.isPresentMeerTv = false;
            this.isPresentThermCond = false;
            this.isFocusOnThermCondButton = false;
            this.isPresentProgInfo = false;
            this.isFocusOnProgInfo = false;
            this.dataElement = null;
            this.itemSelected = new Object;
            this.itemSelected.domElement = null;
            this.itemSelected.dataElement = null;
            this.itemSelected_indexPage = 0;
            this.itemSelected_indexInPage = 0;
            this.indexPage = 0;
            if (this.conf.MenuListTopElem != undefined) {
                this.menuListTopElem = cssUtil.addElementToDom(Button, this.prop.id + "_MenuListTopElem", this.conf.MenuListTopElem,
                    this.getModObj());
                this.menuListTopElem.hide();
                this.menuListTopElem.dataElement = new Object;
                this.menuListTopElem.dataElement.id = "topElement"
            }
            this.arrowDown = cssUtil.addElementToDom(Image, this.prop.id + "_ModuleMenuListDownImage", this.conf.MenuListArrowDown, this.getModObj());
            this.arrowUp = cssUtil.addElementToDom(Image, this.prop.id + "_ModuleMenuListUpImage", this.conf.MenuListArrowUp, this.getModObj());
            this.arrowDown.getObj().hide();
            this.arrowUp.getObj().hide();
            this.isFocusOn = false;
            this.loadList()
        } catch (ex) {
            ex.errMethod =
                "initialize";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getSelectedItem: function () {
        try {
            if (this.itemSelected != undefined)return this.itemSelected
        } catch (ex) {
            ex.errMethod = "getSelectedItem";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, getFocusItem: function () {
        try {
            var itemSelect = new Object;
            if (this.isPresentMeerTv && this.isFocusOnMeerTvButton) {
                itemSelect.domElement = this.menuListMeerTvElem;
                itemSelect.dataElement = this.menuListMeerTvElem.dataElement
            } else if (this.isPresentToButton && this.isFocusOnTopButton) {
                itemSelect.domElement =
                    this.menuListTopElem;
                itemSelect.dataElement = this.menuListTopElem.dataElement
            } else if (this.isPresentThermCond && this.isFocusOnThermCondButton) {
                itemSelect.domElement = this.menuListThermCondElem;
                itemSelect.dataElement = this.menuListThermCondElem.dataElement
            } else if (this.isPresentProgInfo && this.isFocusOnProgInfo) {
                itemSelect.domElement = this.menuListProgInfoElem;
                itemSelect.dataElement = this.menuListProgInfoElem.dataElement
            } else {
                itemSelect.domElement = this.grid.getDomElementItemSelect();
                itemSelect.dataElement =
                    this.grid.getDataElementItemSelect()
            }
            return itemSelect
        } catch (ex) {
            ex.errMethod = "getFocusItem";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setItemUnSelected: function () {
        try {
            if (this.itemSelected.domElement != null) {
                this.itemSelected.domElement.setUnSelected();
                this.itemSelected.domElement = null;
                this.itemSelected.dataElement = null
            }
        } catch (ex) {
            ex.errMethod = "setItemUnSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setItemSelected: function () {
        try {
            this.setItemUnSelected();
            this.itemSelected.domElement = this.domElement;
            this.itemSelected.dataElement = this.dataElement;
            this.itemSelected.domElement.setSelected()
        } catch (ex) {
            ex.errMethod = "setItemSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setMenuList: function (_obj) {
        try {
            if (!this.isClean)this.clean();
            this.obj = _obj;
            this.loadList()
        } catch (ex) {
            ex.errMethod = "setMenuList";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, loadList: function () {
        try {
            if (this.obj != null && this.obj.length > 0) {
                this.grid = new GridPagePlus(this.prop.id + "_ModuleMenuListContents", this.conf.grid, this.itemToUse,
                    this.obj, this, this.gridCallBack, this.defaultStartGrid);
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
    }, setDynamicMenuButtonSelected: function () {
        try {
            if (this.grid != undefined) {
                this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage).setSelected();
                this.itemSelected.domElement = this.grid.getDomElementItemVisibleByPosition(this.itemSelected_indexInPage);
                this.itemSelected.dataElement = this.grid.getDataElementItemVisibleByPosition(this.itemSelected_indexInPage)
            }
        } catch (ex) {
            ex.errMethod = "setSelected";
            ex.errClass = "ModuleMenuList";
            fw.err(ex)
        }
    }, setMeerTvButtonSelected: function () {
        try {
            this.isFocusOnMeerTvButton = true;
            this.menuListMeerTvElem.setSelected();
            this.itemSelected.domElement = this.menuListMeerTvElem;
            this.itemSelected.dataElement = this.menuListMeerTvElem.dataElement
        } catch (ex) {
            ex.errMethod =
                "setBottomButtonSelected";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setThermCondButtonSelected: function () {
        try {
            this.isFocusOnThermCondButton = true;
            this.menuListThermCondElem.setSelected();
            this.menuListThermCondElem.focusOn();
            this.itemSelected.domElement = this.menuListThermCondElem;
            this.itemSelected.dataElement = this.menuListThermCondElem.dataElement
        } catch (ex) {
            ex.errMethod = "setBottomButtonSelected";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setTopButtonSelected: function () {
        try {
            this.isFocusOnTopButton =
                true;
            this.menuListTopElem.setSelected()
        } catch (ex) {
            ex.errMethod = "setTopButtonSelected";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setFocusOnElementByName: function (_labelName, _labelValue, _isSelect) {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnProgInfo = false;
            this.isFocusOnThermCondButton = false;
            var pos = -1;
            for (var i = 0; i < this.obj.length; i++)if (eval("this.obj[i]." + _labelName) == _labelValue)pos = i;
            this.grid.selectElementByPosition(pos, _isSelect)
        } catch (ex) {
            ex.errMethod =
                "setFocusOnElementByName";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setFocusOnFirstElement: function (_isSelect) {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnProgInfo = false;
            this.isFocusOnThermCondButton = false;
            this.grid.selectElementByPosition(0, _isSelect)
        } catch (ex) {
            ex.errMethod = "setFocusOnFirstElement";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, isTopElementSelected: function () {
        try {
            return this.isFocusOnTopButton
        } catch (ex) {
            ex.errMethod = "isTopElementSelected";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setProgrammaInfo: function (_name, _action) {
        try {
            if (this.isPresentMeerTv || this.isPresentThermCond) {
                this.isPresentProgInfo = true;
                this.menuListProgInfoElem = cssUtil.addElementToDom(PinButton, this.prop.id + "_MenuListProgInfoElem", this.conf.grid.item, this.getModObj());
                var posY = this.conf.grid.topMargin;
                if (this.obj.length > 0) {
                    var mul = 0;
                    if (this.isPresentThermCond)mul = 1;
                    posY = (this.conf.grid.item.styleItemCont.h + this.conf.grid.distVerImgageGrid) * (this.obj.length + mul) +
                        this.conf.grid.topMargin;
                    if (this.isPresentMeerTv)posY = posY + this.conf.grid.distVerImgageGrid + this.conf.MenuListBottomElem.styleItemCont.h
                } else if (this.isPresentMeerTv)posY = posY + this.conf.grid.distVerImgageGrid + this.conf.MenuListBottomElem.styleItemCont.h;
                if (posY != undefined && posY > 0)this.menuListProgInfoElem.setY(posY);
                this.menuListProgInfoElem.dataElement = new Object;
                this.menuListProgInfoElem.dataElement.id = _name;
                this.menuListProgInfoElem.dataElement.action = _action;
                this.menuListProgInfoElem.dataElement.name =
                    _name;
                this.menuListProgInfoElem.dataElement.displayName = _name;
                this.menuListProgInfoElem.setTxt(_name);
                this.isClean = false
            }
        } catch (ex) {
            ex.errMethod = "setProgrammaInfo";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setThermCondButton: function (_name, _action) {
        try {
            this.isPresentThermCond = true;
            this.menuListThermCondElem = cssUtil.addElementToDom(PinButton, this.prop.id + "_MenuListThermCondElem", this.conf.grid.item, this.getModObj());
            var posY = (this.conf.grid.item.styleItemCont.h + this.conf.grid.distVerImgageGrid) *
                (this.obj.length + 1) + this.conf.grid.topMargin;
            if (posY != undefined && posY > 0)this.menuListThermCondElem.setY(posY);
            this.menuListThermCondElem.dataElement = new Object;
            this.menuListThermCondElem.dataElement.id = _name;
            this.menuListThermCondElem.dataElement.action = _action;
            this.menuListThermCondElem.dataElement.name = _name;
            this.menuListThermCondElem.dataElement.displayName = _name;
            this.menuListThermCondElem.setTxt(_name);
            this.isClean = false
        } catch (ex) {
            ex.errMethod = "setThermCondButton";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setMeerTvButton: function (_category, _movie, _name, _action) {
        try {
            this.menuListMeerTvElem = cssUtil.addElementToDom(MeerTvButton, this.prop.id + "_MenuListMeerTvElem", this.conf.MenuListBottomElem, this.getModObj());
            this.menuListMeerTvElem.hide();
            this.menuListMeerTvElem.setCallBack(this, this.meerTvButtonCallback);
            this.menuListMeerTvElem.dataElement = new Object;
            this.menuListMeerTvElem.dataElement.id = _name;
            this.menuListMeerTvElem.dataElement.action = _action;
            this.menuListMeerTvElem.dataElement.name = _name;
            this.menuListMeerTvElem.dataElement.displayName = _name;
            var posY = this.conf.grid.topMargin;
            if (this.obj.length > 0) {
                var mul = 0;
                if (this.isPresentThermCond)mul = 1;
                posY = (this.conf.grid.item.styleItemCont.h + this.conf.grid.distVerImgageGrid) * (this.obj.length + mul) + this.conf.grid.topMargin
            }
            if (posY != undefined && posY > 0)this.menuListMeerTvElem.setY(posY);
            fw.mwManager.getContextApplicationsForMovie(_movie.title, _category.name, this.showSmartViewCallBack, this, null)
        } catch (ex) {
            ex.errMethod = "setMeerTvButton";
            ex.errClass =
                "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, showSmartViewCallBack: function (_callerCallbackParams, _applicationsList) {
        try {
            if (_applicationsList.length > 0) {
                this.menuListMeerTvElem.setImages(_applicationsList);
                this.isPresentMeerTv = true;
                this.isClean = false;
                if (this.parent.currentFocus != this.parent.FOCUS_SMARTVIEW)this.parent.showButtonYellow()
            }
        } catch (ex) {
            ex.errMethod = "showSmartViewCallBack";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, meerTvButtonCallback: function (_result) {
        this.menuListMeerTvElem.show()
    }, setTopButton: function (_txt) {
        try {
            this.menuListTopElem.show();
            this.menuListTopElem.setTxt(_txt);
            this.menuListTopElem.dataElement.name = _txt;
            this.menuListTopElem.dataElement.displayName = _txt;
            this.menuListTopElem.dataElement.action = "top_button";
            this.isPresentToButton = true;
            this.isClean = false
        } catch (ex) {
            ex.errMethod = "setTopButton";
            ex.errClass = "ModuleMenuDetailList";
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
            ex.errClass =
                "ModuleMenuDetailList";
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
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, gridCallBackSelected: function (_dataElement, _domElement) {
        try {
            this.itemSelected.domElement = _domElement;
            this.itemSelected.dataElement = _dataElement
        } catch (ex) {
            ex.errMethod = "gridCallBackSelected";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, gridCallBack: function (_IndexPage, _TotalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            this.indexPage = _IndexPage;
            this.itemPosition = _TotalPosition;
            this.domElement = _domElement;
            this.dataElement = _dataElement;
            this.indexInPage = _inPagePosition;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(_TotalPosition, _domElement, _dataElement))
        } catch (ex) {
            ex.errMethod = "gridCallBack";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setFocusOnMeerTVButton: function () {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnProgInfo = false;
            this.isFocusOnThermCondButton = false;
            this.menuListMeerTvElem.focusOn();
            this.isFocusOnMeerTvButton = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(-1, this.menuListMeerTvElem, this.menuListMeerTvElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setFocusOnMeerTVButton";
            ex.errClass =
                "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, setFocusOnTopButton: function () {
        try {
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnProgInfo = false;
            this.isFocusOnThermCondButton = false;
            this.menuListTopElem.focusOn();
            this.isFocusOnTopButton = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(-1, this.menuListTopElem, this.menuListTopElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setFocusOnTopButton";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    },
    setFocusOnThermCondButton: function () {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnProgInfo = false;
            this.menuListThermCondElem.focusOn();
            this.isFocusOnThermCondButton = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(-1, this.menuListThermCondElem, this.menuListThermCondElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setFocusOnThermCondButton";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    },
    setFocusOnProgInfoButton: function () {
        try {
            this.isFocusOnTopButton = false;
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnThermCondButton = false;
            this.menuListProgInfoElem.focusOn();
            this.isFocusOnProgInfo = true;
            if (this.scenCallBackObj != null && this.scenCallBackObjFunction != null)this.scenCallBackObjFunction.apply(this.scenCallBackObj, new Array(-1, this.menuListProgInfoElem, this.menuListProgInfoElem.dataElement))
        } catch (ex) {
            ex.errMethod = "setFocusOnProgInfoButton";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    },
    moveFocusToUp: function () {
        try {
            if (this.isFocusOnTopButton)if (this.isPresentProgInfo) {
                this.navFocusOff();
                this.setFocusOnProgInfoButton()
            } else if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(this.obj.length - 1, true, false)
                }
            } else if (this.isFocusOnProgInfo)if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(this.obj.length - 1, true, false)
                }
            } else if (this.isFocusOnMeerTvButton)if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(this.obj.length - 1, true, false)
                }
            } else if (this.isFocusOnThermCondButton) {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(this.obj.length -
                        1, true, false)
                }
            } else if (this.indexPage == 0 && this.itemPosition == 0)if (this.isPresentToButton) {
                this.navFocusOff();
                this.setFocusOnTopButton()
            } else if (this.isPresentProgInfo) {
                this.navFocusOff();
                this.setFocusOnProgInfoButton()
            } else if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.moveCursorToUp()
                }
            } else if (this.grid != undefined)this.grid.moveCursorToUp()
        } catch (ex) {
            ex.errMethod =
                "moveFocusToUp";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, moveFocusToDown: function () {
        try {
            if (this.isFocusOnTopButton)if (this.grid != undefined) {
                this.navFocusOff();
                this.grid.selectElementByPosition(0, true, false)
            } else if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.isPresentProgInfo) {
                    this.navFocusOff();
                    this.setFocusOnProgInfoButton()
                }
            } else if (this.isFocusOnProgInfo)if (this.isPresentToButton) {
                this.navFocusOff();
                this.setFocusOnTopButton()
            } else if (this.grid != undefined) {
                this.navFocusOff();
                this.grid.selectElementByPosition(0, true, false)
            } else if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else {
                if (this.isPresentMeerTv) {
                    this.navFocusOff();
                    this.setFocusOnMeerTVButton()
                }
            } else if (this.isFocusOnMeerTvButton)if (this.isPresentProgInfo) {
                this.navFocusOff();
                this.setFocusOnProgInfoButton()
            } else if (this.isPresentToButton) {
                this.navFocusOff();
                this.setFocusOnTopButton()
            } else if (this.grid != undefined) {
                this.navFocusOff();
                this.grid.selectElementByPosition(0, true, false)
            } else {
                if (this.isPresentThermCond) {
                    this.navFocusOff();
                    this.setFocusOnThermCondButton()
                }
            } else if (this.isFocusOnThermCondButton)if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentProgInfo) {
                this.navFocusOff();
                this.setFocusOnProgInfoButton()
            } else if (this.isPresentToButton) {
                this.navFocusOff();
                this.setFocusOnTopButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(0, true, false)
                }
            } else if (this.indexPage ==
                0 && this.itemPosition == this.obj.length - 1)if (this.isPresentThermCond) {
                this.navFocusOff();
                this.setFocusOnThermCondButton()
            } else if (this.isPresentMeerTv) {
                this.navFocusOff();
                this.setFocusOnMeerTVButton()
            } else if (this.isPresentProgInfo) {
                this.navFocusOff();
                this.setFocusOnProgInfoButton()
            } else if (this.isPresentToButton) {
                this.navFocusOff();
                this.setFocusOnTopButton()
            } else {
                if (this.grid != undefined) {
                    this.navFocusOff();
                    this.grid.selectElementByPosition(0, true, false)
                }
            } else if (this.grid != undefined)this.grid.moveCursorToDown()
        } catch (ex) {
            ex.errMethod =
                "moveFocusToDown";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            if (this.isFocusOnTopButton && this.isPresentToButton)this.menuListTopElem.focusOn(); else if (this.isPresentMeerTv && this.isFocusOnMeerTvButton)this.menuListMeerTvElem.focusOn(); else if (this.isPresentThermCond && this.isFocusOnThermCondButton)this.menuListThermCondElem.focusOn(); else if (this.isPresentProgInfo && this.isFocusOnProgInfo)this.menuListProgInfoElem.focusOn(); else if (this.grid != undefined && this.grid != null)this.grid.focusOn();
            else if (this.isPresentToButton) {
                this.menuListTopElem.focusOn();
                this.isFocusOnTopButton = true
            } else if (this.isPresentMeerTv) {
                this.menuListMeerTvElem.focusOn();
                this.isFocusOnMeerTvButton = true
            } else if (this.isPresentThermCond) {
                this.isFocusOnThermCondButton = true;
                this.menuListThermCondElem.focusOn()
            }
            this.isFocusOn = true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (this.isPresentToButton && this.isFocusOnTopButton)this.menuListTopElem.focusOff();
            else if (this.isPresentMeerTv && this.isFocusOnMeerTvButton)this.menuListMeerTvElem.focusOff(); else if (this.isPresentThermCond && this.isFocusOnThermCondButton)this.menuListThermCondElem.focusOff(); else if (this.isPresentProgInfo && this.isFocusOnProgInfo)this.menuListProgInfoElem.focusOff(); else if (this.grid != undefined && this.grid != null)this.grid.focusOff();
            this.isFocusOn = false
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }, navFocusOff: function () {
        try {
            if (this.isPresentToButton &&
                this.isFocusOnTopButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false
            } else if (this.isPresentMeerTv && this.isFocusOnMeerTvButton) {
                this.menuListMeerTvElem.focusOff();
                this.isFocusOnMeerTvButton = false
            } else if (this.isPresentThermCond && this.isFocusOnThermCondButton) {
                this.menuListThermCondElem.focusOff();
                this.isFocusOnThermCondButton = false
            } else if (this.isPresentProgInfo && this.isFocusOnProgInfo) {
                this.menuListProgInfoElem.focusOff();
                this.isFocusOnProgInfo = false
            } else if (this.grid != undefined &&
                this.grid != null)this.grid.focusOff();
            this.isFocusOn = false
        } catch (ex) {
            ex.errMethod = "navFocusOff";
            ex.errClass = "ModuleMenuDetailList";
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
        if (this.grid.getNumPage() > 1) {
            if (this.isFocusOnTopButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false
            }
            this.getMenuList().changePageDown()
        }
    }, getMenuList: function () {
        return this.grid
    },
    showArrowUp: function () {
        this.ItemDetsUpImg.show()
    }, showArrowDown: function () {
        this.ItemDetsDownImg.show()
    }, hideArrowUp: function () {
        this.ItemDetsUpImg.hide()
    }, hideArrowDown: function () {
        this.ItemDetsDownImg.hide()
    }, clean: function () {
        try {
            if (this.arrowDown != null && (this.arrowDown != undefined && (this.arrowUp != null && this.arrowUp != undefined))) {
                this.arrowDown.getObj().hide();
                this.arrowUp.getObj().hide()
            }
            if (this.isFocusOnTopButton && this.isPresentToButton) {
                this.menuListTopElem.focusOff();
                this.isFocusOnTopButton = false;
                this.isPresentToButton = false
            }
            this.setItemUnSelected();
            if (this.grid != null && this.grid != undefined) {
                this.getModObj().removeChild(this.grid.getObj());
                this.grid = null
            }
            if (this.isPresentMeerTv && this.menuListMeerTvElem != null) {
                this.isPresentMeerTv = false;
                this.getModObj().removeChild(this.menuListMeerTvElem.getObj());
                this.menuListMeerTvElem = null
            }
            if (this.isPresentThermCond && this.menuListThermCondElem != null) {
                this.isPresentThermCond = false;
                this.getModObj().removeChild(this.menuListThermCondElem.getObj());
                this.menuListThermCondElem =
                    null
            }
            if (this.isPresentProgInfo && this.menuListProgInfoElem != null) {
                this.isPresentProgInfo = false;
                this.getModObj().removeChild(this.menuListProgInfoElem.getObj());
                this.menuListProgInfoElem = null
            }
            this.isFocusOnMeerTvButton = false;
            this.isFocusOnProgInfo = false;
            this.isFocusOnThermCondButton = false;
            this.isFocusOnTopButton = false;
            this.isClean = true
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ModuleMenuDetailList";
            fw.err(ex)
        }
    }
});
