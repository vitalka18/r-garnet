$(document).ready(function() {
  mainSlider();

  $('#top-go').click(function(e) {
    e.preventDefault();
    $('body,html').animate({scrollTop:0},800);
  });

  setEqualHeight($('.goods-view, .goods-view__photo'));

  $('.js-main-promo').hover(function() {
    var $promo = $(this).parent('.main-promo');
    $promo.css({'background-image': 'url(' + $(this).attr('data-img') + ')'})
  }, function() {
    debugger
    var $promo = $(this).parent('.main-promo');
    var $centerPromo = $promo.find('.main-promo__center');
    $promo.css({'background-image': 'url(' + $centerPromo.attr('data-img') + ')'})
  });
});

ymaps.ready(function () {
  if ( $('#map').length ) {
    var myMap = new ymaps.Map('map', {
      center: [59.889708, 30.478156],
      zoom: 14,
      controls: []
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map.png',
      iconImageSize: [195, 184],
      iconImageOffset: [-90, -180]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  }
  
  if ( $('#mapContact').length ) {
    var myContactMap = new ymaps.Map('mapContact', {
      center: [59.889708, 30.478156],
      zoom: 5,
      controls: ['zoomControl', 'typeSelector']
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
      var myPlacemark = new ymaps.Placemark([store.x, store.y], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-2.png',
        iconImageSize: [44, 40],
        iconImageOffset: [-22, -22]
      });

      myContactMap.geoObjects.add(myPlacemark);
      myContactMap.behaviors.disable('scrollZoom');
    });
  }

  $('#lightboxModal').on('show.bs.modal', function (e) {
    var $link = $(e.relatedTarget);
    var $modal = $(e.target);
    var $img = $modal.find('img');
    $img.attr({src: $link.attr('data-img')});
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

function setEqualHeight(columns){
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