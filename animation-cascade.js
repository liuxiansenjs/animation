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
    var initPos = {
        left: spec.offsetLeft,
        top: spec.offsetTop,
    }

    var time = null
    var after = 0

    function move(destination, duration) {
        duration = duration ? duration : 1000
        var refresh = 1000 / 60
        var count = duration / refresh
        var now = {
            left: initPos.left,
            top: initPos.top,
        }
        var destPos = {
            left: destination.left || destination.left === 0 ? destination.left : initPos.left,
            top: destination.top || destination.top === 0 ? destination.top : initPos.top,
        }
        var init_diff = {
            x: destPos.left - initPos.left,
            y: destPos.top - initPos.top,
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
                    after = 0
                    return
                }
                actualCount += 1

                loop()
            }, refresh)
        }
        setTimeout(function() {
            loop()
        }, after)
        initPos = destPos
        after += duration + 10
        return that
    }

    function brake() {
        clearTimeout(time)
    }
    that.move = move
    return that
}