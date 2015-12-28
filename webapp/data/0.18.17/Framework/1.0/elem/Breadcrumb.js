Breadcrumb = Class.create({
    initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            fw.log.info("Starting Breadcrumb");
            this.breadCrumbStrList = new Array;
            this.textBrdGuiList = new Array;
            this.imgBrdGuiList = new Array;
            this.totalTextLengthPx = 0;
            this.charAvgPx = 16;
            this.shortTxt = "...";
            this.shortTxtPixelLength = 28;
            this.leftPosition = this.css.styleItemCont.left;
            this.breadCrumb = fw.cssBuilder.createDiv(this.id + "_Breadcrumb", this.css.styleItemCont.style);
            this.breadCrumb.show()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass =
                "Breadcrumb";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.breadCrumb.style.visibility = "hidden"
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.breadCrumb.style.visibility = "inherit"
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.breadCrumb
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, getBreadCrumbList: function () {
        try {
            return this.breadCrumbStrList
        } catch (ex) {
            ex.errMethod = "getBreadCrumbList";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, getNumFinalPx: function (_str, _lastCheck) {
        try {
            var numPxImg = (_str.length - 1) * this.css.styleItemImg.w;
            var numPxTxt = 0;
            var exitCond = _str.length;
            if (_lastCheck != undefined && (_lastCheck && _str.length > 2))exitCond = _str.length - 2;
            for (var i = 0; i < exitCond; i++)numPxTxt = numPxTxt + this.getDimSingleTxtItem(_str[i]);
            return numPxTxt + numPxImg
        } catch (ex) {
            ex.errMethod = "getNumFinalPx";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, calculateTotPixel: function (_str) {
        try {
            fw.log.debug("px_breadCrumbList: ",
                _str);
            var totPixel = this.getNumFinalPx(_str);
            fw.log.debug("NUM Tot Px: " + totPixel);
            var stepToTrunk = 0;
            if (this.css.styleItemCont.w != undefined && (totPixel > this.css.styleItemCont.w && _str.length > 2)) {
                var i = 1;
                while (totPixel > this.css.styleItemCont.w && i < _str.length - 2) {
                    totPixel = totPixel - this.getDimSingleTxtItem(_str[i]);
                    totPixel = totPixel + this.getDimSingleTxtItem(this.shortTxt);
                    stepToTrunk = stepToTrunk + 1;
                    i++
                }
                fw.log.debug("Num totStrings: " + _str.length);
                fw.log.debug("Num ToTrunk: " + stepToTrunk)
            }
            return stepToTrunk
        } catch (ex) {
            ex.errMethod =
                "calculateTotPixel";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, trunkSteps: function (_arr, _num) {
        try {
            var i = 1;
            while (_num > 0) {
                _arr[i] = this.shortTxt;
                _num--;
                i++
            }
            return _arr
        } catch (ex) {
            ex.errMethod = "trunkStep";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, getDimSingleTxtItem: function (_txt) {
        try {
            var textBrd = fw.cssBuilder.createText(this.id + "_Txt_" + i, this.css.styleItemText.style);
            textBrd.setTxt(_txt);
            textBrd.style.visibility = "hidden";
            this.breadCrumb.appendChild(textBrd);
            var dim = textBrd.offsetWidth;
            this.breadCrumb.removeChild(textBrd);
            fw.log.debug("WidthPx -> " + _txt + ": " + dim);
            return dim
        } catch (ex) {
            ex.errMethod = "getDimSingleTxtItem";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, drawBreadCrumb: function (_arr, width1, width2) {
        try {
            for (var i = 0; i < _arr.length; i++) {
                var textBrd = fw.cssBuilder.createText(this.id + "_Txt_" + i, this.css.styleItemText.style);
                var imgBrd = fw.cssBuilder.createImg(this.id + "_Img_" + i, this.css.styleItemImg.style);
                textBrd.style.position = "relative";
                textBrd.style.display = "inline-block";
                if (i == _arr.length - 2 && width2 > 0) {
                    fw.log.debug("width2 = " +
                        width2);
                    textBrd.style.maxWidth = width2 + "px";
                    textBrd.style.overflow = "hidden";
                    textBrd.style.textOverflow = "ellipsis"
                } else if (i == _arr.length - 1 && width1 > 0) {
                    fw.log.debug("width1 = " + width1);
                    textBrd.style.maxWidth = width1 + "px";
                    textBrd.style.overflow = "hidden";
                    textBrd.style.textOverflow = "ellipsis"
                }
                imgBrd.style.position = "relative";
                imgBrd.style.display = "inline-block";
                textBrd.setTxt(_arr[i]);
                imgBrd.setUrl("");
                this.textBrdGuiList.push(textBrd);
                if (i > 0) {
                    this.imgBrdGuiList.push(imgBrd);
                    this.breadCrumb.appendChild(imgBrd)
                }
                this.breadCrumb.appendChild(textBrd)
            }
        } catch (ex) {
            ex.errMethod =
                "drawBreadCrumb";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, manageBreadCrumb: function (_arrStr) {
        try {
            var arrApp = new Array;
            for (var i = 0; i < _arrStr.length; i++)arrApp.push(_arrStr[i]);
            var numStepToTrunk = this.calculateTotPixel(arrApp);
            var arrBrd = this.trunkSteps(arrApp, numStepToTrunk);
            var offset = this.getNumFinalPx(arrBrd) - this.css.styleItemCont.w;
            var width1 = 0;
            var width2 = 0;
            if (offset > 0) {
                var usableSpace = parseInt(this.css.styleItemCont.w - this.getNumFinalPx(arrBrd, true));
                fw.log.debug("Usable space = " + usableSpace);
                width1 = parseInt(usableSpace / 2);
                width2 = parseInt(usableSpace / 2)
            }
            this.drawBreadCrumb(arrBrd, width1, width2)
        } catch (ex) {
            ex.errMethod = "manageBreadCrumb";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, pushList: function (_arrStr, _newMeth) {
        try {
            if (_newMeth != undefined && _newMeth) {
                this.breadCrumbStrList = new Array;
                for (var i = 0; i < _arrStr.length; i++)this.breadCrumbStrList.push(_arrStr[i]);
                this.manageBreadCrumb(_arrStr)
            } else for (var f = 0; f < _arrStr.length; f++)this.push(_arrStr[f])
        } catch (ex) {
            ex.errMethod = "pushList";
            ex.errClass =
                "Breadcrumb";
            fw.err(ex)
        }
    }, clearUI: function () {
        try {
            while (this.textBrdGuiList.length > 0)this.breadCrumb.removeChild(this.textBrdGuiList.pop());
            while (this.imgBrdGuiList.length > 0)this.breadCrumb.removeChild(this.imgBrdGuiList.pop())
        } catch (ex) {
            ex.errMethod = "clearUI";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, push: function (_str, _newMethod) {
        try {
            if (_newMethod != undefined && _newMethod) {
                this.clearUI();
                this.breadCrumbStrList.push(_str);
                this.manageBreadCrumb(this.breadCrumbStrList)
            } else {
                this.breadCrumbStrList.push(_str);
                var textBrd = fw.cssBuilder.createText(this.id + "_Txt_" + this.breadCrumbStrList.length, this.css.styleItemText.style);
                var imgBrd = fw.cssBuilder.createImg(this.id + "_Img_" + this.breadCrumbStrList.length, this.css.styleItemImg.style);
                textBrd.style.position = "relative";
                textBrd.style.display = "inline-block";
                imgBrd.style.position = "relative";
                imgBrd.style.display = "inline-block";
                textBrd.setTxt(_str);
                imgBrd.setUrl("");
                this.textBrdGuiList.push(textBrd);
                if (this.breadCrumbStrList.length > 1) {
                    this.imgBrdGuiList.push(imgBrd);
                    this.breadCrumb.appendChild(imgBrd);
                    this.totalTextLengthPx += this.css.styleItemImg.w
                }
                this.breadCrumb.appendChild(textBrd);
                this.totalTextLengthPx += _str.length * this.charAvgPx;
                if (parseInt(this.totalTextLengthPx) > this.css.styleItemCont.w) {
                    fw.log.debug("Breadcrumb too long: " + parseInt(this.totalTextLengthPx) + "px - max " + this.css.styleItemCont.w);
                    this.restoreAllTxt();
                    this.txtToDot()
                }
            }
        } catch (ex) {
            ex.errMethod = "push";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, txtToDot: function () {
        try {
            var tooLong = true;
            var i = 1;
            while (tooLong &&
            i < this.breadCrumbStrList.length - 1) {
                this.textBrdGuiList[i].setTxt(this.shortTxt);
                this.totalTextLengthPx -= this.breadCrumbStrList[i].length * this.charAvgPx;
                this.totalTextLengthPx += this.shortTxtPixelLength;
                if (this.totalTextLengthPx <= this.css.styleItemCont.w)tooLong = false;
                i++
            }
        } catch (ex) {
            ex.errMethod = "txtToDot";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, restoreAllTxt: function () {
        try {
            this.totalTextLengthPx = 0;
            for (var z = 0; z < this.textBrdGuiList.length; z++) {
                this.textBrdGuiList[z].setTxt(this.breadCrumbStrList[z]);
                this.totalTextLengthPx += this.breadCrumbStrList[z].length * this.charAvgPx + this.css.styleItemImg.w
            }
            this.totalTextLengthPx -= this.css.styleItemImg.w
        } catch (ex) {
            ex.errMethod = "restoreAllTxt";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, pop: function () {
        try {
            if (this.textBrdGuiList.length > 0)this.breadCrumb.removeChild(this.textBrdGuiList.pop());
            if (this.imgBrdGuiList.length > 0)this.breadCrumb.removeChild(this.imgBrdGuiList.pop());
            var retVal = null;
            if (this.breadCrumbStrList.length > 0) {
                retVal = this.breadCrumbStrList.pop();
                this.restoreAllTxt();
                if (this.totalTextLengthPx > this.css.styleItemCont.w)this.txtToDot()
            }
            return retVal
        } catch (ex) {
            ex.errMethod = "pop";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, replaceTop: function (_str) {
        try {
            this.pop();
            this.push(_str)
        } catch (ex) {
            ex.errMethod = "replaceTop";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, read: function () {
        try {
            return this.breadCrumbStrList
        } catch (ex) {
            ex.errMethod = "read";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, getTopElement: function () {
        try {
            if (this.breadCrumbStrList.length > 0)return this.breadCrumbStrList[this.breadCrumbStrList.length -
            1]; else return null
        } catch (ex) {
            ex.errMethod = "getTopElement";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }, clear: function () {
        try {
            while (this.pop() != null);
            this.breadCrumbStrList.length = 0;
            this.textBrdGuiList.length = 0;
            this.imgBrdGuiList.length = 0;
            this.totalTextLengthPx = 0
        } catch (ex) {
            ex.errMethod = "clear";
            ex.errClass = "Breadcrumb";
            fw.err(ex)
        }
    }
});
