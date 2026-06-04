(function () {
  'use strict';

  // ミーティングURLのみ対象（/xxx-yyyy-zzz 形式）
  if (!location.pathname.match(/^\/[a-z]+-[a-z]+-[a-z]+/)) return;

  let shown = false;
  let joinButtonSeen = false;

  // 多言語対応: 「参加」ボタンのテキスト一覧
  const JOIN_TEXTS = new Set([
    'Join now', 'Ask to join',
    '今すぐ参加', '参加をリクエスト',
    'Jetzt teilnehmen', 'Rejoindre maintenant',
    'Unirse ahora',
  ]);

  function hasJoinButton() {
    for (const el of document.querySelectorAll('button, span')) {
      if (JOIN_TEXTS.has(el.textContent.trim())) return true;
    }
    return false;
  }

  function showBanner() {
    if (shown) return;
    shown = true;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes mrr-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(1.4); }
      }
      #mrr-banner {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2147483647;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 22px;
        background: #1c1c2e;
        color: #fff;
        border-radius: 14px;
        box-shadow: 0 6px 32px rgba(0, 0, 0, 0.6);
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 1;
        transition: opacity 0.4s ease;
      }
      #mrr-banner.mrr-hide { opacity: 0; }
      #mrr-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #f44336;
        flex-shrink: 0;
        animation: mrr-pulse 1.2s ease-in-out infinite;
      }
      #mrr-close {
        margin-left: 4px;
        background: transparent;
        border: none;
        color: #888;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        padding: 0 2px;
        transition: color 0.2s;
      }
      #mrr-close:hover { color: #fff; }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'mrr-banner';
    banner.innerHTML = `
      <div id="mrr-dot"></div>
      <span>画面収録を忘れずに！</span>
      <button id="mrr-close" title="閉じる">×</button>
    `;
    document.body.appendChild(banner);

    const dismiss = () => {
      banner.classList.add('mrr-hide');
      setTimeout(() => banner.remove(), 400);
    };

    document.getElementById('mrr-close').addEventListener('click', dismiss);
    // 10秒後に自動で消える
    setTimeout(dismiss, 10000);
  }

  function check() {
    if (shown) return;

    const has = hasJoinButton();

    if (!joinButtonSeen) {
      // まだ参加前画面を見ていない → 参加前画面が来るのを待つ
      if (has) joinButtonSeen = true;
    } else {
      // 参加ボタンが消えた = 会議に入った
      if (!has) showBanner();
    }
  }

  const observer = new MutationObserver(check);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // 初回チェック（スクリプト挿入時点でボタンがあるケース）
  check();

  // 15分後に監視停止（会議が始まらない場合）
  setTimeout(() => observer.disconnect(), 15 * 60 * 1000);
})();
