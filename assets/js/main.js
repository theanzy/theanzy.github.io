/*
	TXT by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $('body'),
    $nav = $('#nav');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['361px', '736px'],
    xsmall: [null, '360px'],
  });

  // Play initial animations on page load.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Dropdowns.
  $('#nav > ul').dropotron({
    mode: 'fade',
    noOpenerFade: true,
    speed: 300,
    alignment: 'center',
  });

  // Nav.

  // Title Bar.
  const titleBar = $(
    '<div id="titleBar">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '<a href="#banner" class="scrolly">' +
      '<span class="title">' +
      $('#logo').html() +
      '</span>' +
      '</a>' +
      '</div>'
  );

  titleBar.appendTo($body);

  const listElements = $($.parseHTML($('#nav').navList()));
  for (let i = 0; i < listElements.length - 1; i++) {
    let element = listElements[i];
    element.classList.add('scrolly');
  }
  let downLoadElement = listElements[listElements.length - 1];
  downLoadElement.removeAttribute('download', 'resume.zip');
  const navList = listElements.map((_, element) => element.outerHTML);
  const navListHtml = [...navList].join('');

  // Panel.
  $('<div id="navPanel">' + '<nav>' + navListHtml + '</nav>' + '</div>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'navPanel-visible',
    });

  // Scrolly
  // moved here so that we can use scroll on the title bar
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function () {
      return $nav.height() - 10;
    },
  });

  $(window).scroll(function () {
    var position = window.pageYOffset;
    $('.ref').each(function () {
      var target = $(this).offset().top;
      var id = $(this).attr('id');
      var navLinks = $('#nav li:has(.scrolly)');
      if (position >= target - 60) {
        navLinks.removeClass('current');
        const currentNav = $('#nav li:has(a[href="#' + id + '"])');
        currentNav.addClass('current');
      }
    });
  });
})(jQuery);
