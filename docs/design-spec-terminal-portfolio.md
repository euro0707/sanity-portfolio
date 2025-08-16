# ターミナル風ポートフォリオサイト設計書

## [プロジェクト概要]

**プロジェクト名：** Code Terminal Portfolio  
**対象：** 開発者向けポートフォリオサイト  
**コンセプト：** シンプル×革新的なターミナル風デザイン  
**日付：** 2025年8月16日  

## [デザインコンセプト]

### **ビジュアルアイデンティティ**
- **メインテーマ：** Dark Terminal Interface
- **カラーパレット：**
  - Primary: `#0a0a0a` (深黒)
  - Secondary: `#1a1a1a` (チャコール)
  - Accent: `#00ff41` (ターミナル緑)
  - Text: `#ffffff` (白)
  - Muted: `#888888` (グレー)

### **タイポグラフィ**
- **メインフォント：** `'JetBrains Mono', 'Fira Code', monospace`
- **サイズスケール：**
  - H1: 3rem (48px)
  - H2: 2rem (32px)
  - Body: 1rem (16px)
  - Code: 0.875rem (14px)

### **レイアウト原則**
- **Grid System：** CSS Grid + Flexbox
- **Spacing：** 8px ベースシステム
- **Breakpoints：**
  - Mobile: 640px
  - Tablet: 768px
  - Desktop: 1024px

## [技術仕様]

### **現在の技術スタック**
- **フロントエンド：** Next.js 15.4.6 + TypeScript
- **スタイリング：** Tailwind CSS 3.4.1
- **CMS：** Sanity 4.4.1
- **アニメーション：** 追加予定 (framer-motion)

### **新規追加予定パッケージ**
```json
{
  "framer-motion": "^11.0.0",
  "@types/node": "^20.19.11"
}
```

### **環境要件**
- **Node.js：** 18.x以上
- **ブラウザ：** Chrome 90+, Firefox 88+, Safari 14+
- **モバイル：** iOS 14+, Android 10+

## [ページ構成・機能仕様]

### **1. ホームページ (/)**
**レイアウト：**
```
┌─────────────────────────────────────┐
│ $ tetsuya@portfolio:~$              │ ← ターミナルヘッダー
├─────────────────────────────────────┤
│ > whoami                            │ ← タイピングアニメーション
│ Tetsuya Hino - Full Stack Developer │
│                                     │
│ > ls projects/                      │
│ [PriceBotX]  [LinuxQuest]  [LINE]   │ ← プロジェクトカード
│                                     │
│ > cat about.txt                     │ ← 自己紹介セクション
│ Loading profile...                  │
└─────────────────────────────────────┘
```

**インタラクティブ要素：**
- タイピングアニメーション (whoami コマンド)
- マウス追従グラデーション効果
- プロジェクトカードホバーエフェクト

### **2. プロジェクト詳細ページ (/projects/[slug])**
**レイアウト：**
```
┌─────────────────────────────────────┐
│ $ cd projects/pricebotx/            │
│ $ cat README.md                     │
├─────────────────────────────────────┤
│ # PriceBotX                         │
│                                     │
│ ## Description                      │
│ 副業せどり向け価格監視Bot...         │
│                                     │
│ ## Tech Stack                       │
│ - Keepa API                         │
│ - Zapier                            │
│                                     │
│ $ open github.com/...               │
└─────────────────────────────────────┘
```

### **3. About ページ (/about)**
**レイアウト：**
```
┌─────────────────────────────────────┐
│ $ cat profile.json                  │
├─────────────────────────────────────┤
│ {                                   │
│   "name": "Tetsuya Hino",           │
│   "role": "Full Stack Developer",   │
│   "skills": ["React", "Node.js"],   │
│   "experience": "5+ years"          │
│ }                                   │
└─────────────────────────────────────┘
```

## [コンポーネント設計]

### **1. TerminalHeader**
**役割：** ページ上部のターミナル風ヘッダー
**Props：**
```typescript
interface TerminalHeaderProps {
  currentPath: string
  prompt?: string
}
```

