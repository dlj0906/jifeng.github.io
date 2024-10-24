const HeaderLinkKey = 'header-link';

function init () {
  const index = sessionStorage.getItem(HeaderLinkKey);

  if (window.location.pathname.includes('index.html')) return
  $(".header-border").show()
  $(".header-js-link").eq(index).addClass('active').siblings().removeClass('active');
}

$(".header-link").click(function(){
  sessionStorage.setItem(HeaderLinkKey, $(this).index());
})


new Plyr('video');

document.addEventListener('DOMContentLoaded', init);
