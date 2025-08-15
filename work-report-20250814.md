# 🔧 Sanity + Next.js ポートフォリオ構築 作業レポート
**作成日:** 2025年8月15日  
**プロジェクト:** 20250815sanity-portfolio

---

## 📋 SOW要約

### 目的
- SanityをCMSとして使用し、Next.jsでポートフォリオサイトを構築
- プロジェクト情報をSanityで管理し、動的にカード表示＆詳細ページ表示
- GitHubリポジトリ・画像付きで各プロジェクトを紹介する拡張可能な仕組み

### 使用技術
| 項目        | 技術             |
|-------------|------------------|
| フロント     | Next.js（Pages Router） |
| CMS          | Sanity.io        |
| UI           | Tailwind CSS     |
| デプロイ     | Vercel           |
| データ取得  | GROQ + Sanity Client |

---

## 🏗️ プロジェクト構成設計

```
20250815sanity-portfolio/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── .env.local                    # 環境変数
├── .env.example                  # 環境変数テンプレート
├── .gitignore
├── tsconfig.json
├── lib/
│   ├── sanityClient.ts          # Sanity client設定
│   └── types.ts                 # TypeScript型定義
├── pages/
│   ├── index.tsx                # トップページ（プロジェクト一覧）
│   ├── about.tsx                # 自己紹介ページ（Optional）
│   ├── _app.tsx                 # App component
│   ├── _document.tsx            # Document component
│   └── projects/
│       └── [slug].tsx           # プロジェクト詳細ページ
├── components/
│   ├── Layout.tsx               # 共通レイアウト
│   ├── ProjectCard.tsx          # プロジェクトカード
│   ├── ProjectDetail.tsx        # プロジェクト詳細
│   ├── Header.tsx               # ヘッダー
│   └── Footer.tsx               # フッター
├── styles/
│   └── globals.css              # Global CSS + Tailwind imports
├── sanity/                      # Sanity設定ファイル群
│   ├── sanity.config.ts
│   ├── schema.ts
│   └── schemas/
│       └── project.ts           # プロジェクトスキーマ
└── public/
    └── images/                  # 静的画像
```

---

## 📐 Sanity スキーマ設計

### プロジェクトスキーマ
| フィールド名   | 型       | 説明                       |
|----------------|----------|----------------------------|
| `title`        | string   | プロジェクト名             |
| `slug`         | slug     | URL用のスラッグ             |
| `description`  | text     | 短い概要                   |
| `status`       | string   | ステータス（構想中／開発中／完成） |
| `githubUrl`    | url      | GitHubリンク               |
| `thumbnail`    | image    | サムネイル画像             |
| `content`      | rich text | 詳細説明（Portable Text）    |

---

## 🎯 実装ステップ詳細

### Step 1: Sanityプロジェクト作成＆スキーマ定義 【推定時間: 15-20分】

#### 1-1. Next.jsプロジェクト初期化
```bash
cd C:\Users\skyeu\code\web\20250815sanity-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app=false --src-dir=false --import-alias="@/*"
```

#### 1-2. 必要パッケージインストール
```bash
npm install @sanity/client @sanity/image-url @portabletext/react
npm install -D @sanity/cli
```

#### 1-3. Sanity CLI初期化
```bash
npx @sanity/cli@latest init
# プロジェクト名: sanity-portfolio（公開用短縮名）
# Dataset: production
# TypeScript: Yes
```

#### 1-4. プロジェクトスキーマ作成
- `sanity/schemas/project.ts` - プロジェクトスキーマ定義
- `sanity/schema.ts` - スキーマ統合ファイル

### Step 2: Sanity Studioでデータ追加 【推定時間: 10-15分】
- Studio起動: `npm run dev` (Sanity)
- テスト用プロジェクト4件以上を手動登録
- 各プロジェクトに画像・GitHub URL・説明文を設定

### Step 3: Next.jsでSanity client設定 【推定時間: 10分】
- `lib/sanityClient.ts` - Sanity client設定
- `lib/types.ts` - TypeScript型定義
- 環境変数設定（`.env.local`）

