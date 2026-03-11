<script setup>
import { computed, reactive, ref } from 'vue'
import { API } from '@/api/endpoints'
import { request } from '@/api/http'

import img1 from '@/assets/japan_images/ai_quant_hero.png'
import img2 from '@/assets/japan_images/japanese_trader.png'
import img3 from '@/assets/japan_images/ai_network.png'
import img4 from '@/assets/japan_images/success_chart.png'

// Replace these paths with your own images when ready.
const imageSlots = {
    heroBackground: '',
    heroLeft: img1,
    heroRight: img2,
    featureNetwork: img3,
    featureDashboard: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHw5fHxmaW5hbmNpYWwlMjBkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwwfDB8fHwxNzczMDU2OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featureTrading: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4Mzc5NTV8MHwxfHNlYXJjaHw2fHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0cmFkaW5nJTIwY2hhcnRzfGVufDB8MHx8fDE3NzMwNTY5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    successChart: img4,
    marketJapan: 'https://images.unsplash.com/photo-1478039543847-9cf7608e8f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4Mzc5NTV8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDB8MXx8fDE3NzMwNTY5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    marketAsia: 'https://images.unsplash.com/photo-1676741556435-709eaa1f872f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU5NTF8MHwxfHNlYXJjaHw3fHxrb3JlYW4lMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MHwxfHx8MTc3MzA1NjkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
}

const avatarSlots = {
    testimonial1: 'https://images.unsplash.com/photo-1478039543847-9cf7608e8f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4Mzc5NTV8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDB8MXx8fDE3NzMwNTY5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    testimonial2: 'https://images.unsplash.com/photo-1758369636875-60b3dcb76366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4Mzc5NTV8MHwxfHNlYXJjaHwzfHxqYXBhbmVzZSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDB8MXx8fDE3NzMwNTY5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    testimonial3: 'https://images.unsplash.com/photo-1722347315185-4f232000781b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4Mzc5NTV8MHwxfHNlYXJjaHw4fHxqYXBhbmVzZSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDB8MXx8fDE3NzMwNTY5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    testimonial4: 'https://images.unsplash.com/photo-1676741556435-709eaa1f872f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU5NTF8MHwxfHNlYXJjaHw3fHxrb3JlYW4lMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MHwxfHx8MTc3MzA1NjkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    testimonial5: 'https://images.unsplash.com/photo-1694248592539-14dfe6069ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU5NTF8MHwxfHNlYXJjaHwzfHxrb3JlYW4lMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MHwxfHx8MTc3MzA1NjkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    testimonial6: 'https://images.unsplash.com/photo-1688051603515-fb28ea6f3f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU5NTF8MHwxfHNlYXJjaHw1fHxrb3JlYW4lMjBidXNpbmVzcyUyMHRlY2hub2xvZ3l8ZW58MHwxfHx8MTc3MzA1NjkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
}

const currentLanguage = ref('ja')

