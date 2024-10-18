const HeaderLinkKey = 'header-link';

function init () {
  const index = sessionStorage.getItem(HeaderLinkKey);
  $(".header-js-link").eq(index).addClass('active').siblings().removeClass('active');
}

$(".header-link").click(function(){
  sessionStorage.setItem(HeaderLinkKey, $(this).index());
})


new Plyr('video');

document.addEventListener('DOMContentLoaded', init);
