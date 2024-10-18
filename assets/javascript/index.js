const HeaderLinkKey = 'header-link';
const pathname = location.pathname;
const needStorageLink = pathname !== '/' && pathname !== '/index.html';

function scrollToElement(link) {
  const scrollElement = document.querySelector(link);
  scrollElement.scrollIntoView({ behavior: 'smooth' });
}

function init () {
  new WOW().init();

  if (needStorageLink) {
    return;
  }

  const link = sessionStorage.getItem(HeaderLinkKey);
  sessionStorage.removeItem(HeaderLinkKey);

  if (link) {
    setTimeout(function() {
      scrollToElement(link);
    }, 2000);
  }
}

$('.header-js-link').on('click', function(event) {
  const target = event.currentTarget;

  console.log(target);
  const link = target.dataset.link;
  const $target = $(target);

  const reallyHeaderLink = $target.hasClass('header-link');

  if (reallyHeaderLink) {
    $('.header-link').removeClass('active');
    $target.addClass('active');
  }

  if (!needStorageLink) {
    return scrollToElement(link);
  }

  sessionStorage.setItem(HeaderLinkKey, link);
  location.href = '/';
});


new Plyr('video');

document.addEventListener('DOMContentLoaded', init);