const pageCopy = {
    ja: {
        hero: {
            badge: 'AI資金代管モデル',
            titleTop: 'AIの力で',
            titleHighlight: '安定した収益',
            titleBottom: 'を実現',
            description:
                '高度なAI資金代管モデルが24時間365日市場を分析し、最適な取引機会を自動で捉えます。専門知識がなくても、安定した運用導線をすぐに活用できます。',
            cta: '無料で始める',
            stats: [
                { value: '4%-6%', label: '日間平均リターン' },
                { value: '24/7', label: '自動取引' },
                { value: '10,000+', label: 'アクティブユーザー' },
            ],
            tags: [
                { icon: 'trend', label: 'AI市場分析' },
                { icon: 'shield', label: 'リスク管理' },
                { icon: 'zap', label: '即時実行' },
            ],
            topOvalTitle: 'リスク保護',
            topOvalSubtitle: 'アクティブ',
            bottomOvalTitle: '+23.5%',
            bottomOvalSubtitle: '今月の収益',
            leftImageLabel: '',
            rightImageLabel: '',
        },
        featuresHeading: {
            kicker: 'Features',
            title: 'AI資金代管モデルの特徴',
            description:
                '最先端のAI資金代管モデルを活用し、安定した取引収益の実現を目指します',
        },
        performanceHeading: {
            kicker: 'Performance',
            title: 'お客様の声',
            description:
                '実際にAI資金代管モデルで成果を上げたお客様の体験談',
        },
        cta: {
            kicker: 'AI資金代管モデルで安定した収益を実現',
            title: '今すぐ始める',
            description:
                'AI資金代管モデルを活用し、安定した取引導線をすぐに始められる相談窓口です。',
            line: 'LINEで相談',
            benefits: ['24時間サポート', 'リアルタイム分析'],
        },
        imageLabels: {
            featureNetwork: 'AIネットワーク分析用の画像',
            featureDashboard: 'ダッシュボードや后台截图',
            featureTrading: '交易画面やグラフ画像',
            successChart: '收益曲线图や实绩图',
            marketJapan: '日本市场相关商务图',
            marketAsia: '亚洲市场或商务场景图',
        },
    },
    ko: {
        hero: {
            badge: 'AI 자금 수탁 모델',
            titleTop: 'AI의 힘으로',
            titleHighlight: '안정적인 수익',
            titleBottom: '을 실현',
            description:
                '고도화된 AI 자금 수탁 모델이 24시간 365일 시장을 분석하고 최적의 거래 기회를 자동으로 포착합니다. 전문 지식이 없어도 안정적인 운용 흐름을 바로 활용할 수 있습니다.',
            cta: '무료로 시작하기',
            stats: [
                { value: '4%-6%', label: '일 평균 수익률' },
                { value: '24/7', label: '자동 거래' },
                { value: '10,000+', label: '활성 사용자' },
            ],
            tags: [
                { icon: 'trend', label: 'AI 시장 분석' },
                { icon: 'shield', label: '리스크 관리' },
                { icon: 'zap', label: '즉시 실행' },
            ],
            topOvalTitle: '리스크 보호',
            topOvalSubtitle: '활성화',
            bottomOvalTitle: '+23.5%',
            bottomOvalSubtitle: '이번 달 수익',
            leftImageLabel: '왼쪽 인물 이미지',
            rightImageLabel: '오른쪽 인물 이미지',
        },
        featuresHeading: {
            kicker: 'Features',
            title: 'AI 자금 수탁 모델의 특징',
            description:
                '최첨단 AI 자금 수탁 모델을 활용해 안정적인 거래 수익 실현을 추구합니다',
        },
        performanceHeading: {
            kicker: 'Performance',
            title: '고객 후기',
            description:
                '실제로 AI 자금 수탁 모델로 성과를 낸 고객의 경험담',
        },
        cta: {
            kicker: 'AI 자금 수탁 모델로 안정적인 수익 실현',
            title: '지금 시작하기',
            description:
                'AI 자금 수탁 모델을 활용해 안정적인 거래 흐름을 시작할 수 있도록 구성한 상담 안내 영역입니다.',
            line: 'LINE 상담',
            benefits: ['24시간 지원', '실시간 분석'],
        },
        imageLabels: {
            featureNetwork: 'AI 네트워크 분석 이미지',
            featureDashboard: '대시보드 또는 백오피스 화면',
            featureTrading: '거래 화면 또는 차트 이미지',
            successChart: '수익 곡선 또는 실적 차트',
            marketJapan: '일본 시장 관련 비즈니스 이미지',
            marketAsia: '아시아 시장 또는 비즈니스 장면 이미지',
        },
    },
}

const performanceStats = [
    {
        value: '4%-6%',
        label: { ja: '年間平均収益率', ko: '연평균 수익률' },
    },
    {
        value: '10,000+',
        label: { ja: 'アクティブユーザー', ko: '활성 사용자' },
    },
    {
        value: '98%',
        label: { ja: '顧客満足度', ko: '고객 만족도' },
    },
    {
        value: '24/7',
        label: { ja: '自動取引稼働', ko: '자동 거래 가동' },
    },
]

