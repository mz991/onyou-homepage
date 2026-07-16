// 스크롤하면 나타나는 효과.
// 사용법: HTML 요소에 class="reveal" 만 붙이면 자동 적용됩니다.
// (JS 파일은 건드릴 필요 없음)

document.addEventListener("DOMContentLoaded", function () {
  var targets = document.querySelectorAll(".reveal");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (target) {
    observer.observe(target);
  });
});
