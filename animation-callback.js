function Foo(spec) {
    try {
        if (this === global) {
            return new Foo(spec)
        }
    } catch (e) {
        if (this === window) {
            return new Foo(spec)
        }
    }
    var that = this
    var now = {
        left: spec.offsetLeft,
        top: spec.offsetTop,
    }

    var time = null

    function move(destination, duration, callback) {
        duration = duration ? duration : 1000
        var refresh = 20
        var count = duration / refresh
        var destPos = {
            left: destination.left || destination.left === 0 ? destination.left : now.left,
            top: destination.top || destination.top === 0 ? destination.top : now.top,
        }
        var init_diff = {
            x: destPos.left - now.left,
            y: destPos.top - now.top,
        }
        var volacity = {
            x: init_diff.x / count,
            y: init_diff.y / count,
        }
        var actualCount = 0

        function loop() {
            brake()
            time = setTimeout(function() {
                if (actualCount < count) {
                    now.left += volacity.x
                }
                if (actualCount < count) {
                    now.top += volacity.y
                }
                spec.style.left = now.left + 'px'
                spec.style.top = now.top + 'px'
                if (actualCount >= count) {
                    now.left = destPos.left
                    now.top = destPos.top
                    spec.style.left = now.left + 'px'
                    spec.style.top = now.top + 'px'
                    callback && callback.call(that)
                    return
                }
                actualCount += 1
                loop()
            }, 20)
        }
        loop()
    }

    function brake() {
        clearTimeout(time)
    }
    that.move = move
    return that
}