const testimonials = [
    {
        avatarKey: 'testimonial1',
        name: { ja: '田中 健太', ko: '김민수' },
        role: { ja: '個人投資家', ko: '개인 투자자' },
        content: {
            ja: 'AI資金代管モデルを導入してから、安定した収益を得られるようになりました。リスク管理も自動で行ってくれるので安心です。',
            ko: 'AI 자금 수탁 모델을 도입한 이후 안정적인 수익을 얻을 수 있게 되었습니다. 리스크 관리도 자동으로 해주어 안심입니다.',
        },
    },
    {
        avatarKey: 'testimonial2',
        name: { ja: '佐藤 美咲', ko: '박지영' },
        role: { ja: '金融アナリスト', ko: '금융 애널리스트' },
        content: {
            ja: 'プロの視点から見ても、このAIシステムの分析精度は非常に高いです。市場の変動にも柔軟に対応してくれます。',
            ko: '전문가 관점에서 봐도 이 AI 시스템의 분석 정확도는 매우 높습니다. 시장 변동에도 유연하게 대응합니다.',
        },
    },
    {
        avatarKey: 'testimonial3',
        name: { ja: '山田 太郎', ko: '이준호' },
        role: { ja: '企業経営者', ko: '기업 경영자' },
        content: {
            ja: '忙しい経営者にとって、完全自動化されたこのシステムは理想的です。運用実績も期待以上でした。',
            ko: '바쁜 경영자에게 완전 자동화된 이 시스템은 이상적입니다. 운용 실적도 기대 이상이었습니다.',
        },
    },
    {
        avatarKey: 'testimonial4',
        name: { ja: '鈴木 花子', ko: '최서연' },
        role: { ja: '投資コンサルタント', ko: '투자 컨설턴트' },
        content: {
            ja: 'クライアントにも自信を持って勧められるシステムです。透明性が高く、実績も素晴らしいです。',
            ko: '고객에게도 자신 있게 추천할 수 있는 시스템입니다. 투명성이 높고 실적도 훌륭합니다.',
        },
    },
    {
        avatarKey: 'testimonial5',
        name: { ja: '高橋 誠', ko: '정우진' },
        role: { ja: 'IT企業役員', ko: 'IT 기업 임원' },
        content: {
            ja: 'テクノロジーの観点から見ても、このAIシステムは最先端です。投資の未来を感じさせてくれます。',
            ko: '기술 관점에서 봐도 이 AI 시스템은 최첨단입니다. 투자의 미래를 느끼게 해줍니다.',
        },
    },
    {
        avatarKey: 'testimonial6',
        name: { ja: '伊藤 麻衣', ko: '강혜진' },
        role: { ja: '資産運用マネージャー', ko: '자산 운용 매니저' },
        content: {
            ja: '多くの投資ツールを試してきましたが、このシステムの精度と安定性は群を抜いています。',
            ko: '많은 투자 도구를 시도해봤지만, 이 시스템의 정확도와 안정성은 단연 최고입니다.',
        },
    },
]

const galleryCards = [
    {
        key: 'featureNetwork',
        title: { ja: 'AIネットワーク分析', ko: 'AI 네트워크 분석' },
    },
    {
        key: 'featureDashboard',
        title: { ja: 'リアルタイムダッシュボード', ko: '실시간 대시보드' },
    },
    {
        key: 'featureTrading',
        title: { ja: 'AI取引システム', ko: 'AI 거래 시스템' },
    },
]

const marketCards = [
    {
        key: 'marketJapan',
        title: { ja: '日本市場での実績', ko: '일본 시장 실적' },
    },
    {
        key: 'marketAsia',
        title: { ja: '韓国市場での実績', ko: '아시아 시장 확장' },
    },
]

const t = computed(() => pageCopy[currentLanguage.value])

const openLine = async () => {
    try {
        const response = await request({
            url: API.links.random,
            method: 'GET',
            params: {
                type: 1,
                link_type: 3,
            },
        })

        const link = response?.data?.data?.link
        if (link) {
            window.location.href = link
            return
        }

        console.warn('Random LINE link response missing link field:', response?.data)
    } catch (error) {
        console.error('LINE link request failed:', error)
    }
}

const handleSubmit = () => {
    openLine()
}

const getText = (field) => field[currentLanguage.value]
const getAvatar = (avatarKey) => avatarSlots[avatarKey] || ''

const getInitials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2)

const setLanguage = (nextLanguage) => {
    currentLanguage.value = nextLanguage
}
</script>

