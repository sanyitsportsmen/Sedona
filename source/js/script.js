function initialize() {
  var officeLatLng = new google.maps.LatLng(35.2441049, -113.2101105);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: officeLatLng,
    scrollwheel: false,
    zoom: 8,
    disableDefaultUI: true
  });
  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(officeLatLng);
  });
}


(function($) {
  $(window).load(function() {
    $(".loader__inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
  });
  $(document).ready(function() {
    google.maps.event.addDomListener(window, 'load', initialize);

    var calendarInput = $("#date--in, #date--out");
    calendarInput.datepicker($.datepicker.regional["ru"]);
    calendarInput.datepicker('option', "showAnim", "slideDown");
    $('#trigger-in').click(function(event) {
      event.preventDefault();
      $("#date--in").focus();
    });
    $('#trigger-out').click(function(event) {
      event.preventDefault();
      $("#date--out").focus();
    });
    var monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
      "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    $("#adults, #children").val(0);
    var date = new Date();
    $("#date--in").val(date.getDate() + " " + monthNames[+date.getMonth()] + " " + date.getFullYear());
    date.setDate(date.getDate() + 1);
    $("#date--out").val(date.getDate() + " " + monthNames[+date.getMonth()] + " " + date.getFullYear());

    plusButton("#plus--adults", "#adults");
    minusButton("#minus--adults", "#adults");
    plusButton("#plus--children", "#children");
    minusButton('#minus--children', "#children");

    var closeMenu = false;
    $(window).resize(function() {
      if (window.matchMedia('(min-width: 769px)').matches) {
        closeMenu = false;
        $(".main-nav").show();
        if ($("a").is(".close--menu")) {
          $(".close--menu").remove();
        }
      } else {
        if (closeMenu != true) {
          $(".main-nav").hide();
        }
      }
    });
    $(".menu--open").click(function(event) {
      event.preventDefault();
      closeMenu = true;
      $(".main-nav").slideDown();
      var addCloseMenu = $('<a href="#" class="close--menu"></a>')
        .click(function(event) {
          event.preventDefault();
          $(".main-nav").slideUp();
        });
      $(".main-nav__item").first().append(addCloseMenu);
    });

    function plusButton(selector, selectorEdit) {
      $(selector).click(function(event) {
        event.preventDefault();
        var self = $(selectorEdit);
        self.val(+self.val() + 1);
      });
    }

    function minusButton(selector, selectorEdit) {
      $(selector).click(function(event) {
        event.preventDefault();
        var self = $(selectorEdit);
        if (self.val() > 0)
          self.val(+self.val() - 1);
      });
    }
  });

})(jQuery);
