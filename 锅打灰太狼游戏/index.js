$(function () {
    // 1.游戏规则点击事件
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    })
    $(".rule>a").click(function () {
        $(".rule").stop().fadeOut(100);
    })
    // 2.开始游戏点击事件
    $(".start").click(function () {
        $(".start").stop().fadeOut(100);
        progressHandler();
        wolfAnimation();
    })
    // 3.从新游戏的点击事件
    $(".gameOver>button").click(function () {
        $(".gameOver").stop().fadeOut(100);
        progressHandler();
        wolfAnimation();
        $("h1").eq(0).html("0");
    })
    // 处理进度条的方法
    var progressWidth = $(".progress").width();
    function progressHandler() {
        $(".progress").css("width", "180");
        progressWidth = $(".progress").width();
        var timer = setInterval(function () {
            progressWidth -= 1;
            $(".progress").css("width", progressWidth);
            if (progressWidth <= 0) {
                clearInterval(timer);
                $(".gameOver").stop().fadeIn(100);
            }
        }, 200)
    }
    // 灰太狼动画的方法
    var wolfTimer;
    function wolfAnimation() {
        var wolf1 = "img/wolf1.png";
        var wolf2 = "img/wolf2.png";
        var arrPos = [
            { left: "100px", top: "115px" },
            { left: "20px", top: "160px" },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ]
        var $wolfimage = $("<div class=\"wolfimage\"></div>");
        var posIndex = Math.round(Math.random() * 8);
        var wolfType = Math.round(Math.random()) == 0 ? wolf1 : wolf2;
        var url = "url(\"" + wolfType + "\")";
        $wolfimage.css({
            position: "absolute",
            width: 100,
            height: 100,
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top,
            background: url
        })
        $(".container").append($wolfimage);
        var wolfLeft = 0;
        var wolftemp = 16;
        // 动画计时器
        gameRules($wolfimage, wolfType);
        wolfTimer = setInterval(function () {
            wolftemp--;
            $wolfimage.css("background-position-x", wolfLeft);
            if (wolftemp > 10) {
                wolfLeft -= 108;
            }
            else if (wolftemp > 4) {
            }
            else if (wolftemp > -1) {
                wolfLeft += 108;
                if (wolfLeft == 0) {
                    $wolfimage.remove();
                    wolfAnimation();
                }
            }
            if (progressWidth <= 0) {
                stopWolfAnimation();
            }
        }, 100)

    }
    // 停止
    function stopWolfAnimation() {
        clearInterval(wolfTimer);
        $(".wolfimage").remove();
    }
    // 监听图片的点击
    function gameRules($wolfimage, wolfType) {
        $wolfimage.click(function () {
            if (wolfType == "img/wolf1.png") {
                $("h1").eq(0).html(parseInt($("h1").eq(0).html()) + 10);
            } else {
                $("h1").eq(0).html(parseInt($("h1").eq(0).html()) - 10);
            }
            var wolftemp = 3;
            var wolfLeft = -648;
            clearInterval(wolfTimer);
            wolfTimer = setInterval(function () {
                if (wolftemp != 0) {
                    wolfLeft -= 108;
                    wolftemp--;
                } else {
                    stopWolfAnimation();
                    wolfAnimation();
                }
                $wolfimage.css("background-position-x", wolfLeft);
            }, 200);

        })
    }
})