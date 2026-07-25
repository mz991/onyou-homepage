// 이용약관/개인정보처리방침 팝업: 푸터 링크 클릭 시 열리고, 닫기 버튼/바깥 클릭/ESC로 닫힘
document.addEventListener("DOMContentLoaded", function () {
  var pairs = [
    { linkId: "terms-link", modalId: "terms-modal" },
    { linkId: "privacy-link", modalId: "privacy-modal" },
  ];

  function close(overlay) {
    overlay.classList.remove("open");
  }

  pairs.forEach(function (pair) {
    var link = document.getElementById(pair.linkId);
    var overlay = document.getElementById(pair.modalId);
    if (!link || !overlay) return;

    var closeBtn = overlay.querySelector(".modal-close");

    link.addEventListener("click", function (e) {
      e.preventDefault();
      overlay.classList.add("open");
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { close(overlay); });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close(overlay);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      pairs.forEach(function (pair) {
        var overlay = document.getElementById(pair.modalId);
        if (overlay) close(overlay);
      });
    }
  });
});
