// 히어로 스크롤 효과 (당근 방식 — 핀 고정):
//  - 검정 제목/버튼이 영상 밖(위)에 있음
//  - 스크롤을 시작하면 히어로가 화면 상단에 "고정(pin)"되고,
//    그 자리에서 영상이 화면을 가득 채우며 위로 올라와 제목 뒤를 덮고
//    제목·버튼이 흰색으로 바뀜
//  - 효과가 끝나면 고정이 풀리고 다음 섹션이 이어짐

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  var hero = document.querySelector(".hero");
  var media = hero && hero.querySelector(".hero-media");
  var body = hero && hero.querySelector(".hero-body");
  if (!hero || !media || !body) return;

  var scrim = media.querySelector(".hero-scrim");
  var title = body.querySelector(".hero-title");

  // 컨테이너 왼쪽 여백(뷰포트 기준) — 핀 래핑 영향 안 받게 직접 계산
  function gutter() {
    var containerW = Math.min(1120, window.innerWidth);
    return (window.innerWidth - containerW) / 2 + 24;
  }
  // 영상 윗변을 헤더 바로 아래(≈ 제목 뒤)까지 끌어올릴 상승 거리
  function rise() {
    return media.offsetTop - 76;
  }

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      // 화면 높이만큼 스크롤하는 동안 고정된 채로 효과가 진행됨
      end: function () { return "+=" + Math.round(window.innerHeight * 0.9); },
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // 핀이 레이아웃(스페이서)을 바꾸므로 다른 트리거보다 먼저 계산되게 함
      refreshPriority: 1,
    },
  });

  // 영상: 풀블리드(뷰포트 폭) + 위로 상승 + 세로로 커져 화면을 채움
  tl.to(media, {
    width: function () { return window.innerWidth + "px"; },
    marginLeft: function () { return -gutter() + "px"; },
    marginTop: function () { return -rise() + "px"; },
    height: function () { return Math.round(window.innerHeight - 76) + "px"; },
    borderRadius: 0,
    ease: "none",
  }, 0);

  if (scrim) tl.to(scrim, { opacity: 0.55, ease: "none" }, 0);

  // 제목·버튼: 영상이 채워지는 동안 서서히 아래로 200px 내려옴
  tl.to(body, { y: 200, ease: "none" }, 0);

  // 제목: 영상이 뒤를 덮는 후반부에 검정 → 흰색
  if (title) tl.to(title, { color: "#ffffff", ease: "none" }, 0.4);
});
