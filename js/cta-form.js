// 상담 신청 폼 — Web3Forms로 전송 (페이지 이동 없이 결과만 표시)
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("cta-form");
  var msg = document.getElementById("cta-form-msg");
  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = "전송 중...";
    msg.textContent = "";
    msg.className = "cta-form-msg";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          msg.textContent = "신청 완료되었습니다. 24시간 내 연락드릴게요.";
          msg.className = "cta-form-msg success";
          form.reset();
        } else {
          msg.textContent = "전송에 실패했어요. 전화로 문의해주세요.";
          msg.className = "cta-form-msg error";
        }
      })
      .catch(function () {
        msg.textContent = "전송에 실패했어요. 전화로 문의해주세요.";
        msg.className = "cta-form-msg error";
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
});
