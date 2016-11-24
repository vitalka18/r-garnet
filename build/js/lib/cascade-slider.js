(function($) {
  $.fn.cascadeSlider = function(opt) {
    var $this = this,
      itemClass = opt.itemClass || 'cascade-slider_item',
      arrowClass = opt.arrowClass || 'cascade-slider_arrow',
      $item = $this.find('.' + itemClass),
      $arrow = $this.find('.' + arrowClass),
      itemCount = $item.length;

    var defaultIndex = 0;
    var intervalTime = 3000;
    var interval = setInterval(changeInteval, intervalTime);

    changeIndex(defaultIndex);

    $('.cascade-slider_item').on('click', changeOnClick);

    function changeOnClick() {
      var action = $(this).data('action'),
        nowIndex = $item.index($this.find('.now'));

      if($(this).hasClass('next')) {
        if(nowIndex == itemCount - 1) {
          changeIndex(0);
        } else {
          changeIndex(nowIndex + 1);
        }
      } else if ($(this).hasClass('prev')) {
        if(nowIndex == 0) {
          changeIndex(itemCount - 1);
        } else {
          changeIndex(nowIndex - 1);
        }
      }

      clearInterval(interval);
      interval = setInterval(changeInteval, intervalTime);
    }

    

    function changeInteval() {
      nowIndex = $item.index($this.find('.now'));
      if(nowIndex == itemCount - 1) {
        changeIndex(0);
      } else {
        changeIndex(nowIndex + 1);
      }
    }
    // add data attributes
    for (var i = 0; i < itemCount; i++) {
      $('.cascade-slider_item').each(function(i) {
        $(this).attr('data-slide-number', [i]);
      });
    }

    function changeIndex(nowIndex) {
      // clern all class
      $this.find('.now').removeClass('now');
      $this.find('.next').removeClass('next');
      $this.find('.prev').removeClass('prev');
      if(nowIndex == itemCount -1){
        $item.eq(0).addClass('next');
      }
      if(nowIndex == 0) {
        $item.eq(itemCount -1).addClass('prev');
      }

      $item.each(function(index) {
        if(index == nowIndex) {
          $item.eq(index).addClass('now');
        }
        if(index == nowIndex + 1 ) {
          $item.eq(index).addClass('next');
        }
        if(index == nowIndex - 1 ) {
          $item.eq(index).addClass('prev');
        }
      });
    }

    $this.addClass('is-active');

    if ( $( window ).width() < 768 && $this.hasClass('is-active') ) {
      clearInterval(interval);
      $('.cascade-slider_item').off('click', changeOnClick);
      $this.removeClass('is-active');
    } else if ( $( window ).width() > 767 &&!$this.hasClass('is-active') ){
      $this.addClass('is-active');
      interval = setInterval(changeInteval, intervalTime);
      $('.cascade-slider_item').on('click', changeOnClick);
    }
    
    $( window ).resize(function() {
      if ( $( window ).width() < 768 && $this.hasClass('is-active') ) {
        clearInterval(interval);
        $('.cascade-slider_item').off('click', changeOnClick);
        $this.removeClass('is-active');
      } else if ( $( window ).width() > 767 &&!$this.hasClass('is-active') ){
        $this.addClass('is-active');
        interval = setInterval(changeInteval, intervalTime);
        $('.cascade-slider_item').on('click', changeOnClick);
      }
    });
  };
})(jQuery);
