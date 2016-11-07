AFRAME.registerComponent('gamepad-listener', {
    // When the window is clicked, emit a click event from the entity.
    init: function () {
        var el = this.el;
        window.addEventListener('gamepadbuttondown', function (e) {
            if (e.detail.index == 2) {
                el.emit('click', null, false);
            }
        });
    }
});