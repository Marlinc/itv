var PinButton = Class.create(Button, {
    initialize: function ($super, _id, _css) {
        $super(_id, _css);
        try {
            this.id = _id;
            this.pinTxtGui = new Array;
            this.pinTxt = new Array;
            this.positionAddPin = 1;
            this.isSelected = false;
            this.middleElem = new Array;
            this.pinLength = this.css.numOfMiddleElements + 2;
            this.hidePin = this.css.hidePin;
            this.lockPin = false;
            this.hidePinStrct = this.css.hidePinStructure;
            if (this.hidePinStrct == undefined || this.hidePinStrct == null)this.hidePinStrct = false;
            if (this.pinLength == undefined || (this.pinLength == null || this.css.numOfMiddleElements ==
                undefined))this.pinLength = 4;
            this.topPosition = 3;
            if (this.css.pinAlignment == "center")this.leftPosition = this.css.styleItemCont.w / 2 - ((this.pinLength - 2) * this.css.styleItemMiddleMaskImgUnselect.width + this.css.styleItemStartMaskImgUnselect.width + this.css.styleItemEndMaskImgUnselect.width) / 2; else this.leftPosition = this.css.styleItemCont.w - (this.pinLength - 2) * this.css.styleItemMiddleMaskImgUnselect.width - this.css.styleItemStartMaskImgUnselect.width - this.css.styleItemEndMaskImgUnselect.width - (this.css.marginRightSide ==
                undefined ? 0 : this.css.marginRightSide);
            this.topTxtRelativePosition = 3;
            this.leftTxtRelativePosition = 0;
            this.isSelect = false;
            this.pinIndex = 1;
            this.firstElem = fw.cssBuilder.createImg(_id + "_" + this.pinIndex, this.css.styleItemStartMaskImgUnselect.style);
            this.firstElem.setUrl("");
            this.firstElem.setY(this.topPosition);
            this.firstElem.setX(this.leftPosition);
            this.btnObj.appendChild(this.firstElem);
            if (this.hidePinStrct)this.firstElem.hide();
            this.pinTxtGui[this.pinIndex] = fw.cssBuilder.createText(_id + "_" + this.pinIndex,
                this.css.styleItemMaskTxtUnselect.style);
            this.pinTxtGui[this.pinIndex].setY(this.topPosition + this.topTxtRelativePosition);
            this.pinTxtGui[this.pinIndex].setX(this.leftPosition + this.leftTxtRelativePosition + 3);
            this.pinTxtGui[this.pinIndex].style.textAlign = "center";
            this.btnObj.appendChild(this.pinTxtGui[this.pinIndex]);
            if (this.hidePinStrct)this.pinTxtGui[this.pinIndex].hide();
            this.leftPosition = this.leftPosition + this.css.styleItemStartMaskImgUnselect.width;
            for (this.pinIndex = 2; this.pinIndex < this.pinLength; this.pinIndex++) {
                this.middleElem[this.pinIndex] =
                    fw.cssBuilder.createImg(_id + "_" + this.pinIndex, this.css.styleItemMiddleMaskImgUnselect.style);
                this.middleElem[this.pinIndex].setUrl("");
                this.middleElem[this.pinIndex].setY(this.topPosition);
                this.middleElem[this.pinIndex].setX(this.leftPosition);
                this.btnObj.appendChild(this.middleElem[this.pinIndex]);
                if (this.hidePinStrct)this.middleElem[this.pinIndex].hide();
                this.pinTxtGui[this.pinIndex] = fw.cssBuilder.createText(_id + "_" + this.pinIndex, this.css.styleItemMaskTxtUnselect.style);
                this.pinTxtGui[this.pinIndex].setY(this.topPosition +
                    this.topTxtRelativePosition);
                this.pinTxtGui[this.pinIndex].setX(this.leftPosition + this.leftTxtRelativePosition);
                this.pinTxtGui[this.pinIndex].style.textAlign = "center";
                this.btnObj.appendChild(this.pinTxtGui[this.pinIndex]);
                if (this.hidePinStrct)this.pinTxtGui[this.pinIndex].hide();
                this.leftPosition = this.leftPosition + this.css.styleItemMiddleMaskImgUnselect.width
            }
            this.lastElem = fw.cssBuilder.createImg(_id + "_" + this.pinIndex, this.css.styleItemEndMaskImgUnselect.style);
            this.lastElem.setUrl("");
            this.lastElem.setY(this.topPosition);
            this.lastElem.setX(this.leftPosition);
            this.btnObj.appendChild(this.lastElem);
            if (this.hidePinStrct)this.lastElem.hide();
            this.pinTxtGui[this.pinIndex] = fw.cssBuilder.createText(_id + "_" + this.pinIndex, this.css.styleItemMaskTxtUnselect.style);
            this.pinTxtGui[this.pinIndex].setY(this.topPosition + this.topTxtRelativePosition);
            this.pinTxtGui[this.pinIndex].setX(this.leftPosition + this.leftTxtRelativePosition);
            this.pinTxtGui[this.pinIndex].style.textAlign = "center";
            this.btnObj.appendChild(this.pinTxtGui[this.pinIndex]);
            if (this.hidePinStrct)this.pinTxtGui[this.pinIndex].hide()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "PinButton";
            fw.err(ex)
        }
    }, hidePinStructure: function () {
        try {
            this.hidePinStrct = true;
            this.firstElem.hide();
            this.pinTxtGui[1].hide();
            for (var i = 2; i < this.pinLength; i++) {
                this.middleElem[i].hide();
                this.pinTxtGui[i].hide()
            }
            this.lastElem.hide();
            this.pinTxtGui[i].hide()
        } catch (ex) {
            ex.errMethod = "hidePinStructure";
            ex.errClass = "PinButton";
            fw.err(ex)
        }
    }, showPinStructure: function () {
        try {
            this.hidePinStrct = false;
            this.lockPin =
                false;
            this.firstElem.show();
            this.pinTxtGui[1].show();
            for (var i = 2; i < this.pinLength; i++) {
                this.middleElem[i].show();
                this.pinTxtGui[i].show()
            }
            this.lastElem.show();
            this.pinTxtGui[i].show()
        } catch (ex) {
            ex.errMethod = "showPinStructure";
            ex.errClass = "PinButton";
            fw.err(ex)
        }
    }, setUnSelected: function () {
        this.isSelected = false;
        this.focusOff()
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.rectObj.setStyle(this.css.styleItemBgSelect.style);
        this.textObj.setStyle(this.css.styleItemTxtSelect.style);
        this.firstElem.setStyle(this.css.styleItemStartMaskImgSelect.style);
        this.pinTxtGui[1].setStyle(this.css.styleItemMaskTxtSelect.style);
        for (this.pinIndex = 2; this.pinIndex < this.pinLength; this.pinIndex++) {
            this.middleElem[this.pinIndex].setStyle(this.css.styleItemMiddleMaskImgSelect.style);
            this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtSelect.style)
        }
        this.lastElem.setStyle(this.css.styleItemEndMaskImgSelect.style);
        this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtSelect.style);
        this.isSelect = true
    }, focusOff: function () {
        if (!this.isSelected) {
            this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
            this.textObj.setStyle(this.css.styleItemTxtUnSelect.style);
            this.firstElem.setStyle(this.css.styleItemStartMaskImgUnselect.style);
            this.pinTxtGui[1].setStyle(this.css.styleItemMaskTxtUnselect.style);
            for (this.pinIndex = 2; this.pinIndex < this.pinLength; this.pinIndex++) {
                this.middleElem[this.pinIndex].setStyle(this.css.styleItemMiddleMaskImgUnselect.style);
                this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtUnselect.style)
            }
            this.lastElem.setStyle(this.css.styleItemEndMaskImgUnselect.style);
            this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtUnselect.style);
            this.isSelect = false
        } else this.selected()
    }, selected: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgSelected.style);
            this.textObj.setStyle(this.css.styleItemTxtSelected.style);
            if (this.firstElem != undefined && (this.css.styleItemStartMaskImgSelected != undefined && this.css.styleItemStartMaskImgSelected.style != undefined)) {
                this.firstElem.setStyle(this.css.styleItemStartMaskImgSelected.style);
                this.pinTxtGui[1].setStyle(this.css.styleItemMaskTxtSelected.style);
                for (this.pinIndex = 2; this.pinIndex < this.pinLength; this.pinIndex++) {
                    this.middleElem[this.pinIndex].setStyle(this.css.styleItemMiddleMaskImgSelected.style);
                    this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtSelected.style)
                }
                this.lastElem.setStyle(this.css.styleItemEndMaskImgSelected.style);
                this.pinTxtGui[this.pinIndex].setStyle(this.css.styleItemMaskTxtSelected.style)
            }
            this.isSelected = true
        } catch (ex) {
            ex.errMethod = "selected";
            ex.errClass = "PinButton";
            fw.err(ex)
        }
    }, setPinChar: function (_value, _position) {
        this.pinTxt[_position] = _value;
        if (_value == null || _value == undefined)this.pinTxtGui[_position].setTxt(""); else if (this.hidePin == false || (this.hidePin ==
            "N" || this.hidePin == "n")) {
            this.pinTxtGui[_position].setY(this.topPosition);
            this.pinTxtGui[_position].setTxt(_value)
        } else {
            this.pinTxtGui[_position].setY(this.topPosition + this.topTxtRelativePosition);
            this.pinTxtGui[_position].setTxt("*")
        }
    }, addPin: function (_pin) {
        if (this.positionAddPin <= this.pinLength) {
            this.pinTxt[this.positionAddPin] = _pin;
            this.pinTxtGui[this.positionAddPin].setTxt("*");
            this.positionAddPin++
        }
    }, removePin: function () {
        var _this = this;
        setTimeout(function () {
            if (_this.positionAddPin > 1) {
                _this.positionAddPin--;
                _this.pinTxt.pop();
                _this.pinTxtGui[_this.positionAddPin].setTxt("")
            }
        }, 1)
    }, clear: function () {
        var _this = this;
        setTimeout(function () {
            for (var i = 1; i <= _this.pinLength; i++) {
                _this.pinTxt.pop();
                _this.pinTxtGui[i].setTxt("")
            }
            _this.positionAddPin = 1
        }, 150)
    }, isFull: function () {
        return this.positionAddPin > this.pinLength
    }, lockInsPin: function () {
        this.lockPin = true;
        this.clear()
    }, unLockInsPin: function () {
        this.lockPin = false
    }, getPinChar: function (_position) {
        return this.pinTxt[_position]
    }, setPin: function (_value) {
        for (var i = 0; i <
        this.pinLength; i++) {
            var charToWrite = _value[i] == null || _value[i] == undefined ? null : _value[i];
            this.setPinChar(charToWrite, i + 1)
        }
    }, getPin: function () {
        var pin = "";
        for (var i = 1; i < this.pinTxt.length; i++)pin += this.pinTxt[i] == null || this.pinTxt[i] == undefined ? "" : this.pinTxt[i];
        return pin
    }, getPinLength: function () {
        return this.pinLength
    }
});