<template>
    <div class="jp-page">
        <header class="jp-header">
            <div class="jp-shell jp-header-inner">
                <div class="jp-language-switcher" aria-label="Language switcher">
                    <button class="jp-language-button" :class="{ 'is-active': currentLanguage === 'ja' }" type="button"
                        @click="setLanguage('ja')">
                        日本語
                    </button>
                    <button class="jp-language-button" :class="{ 'is-active': currentLanguage === 'ko' }" type="button"
                        @click="setLanguage('ko')">
                        한국어
                    </button>
                </div>
            </div>
        </header>

        <main>
            <section class="jp-hero">
                <div class="jp-hero-backdrop">
                    <div class="jp-hero-glow jp-hero-glow--one"></div>
                    <div class="jp-hero-glow jp-hero-glow--two"></div>

                    <div v-if="imageSlots.heroBackground" class="jp-hero-bg-image">
                        <img :src="imageSlots.heroBackground" alt="Hero background" />
                    </div>
                </div>

                <div class="jp-shell jp-hero-grid">
                    <div class="jp-hero-side">
                        <div class="jp-image-frame jp-image-frame--hero">
                            <img v-if="imageSlots.heroLeft" :src="imageSlots.heroLeft" alt="Hero left"
                                class="jp-image" />
                            <div v-else class="jp-image-placeholder">
                                <strong>Hero Left</strong>
                                <span>{{ t.hero.leftImageLabel }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="jp-hero-copy">
                        <div class="jp-pill">
                            <span class="jp-pill-dot"></span>
                            <span>{{ t.hero.badge }}</span>
                        </div>

                        <h1 class="jp-hero-title">
                            <span class="jp-hero-title-line">{{ t.hero.titleTop }}</span>
                            <span class="jp-hero-title-highlight">{{ t.hero.titleHighlight }}</span>
                            <span class="jp-hero-title-line">{{ t.hero.titleBottom }}</span>
                        </h1>

                        <p class="jp-hero-subtitle">{{ t.hero.description }}</p>

                        <div class="jp-stat-grid">
                            <article v-for="stat in t.hero.stats" :key="stat.label" class="jp-stat-card">
                                <strong>{{ stat.value }}</strong>
                                <span>{{ stat.label }}</span>
                            </article>
                        </div>

                        <div class="jp-tag-row">
                            <span v-for="tag in t.hero.tags" :key="tag.label" class="jp-tag">
                                <span class="jp-tag-icon" :class="`jp-tag-icon--${tag.icon}`" aria-hidden="true">
                                    <svg v-if="tag.icon === 'trend'" viewBox="0 0 24 24" class="jp-tag-svg">
                                        <path d="M6 15.5 10 11.5 13 14.5 18 9.5" fill="none" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                        <path d="M14.5 9.5H18v3.5" fill="none" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                    </svg>
                                    <svg v-else-if="tag.icon === 'shield'" viewBox="0 0 24 24" class="jp-tag-svg">
                                        <path d="M12 3 5.5 6v5.2c0 4.3 2.7 8.2 6.5 9.8 3.8-1.6 6.5-5.5 6.5-9.8V6L12 3Z"
                                            fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.8" />
                                    </svg>
                                    <svg v-else viewBox="0 0 24 24" class="jp-tag-svg">
                                        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="none" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                    </svg>
                                </span>
                                <span>{{ tag.label }}</span>
                            </span>
                        </div>
                    </div>

                    <div class="jp-hero-side">
                        <div class="jp-image-frame jp-image-frame--hero jp-image-frame--decorated">
                            <img v-if="imageSlots.heroRight" :src="imageSlots.heroRight" alt="Hero right"
                                class="jp-image" />
                            <div v-else class="jp-image-placeholder">
                                <strong>Hero Right</strong>
                                <span>{{ t.hero.rightImageLabel }}</span>
                            </div>
                            <div class="jp-ellipse-frame jp-ellipse-frame--top-left">
                                <div class="jp-ellipse-icon jp-ellipse-icon--shield" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" class="jp-ellipse-svg">
                                        <path d="M12 3 5.5 6v5.2c0 4.3 2.7 8.2 6.5 9.8 3.8-1.6 6.5-5.5 6.5-9.8V6L12 3Z"
                                            fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.8" />
                                    </svg>
                                </div>
                                <div class="jp-ellipse-copy">
                                    <span class="jp-ellipse-text jp-ellipse-text--title">{{ t.hero.topOvalTitle
                                    }}</span>
                                    <span class="jp-ellipse-text jp-ellipse-text--sub">{{ t.hero.topOvalSubtitle
                                    }}</span>
                                </div>
                            </div>
                            <div class="jp-ellipse-frame jp-ellipse-frame--bottom-right">
                                <div class="jp-ellipse-icon jp-ellipse-icon--trend" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" class="jp-ellipse-svg">
                                        <path d="M6 15.5 10 11.5 13 14.5 18 9.5" fill="none" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                        <path d="M14.5 9.5H18v3.5" fill="none" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
                                    </svg>
                                </div>
                                <div class="jp-ellipse-copy">
                                    <span class="jp-ellipse-text jp-ellipse-text--title">{{ t.hero.bottomOvalTitle
                                    }}</span>
                                    <span class="jp-ellipse-text jp-ellipse-text--sub">{{ t.hero.bottomOvalSubtitle
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="jp-section">
                <div class="jp-shell">
                    <div class="jp-section-heading">
                        <h2>{{ t.featuresHeading.title }}</h2>
                        <p>{{ t.featuresHeading.description }}</p>
                    </div>

                    <div class="jp-gallery-grid">
                        <article v-for="card in galleryCards" :key="card.key" class="jp-gallery-card">
                            <div class="jp-gallery-image">
                                <img v-if="imageSlots[card.key]" :src="imageSlots[card.key]" :alt="getText(card.title)"
                                    class="jp-image" />
                                <div v-else class="jp-image-placeholder">
                                    <strong>{{ card.key }}</strong>
                                    <span>{{ t.imageLabels[card.key] }}</span>
                                </div>
                            </div>
                            <p>{{ getText(card.title) }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="jp-section jp-section--muted">
                <div class="jp-shell">
                    <div class="jp-section-heading">
                        <h2>{{ t.performanceHeading.title }}</h2>
                        <p>{{ t.performanceHeading.description }}</p>
                    </div>

                    <div class="jp-performance-grid">
                        <article v-for="stat in performanceStats" :key="stat.value + getText(stat.label)"
                            class="jp-performance-card">
                            <strong>{{ stat.value }}</strong>
                            <span>{{ getText(stat.label) }}</span>
                        </article>
                    </div>

                    <div class="jp-chart-card">
                        <img v-if="imageSlots.successChart" :src="imageSlots.successChart" alt="Success chart"
                            class="jp-image" />
                        <div v-else class="jp-image-placeholder jp-image-placeholder--chart">
                            <strong>successChart</strong>
                            <span>{{ t.imageLabels.successChart }}</span>
                        </div>
                    </div>

                    <div class="jp-testimonial-grid">
                        <article v-for="item in testimonials" :key="getText(item.name)" class="jp-testimonial-card">
                            <div class="jp-testimonial-head">
                                <img v-if="getAvatar(item.avatarKey)" :src="getAvatar(item.avatarKey)"
                                    :alt="getText(item.name)" class="jp-avatar-image" />
                                <div v-else class="jp-avatar">{{ getInitials(getText(item.name)) }}</div>
                                <div>
                                    <h3>{{ getText(item.name) }}</h3>
                                    <p>{{ getText(item.role) }}</p>
                                </div>
                            </div>

                            <div class="jp-stars">★★★★★</div>
                            <p class="jp-testimonial-copy">{{ getText(item.content) }}</p>
                        </article>
                    </div>

                    <div class="jp-market-grid">
                        <article v-for="card in marketCards" :key="card.key" class="jp-market-card">
                            <div class="jp-market-image">
                                <img v-if="imageSlots[card.key]" :src="imageSlots[card.key]" :alt="getText(card.title)"
                                    class="jp-image" />
                                <div v-else class="jp-image-placeholder">
                                    <strong>{{ card.key }}</strong>
                                    <span>{{ t.imageLabels[card.key] }}</span>
                                </div>
                            </div>
                            <p>{{ getText(card.title) }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="jp-section jp-cta-section">
                <div class="jp-shell">
                    <div class="jp-cta-oval jp-cta-oval--one"></div>
                    <div class="jp-cta-oval jp-cta-oval--two"></div>

                    <div class="jp-cta-layout">
                        <div class="jp-cta-copy">
                            <p class="jp-kicker">{{ t.cta.kicker }}</p>
                            <h2>{{ t.cta.title }}</h2>
                            <p class="jp-cta-text">{{ t.cta.description }}</p>

                            <div class="jp-cta-benefits">
                                <span v-for="benefit in t.cta.benefits" :key="benefit">{{ benefit }}</span>
                            </div>
                        </div>

                        <div class="jp-form-card">
                            <form class="jp-form jp-form--compact" @submit.prevent="handleSubmit">
                                <button class="jp-line-button jp-line-button--full" type="button" @click="openLine">
                                    {{ t.cta.line }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');

.jp-page {
    --jp-card: rgba(255, 255, 255, 0.84);
    --jp-card-solid: #ffffff;
    --jp-text: #0f1728;
    --jp-text-soft: #526079;
    --jp-line: rgba(139, 155, 184, 0.22);
    --jp-primary: #1f5eff;
    --jp-primary-deep: #1946bf;
    --jp-shadow: 0 24px 70px rgba(19, 34, 69, 0.12);
    background:
        radial-gradient(circle at top left, rgba(139, 180, 255, 0.34), transparent 32%),
        radial-gradient(circle at 88% 15%, rgba(31, 94, 255, 0.14), transparent 24%),
        linear-gradient(180deg, #f7faff 0%, #f4f7fb 48%, #edf2f8 100%);
    color: var(--jp-text);
    font-family: 'Noto Sans JP', sans-serif;
}

.jp-shell {
    width: calc(100% - 72px);
    margin: 0 auto;
}

.jp-header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(18px);
    background: rgba(244, 247, 251, 0.74);
    border-bottom: 1px solid rgba(139, 155, 184, 0.18);
}

.jp-header-inner {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 72px;
}

.jp-language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    border-radius: 999px;
    border: 1px solid rgba(139, 155, 184, 0.18);
    background: rgba(255, 255, 255, 0.62);
}

.jp-language-button {
    min-width: 78px;
    border: none;
    border-radius: 999px;
    padding: 10px 14px;
    background: transparent;
    color: var(--jp-text-soft);
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.jp-language-button.is-active {
    background: linear-gradient(135deg, var(--jp-primary), var(--jp-primary-deep));
    color: #fff;
    box-shadow: 0 12px 28px rgba(31, 94, 255, 0.18);
}

.jp-hero {
    position: relative;
    overflow: hidden;
    padding: 80px 0 52px;
}

.jp-hero-backdrop {
    position: absolute;
    inset: 0;
}

.jp-hero-glow {
    position: absolute;
    filter: blur(24px);
    border-radius: 999px;
}

.jp-hero-glow--one {
    top: 8%;
    left: -10%;
    width: 360px;
    height: 360px;
    background: rgba(139, 180, 255, 0.22);
}

.jp-hero-glow--two {
    right: -6%;
    bottom: 12%;
    width: 320px;
    height: 320px;
    background: rgba(31, 94, 255, 0.14);
}

.jp-hero-bg-image {
    position: absolute;
    inset: 0;
    opacity: 0.08;
    mix-blend-mode: multiply;
}

.jp-hero-bg-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.jp-hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(240px, 0.78fr) minmax(0, 1.14fr) minmax(240px, 0.78fr);
    gap: 28px;
    align-items: center;
    min-height: calc(100vh - 150px);
}

.jp-hero-side {
    width: 100%;
}

.jp-hero-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
}

.jp-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 999px;
    background: rgba(31, 94, 255, 0.08);
    border: 1px solid rgba(31, 94, 255, 0.14);
    color: var(--jp-primary);
    font-size: 0.92rem;
    font-weight: 600;
}

.jp-pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--jp-primary);
    box-shadow: 0 0 0 6px rgba(31, 94, 255, 0.12);
}

.jp-hero-title {
    margin: 0;
    font-size: clamp(2.9rem, 6vw, 5.4rem);
    line-height: 1.03;
    letter-spacing: -0.04em;
}

.jp-hero-title-line {
    display: block;
}

.jp-hero-title-highlight,
.jp-section-heading h2,
.jp-cta-copy h2 {
    display: block;
    background: linear-gradient(120deg, #1f5eff 0%, #74a8ff 45%, #1f5eff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.jp-hero-subtitle,
.jp-section-heading p,
.jp-feature-card p,
.jp-testimonial-copy,
.jp-cta-text,
.jp-footer p {
    color: var(--jp-text-soft);
    line-height: 1.82;
}

.jp-hero-subtitle {
    max-width: 660px;
    font-size: 1.06rem;
}

.jp-hero-actions {
    display: flex;
    justify-content: center;
}

.jp-primary-button,
.jp-line-button,
.jp-floating-line {
    border: none;
    border-radius: 999px;
    padding: 14px 28px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.jp-primary-button {
    color: #fff;
    background: linear-gradient(135deg, var(--jp-primary) 0%, var(--jp-primary-deep) 100%);
    box-shadow: 0 18px 36px rgba(31, 94, 255, 0.22);
}

.jp-line-button,
.jp-floating-line {
    color: #fff;
    background: linear-gradient(135deg, #00b900 0%, #009f3b 100%);
    box-shadow: 0 18px 36px rgba(0, 185, 0, 0.18);
}

.jp-primary-button:hover,
.jp-line-button:hover,
.jp-floating-line:hover {
    transform: translateY(-2px);
}

.jp-stat-grid,
.jp-performance-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    width: 100%;
}

.jp-stat-card,
.jp-performance-card {
    padding: 20px 22px;
    border-radius: 22px;
    background: var(--jp-card);
    border: 1px solid var(--jp-line);
    box-shadow: var(--jp-shadow);
    backdrop-filter: blur(12px);
}

.jp-performance-card {
    text-align: center;
}

.jp-stat-card strong,
.jp-performance-card strong {
    display: block;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    color: var(--jp-primary);
    line-height: 1;
    margin-bottom: 8px;
}

.jp-stat-card span,
.jp-performance-card span {
    color: var(--jp-text-soft);
    font-size: 0.92rem;
}

.jp-tag-row,
.jp-cta-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.jp-tag-row {
    justify-content: center;
}

.jp-cta-benefits {
    justify-content: flex-start;
    margin-top: 28px;
}

.jp-tag,
.jp-cta-benefits span {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 16px;
    border: 1px solid var(--jp-line);
    background: rgba(255, 255, 255, 0.62);
    font-size: 1rem;
    font-weight: 600;
}

.jp-tag-icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
}

.jp-tag-icon--trend {
    background: rgba(31, 94, 255, 0.1);
    color: var(--jp-primary);
}

.jp-tag-icon--shield {
    background: rgba(139, 180, 255, 0.18);
    color: #6d95dd;
}

.jp-tag-icon--zap {
    background: rgba(31, 94, 255, 0.08);
    color: var(--jp-primary);
}

.jp-tag-svg {
    width: 15px;
    height: 15px;
    display: block;
}

.jp-image-frame {
    position: relative;
    overflow: hidden;
    border-radius: 32px;
    border: 1px solid rgba(139, 155, 184, 0.22);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(239, 244, 251, 0.96));
    box-shadow: 0 32px 80px rgba(17, 32, 70, 0.18);
}

.jp-image-frame--hero {
    aspect-ratio: 4 / 5.2;
}

.jp-image-frame--decorated {
    overflow: visible;
}

.jp-image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

.jp-ellipse-frame {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px 0 12px;
    border: 1.5px solid rgba(255, 255, 255, 0.82);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow:
        0 18px 40px rgba(19, 34, 69, 0.14),
        inset 0 0 0 1px rgba(31, 94, 255, 0.08);
    backdrop-filter: blur(10px);
    pointer-events: none;
}

.jp-ellipse-frame--top-left {
    top: -24px;
    left: -20px;
    width: 176px;
    height: 76px;
}

.jp-ellipse-frame--bottom-right {
    right: -24px;
    bottom: -28px;
    width: 174px;
    height: 90px;
}

.jp-ellipse-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.jp-ellipse-icon {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
}

.jp-ellipse-icon--shield {
    background: rgba(139, 180, 255, 0.18);
    color: #6d95dd;
}

.jp-ellipse-icon--trend {
    background: rgba(31, 94, 255, 0.1);
    color: var(--jp-primary);
}

.jp-ellipse-svg {
    width: 18px;
    height: 18px;
    display: block;
}

.jp-ellipse-text {
    display: block;
    white-space: nowrap;
}

.jp-ellipse-text--title {
    color: var(--jp-text);
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.2;
}

.jp-ellipse-text--sub {
    color: var(--jp-text-soft);
    font-size: 0.74rem;
    line-height: 1.2;
    margin-top: 4px;
}

.jp-image-placeholder {
    width: 100%;
    height: 100%;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 24px;
    text-align: center;
    color: #65738f;
    background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(231, 238, 248, 0.92)),
        repeating-linear-gradient(-45deg,
            rgba(139, 155, 184, 0.08) 0,
            rgba(139, 155, 184, 0.08) 14px,
            transparent 14px,
            transparent 28px);
}

.jp-image-placeholder strong {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.86rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--jp-text);
}

