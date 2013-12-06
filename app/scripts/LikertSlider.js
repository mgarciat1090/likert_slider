/*!
 * Wiser UI Likert Slider 1.0
 * @author Martín García
 * Depends:
 *  jquery
 *  Bootstrap
 */

 (function ($) {
    $.fn.likertSlider = function(options,tags){
        var defaultOptions = {
            random : false,
            stops : 0,
            step: 0
        };
        var default_tags = [
        'I strongly disagree',
        'I disagree',
        'Neutral',
        'I agree',
        'I strongly agree'
        ];


        var options = $.extend(defaultOptions,options),
        tags = $.extend(default_tags,tags),
        buttons = this.find('button'),
        tag = this.find('.selection-tag'),
        selected = undefined,
        clicked = false,
        base = this;

        this.initialize = function(){
            options.stops = buttons.length;
            options.step = 1;

            //attach listeners
            buttons.each(function(iter,btn){
                $(btn).attr('data-seq',iter)
                .on('click',base.changeSelectedButton)
                .on('mouseover',base.hoverButton)
                .on('mouseout',base.outButton)
            });

            //if we get random = true we set a random element as selected
            base.selected = (options.random)?Math.round(Math.random()*buttons.length-1):Math.floor(options.stops/2);

            if(options.random){
                base.switchActiveButton();
                buttons.eq(base.selected).trigger('click');
            }
        };

        this.switchActiveButton = function(){
            buttons.each(function(iter,btn){
                $(btn).removeClass('active')
            });
            buttons.eq(base.selected).addClass('active');

        };

        this.updateTag = function(indexTag, highlight){
            tag.html(tags[indexTag]);
            if(typeof highlight !== 'undefined' && highlight === true)
                tag.addClass('highlight');
            else
                tag.removeClass('highlight');
        };

        //update the selected button index and then activate the current image
        this.changeSelectedButton = function(e){
            base.selected = $(e.currentTarget).attr('data-seq');
            base.switchActiveButton();
            base.updateTag(base.selected,true);
            base.clicked = true;
        };

        //customizes mouseover functionality
        this.hoverButton = function(e){
            var hoveredIndex = $(e.currentTarget).attr('data-seq');
            base.updateTag(hoveredIndex,hoveredIndex === base.selected);

        }
        //customizes mouseout functionality
        this.outButton = function(e){
            if(base.clicked)
                base.updateTag(base.selected,true);
            else
                tag.html('');
        }

        this.getSelected = function(){
            return parseInt(base.selected)+1;
        }

        //call the object constructor
        this.initialize();
        return this;

    }

}(jQuery));