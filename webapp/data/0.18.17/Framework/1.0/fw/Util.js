var Util = Class.create({
    initialize: function () {
        this.updateIndexDoneList = new Array
    }, clearTimeout: function (_timer) {
        try {
            if (_timer !== null) {
                clearTimeout(_timer);
                _timer = null
            }
            return _timer
        } catch (ex) {
            ex.errMethod = "clearTimeout";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, setTimeout: function (_func, _delay) {
        try {
            return setTimeout(_func, _delay)
        } catch (ex) {
            ex.errMethod = "setTimeout";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, cloneAllObjectType: function (_obj) {
        try {
            var returnObj = null;
            if (_obj != null && "object" == typeof _obj) {
                if (_obj instanceof
                    Array)returnObj = []; else returnObj = {};
                returnObj = $j.extend(returnObj, _obj)
            }
            return returnObj
        } catch (ex) {
            ex.errMethod = "cloneAllObjectType";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, hex2rgb: function (hex, opacity) {
        try {
            if (hex != "none") {
                var rgb = hex.replace("#", "").match(/(.{2})/g);
                var i = 3;
                while (i--)rgb[i] = parseInt(rgb[i], 16);
                if (typeof opacity == "undefined")return "rgb(" + rgb.join(", ") + ")";
                return "rgba(" + rgb.join(", ") + ", " + opacity + ")"
            }
            return ""
        } catch (ex) {
            ex.errMethod = "hex2rgb";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, destroyNode: function (_node) {
        try {
            try {
                if (_node.nodeName.toLowerCase().indexOf("text") == -1) {
                    while (_node.firstChild)fw.util.destroyNode(_node.firstChild);
                    if (_node.nodeName.toLowerCase() == "img" || _node.nodeName.toLowerCase() == "image")_node.setUrl("")
                }
            } catch (ex) {
                fw.log.error(ex)
            }
            var dump = _node.parentNode.removeChild(_node);
            dump = null;
            _node = null
        } catch (ex) {
            ex.errMethod = "destroyNode";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getHourMinTime: function (_time) {
        try {
            _time.toString().length == 10 ? _time = _time * 1E3 : _time;
            var currentTime = fw.sys.newDate(_time);
            var h = currentTime.getHours();
            var m = currentTime.getMinutes();
            if (currentTime.getHours() < 10)h = "0" + currentTime.getHours();
            if (currentTime.getMinutes() < 10)m = "0" + currentTime.getMinutes();
            var returnStr = h + ":" + m;
            return returnStr
        } catch (ex) {
            ex.errMethod = "getHourMinTime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, calculateAndGetFormattedPrgStartEndTime: function (_prgStart, _duration) {
        try {
            var prgStart = "00:00";
            var prgEnd = prgStart;
            if (_prgStart != null && (_prgStart != undefined && _prgStart != ""))prgStart = fw.util.getHumanTime(_prgStart);
            if (_duration != null && (_duration != undefined && _duration != ""))prgEnd =
                fw.util.getHumanTime(eval(parseInt(_prgStart) + parseInt(_duration) * 60 * 1E3));
            return prgStart + " - " + prgEnd
        } catch (ex) {
            ex.errMethod = "formatPrgStartEndTime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getDayNumLit: function (_time) {
        try {
            _time.toString().length == 10 ? _time = _time * 1E3 : _time;
            var currentTime = fw.sys.newDate(_time);
            var NomDayArr = new Array("zo", "ma", "di", "wo", "do", "vr", "sa");
            var numDay = currentTime.getDate();
            if (currentTime.getDate() < 10)numDay = "0" + currentTime.getDate();
            var month = currentTime.getMonth() + 1;
            if (month <
                10)month = "0" + month;
            var day = currentTime.getDay();
            var returnStr = NomDayArr[currentTime.getDay()] + " " + numDay + "-" + month;
            return returnStr
        } catch (ex) {
            ex.errMethod = "getDayNumLit";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getDate: function (_timestamp, _shortYear) {
        try {
            var a = new Date(_timestamp);
            var year = a.getFullYear() + "";
            if (_shortYear != undefined && _shortYear)year = year.substring(2, 4);
            var month = a.getMonth() + 1;
            var date = a.getDate();
            if (month < 10)month = "0" + month;
            if (date < 10)date = "0" + date;
            var time = date + "-" + month + "-" + year;
            return time
        } catch (ex) {
            ex.errMethod =
                "getDate";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getDatesDiff: function (_date1, _date2) {
        var sec_diff = _date2 - _date1;
        return sec_diff / 864E5
    }, isPresentInArray: function (_array, _obj) {
        try {
            for (var i = 0; i < _array.length; i++)if (_obj === _array[i])return true;
            return false
        } catch (ex) {
            ex.errMethod = "isPresentInArray";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, compareVersion: function (_vers1, _vers2) {
        try {
            arrVer1 = _vers1.split(".");
            arrVer2 = _vers2.split(".");
            if (parseInt(arrVer1[0]) > parseInt(arrVer2[0]))return true; else if (parseInt(arrVer1[0]) ===
                parseInt(arrVer2[0]))for (i = 1; i < arrVer1.length && i < arrVer2.length; i++)if (parseInt(arrVer1[i]) > parseInt(arrVer2[i]))return true;
            return false
        } catch (ex) {
            ex.errMethod = "compareVersion";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, stringStartsWith: function (_str1, _str2) {
        try {
            return _str1.slice(0, _str2.length) == _str2
        } catch (ex) {
            ex.errMethod = "stringStartsWith";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, returnAppMessageArray: function (_appMessagesArray, _arrayToParse) {
        try {
            var arrayToReturn = new Array;
            if (_appMessagesArray != null && _arrayToParse !=
                null)for (var a = 0; a < _arrayToParse.length; a++)if (_appMessagesArray[_arrayToParse[a]] != null) {
                var swapObj = new Object;
                swapObj.contentTitle = _appMessagesArray[_arrayToParse[a]];
                swapObj.action = _arrayToParse[a];
                arrayToReturn.push(swapObj)
            }
            return arrayToReturn
        } catch (ex) {
            ex.errMethod = "returnAppMessageArray";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, returnAppMessageArrayFromObject: function (_appMessagesArray, _arrayToParse) {
        try {
            var arrayToReturn = new Array;
            if (_appMessagesArray != null && _arrayToParse != null)for (var a = 0; a < _arrayToParse.length; a++)if (_appMessagesArray[_arrayToParse[a].label] !=
                null) {
                var swapObj = new Object;
                swapObj.contentTitle = _appMessagesArray[_arrayToParse[a].label];
                swapObj.label = _appMessagesArray[_arrayToParse[a].label];
                swapObj.action = _arrayToParse[a].status;
                swapObj.status = _arrayToParse[a].status;
                arrayToReturn.push(swapObj)
            }
            return arrayToReturn
        } catch (ex) {
            ex.errMethod = "returnAppMessageArrayFromObject";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, returnAppMessageString: function (_appMessagesArray, _messageToParse) {
        try {
            var stringToReturn = "";
            if (_appMessagesArray[_messageToParse] != null)stringToReturn =
                _appMessagesArray[_messageToParse];
            return stringToReturn
        } catch (ex) {
            ex.errMethod = "returnAppMessageString";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, secondsToTime: function (_secs) {
        try {
            fw.log.debug("SECONDS:" + _secs);
            var numdays = Math.floor(_secs / 86400);
            var numhours = Math.floor(_secs % 86400 / 3600);
            var numminutes = Math.floor(_secs % 86400 % 3600 / 60);
            var numseconds = _secs % 86400 % 3600 % 60;
            var obj = {"d": numdays, "h": numhours, "m": numminutes, "s": numseconds};
            return obj
        } catch (ex) {
            ex.errMethod = "secondsToTime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    },
    minsToTime: function (_mins) {
        try {
            return this.secondsToTime(_mins * 60)
        } catch (ex) {
            ex.errMethod = "minsToTime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, minsToDay: function (_mins) {
        try {
            var hours = parseInt(_mins) / 60;
            return hours / 24
        } catch (ex) {
            ex.errMethod = "minsToDay";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, setHourDataTimer: function (_hourLabel, _dateLabel) {
        try {
            fw.util.stopHourDataTimer();
            var dayName = fw.messages.dayOfWeek;
            var date = new Date;
            var sep = "&nbsp;";
            if (this.separatorTime == undefined || !this.separatorTime) {
                var sep = ":";
                this.separatorTime =
                    true
            } else {
                var sep = "&nbsp;";
                this.separatorTime = false
            }
            var minutes = date.getMinutes();
            if (minutes < 10)minutes = "0" + minutes;
            var month = parseInt(date.getMonth()) + 1;
            if (month < 10)month = "0" + month;
            var day = parseInt(date.getDate());
            if (day < 10)day = "0" + day;
            _hourLabel.setTxt(date.getHours() + sep + minutes);
            _dateLabel.setTxt(dayName[parseInt(date.getDay())] + " " + day + "-" + month);
            fw.util.timerTime = fw.util.setTimeout(function () {
                fw.util.setHourDataTimer(_hourLabel, _dateLabel)
            }, 1E3)
        } catch (ex) {
            ex.errMethod = "setHourDataTimer";
            ex.errClass =
                "Util";
            fw.err(ex)
        }
    }, stopHourDataTimer: function () {
        try {
            if (fw.util.timerTime != undefined && fw.util.timerTime != null)this.clearTimeout(fw.util.timerTime)
        } catch (ex) {
            ex.errMethod = "stopHourDataTimer";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getStringDayMonth: function (daysArray, _unix_timestamp) {
        try {
            var day = this.utsToDate(_unix_timestamp).getDate();
            if (day <= 9)day = "0" + day;
            var month = parseInt(this.utsToDate(_unix_timestamp).getMonth() + 1);
            if (month <= 9)month = "0" + month;
            var dayOfWeek = this.utsToDate(_unix_timestamp).getDay();
            return daysArray[dayOfWeek].substring(0,
                    2) + "  " + day + "-" + month
        } catch (ex) {
            ex.errMethod = "getStringDayMonth";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, utsToDate: function (_unix_timestamp) {
        try {
            return new Date(_unix_timestamp)
        } catch (ex) {
            ex.errMethod = "utsToDate";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, formatPrice: function (_priceInCents) {
        try {
            var price = _priceInCents / 100;
            return fw.conf.currencySymbol + " " + price.toFixed(2)
        } catch (ex) {
            ex.errMethod = "formatPrice";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, cloneObjectOld: function (_objDst, _objSrc) {
        try {
            for (var key in _objSrc)_objDst[key] =
                _objSrc[key]
        } catch (ex) {
            ex.errMethod = "cloneObjectOld";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, cloneObject: function (_objSrc) {
        try {
            return Object.create(_objSrc)
        } catch (ex) {
            ex.errMethod = "cloneObject";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, stringToInt: function (_string) {
        try {
            var number = null;
            _string != undefined || _string != null ? number = parseInt(_string) : number = 0;
            if (isNaN(number))return 0; else return number
        } catch (ex) {
            ex.errMethod = "stringToInt";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, softwareVersionToNumbers: function (softwareVersion) {
        try {
            if (softwareVersion ==
                undefined || softwareVersion == null)return new Array(0, 0, 0, 0);
            var softwareVersionArray = softwareVersion.split(".");
            var returnArray = new Array(4);
            returnArray[0] = fw.util.stringToInt(softwareVersionArray[0]);
            if (softwareVersionArray.length > 1)returnArray[1] = fw.util.stringToInt(softwareVersionArray[1]); else returnArray[1] = 0;
            if (softwareVersionArray.length > 2) {
                var softwSubVersionArray = softwareVersionArray[2].split("_");
                returnArray[2] = fw.util.stringToInt(softwSubVersionArray[0]);
                if (softwSubVersionArray.length > 1)returnArray[3] =
                    fw.util.stringToInt(softwSubVersionArray[1]); else returnArray[3] = 0
            } else {
                returnArray[2] = 0;
                returnArray[3] = 0
            }
            return returnArray
        } catch (ex) {
            ex.errMethod = "softwareVersionToNumbers";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getFormattedDate: function (_unixTimestamp) {
        try {
            var day = (new Date(_unixTimestamp)).getDate();
            if (day <= 9)day = "0" + day;
            var month = parseInt((new Date(_unixTimestamp)).getMonth() + 1);
            if (month <= 9)month = "0" + month;
            var dayOfWeek = (new Date(_unixTimestamp)).getDay();
            return fw.messages.dayOfWeek[dayOfWeek].toLowerCase() +
                " " + day + "-" + month
        } catch (ex) {
            ex.errMethod = "getFormattedDate";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getInfoDetailtime: function (_UNIX_timestamp) {
        try {
            return this.getStringDayMonth(fw.messages.dayOfWeek, _UNIX_timestamp) + "  " + this.getHumanTime(_UNIX_timestamp)
        } catch (ex) {
            ex.errMethod = "getInfoDetailtime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getHumanDate: function (UNIX_timestamp) {
        try {
            UNIX_timestamp.toString().length == 10 ? UNIX_timestamp = UNIX_timestamp * 1E3 : UNIX_timestamp;
            var a = fw.sys.newDate(UNIX_timestamp);
            var year = a.getFullYear();
            var month = a.getMonth() + 1;
            var date = a.getDate();
            if (date < 10)date = "0" + date;
            if (month < 10)month = "0" + month;
            return new Array(date, month, year)
        } catch (ex) {
            ex.errMethod = "getHumanDate";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getHumanTime: function (UNIX_timestamp) {
        try {
            UNIX_timestamp.toString().length == 10 ? UNIX_timestamp = UNIX_timestamp * 1E3 : UNIX_timestamp;
            var a = new Date(UNIX_timestamp);
            var hour = a.getHours();
            var min = a.getMinutes();
            if (hour < 10)hour = "0" + hour;
            if (min < 10)min = "0" + min;
            return hour + ":" + min
        } catch (ex) {
            ex.errMethod = "getHumanTime";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }, getDescriptiveDate: function (appObj, humanDate) {
        try {
            var descDate = "";
            var dayNum = (new Date(humanDate[2], humanDate[1], humanDate[0])).getDay();
            var day = eval("appObj.conf.day" + "[" + dayNum + "]") + " ";
            var dayTranslated = eval("appObj.messages." + day);
            descDate += dayTranslated;
            descDate += humanDate[0] + " ";
            var month = eval("appObj.conf.month" + "[" + humanDate[1] + "]");
            var monthTranslated = eval("appObj.messages." + month);
            descDate += monthTranslated;
            return descDate
        } catch (ex) {
            ex.errMethod = "getDescriptiveDate";
            ex.errClass = "Util";
            fw.err(ex)
        }
    }
});
