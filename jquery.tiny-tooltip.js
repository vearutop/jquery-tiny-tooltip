// https://github.com/vearutop/jquery-tiny-tooltip
;(function($) {
    var mouseX, mouseY, $window = $(window);

    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $.fn.tinyTooltip = function(options) {
        this.each(function(){
            var b = $(this),
                o = {
                    content: b.attr('title'),
                    showDelay: 300,
                    hideDelay: 500,
                    className: 'tooltip',
                    classHidden: '',
                    offsetTop: 10,
                    offsetBottom: 20,
                    offsetLeft: 10,
                    offsetRight: 20
                };

            $.extend(o, options);
            b.attr('title', '');

            if (o.content instanceof jQuery) {
                o.content = o.content.html();
            }


            var tipOver, tipVisible, elementOver, timer, tipElement;

            tipElement = $('<div class="' + o.className
                + ' ' + o.classHidden +  '" style="position: absolute;">' + o.content + '</div>');
            $('body').append(tipElement);
            var tipHeight = $(tipElement).height(),
                tipWidth = $(tipElement).width();

            hide();

            function show() {
                if ((!tipOver && !elementOver) || tipVisible) {
                    return;
                }

                var centerX = $window.width() / 2,
                    centerY = $window.height() / 2,
                    top =  mouseY + (mouseY - $window.scrollTop() > centerY ? -tipHeight - o.offsetBottom : o.offsetTop),
                    left = mouseX + (mouseX - $window.scrollLeft() > centerX ? -tipWidth - o.offsetRight  : o.offsetLeft);


                tipElement.css({
                    top: top + 'px',
                    left: left + 'px'
                });

                if (o.classHidden) {
                    $(tipElement).removeClass(o.classHidden);
                }
                else {
                    tipElement.show();
                }

                tipVisible = 1;
            }

            function hide() {
                if (tipOver || elementOver) {
                    return;
                }

                if (o.classHidden) {
                    $(tipElement).addClass(o.classHidden);
                }
                else {
                    tipElement.hide();
                }

                tipVisible = 0;
            }

            function mouseEvent(callback, delay) {
                clearTimeout(timer);
                timer = setTimeout(callback, delay);
            }

            function mouseOut(type) {
                clearTimeout(timer);
                timer = setTimeout(hide, option(sHideDelay));
            }

            tipElement.mouseover(function(){
                tipOver = 1;
                mouseEvent(show, o.showDelay);
            });

            b.mouseover(function(){
                elementOver = 1;
                mouseEvent(show, o.showDelay);
            });

            b.mouseout(function(){
                elementOver = 0;
                mouseEvent(hide, o.hideDelay);
            });

            tipElement.mouseout(function(){
                tipOver = 0;
                mouseEvent(hide, o.hideDelay);
            });

        });

        return this;
    };
}(jQuery));