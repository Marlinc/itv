var Profiling = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting Profiling");
            this.profilingEventQueue = new Array
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, isProfileActive: function () {
        try {
            var profileActive = false;
            if (fw.conf.profilingEnable != null && (fw.conf.profilingEnable != undefined && fw.conf.profilingEnable == true))if (fw.conf.profilingActive == fw.conf.profilingActiveAll)profileActive = true; else if (fw.conf.profilingActive == fw.conf.profilingActiveGroup && fw.subscriberDataManager.isUserInProfilingGroup())profileActive =
                true;
            return profileActive
        } catch (ex) {
            ex.errMethod = "isProfileActive";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, push: function (_type, _label) {
        try {
            if (this.isProfileActive()) {
                var profilingEventObj = {"type": _type, "label": _label, "timestamp": (new Date).getTime()};
                this.profilingEventQueue.push(profilingEventObj);
                if (this.profilingEventQueue.length >= fw.conf.profilingMaxSize)this.flush()
            }
        } catch (ex) {
            ex.errMethod = "push";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, clear: function () {
        try {
            this.profilingEventQueue.splice(0, this.profilingEventQueue.length)
        } catch (ex) {
            ex.errMethod =
                "clear";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, print: function () {
        try {
            if (fw.conf.profilingMode == fw.conf.profilingModeStatistic) {
                var statisticResultMap = new Object;
                var lastStartValueMap = new Object;
                for (var i = 0; i < this.profilingEventQueue.length; i++)if (this.profilingEventQueue[i].type == "END") {
                    var lastStartValueItem = lastStartValueMap[this.profilingEventQueue[i].label];
                    if (lastStartValueItem != null && lastStartValueItem != undefined) {
                        var delta = this.profilingEventQueue[i].timestamp - lastStartValueItem.timestamp;
                        if (statisticResultMap[this.profilingEventQueue[i].label] !=
                            null && statisticResultMap[this.profilingEventQueue[i].label] != undefined)statisticResultMap[this.profilingEventQueue[i].label].push(delta); else {
                            statisticResultMap[this.profilingEventQueue[i].label] = new Array;
                            statisticResultMap[this.profilingEventQueue[i].label].push(delta)
                        }
                    }
                } else lastStartValueMap[this.profilingEventQueue[i].label] = this.profilingEventQueue[i];
                for (var key in statisticResultMap) {
                    var average = this.getAverageFromNumArr(statisticResultMap[key], 2);
                    var variance = this.getVariance(statisticResultMap[key],
                        2);
                    var standardDeviation = this.getStandardDeviation(statisticResultMap[key], 2);
                    var profileEventRow = this.composeProfileEventRowStatisticMode(key, average, variance, standardDeviation);
                    fw.dataManager.doCallAsync("GET", fw.conf.profilingService + encodeURIComponent(profileEventRow), null, null, false, false)
                }
            } else if (fw.conf.profilingMode == fw.conf.profilingModeStandard)for (var i = 0; i < this.profilingEventQueue.length; i++) {
                var profileEventRow = this.composeProfileEventRowStandardMode(this.profilingEventQueue[i].type,
                    this.profilingEventQueue[i].timestamp, this.profilingEventQueue[i].label);
                fw.dataManager.doCallAsync("GET", fw.conf.profilingService + encodeURIComponent(profileEventRow), null, null, false, false)
            }
        } catch (ex) {
            ex.errMethod = "print";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, flush: function () {
        try {
            this.print();
            this.clear()
        } catch (ex) {
            ex.errMethod = "flush";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, composeProfileEventRowStandardMode: function (_type, _timestamp, _label) {
        try {
            return fw.conf.profilingModeStandard + "|" + new Date + "|" +
                fw.mwManager.getSubscriberId() + "|" + fw.mwManager.getMACAddress() + "|" + _type + "|" + _timestamp + "|" + _label
        } catch (ex) {
            ex.errMethod = "composeProfileEventRowStandardMode";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, composeProfileEventRowStatisticMode: function (_key, _average, _variance, _standardDeviation) {
        try {
            return fw.conf.profilingModeStatistic + "|" + new Date + "|" + fw.mwManager.getSubscriberId() + "|" + fw.mwManager.getMACAddress() + "|" + _key + "|" + _average + "|" + _variance + "|" + _standardDeviation
        } catch (ex) {
            ex.errMethod = "composeProfileEventRowStatisticMode";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, isArrayObj: function (_obj) {
        try {
            return Object.prototype.toString.call(_obj) === "[object Array]"
        } catch (ex) {
            ex.errMethod = "isArrayObj";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, getNumWithSetDec: function (_num, _numOfDec) {
        try {
            var pow10s = Math.pow(10, _numOfDec || 0);
            return _numOfDec ? Math.round(pow10s * _num) / pow10s : _num
        } catch (ex) {
            ex.errMethod = "getNumWithSetDec";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, getAverageFromNumArr: function (_numArr, _numOfDec) {
        try {
            if (!this.isArrayObj(_numArr))return false;
            var i = _numArr.length;
            var sum = 0;
            while (i--)sum += _numArr[i];
            return this.getNumWithSetDec(sum / _numArr.length, _numOfDec)
        } catch (ex) {
            ex.errMethod = "getAverageFromNumArr";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, getVariance: function (_numArr, _numOfDec) {
        try {
            if (!this.isArrayObj(_numArr))return false;
            var avg = this.getAverageFromNumArr(_numArr, _numOfDec);
            var i = _numArr.length;
            var v = 0;
            while (i--)v += Math.pow(_numArr[i] - avg, 2);
            v /= _numArr.length;
            return this.getNumWithSetDec(v, _numOfDec)
        } catch (ex) {
            ex.errMethod = "getVariance";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }, getStandardDeviation: function (_numArr, _numOfDec) {
        try {
            if (!this.isArrayObj(_numArr))return false;
            var stdDev = Math.sqrt(this.getVariance(_numArr, _numOfDec));
            return this.getNumWithSetDec(stdDev, _numOfDec)
        } catch (ex) {
            ex.errMethod = "getStandardDeviation";
            ex.errClass = "Profiling";
            fw.err(ex)
        }
    }
});