.jp-image-placeholder span {
    font-size: 0.92rem;
}

.jp-image-placeholder--chart {
    min-height: 360px;
}

.jp-section {
    padding: 92px 0;
}

.jp-section--muted {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(233, 238, 246, 0.4));
}

.jp-section-heading {
    max-width: 100%;
    text-align: center;
    margin: 0 auto 44px;
}

.jp-kicker {
    margin: 0 0 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--jp-primary);
}

.jp-section-heading h2,
.jp-cta-copy h2 {
    margin: 0 0 16px;
    font-size: clamp(2.1rem, 5vw, 3.6rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
}

.jp-section-heading p,
.jp-cta-copy p {
    margin: 0;
    font-size: 1rem;
}

.jp-testimonial-card h3,
.jp-testimonial-card h3,
.jp-footer h3,
.jp-footer h4 {
    margin: 0 0 12px;
}

.jp-gallery-grid,
.jp-market-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}

.jp-market-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.jp-gallery-card,
.jp-market-card {
    overflow: hidden;
    border-radius: 28px;
    background: var(--jp-card-solid);
    border: 1px solid var(--jp-line);
    box-shadow: 0 18px 44px rgba(17, 32, 70, 0.08);
}

.jp-gallery-image,
.jp-market-image {
    aspect-ratio: 16 / 11;
}

