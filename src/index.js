(function () {
    const needComment = document.querySelector('.comment')
    const isComment = document.querySelector('.post-form.is-comment')
    needComment.onclick = () => {
        isComment.classList.contains('active') ? isComment.classList.remove('active') : isComment.classList.add('active');
    };
    (function () {
        document.getElementById('cancel-commit').onclick = e => {
            isComment.classList.remove('active')
        }
    })();
    (function () {
        // 设定延迟 因为 Pjax 导致无法及时获取到 hash 值
        setTimeout(() => {
            if (window.location.hash) {
                const comment = window.location.hash.indexOf('#comment');
                const respond_post = window.location.hash.indexOf('#respond-post');
                const want_comment = window.location.hash.indexOf('#want-comment');
                if (respond_post !== -1) {
                    document.querySelector('#comment-form > section > h3').innerHTML = '<i class="fa fa-comments"></i>回复';
                    document.querySelector('#comment-form > section > div > p').innerHTML = document.querySelector('#comment-form > section > div > p').innerHTML + '<a href="#" onclick="window.history.back();">  取消回复</a>'
                    const isComment = document.querySelector('.post-form.is-comment');
                    isComment.classList.contains('active') ? isComment.classList.remove('active') : isComment.classList.add('active');
                } else if (comment !== -1) {
                    let commentLocation = document.querySelector(window.location.hash)
                    commentLocation.querySelector('.comment_main').style.animation = `highlight 1s 1.5s both`
                    commentLocation = getElementTop(commentLocation)
                    scrollSmoothTo(commentLocation)
                } else if (want_comment !== -1) {
                    document.querySelector('#comment-form > section').classList.add('active')
                }
            }
        }, 100)
    })();

    function getElementTop(element) {
        let actualTop = element.offsetTop;
        let current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    function scrollSmoothTo(position) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                return setTimeout(callback, 17);
            };
        }
        // 当前滚动高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 滚动step方法
        const step = function () {
            // 距离目标滚动距离
            let distance = position - scrollTop;
            // 目标滚动位置
            scrollTop = scrollTop + distance / 5;
            if (Math.abs(distance) < 1) {
                window.scrollTo(0, position);
            } else {
                window.scrollTo(0, scrollTop);
                requestAnimationFrame(step);
            }
        };
        step();
    }
}())