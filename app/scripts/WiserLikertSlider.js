/*!
 * Wiser UI Likert Slider 1.0
 * @author Martín García
 * Depends:
 *  jquery
 *  Bootstrap
 */

(function($) {
    $.fn.slider = function(options){
        var default_options = {
            random : false,
            stops : 0,
            step: 1
        };

        var options = $.extend(default_options,options),
            buttons = this.find('button'),
            selected = undefined,
            self = this;

        //update the selected button index and then activate the current image
        this.changeSelectedButton = function(e){
            self.selected = $(e.currentTarget).attr('data-seq');
            self.switchActiveButton();
        };

        this.initialize = function(){
            //reset class to avoid overlapping states
            //attach listener
            options.stops = buttons.length;
            buttons.each(function(iter,btn){
                $(btn).attr('data-seq',iter)
                .on('click',self.changeSelectedButton)
                .on('click',self.changeSelectedButton)
            });

            //if we get random = true we set a random element as selected
            this.selected = (options.random)?Math.round(Math.random()*buttons.length-1):Math.floor(options.stops/2);

            this.switchActiveButton();
        }

        this.switchActiveButton = function(){
            buttons.each(function(iter,btn){
                var $currentBtn = $(btn);
                $currentBtn.removeClass('active')
            });
            buttons.eq(this.selected).addClass('active');
        }

        //call the object constructor
        this.initialize();
        return this;

    }

}(jQuery));