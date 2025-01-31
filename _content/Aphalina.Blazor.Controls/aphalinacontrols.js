
window.aphalina = {

    getWindowSize: function () {
        return { width: window.innerWidth, height: window.innerHeight, devicePixelRatio: window.devicePixelRatio };
    },

    getElementPosition: function (elementId) {

        var element = document.getElementById(elementId);

        if (element) {

            var rect = element.getBoundingClientRect();

            return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, windowWidth: window.innerWidth, windowHeight: window.innerHeight };
        }

        return null;
    },

    dismissListeners: [],

    addDismissListener: function (elementId) {
        this.dismissListeners.push(elementId);
    },

    removeDismissListener: function (elementId) {
        const index = this.dismissListeners.indexOf(elementId);
        if (index > -1) {
            this.dismissListeners.splice(index, 1);
        }
    },

    reportClick: function (e) {
        if (this.aphalina.dismissListeners.length > 0) {
            var elementId = this.aphalina.dismissListeners[this.aphalina.dismissListeners.length - 1];
            var element = document.getElementById(elementId);
            if (element) {
                var isClickInsideElement = element.contains(e.target);
                if (!isClickInsideElement) {
                    DotNet.invokeMethodAsync('Aphalina.Blazor.Controls', 'ReportClickOutside', elementId);
                }
            }
        }
    },

    reportKeyDown: function (e) {
        DotNet.invokeMethodAsync('Aphalina.Blazor.Controls', 'ReportKeyDown', e.key);
    },

    startGlobalKeyListener: function (elementId) {
        window.addEventListener('keydown', window.aphalina.reportKeyDown);
    },

    stopGlobalKeyListener: function (elementId) {
        window.removeEventListener('keydown', window.aphalina.reportKeyDown);
  },

  openDialog: function (dialogId) {
    document.getElementById(dialogId).showModal();
  },

  setFocus: function (selector) {
    let element = document.querySelector(selector);
    if (element) {
      element.focus();
    }
  },
};

window.browserResize = {
    startBrowserResizeLisener: function () {
        window.addEventListener('resize', window.browserResize.resized);
    },
    stopBrowserResizeLisener: function () {
        window.removeEventListener('resize', window.browserResize.resized);
    },
    resized: function () {
        DotNet.invokeMethodAsync('Aphalina.Blazor.Controls', 'OnBrowserResize');
    }
}

window.addEventListener('click', window.aphalina.reportClick);


