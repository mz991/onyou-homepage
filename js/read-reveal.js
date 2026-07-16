// 인트로 문단을 단어 단위로 감싸고, 스크롤에 맞춰
// 흐린 글자(20%)가 한 단어씩 진하게(100%) 채워지는 "읽는 느낌" 효과.
// 문단 텍스트는 HTML에서 자유롭게 수정해도 됨 — 여기서 자동으로 단어를 감쌉니다.

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  var target = document.querySelector(".intro-text");
  if (!target) return;

  var walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null);
  var textNodes = [];
  var node;
  while ((node = walker.nextNode())) textNodes.push(node);

  textNodes.forEach(function (textNode) {
    var chunks = textNode.textContent.split(/(\s+)/);
    var frag = document.createDocumentFragment();
    chunks.forEach(function (chunk) {
      if (chunk.trim() === "") {
        frag.appendChild(document.createTextNode(chunk));
      } else {
        var span = document.createElement("span");
        span.className = "word";
        span.textContent = chunk;
        frag.appendChild(span);
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });

  var words = target.querySelectorAll(".word");
  gsap.set(words, { opacity: 0.15 });

  gsap.to(words, {
    opacity: 1,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      // 문단이 화면에 충분히 들어온 뒤부터 읽히기 시작해서
      // 화면 중앙을 지나는 동안 천천히 진행되도록
      // 시작은 문단이 살짝 올라온 뒤(딜레이), 끝은 화면 위쪽까지 —
      // 구간을 넓게 잡아 스크롤 대비 천천히 읽히게 (모바일에서도 여유롭게)
      start: "top 68%",
      end: "bottom 12%",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
});

// 모든 스크립트(핀 포함)가 레이아웃을 잡은 뒤 위치를 다시 계산
window.addEventListener("load", function () {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});