.jp-gallery-card p,
.jp-market-card p {
    margin: 0;
    padding: 18px 22px 22px;
    font-weight: 600;
}

.jp-performance-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-bottom: 28px;
}

.jp-chart-card {
    overflow: hidden;
    border-radius: 30px;
    background: var(--jp-card-solid);
    border: 1px solid var(--jp-line);
    box-shadow: var(--jp-shadow);
    margin-bottom: 28px;
    min-height: 360px;
}

.jp-testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 28px;
}

.jp-testimonial-card {
    padding: 26px;
    border-radius: 26px;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid var(--jp-line);
    box-shadow: 0 18px 44px rgba(17, 32, 70, 0.08);
}

.jp-testimonial-head {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
}

.jp-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(31, 94, 255, 0.16), rgba(139, 180, 255, 0.26));
    color: var(--jp-primary);
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
}

.jp-avatar-image {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 2px solid rgba(31, 94, 255, 0.14);
    box-shadow: 0 8px 18px rgba(17, 32, 70, 0.08);
}

.jp-testimonial-head p {
    margin: 0;
    color: var(--jp-text-soft);
    font-size: 0.9rem;
}

.jp-stars {
    margin-bottom: 14px;
    color: #f0a100;
    letter-spacing: 0.12em;
}

.jp-cta-section {
    position: relative;
}

