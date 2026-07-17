// 맨 위로 버튼: 스크롤을 어느 정도 내렸을 때만 나타나고, 누르면 맨 위로 부드럽게 이동
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("top-fab");
  if (!btn) return;

  function toggle() {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
