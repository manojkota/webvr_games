AFRAME.registerComponent('click-listener', {
    // When the window is clicked, emit a click event from the entity.
    init: function () {
        var el = this.el;
        window.addEventListener('click', function () {
            el.emit('click', null, false);
        });
    }
});