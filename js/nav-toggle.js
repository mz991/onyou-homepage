// 모바일 햄버거 메뉴: 버튼 클릭 시 메뉴 열고 닫기, 링크 클릭 시 자동으로 닫기
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;

  function close() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });
});
