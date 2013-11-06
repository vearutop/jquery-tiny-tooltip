// https://github.com/vearutop/jquery-tiny-tooltip
/*
$('#elementWithTitle').tinyTooltip();



*/


;(function($) {
    var mouseX, mouseY, $window = $(window), last;

    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $.fn.tinyTooltip = function(options) {
        this.each(function(){
            if (this.tinyTooltip) {
                this.tinyTooltip[options](this);
                return;
            }

            var tipOver, tipVisible, elementOver, timer, tipElement, binds, i,
                state = this.tinyTooltip = {};


            var b = $(this),
                o = {
                    content: b.attr('title'),
                    clickSwitch: 0,
                    showDelay: 300,
                    hideDelay: 500,
                    className: 'tooltip',
                    classHidden: '',
                    offsetTop: 10,
                    offsetBottom: 20,
                    offsetLeft: 10,
                    offsetRight: 20,
                    afterShow: 0,
                    afterHide: 0
                };
            if (options.clickSwitch) {
                o.showDelay = o.hideDelay = 0;
            }

            $.extend(o, options);
            b.attr('title', '');


            tipElement = $('<div class="' + o.className
                + ' ' + o.classHidden +  '" style="position: absolute;"></div>');

            $('body').append(tipElement);
            if (o.content instanceof jQuery) {
                o.content.detach();
                tipElement.append(o.content);
            }
            else {
                tipElement.html(o.content);
            }


            var tipHeight = $(tipElement).height(),
                tipWidth = $(tipElement).width();

            performHide();

            function clickToggle() {
                if (tipVisible) {
                    tipOver = elementOver =0;
                    hide();
                }
                else {
                    tipOver = elementOver = 1;
                    show();
                }
            }

            function performShow() {
                if ((!tipOver && !elementOver) || tipVisible) {
                    return;
                }

                if (last && last !== state) {
                    last.hide();
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

                if ('function' == typeof o.afterShow) {
                    o.afterShow();
                }


                last = state;
            }

            function show() {
                delay(performShow, o.showDelay);
            }

            function performHide() {
                if (!o.clickSwitch && (tipOver || elementOver)) {
                    return;
                }

                if (o.classHidden) {
                    $(tipElement).addClass(o.classHidden);
                }
                else {
                    tipElement.hide();
                }

                if ('function' == typeof o.afterHide) {
                    o.afterHide();
                }

                tipVisible = 0;
            }

            function hide() {
                delay(performHide, o.hideDelay);
            }

            function delay(callback, delay) {
                clearTimeout(timer);
                timer = setTimeout(callback, delay);
            }

            if (o.clickSwitch) {
                binds = [
                    [b, 'click', clickToggle]
                ];
            }
            else {
                binds = [
                    [tipElement, 'mouseover', function(){
                        tipOver = 1;
                        show();
                    }],
                    [b, 'mouseover', function(){
                        elementOver = 1;
                        show();
                    }],
                    [b, 'mouseout', function(){
                        elementOver = 0;
                        hide();
                    }],
                    [tipElement, 'mouseout', function(){
                        tipOver = 0;
                        hide();
                    }]
                ];
            }
            for (i = 0; i < binds.length; ++i) {
                binds[i][0].bind(binds[i][1], binds[i][2]);
            }



            state.detach = function(self){
                for (i = 0; i < binds.length; ++i) {
                    binds[i][0].unbind(binds[i][1], binds[i][2]);
                }
                tipElement.remove();
                delete state;
                delete self.tinyTooltip;
            };
            state.show = function(){
                tipOver = elementOver = 1;
                show();
            };
            state.hide = function(){
                tipOver = elementOver = 0;
                hide();
            };

        });

        return this;
    };
}(jQuery));