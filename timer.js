var lastDM;

AFRAME.registerComponent('timer', {
    init: function () {
        this.data = 60;
        lastDM = new Date().getTime();
    },
    tick: function (time, timeDelta) {
        var currDM = new Date().getTime();
        if (currDM < lastDM + 1000) { return; }

        var data = this.data;
        //if (data == 115)
        //{
        //    document.querySelector('[camera]').emit('level0');
        //    document.querySelector('mainCamera').emit('level0');
        //}
        if (data > 0) {
            data = data - 1;
            this.data = data;
            this.el.setAttribute("text", "text: " + data);
            lastDM = currDM;
        }
    }
});