### Step 4: トップページ実装 【推定時間: 30-45分】
- `pages/index.tsx` - プロジェクト一覧カード表示
- `components/ProjectCard.tsx` - 再利用可能なカードコンポーネント
- `components/Layout.tsx` - 共通レイアウト

### Step 5: 詳細ページ実装 【推定時間: 30-45分】
- `pages/projects/[slug].tsx` - 動的ルーティング
- `components/ProjectDetail.tsx` - 詳細表示コンポーネント
- Portable Text レンダリング設定

### Step 6: UI整備 【推定時間: 30-45分】
- Tailwind CSS によるスタイリング
- レスポンシブデザイン対応
- ヘッダー・フッター・ナビゲーション

### Step 7: デプロイ 【推定時間: 15-20分】
- Vercel設定
- 環境変数設定
- ドメイン設定（オプション）

### Step 8: デザイン調整 【推定時間: 30分】
- 配色・フォント・余白調整
- UX改善

### Step 9: 将来の拡張要素整理 【推定時間: 15分】
- タグ機能・検索・i18n等の計画文書化

---

## 🔧 技術仕様

### 必要なパッケージ

#### Core Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@sanity/client": "^6.0.0",
  "@sanity/image-url": "^1.0.0",
  "@portabletext/react": "^3.0.0"
}
```

#### Dev Dependencies
```json
{
  "typescript": "^5.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "autoprefixer": "^10.0.0",
  "postcss": "^8.0.0",
  "@sanity/cli": "^3.0.0"
}
```

### 環境変数
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

---

## 📝 命名ルール

### Claude Code プロジェクト命名ルール
- **ローカル開発用:** `20250815sanity-portfolio` ✅
- **公開用（GitHub/Vercel）:** `sanity-portfolio`
- 公開時はフォルダ名とリポジトリ名を短い形に変更してデプロイ

---

## ✅ 事前確認済み事項

### 環境確認
- **Node.js:** v22.17.1 ✅
- **npm:** v11.4.2 ✅
- **Sanityアカウント:** 作成済み（既存プロジェクト: hanh9ax6）

### 準備完了
- [x] プロジェクト構成の詳細設計
- [x] 必要な環境変数・設定ファイルの整理  
- [x] パッケージ依存関係の事前調査
- [x] 必要なツール・アカウントの確認

---

## 🚀 明日の作業開始手順

### 1. ターミナルでディレクトリ移動
```bash
cd C:\Users\skyeu\code\web\20250815sanity-portfolio
```

### 2. Step 1開始コマンド
```bash
# Next.jsプロジェクト作成
npx create-next-app@latest . --typescript --tailwind --eslint --app=false --src-dir=false --import-alias="@/*"

# 必要パッケージインストール
npm install @sanity/client @sanity/image-url @portabletext/react
npm install -D @sanity/cli

# Sanity初期化
npx @sanity/cli@latest init
```

### 3. 予想される質問と回答
- **Project name:** `sanity-portfolio`
- **Dataset:** `production`
- **TypeScript:** `Yes`
- **Studio template:** `Clean project with no predefined schemas`

---

## 📊 進捗管理

### 実装予定（全9ステップ）
- [ ] Step 1: Sanityプロジェクト作成＆スキーマ定義
- [ ] Step 2: Sanity Studioでデータ追加（テスト用に4件以上）
- [ ] Step 3: Next.jsでSanity client設定
- [ ] Step 4: トップページ実装（カード一覧）
- [ ] Step 5: 詳細ページ実装（slugページ）
- [ ] Step 6: UI整備（Tailwindで装飾）
- [ ] Step 7: デプロイ（Vercel）
- [ ] Step 8: デザイン調整
- [ ] Step 9: 将来の拡張要素の整理

### 全体所要時間見積もり
**合計: 2-3時間**（ネットワーク速度・習熟度により変動）

---

## 📌 重要な注意事項

1. **Pages Router使用** - App Routerではなく従来のPages Routerを使用
2. **既存Sanityプロジェクト** - hanh9ax6は使用せず、新規作成
3. **環境変数管理** - `.env.local`は.gitignoreに含まれることを確認
4. **型安全性** - TypeScriptを活用して型定義を徹底

---

**準備状況:** ✅ 完了  
**開始可能:** 即座に実装開始可能