.jp-cta-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(180deg, rgba(31, 94, 255, 0.05), rgba(31, 94, 255, 0.01)),
        radial-gradient(circle at 15% 15%, rgba(139, 180, 255, 0.22), transparent 25%);
}

.jp-cta-layout {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 470px);
    gap: 36px;
    align-items: start;
}

.jp-cta-copy {
    padding: 34px 8px 0 0;
}

.jp-form-card {
    position: relative;
    z-index: 1;
    padding: 34px 30px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid var(--jp-line);
    box-shadow: var(--jp-shadow);
    backdrop-filter: blur(14px);
}

.jp-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.jp-form--compact {
    align-items: stretch;
    justify-content: center;
    min-height: 220px;
}

.jp-line-button--full {
    width: 100%;
}

.jp-cta-oval {
    position: absolute;
    border-radius: 999px;
    filter: blur(10px);
    pointer-events: none;
}

.jp-cta-oval--one {
    left: 4%;
    top: 10%;
    width: 380px;
    height: 220px;
    background: radial-gradient(circle, rgba(31, 94, 255, 0.16) 0%, rgba(31, 94, 255, 0.04) 62%, transparent 100%);
}

.jp-cta-oval--two {
    right: 10%;
    bottom: 4%;
    width: 260px;
    height: 150px;
    background: radial-gradient(circle, rgba(139, 180, 255, 0.24) 0%, rgba(139, 180, 255, 0.06) 62%, transparent 100%);
}

