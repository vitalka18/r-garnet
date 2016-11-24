$(document).ready(function() {
  mainSlider();
  
  if ( $(window).width() > 480) {
    setEqualHeight($('.goods-view, .goods-view__photo'));
  }

  $('#cascade-slider').cascadeSlider({});

  $(window).resize(function() {
    if ( $(window).width() > 480) {
      $('.goods-view, .goods-view__photo').css({'height': 'auto'});
      setEqualHeight($('.goods-view, .goods-view__photo'));
    } else {
      $('.goods-view, .goods-view__photo').css({'height': 'auto'});
    }
  });

  $('#top-go').click(function(e) {
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });


  $('.js-main-promo').hover(
    function() {
      var $promo = $(this).parents('.main-promo');
      var $centerPromo = $promo.find('.main-promo__center');
      $centerPromo.addClass('grayscale');
      $( $(this).attr('data-id') ).css('opacity', '1');
    }, 

    function() {
      var $promo = $(this).parents('.main-promo');
      var $centerPromo = $promo.find('.main-promo__center');

      $centerPromo.removeClass('grayscale');
      $( $(this).attr('data-id') ).css('opacity', '0');
    }
  );


  $('#lightboxModal').on('show.bs.modal', function (e) {
    var $link = $(e.relatedTarget);
    var $modal = $(e.target);
    var $img = $modal.find('img');
    $img.attr({src: $link.attr('data-img')});
  });


  $('#schemaMap').on('shown.bs.modal', function (e) {
    var $link = $(e.relatedTarget);
    var mapLat = $link.attr('data-lat') *1 ,
        mapLang = $link.attr('data-lang') *1 ;

    google.maps.event.trigger(window.modalMap, "resize");
    window.modalMap.setCenter({lat: mapLat, lng: mapLang});
    window.myModalPlacemark.setOptions({
      position: {
        lat: mapLat, 
        lng: mapLang
      }
    });
  });

  $('.cart-spinner__btn_prev').on('click', function(e) {
    e.preventDefault();
    var $spinner = $(this).closest('.cart-spinner');
    $spinner.find('.cart-spinner__field').val( parseInt($spinner.find('.cart-spinner__field').val(), 10) - 1);
  });

  $('.cart-spinner__btn_next').on('click', function(e) {
    e.preventDefault();
    var $spinner = $(this).closest('.cart-spinner');
    $spinner.find('.cart-spinner__field').val( parseInt($spinner.find('.cart-spinner__field').val(), 10) + 1);
  });

  $('.js-zoom').zoom({
    magnify: 2
  });

  $('input[name="rad"]').click(function(){
      var $radio = $(this);

      // if this was previously checked
      if ($radio.data('waschecked') == true)
      {
          $radio.prop('checked', false);
          $radio.data('waschecked', false);
      }
      else
          $radio.data('waschecked', true);

      // remove was checked from other radios
      $radio.siblings('input[name="rad"]').data('waschecked', false);
  });

  $('.cg-preview').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    asNavFor: '.cg-pag'
  });

  $('.cg-pag').slick({
    slidesToShow: 2,
    arrows: false,
    slidesToScroll: 1,
    asNavFor: '.cg-preview',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});

function mainSlider() {
  $('.js-main-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
}

function setEqualHeight(columns) {
  var tallestcolumn = 0;
  columns.each(
  function(){
    currentHeight = $(this).height();
    if(currentHeight > tallestcolumn){
      tallestcolumn = currentHeight;
    }
  });
  columns.height(tallestcolumn);
}

function initMap () {
  if ( $('#map').length ) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var image = 'img/map.png';
    var beachMarker = new google.maps.Marker({
      position: {lat: 59.889708, lng: 30.478156},
      map: map,
      size: new google.maps.Size(100, 100),
      icon: image
    });
  }

  if ( $('#mapContact').length ) {
    var myContactMap = new google.maps.Map(document.getElementById('mapContact'), {
      zoom: 5,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var contactStore = [
      {x: 59.889708, y: 30.478156},
      {x: 58.889718, y: 36.478146},
      {x: 58.889718, y: 38.478146},
      {x: 58.889718, y: 40.478146},
      {x: 57.889718, y: 42.478146},
      {x: 56.889718, y: 44.478146},
      {x: 55.889718, y: 28.478146},
      {x: 58.889718, y: 31.478146}
    ];

    contactStore.forEach(function(store) {
      var image = 'img/map-2.png';
      
      var beachMarker = new google.maps.Marker({
        position: {lat: store.x, lng: store.y},
        map: myContactMap,
        size: new google.maps.Size(44, 42),
        icon: image
      });
    });
  }

  if ( $('#mapModal').length ) {
   window.modalMap = new google.maps.Map(document.getElementById('mapModal'), {
      zoom: 14,
      center: {lat: 59.88970, lng: 30.478156}
    });

    var modalImage = 'img/map-2.png';
      
    window.myModalPlacemark = new google.maps.Marker({
      position: {lat: 59.88970, lng: 30.478156},
      map: modalMap,
      size: new google.maps.Size(44, 42),
      icon: modalImage
    });
  }

}