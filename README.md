# Meet Record Reminder

Google Meet に参加した瞬間に「画面収録を忘れずに！」というバナーを表示する Chrome 拡張機能です。

![banner-preview](https://img.shields.io/badge/Manifest-v3-blue) ![size](https://img.shields.io/badge/size-3.7KB-green) ![permissions](https://img.shields.io/badge/permissions-none-brightgreen)

## 機能

- Google Meet の会議室に参加した瞬間にバナーを表示
- 10秒後に自動で消える（×ボタンで即時閉じることも可）
- 日本語・英語・ドイツ語・フランス語・スペイン語 UI に対応
- **パーミッション不要**・バックグラウンドスクリプトなし

## インストール（デベロッパーモード）

1. このリポジトリをクローン or ZIPダウンロード
   ```bash
   git clone https://github.com/aonosota/google_meet_record_notificator.git
   ```
2. Chrome で `chrome://extensions` を開く
3. 右上の **デベロッパーモード** をオン
4. **「パッケージ化されていない拡張機能を読み込む」** をクリック
5. クローンしたフォルダを選択

## 動作の仕組み

```
meet.google.com/xxx-yyy-zzz を開く
        ↓
"Join now" ボタンを MutationObserver で監視
        ↓
ボタンが消えた = 会議参加を検知
        ↓
バナーを表示（10秒後に自動消滅）
```

`MutationObserver` を使うため、定期ポーリングなしでリアルタイムに検知します。

## ファイル構成

```
.
├── manifest.json   # Manifest V3
└── content.js      # 検知 + バナー表示ロジック
```

## 既存ソリューションとの比較

| | [Google Meet Record Reminder](https://chromewebstore.google.com/detail/google-meet-record-remind/pbmkoacnanjeicnonfjbdgcmkkpocnjm) | このクローン |
|---|---|---|
| サイズ | 67.67 KB | **3.7 KB** |
| パーミッション | 不明 | **ゼロ** |
| バックグラウンドスクリプト | あり | **なし** |
| 監視方式 | ポーリング (8秒間隔) | **MutationObserver** |
| Manifest | v2/v3 不明 | **v3** |

## License

MIT
