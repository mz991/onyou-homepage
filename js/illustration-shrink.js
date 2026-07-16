// 일러스트 이미지: 화면에 들어올 때는 풀사이즈(가로 마진 없음, 각진 모서리)로 보이다가
// 스크롤을 내리면 점점 지금의 카드 사이즈(컨테이너 폭, 둥근 모서리)로 줄어듦.

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  var wrap = document.querySelector(".illustration-break");
  if (!wrap) return;

  // 컨테이너 좌우 여백(뷰포트 기준) — 이 값만큼 음수 마진을 주면 풀블리드가 됨
  function gutter() {
    var containerW = Math.min(1120, window.innerWidth);
    return (window.innerWidth - containerW) / 2 + 24;
  }

  gsap.fromTo(
    wrap,
    {
      width: function () { return window.innerWidth + "px"; },
      marginLeft: function () { return -gutter() + "px"; },
      borderRadius: 0,
    },
    {
      width: "100%",
      marginLeft: 0,
      borderRadius: 24,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "top 25%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    }
  );
});
