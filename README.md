jquery-tiny-tooltip
===================

Lightweight jQuery tooltip plugin


Content can be a function with callback:

    (function(){
        var contentSet = false;

        $(element).tinyTooltip({
            content: function(callback) {
                if (!contentSet) {
                    // set initial tooltip content
                    callback('Loading...');

                    // fetch actual tooltip content
                    $.ajax({
                        url: '/actual-content/',
                        success: function(data){
                            contentSet = true;

                            // fill tooltip with actual content
                            callback(data)
                        }
                    });
                }
                else {

                    // call callback without argument to show tooltip without modifying content
                    callback();
                }
            }
        });
    })();