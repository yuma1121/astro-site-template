/**
 * サイト設定ファイル
 *
 * このファイルを編集するだけでサイトの基本設定が完了します。
 * 新しいサイトを作成する際は、以下の値を自分のサイト用に書き換えてください。
 *
 * astro.config.mjs の `site` も同じURLに手動で合わせてください。
 */

export const site = {
  // === サイト基本情報 ===
  name: 'サイト名をここに入力',
  url: 'https://example.com',
  description: 'サイトの説明文をここに入力してください。',
  contactEmail: 'info@example.com',
  locale: 'ja_JP',

  // === アナリティクス ===
  /** Google Tag Manager ID（空文字ならスクリプトを挿入しない） */
  gtmId: '',

  // === 著者情報 ===
  author: {
    name: 'サイト名 編集部',
    bio: '著者の紹介文をここに入力してください。実績や専門性を記載すると読者の信頼につながります。',
    avatarPath: '/images/common/avatar.svg',
    aboutPagePath: '/about/',
  },

  // === アセットパス ===
  faviconSvg: '/favicon.svg',
  appleTouchIcon: '/images/common/favicon.svg',
  logoPath: '/images/common/logo.svg',
  defaultOgImage: '/images/common/og-default.svg',

  // === ナビゲーション ===
  headerNav: [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/blog/' },
  ] as { label: string; href: string }[],

  footerNav: {
    categories: [] as { label: string; href: string }[],
    siteInfo: [
      { label: '運営者情報', href: '/about/' },
      { label: 'プライバシーポリシー', href: '/privacy/' },
      { label: '免責事項', href: '/disclaimer/' },
      { label: 'お問い合わせ', href: '/contact/' },
    ] as { label: string; href: string }[],
  },

  // === コンテンツ設定 ===
  /**
   * 記事URLのプレフィックス: /{contentPrefix}/{slug}/
   * 変更する場合は src/pages/ のディレクトリ名も合わせてリネームしてください。
   */
  contentPrefix: 'blog',

  /** カテゴリ定義 — content/config.ts の enum もこの値から自動生成されます */
  categories: [
    { slug: 'cat1', name: 'カテゴリ1', description: 'カテゴリ1の説明文' },
    { slug: 'cat2', name: 'カテゴリ2', description: 'カテゴリ2の説明文' },
  ] as { slug: string; name: string; description: string }[],

  // === フローティング要素（スマホ） ===
  floating: {
    /**
     * フローティングボタン（右下に固定表示）
     * 目次ボタンは自動表示されるため設定不要。
     * 追加のCTAボタンを表示したい場合に設定。
     */
    button: {
      enabled: false,
      label: 'お問い合わせ',
      url: '/contact/',
      /** ボタン色 */
      bgColor: '#2563eb',
      textColor: '#ffffff',
      /** 新しいタブで開くか */
      external: false,
    },
    /**
     * フローティングバナー（下部に固定表示）
     * キャンペーン告知やCTAバナーに利用。
     */
    banner: {
      enabled: false,
      /** バナー内テキスト */
      text: 'キャンペーン実施中！',
      /** リンクURL */
      url: 'https://example.com',
      /** CTAボタンテキスト */
      cta: '詳しく見る',
      bgColor: '#1e3a5f',
      textColor: '#ffffff',
      ctaBgColor: '#f59e0b',
      ctaTextColor: '#111827',
      external: true,
      /** 閉じるボタンを表示するか */
      dismissible: true,
    },
  },

  // === フッター ===
  footerDescription: 'サイトのフッター説明文をここに入力してください。',
  /** アフィリエイト免責表示を表示するか */
  affiliateDisclaimer: true,
};

// --- ヘルパー（コンポーネントから利用） ---

/** カテゴリslug→表示名のマップ */
export const categoryLabels: Record<string, string> = Object.fromEntries(
  site.categories.map((c) => [c.slug, c.name]),
);

/** カテゴリslug→説明のマップ */
export const categoryDescriptions: Record<string, string> = Object.fromEntries(
  site.categories.map((c) => [c.slug, c.description]),
);