@media (max-width: 1080px) {
    .jp-shell {
        width: calc(100% - 44px);
    }

    .jp-hero-grid {
        grid-template-columns: 1fr;
    }

    .jp-hero-side {
        max-width: 420px;
        margin: 0 auto;
    }

    .jp-ellipse-frame--top-left {
        top: -18px;
        left: -12px;
        width: 160px;
        height: 68px;
        padding: 0 12px 0 10px;
    }

    .jp-ellipse-frame--bottom-right {
        right: -16px;
        bottom: -18px;
        width: 156px;
        height: 78px;
        padding: 0 12px 0 10px;
    }

    .jp-ellipse-icon {
        width: 30px;
        height: 30px;
    }

    .jp-ellipse-svg {
        width: 16px;
        height: 16px;
    }

    .jp-testimonial-grid,
    .jp-gallery-grid,
    .jp-performance-grid,
    .jp-market-grid,
    .jp-cta-layout {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .jp-cta-layout {
        align-items: stretch;
    }
}

@media (max-width: 760px) {
    .jp-shell {
        width: calc(100% - 24px);
    }

    .jp-header-inner {
        grid-template-columns: 1fr;
        justify-items: stretch;
        gap: 12px;
        padding: 14px 0;
    }

    .jp-language-switcher {
        width: 100%;
        justify-content: center;
    }

    .jp-language-button {
        flex: 1;
        max-width: 160px;
    }

    .jp-hero {
        padding-top: 40px;
    }

    .jp-hero-title {
        font-size: clamp(2.5rem, 14vw, 4rem);
    }

    .jp-ellipse-frame--top-left {
        top: -12px;
        left: -8px;
        width: 138px;
        height: 58px;
        gap: 8px;
        padding: 0 10px 0 8px;
    }

    .jp-ellipse-frame--bottom-right {
        right: -10px;
        bottom: -12px;
        width: 136px;
        height: 64px;
        gap: 8px;
        padding: 0 10px 0 8px;
    }

    .jp-ellipse-icon {
        width: 24px;
        height: 24px;
    }

    .jp-ellipse-svg {
        width: 13px;
        height: 13px;
    }

    .jp-ellipse-text--title {
        font-size: 0.72rem;
    }

    .jp-ellipse-text--sub {
        font-size: 0.6rem;
        margin-top: 2px;
    }

    .jp-section,
    .jp-cta-section {
        padding: 72px 0;
    }

    .jp-testimonial-grid,
    .jp-gallery-grid,
    .jp-performance-grid,
    .jp-market-grid,
    .jp-cta-layout,
    .jp-stat-grid {
        grid-template-columns: 1fr;
    }

    .jp-form-card,
    .jp-feature-card,
    .jp-testimonial-card {
        padding: 22px;
    }

    .jp-cta-copy {
        padding-top: 18px;
    }

    .jp-cta-oval--one,
    .jp-cta-oval--two {
        display: none;
    }
}
</style>
