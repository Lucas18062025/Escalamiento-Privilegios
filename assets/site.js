/* ==========================================================================
   Escalamiento de Privilegios — JS único
   Reemplaza los 4 bloques <script> inline. Sin handlers onclick/onchange en
   el markup: todo se resuelve por delegación, requisito para script-src 'self'.
   Comportamiento idéntico al anterior (tabs, acordeones, CTF y quiz).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Tabs ---------- */
  function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === tabId);
    });
    document.querySelectorAll('.panel').forEach(function (p) {
      p.classList.toggle('active', p.id === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Acordeones ---------- */
  function toggleAcc(header) {
    var body = header.nextElementSibling;
    header.classList.toggle('open');
    if (body) body.classList.toggle('open');
  }

  /* ---------- Simulador CTF ---------- */
  /* El stage "actual" se deriva del contenedor #ctf-stage-N. El markup original
     pasaba un indice adelantado (ctfNext(1, ...) en la etapa 0), lo que saltaba
     la pantalla intermedia de "Shell como root". data-stage queda como fallback. */
  function ctfNext(currentStage, correct, btn) {
    var parent = btn.parentElement;
    var box = btn.closest('[id^="ctf-stage-"]');
    var stage = box ? Number(box.id.replace('ctf-stage-', '')) : currentStage;
    parent.querySelectorAll('.quiz-option').forEach(function (b) { b.disabled = true; });

    if (correct) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      parent.querySelectorAll('.quiz-option').forEach(function (b) {
        if (b.dataset.correct === '1') b.classList.add('correct');
      });
    }

    window.setTimeout(function () {
      var next = document.getElementById('ctf-stage-' + (stage + 1));
      if (box) box.style.display = 'none';
      if (next) {
        next.style.display = 'block';
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, correct ? 900 : 1600);
  }

  function resetCTF() {
    for (var i = 0; i <= 3; i++) {
      var stage = document.getElementById('ctf-stage-' + i);
      if (stage) stage.style.display = i === 0 ? 'block' : 'none';
    }
    document.querySelectorAll('#ctf .quiz-option').forEach(function (b) {
      b.classList.remove('correct', 'wrong');
      b.disabled = false;
    });
  }

  /* ---------- Quiz ---------- */
  var quizScore = 0;

  function answerQuiz(q, correct, btn) {
    var parent = btn.parentElement;
    parent.querySelectorAll('.quiz-option').forEach(function (b) { b.disabled = true; });

    if (correct) {
      btn.classList.add('correct');
      quizScore++;
    } else {
      btn.classList.add('wrong');
      parent.querySelectorAll('.quiz-option').forEach(function (b) {
        if (b.dataset.correct === '1') b.classList.add('correct');
      });
    }

    if (q < 5) {
      window.setTimeout(function () {
        var next = document.getElementById('q' + (q + 1));
        if (!next) return;
        next.style.opacity = '1';
        next.style.pointerEvents = 'auto';
        next.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
      return;
    }

    window.setTimeout(function () {
      var result = document.getElementById('quiz-result');
      var scoreText = document.getElementById('quiz-score-text');
      var feedback = document.getElementById('quiz-feedback');
      if (!result || !scoreText || !feedback) return;
      result.style.display = 'block';
      scoreText.textContent = 'Puntuación: ' + quizScore + '/5';
      feedback.textContent =
        quizScore === 5 ? '¡Perfecto! Dominas los fundamentos del escalamiento de privilegios.' :
        quizScore >= 3 ? '¡Buen trabajo! Repasa las técnicas que fallaste.' :
        'Sigue practicando. Revisa los paneles de Fundamentos y Técnicas.';
      result.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  }

  function resetQuiz() {
    quizScore = 0;
    var result = document.getElementById('quiz-result');
    if (result) result.style.display = 'none';
    for (var i = 1; i <= 5; i++) {
      var card = document.getElementById('q' + i);
      if (!card) continue;
      card.style.opacity = i === 1 ? '1' : '0.35';
      card.style.pointerEvents = i === 1 ? 'auto' : 'none';
      card.querySelectorAll('.quiz-option').forEach(function (b) {
        b.classList.remove('correct', 'wrong');
        b.disabled = false;
      });
    }
  }

  /* ---------- Delegación de eventos ---------- */
  document.addEventListener('click', function (event) {
    var tab = event.target.closest('.tab');
    if (tab && tab.dataset.tab) { switchTab(tab.dataset.tab); return; }

    var acc = event.target.closest('.acc-header');
    if (acc) { toggleAcc(acc); return; }

    var ctf = event.target.closest('.quiz-option[data-stage]');
    if (ctf) { ctfNext(Number(ctf.dataset.stage), ctf.dataset.correct === '1', ctf); return; }

    var quiz = event.target.closest('.quiz-option[data-q]');
    if (quiz) { answerQuiz(Number(quiz.dataset.q), quiz.dataset.correct === '1', quiz); return; }

    var action = event.target.closest('[data-action]');
    if (action) {
      if (action.dataset.action === 'reset-ctf') resetCTF();
      if (action.dataset.action === 'reset-quiz') resetQuiz();
    }
  });

  document.addEventListener('change', function (event) {
    var input = event.target.closest('.checklist-item input');
    if (!input) return;
    input.closest('.checklist-item').classList.toggle('checked', input.checked);
  });
}());