### **2. TypingAnimation**
**役割：** タイピング効果のテキスト表示
**Props：**
```typescript
interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}
```

### **3. ProjectTerminalCard**
**役割：** ターミナル風プロジェクトカード
**Props：**
```typescript
interface ProjectTerminalCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  status: 'planning' | 'development' | 'completed'
}
```

### **4. CommandPrompt**
**役割：** インタラクティブなコマンド入力
**Props：**
```typescript
interface CommandPromptProps {
  onCommand: (command: string) => void
  history: string[]
}
```

## [アニメーション仕様]

### **1. タイピングアニメーション**
```typescript
// 文字ごとに順次表示
const typingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}
```

### **2. マウス追従グラデーション**
```css
.mouse-gradient {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 255, 65, 0.1),
    transparent 40%
  );
}
```

### **3. スクロールアニメーション**
```typescript
// 画面に入った要素をフェードイン
const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}
```

## [状態管理設計]

### **グローバル状態**
```typescript
interface GlobalState {
  theme: 'dark' | 'light'           // テーマ切り替え
  terminalHistory: string[]         // コマンド履歴
  currentCommand: string            // 現在のコマンド
  mousePosition: { x: number, y: number } // マウス位置
}
```

### **ローカル状態**
- タイピングアニメーション状態
- ページローディング状態
- プロジェクト表示状態

## [パフォーマンス要件]

### **目標指標**
- **First Contentful Paint：** < 1.5秒
- **Largest Contentful Paint：** < 2.5秒
- **Cumulative Layout Shift：** < 0.1
- **First Input Delay：** < 100ms

### **最適化戦略**
- **Code Splitting：** ページごとの遅延読み込み
- **Image Optimization：** next/image使用
- **Font Loading：** フォント事前読み込み
- **Animation Performance：** GPU加速の使用

## [実装フェーズ]

### **Phase 1: デザインシステム構築**
- [ ] Tailwind設定カスタマイズ
- [ ] カラーパレット・フォント設定
- [ ] ベースコンポーネント作成

### **Phase 2: コアコンポーネント**
- [ ] TerminalHeader実装
- [ ] TypingAnimation実装
- [ ] ProjectTerminalCard実装

### **Phase 3: インタラクション**
- [ ] マウス追従エフェクト
- [ ] スクロールアニメーション
- [ ] キーボードナビゲーション

### **Phase 4: 高度な機能**
- [ ] コマンドプロンプト機能
- [ ] 音響エフェクト（オプション）
- [ ] パフォーマンス最適化

## [ファイル構成]

```
src/
├── components/
│   ├── terminal/
│   │   ├── TerminalHeader.tsx
│   │   ├── TypingAnimation.tsx
│   │   ├── CommandPrompt.tsx
│   │   └── ProjectTerminalCard.tsx
│   ├── effects/
│   │   ├── MouseGradient.tsx
│   │   └── ScrollAnimations.tsx
│   └── layout/
│       └── TerminalLayout.tsx
├── hooks/
│   ├── useTypingAnimation.ts
│   ├── useMousePosition.ts
│   └── useTerminalHistory.ts
├── styles/
│   ├── terminal.css
│   └── animations.css
└── types/
    └── terminal.ts
```

## [注意事項・リスク]

### **技術的リスク**
- **アニメーション重複：** 複数アニメーション同時実行によるパフォーマンス影響
- **フォント読み込み：** モノスペースフォントの読み込み遅延
- **モバイル対応：** ターミナル風デザインのタッチデバイス最適化

### **UX考慮事項**
- **アクセシビリティ：** スクリーンリーダー対応
- **アニメーション制御：** motion sensitivityへの配慮
- **直感的操作：** ターミナル慣れしていないユーザーへの配慮

### **対応策**
- アニメーション無効化オプション提供
- プログレッシブエンハンスメント採用
- フォールバック表示の実装

## [まとめ]

この設計により、シンプルでありながら革新的なターミナル風ポートフォリオサイトを実現します。技術的な専門性を表現しつつ、ユーザビリティとパフォーマンスを両立させる設計となっています。