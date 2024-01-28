# Concurrent-world-desktop
[concurrent-world](https://github.com/totegamma/concurrent-world)をデスクトップアプリにしたものです

## 動作環境
Linux AppImage(x64)のみ動作確認をしています

Windows/Mac版もビルドしていますが未検証です

## インストール
[リリースページ](https://github.com/7ka-Hiira/concurrent-world-desktop/releases/latest)からダウンロードできます

## ビルド
pnpmが必要です
```
git clone https://github.com/7ka-Hiira/concurrent-world-desktop.git

cd concurrent-world-desktop

pnpm i

pnpm tauri build
```
詳細は[Tauriのガイド](https://tauri.app/v1/guides/building/)を参照してください