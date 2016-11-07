var moving = false;
var mainCamera = null;
var currentWaypoint;
AFRAME.registerComponent('waypointcam', {
    schema: {
        start: {
            type: 'vec3',
            default: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        end: {
            type: 'vec3',
            default: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        moving: {
            type: 'boolean',
            default: false
        }
    },
    init: function () {
        var data = this.data;
        data.start = this.el.object3D.position;
        data.end = this.el.object3D.position;
        window.moving = false;
    },
    update: function () {
        var data = this.data;
        data.begin = null;
        data.diff = {
            x: data.end.x - data.start.x,
            y: data.end.y - data.start.y,
            z: data.end.z - data.start.z
        };
        data.distance = Math.sqrt(Math.pow(data.diff.x, 2) + Math.pow(data.diff.y, 2) + Math.pow(data.diff.z, 2));
        data.duration = Math.abs(data.distance * 250);
        window.moving = true;
    },
    tick: function (time, timeDelta) {
        var data = this.data;
        if (data.begin === null) {
            data.begin = time;
        }
        var timeSinceStart = (time - data.begin);
        if (timeSinceStart < data.duration) {
            var fraction = ((timeSinceStart / data.duration) * 100);
            this.el.object3D.position.x = (data.start.x + (fraction * data.diff.x) / 100);
            this.el.object3D.position.y = (data.start.y + (fraction * data.diff.y) / 100);
            this.el.object3D.position.z = (data.start.z + (fraction * data.diff.z) / 100);
        } else {
            window.moving = false;
        }
    }
});
window.onload = function () {
    mainCamera = document.querySelector('#mainCamera');
    currentWaypoint = document.querySelector('#current');
    currentWaypoint.setAttribute('visible', false);
    mainCamera.object3D.position = currentWaypoint.object3D.position;
};
AFRAME.registerComponent('waypoint', {
    init: function () {
        this.el.addEventListener('click', function (e) {
            if (window.moving === false) {
                console.log('waypoint click');
                if (currentWaypoint) {
                    currentWaypoint.setAttribute('visible', true);
                }
                currentWaypoint = e.detail.target;
                var futile = currentWaypoint.getAttribute('data-futile');
                
                currentWaypoint.setAttribute('visible', false);
                
                var cpos = mainCamera.object3D.position;
                mainCamera.setAttribute('waypointcam', 'start', cpos.x + ' ' + cpos.y + ' ' + cpos.z);
                var pos = this.object3D.position;

                var scene = document.querySelector('a-scene');
                //if (pos.y < 10)
                //{
                //    scene.setAttribute('fog', 'type: linear; color: #000; near: 1; far: 3; density: 0.3');
                //}

                if (futile) {
                    mainCamera.setAttribute('waypointcam', 'end', '-0.78 -0.57 -0.78');
                }
                else {
                    mainCamera.setAttribute('waypointcam', 'end', pos.x + ' ' + pos.y + ' ' + pos.z);
                }
            }
        }, true);
    }
});