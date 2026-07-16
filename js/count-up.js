// 임팩트 숫자를 0에서 목표값까지 올라가게 하는 카운트업 애니메이션.
// 대상: class="count-up" + data-count-to="목표숫자" (data-count-suffix는 뒤에 붙는 문자, 예: "+")
// 화면에 들어오는 시점에 한 번만 실행됨.

document.addEventListener("DOMContentLoaded", function () {
  var targets = document.querySelectorAll(".count-up");
  if (!targets.length) return;

  function animate(el) {
    var end = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    var suffix = el.getAttribute("data-count-suffix") || "";
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out
      var value = Math.round(eased * end);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
});
