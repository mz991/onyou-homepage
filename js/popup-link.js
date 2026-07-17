// target="_blank"는 요즘 브라우저에서 대부분 '새 탭'으로 열려서,
// 진짜 '새 창(팝업)'으로 뜨도록 크기를 지정해 window.open으로 직접 엽니다.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".js-popup-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var url = link.getAttribute("href");
      var w = 900;
      var h = 900;
      var left = (screen.width - w) / 2;
      var top = (screen.height - h) / 2;
      window.open(
        url,
        "_blank",
        "width=" + w + ",height=" + h + ",left=" + left + ",top=" + top +
          ",noopener,noreferrer,resizable=yes,scrollbars=yes"
      );
    });
  });
});
