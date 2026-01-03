// js/main.js

// 1. Tailwind 설정
tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'Noto Sans JP', 'sans-serif'] },
            colors: {
                'apple-gray': '#F5F5F7',
                'apple-text': '#1D1D1F',
                'apple-blue': '#0071E3',
                'apple-dark': '#161617'
            }
        }
    }
}

// 2. 스크롤 애니메이션
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    // 초기 언어 설정 (기본값: 영어)
    setLanguage('en');
});

function toggleExp(element) {
    element.classList.toggle('open');
}

// 3. 다국어 지원 (i18n) 데이터 및 로직
const translations = {
    "en": {
        "nav.about": "About",
        "nav.exp": "Experience",
        "nav.blog": "Blog",
        "hero.role": "Product Manager & Engineer",
        "hero.title": "Hi, I'm Starful.",
        "hero.desc": "Realizing business strategy through technology.<br><span class='text-apple-dark font-medium'>PM, Data Engineer, Cloud Architect.</span>",
        "hero.btn.exp": "View Experience",
        "hero.btn.blog": "Read Blog",
        "about.title": "Areas of Expertise.",
        "about.role.title": "Roles & Capabilities",
        "about.role.1": "<strong>Product & Project Manager:</strong> KPI Design, Strategy, Agile/Scrum Leadership.",
        "about.role.2": "<strong>Web & App Engineering:</strong> Full-stack dev based on Vue.js, Angular, Java, Node.js.",
        "about.role.3": "<strong>Data & Cloud:</strong> AWS/GCP Infra Design, BigQuery DWH, ELT Pipelines.",
        "about.loc": "Tokyo, Japan",
        "about.base": "Base of Operations",
        "about.years": "Years Experience",
        "exp.title": "Career History.",
        // Miraiz
        "exp.miraiz.role": "Dev PM / PdM Proxy | Persol Career",
        "exp.miraiz.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Project Overview】</h4>
                    <p>Development of a B2C telecommunications service.</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Position】</h4>
                    <p>Backend Engineer / Team Lead / Tech Lead / Dev PM / Data Team Lead / Sub-PdM</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Role & Achievements】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Acted as PdM proxy, leading business strategy and feature roadmap planning.</li>
                        <li>Collaborated with Marketing to design and visualize KPIs for member acquisition and UU growth.</li>
                        <li>Established Agile development (Planning, Review, Retrospective).</li>
                        <li>Designed collaboration workflows with non-engineers using Figma, Miro, and GitHub Projects.</li>
                        <li>Established and led the Data Team to support data-driven decision making.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Data Team Achievements】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Built company-wide BI dashboards using Looker Studio.</li>
                        <li>Integrated GA4 and DB logs for a unified analysis infrastructure.</li>
                        <li>Designed and operated Data Marts using BigQuery.</li>
                        <li>Standardized analysis query templates and operational rules.</li>
                        <li>Implemented PDCA cycles based on user behavior data.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Management & Tech Strategy】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Proposed technical solutions for management issues and formulated mid-to-long-term roadmaps.</li>
                        <li>Aligned Company KPIs with Product KPIs to visualize business contribution.</li>
                        <li>Participated in recruitment strategy and evaluation systems for organizational expansion.</li>
                        <li>Managed risks by documenting technical debt and domain knowledge.</li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Members</h5>
                        <p class="font-bold text-lg">4,000 → 41,934</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Monthly UU</h5>
                        <p class="font-bold text-lg">400 → 10,512</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">BI Usage</h5>
                        <p class="font-bold text-sm">0 → Company-wide</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Team Size</h5>
                        <p class="font-bold text-sm">5 → 15 (3 Teams)</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Tech Stack】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">TypeScript (Next.js/NestJS)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Golang</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Vue.js</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">MySQL</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">BigQuery</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">GCP (GCE, GCS, k8s)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Looker Studio</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">GA4</span>
                    </div>
                </div>
            </div>
        `,
        "exp.miraiz.desc": "B2C Reskilling service linked with Doda (40k+ Users).",
        "exp.miraiz.h1": "Strategic Judgment",
        "exp.miraiz.l1": "Defined MAU/Completion Rate KPIs (Improved completion rate 10% → 32%)",
        "exp.miraiz.l2": "Increased monthly NPS by +5.2 points",
        "exp.miraiz.l3": "Led growth of members from 4,000 to 41,934 (10.5x)",
        // ART
        "exp.art.role": "Design Lead & Backend Dev | CAP",
        "exp.art.desc": "Inheritance tax SaaS for tax accountants (12k+ users/year).",
        "exp.art.h1": "Key Achievements",
        "exp.art.l1": "Structured legal logic via DDD (Reduced maintenance by 20%)",
        "exp.art.l2": "Reduced bug reports from 6/mo to 2/mo via JUnit",
        "exp.art.l3": "Achieved 70% migration rate from Excel workflows",
        // 2. [NEW/MERGED] Capital Asset Planning (English)
        "exp.cap.role": "WMW Consultant | Capital Asset Planning",
        "exp.cap.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Project Overview】</h4>
                    <p>New development and O&M of multiple B2B/B2C products in the Insurance & Inheritance domain.</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Positions】</h4>
                    <p>PM / PL / SE / Bridge SE / Data Engineer</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Roles & Achievements by Project】</h4>
                    <ul class="list-disc list-inside space-y-2">
                        <li><strong>ART (B2B):</strong> Developed a corporate inheritance simulation system using a calculation engine. As DB Team Lead, handled requirements to DB design. Managed offshore development and tax accountant collaboration.</li>
                        <li><strong>OSCAR (B2B):</strong> OCR + NLP system for analyzing financial statements. As Project Leader, led requirements, development direction, and QA. Managed offshore teams.</li>
                        <li><strong>FPS (B2C):</strong> Enterprise inheritance web service. Handled entire cycle from requirements to O&M. Customized calculation engine.</li>
                        <li><strong>EP (B2C):</strong> Maintained an ActionScript-based iPhone inheritance app. Negotiated with Apple to achieve App Store re-release.</li>
                        <li><strong>Internal DWH:</strong> Designed DWH, developed ETL (Airflow), built AWS infra, and visualized via QuickSight for system integration.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Management & Tech Strategy】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Standardized design guidelines across projects.</li>
                        <li>Optimized costs and quality by establishing Vietnam offshore teams.</li>
                        <li>Converted tax knowledge into business specifications via expert collaboration.</li>
                        <li>Promoted data strategy by building a cross-departmental analysis platform.</li>
                        <li>Unified AWS infrastructure (EC2, ECS, Lambda, QuickSight) across projects.</li>
                        <li>Successfully maintained legacy tech (ActionScript) and re-released to App Store.</li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Cost Reduction</h5>
                        <p class="font-bold text-lg">20%+</p>
                        <p class="text-xs text-gray-500">via Offshore Dev</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Requirement Phase</h5>
                        <p class="font-bold text-lg">-30% Time</p>
                        <p class="text-xs text-gray-500">via Logic Standardization</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Decision Speed</h5>
                        <p class="font-bold text-sm">Improved via QuickSight</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">Service Continuity</h5>
                        <p class="font-bold text-sm">App Store Re-release</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Tech Stack】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Java</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Python</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">ActionScript</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Spring</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Flask</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">MySQL/PostgreSQL</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">AWS (ECS, Lambda, etc)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">QuickSight</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Airflow</span>
                    </div>
                </div>
            </div>
        `,
        
        // 3. [UPDATED] Previous Experience (Co-founder & Freelance)
        "exp.prev.title": "Co-founder & SE",
        "exp.prev.role": "Co-founder & Dev Manager | SI Startup",
        "exp.prev.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p class="font-medium text-apple-dark">
                        Founded an SI company with a colleague and served as Development Manager. 
                        Led multiple high-stake projects ranging from medical data analysis to financial systems.
                    </p>
                </div>

                <!-- 1. Medical Data Analysis -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">1. Medical Data Analysis System (2017-2019)</h4>
                    <p class="text-xs text-gray-500 mb-2">PL / Data Engineer</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Designed on-premise data infrastructure for university medical research.</li>
                        <li>Optimized MongoDB time-series data, improving query speed by 3x.</li>
                        <li>Developed an in-house BI tool, designing UI/UX for non-engineers.</li>
                        <li><strong>Tech:</strong> Python, MongoDB, Flask, Azure</li>
                    </ul>
                </div>

                <!-- 3. Financial Guarantee System -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">2. Financial Guarantee System (2014-2017)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / Programmer</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Designed pixel-perfect reports for a major bank.</li>
                        <li>Developed common API (JAR) for insurance systems using Hibernate.</li>
                        <li><strong>Tech:</strong> Java, Spring, Hibernate, Oracle</li>
                    </ul>
                </div>

                <!-- 4. Housing Loan System -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">3. Housing Loan System (2013-2014)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / Programmer</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Developed SOAP API integration between loan and reception systems.</li>
                        <li>Led deployment and testing phases with end-users.</li>
                        <li><strong>Tech:</strong> Java, MySQL, SOAP, Spring</li>
                    </ul>
                </div>

                <!-- 5. Telecom "JUMP" System -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">4. Telecom "JUMP" System (2012-2013)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / Programmer</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Built "Maintenance Exchange" module from scratch.</li>
                        <li>Clarified specs through self-driven research and communication.</li>
                        <li><strong>Tech:</strong> Java, Struts2, Oracle 9i</li>
                    </ul>
                </div>

                <!-- 6. ERP System (EBBIS) -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">5. ERP System (HR/Accounting) (2011-2012)</h4>
                    <p class="text-xs text-gray-500 mb-2">PL / SE</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Led a team of 4 as PL for HR & Accounting modules.</li>
                        <li>Managed complex logic for journal entries and master data.</li>
                        <li><strong>Tech:</strong> C#, MSSQL Server</li>
                    </ul>
                </div>

                <!-- 7. Mobile Device Mgmt (Aldadin) -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">6. Mobile Device Mgmt (Aldadin) (2011)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / Programmer</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Solo development of new features for telecom device management.</li>
                        <li><strong>Tech:</strong> Java, Oracle, Swing</li>
                    </ul>
                </div>
            </div>
        `,
        // 4. [NEW] LAS21 (Independent Section)
        "exp.las21.role": "SE / Programmer | LAS21",
        "exp.las21.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Project Overview】</h4>
                    <p>Development of "Specific Medical Examination" module for a City Hall Health Management System.</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Key Achievements】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li><strong>Full-Cycle Solo Dev:</strong> Handled Requirements, Design, Coding, and Testing alone for the specific exam module.</li>
                        <li><strong>Self-Taught Domain:</strong> Studied administrative laws and books to define system specs without prior knowledge.</li>
                        <li><strong>First Requirements Def:</strong> Successfully conducted Requirements Definition in Japanese for the first time.</li>
                        <li><strong>Quality Assurance:</strong> Designed and executed all test phases (Unit to Integration), ensuring on-time release.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【Tech Stack】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Java</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Oracle 9i</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Seasar2</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">iBatis</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">WebLogic</span>
                    </div>
                </div>
            </div>
        `,
        // [NEW] Side Projects Title
        "side.title": "Side Projects & Others",
        // Side Project 1: MoneyLook
        "side.moneylook.role": "Operation & Maintenance",
        "side.moneylook.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>MoneyLook (Financial Aggregation Service):</strong><br>
                    Responsible for the stable operation and maintenance of the account aggregation service.
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>System monitoring and troubleshooting to ensure high availability.</li>
                    <li>Regular maintenance and bug fixes for the financial data scraper.</li>
                    <li><strong>Tech:</strong> Java, JSP, Oracle</li>
                </ul>
                <div class="mt-4">
                    <a href="https://www.moneylook.jp/" target="_blank" class="inline-flex items-center text-apple-blue font-semibold hover:underline">
                        Visit MoneyLook <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                    </a>
                </div>
            </div>
        `,
        // Side Project 2: MUFG
        "side.mufg.role": "Batch System Construction",
        "side.mufg.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>MUFG Bank (Foreign Exchange System):</strong><br>
                    Developed high-volume batch processing systems for foreign exchange data.
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>Designed and implemented batch logic for large-scale transaction data.</li>
                    <li>Optimized SQL queries for performance improvement in batch windows.</li>
                    <li><strong>Tech:</strong> Java, Shell Script, Oracle (PL/SQL)</li>
                </ul>
                <div class="mt-4">
                    <a href="https://www.bk.mufg.jp/ippan/gaitame/index.html" target="_blank" class="inline-flex items-center text-apple-blue font-semibold hover:underline">
                        Visit Service <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                    </a>
                </div>
            </div>
        `,
        // [NEW] Side Project: Fast Offer (추가됨)
        "side.fastoffer.role": "App Maintenance (iOS/Android)",
        "side.fastoffer.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>"Fast Offer" (Recruitment App):</strong><br>
                    Maintained the iOS app and re-developed the Android version from scratch without specifications.
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>Reverse-engineered the Android app based on the iOS version (Phase 3).</li>
                    <li>Implemented features alone using an Agile-like process.</li>
                    <li><strong>Tech:</strong> Java, Android SDK, PHP, MySQL</li>
                </ul>
            </div>
        `,
        // Blog
        "blog.title": "Insights & Interests.",
        "blog.subtitle": "Tech, Management, and Business logs from <a href='https://okpy.net' target='_blank' class='text-apple-blue hover:underline'>okpy.net</a>",
        "footer.title": "Let's build something starful."
    },
    "jp": {
        "nav.about": "About",
        "nav.exp": "Experience",
        "nav.blog": "Blog",
        "hero.role": "プロダクトマネージャー & エンジニア",
        "hero.title": "こんにちは、Starfulです。",
        "hero.desc": "技術の力でビジネス戦略を実現します。<br><span class='text-apple-dark font-medium'>PM, Data Engineer, Cloud Architect.</span>",
        "hero.btn.exp": "経歴を見る",
        "hero.btn.blog": "ブログを読む",
        "about.title": "専門分野",
        "about.role.title": "役割と能力",
        "about.role.1": "<strong>PM / PdM:</strong> KPI設計、戦略策定、アジャイル・スクラム統括。",
        "about.role.2": "<strong>Web & App開発:</strong> Vue.js, Angular, Java, Node.js ベースのフルスタック開発。",
        "about.role.3": "<strong>データ & クラウド:</strong> AWS/GCP インフラ設計, BigQuery DWH構築, ELTパイプライン。",
        "about.loc": "東京, 日本",
        "about.base": "活動拠点",
        "about.years": "経験年数",
        "exp.title": "経歴詳細",
        // Miraiz
        "exp.miraiz.role": "開発PM・PdM代行 | パーソルキャリア",
        "exp.miraiz.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【プロジェクト概要】</h4>
                    <p>通信系 BtoC サービスの開発プロジェクト</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【ポジション】</h4>
                    <p>バックエンドエンジニア / チームリーダー / テックリード / 開発PM / データチームリーダー / サブPdM</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【役割・実績】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>PdM不在時には代理として、事業戦略や機能ロードマップの策定を主導。</li>
                        <li>マーケティング部門と連携し、会員獲得・UU増加に向けたKPI設計と可視化を実現。</li>
                        <li>アジャイル開発体制を構築し、スプリントイベント（プランニング、レビュー、レトロスペクティブ）を定着させた。</li>
                        <li>Figma・Miro・GitHub Projectsを活用し、非エンジニアとの協業フローも設計。</li>
                        <li>データチームを新設・リードし、事業全体の意思決定支援に貢献。</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【データチームとしての実績】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>Looker Studio による全社向けBIダッシュボードの構築</li>
                        <li>GA4とDBログを統合した分析基盤の整備</li>
                        <li>BigQueryを用いたデータマート設計・運用</li>
                        <li>分析クエリのテンプレート化と標準運用ルールの整備</li>
                        <li>ユーザー行動データに基づく改善提案のPDCA導入</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【経営・技術戦略実績】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>経営課題に対して技術面からの提案と中長期ロードマップを策定</li>
                        <li>全社KPIとプロダクトKPIの接続設計により事業貢献度の可視化</li>
                        <li>開発組織拡大に向けた採用戦略・評価制度の整備にも参画</li>
                        <li>技術的負債とドメイン知識のドキュメント化によるリスク管理の実現</li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">会員数</h5>
                        <p class="font-bold text-lg">4,000 → 41,934</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">UU数</h5>
                        <p class="font-bold text-lg">400 → 10,512</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">ダッシュボード利用</h5>
                        <p class="font-bold text-sm">0 → 全社（マーケ、経営層）</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">チーム規模</h5>
                        <p class="font-bold text-sm">5名 → 15名（3チーム体制）</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【使用技術】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">TypeScript (Next.js/NestJS)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Golang</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Vue.js</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">MySQL</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">BigQuery</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">GCP (GCE, GCS, k8s)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Looker Studio</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">GA4</span>
                    </div>
                </div>
            </div>
        `,
        "exp.miraiz.desc": "dodaと連携するB2Cリスキリングサービス（登録者4万人超）。",
        "exp.miraiz.h1": "戦略的判断と成果",
        "exp.miraiz.l1": "MAU/完了率KPI定義 (完了率 10%→32%向上)",
        "exp.miraiz.l2": "月次NPS +5.2ポイント向上",
        "exp.miraiz.l3": "会員数 4,000→41,934人 (10.5倍) 増加を牽引",
         // 2. [NEW/MERGED] Capital Asset Planning (Japanese)
        "exp.cap.role": "WMWコンサルタント | 株式会社キャピタル・アセット・プランニング",
        "exp.cap.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【プロジェクト概要】</h4>
                    <p>保険・相続領域におけるB2B・B2C向けの複数プロダクトの新規開発・運用保守プロジェクト</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【ポジション】</h4>
                    <p>PM / PL / SE / ブリッジSE / データエンジニア</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【担当業務・実績】</h4>
                    <ul class="list-disc list-inside space-y-2">
                        <li><strong>ART（B2B）：</strong>相続計算エンジンを用いた法人向けシミュレーションシステム開発。DBチームリーダーとして要件〜設計を担当。税理士協業、オフショア管理。</li>
                        <li><strong>OSCAR（B2B）：</strong>帳票OCR＋自然言語処理解析システム。PLとして要件定義、開発ディレクション、品質管理、オフショア統括。</li>
                        <li><strong>FPS（B2C）：</strong>大手企業向け相続Webサービス。要件定義〜運用まで一貫対応、エンジンカスタマイズ。</li>
                        <li><strong>EP（B2C）：</strong>ActionScript製iPhoneアプリ保守。Apple社との連携交渉によりStore再公開を実現。</li>
                        <li><strong>社内DWH：</strong>システム統合PJにて、DWH設計・ETL開発・AWS構築・QuickSight可視化まで一貫対応。</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【経営・技術戦略実績】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li>プロジェクト横断での設計ガイドラインと開発標準の整備</li>
                        <li>オフショア開発体制（ベトナム）構築・運用によるコスト最適化</li>
                        <li>税理士との協業を通じた相続・税務ナレッジの資産化</li>
                        <li>DWHを基盤としたデータ活用戦略の推進（部門横断分析基盤）</li>
                        <li>複数PJのAWSインフラ統一（EC2, ECS, Lambda, QuickSight等）</li>
                        <li>古い技術環境（ActionScript）でのアプリ保守と再公開成功</li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">開発コスト</h5>
                        <p class="font-bold text-lg">20%以上削減</p>
                        <p class="text-xs text-gray-500">オフショア体制運用</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">要件確定期間</h5>
                        <p class="font-bold text-lg">30%短縮</p>
                        <p class="text-xs text-gray-500">ロジック整理・設計</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">経営判断スピード</h5>
                        <p class="font-bold text-sm">向上（QuickSight導入）</p>
                    </div>
                    <div>
                        <h5 class="font-bold text-apple-blue text-xs uppercase">サービス継続</h5>
                        <p class="font-bold text-sm">AppleStore再公開成功</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【使用技術】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Java</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Python</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">ActionScript</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Spring</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Flask</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">MySQL/PostgreSQL</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">AWS (ECS, Lambda, etc)</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">QuickSight</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Airflow</span>
                    </div>
                </div>
            </div>
        `,
        
        // 3. [UPDATED] Co-founder & Freelance
        "exp.prev.title": "共同創業 & 開発部長",
        "exp.prev.role": "共同創業者 & 開発部長 | SIスタートアップ",
        "exp.prev.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p class="font-medium text-apple-dark">
                        知人と共にSI企業を立ち上げ、開発部長として従事。<br>
                        医療データ分析から金融基幹システムまで、多岐にわたるプロジェクトをリード。
                    </p>
                </div>

                <!-- 1. 医療データ分析 -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">1. 医療研究データ基盤構築 (2017-2019)</h4>
                    <p class="text-xs text-gray-500 mb-2">PL / データエンジニア</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>大学医療研究向けのオンプレミスデータ基盤・ETL設計・実装。</li>
                        <li>MongoDBの時系列データ最適化により、クエリ速度を約3倍高速化。</li>
                        <li>内製BIツールの要件定義・UI設計・開発マネジメント（5名チーム）。</li>
                        <li><strong>技術:</strong> Python, MongoDB, Flask, Azure</li>
                    </ul>
                </div>

                <!-- 3. 保証システム -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">2. 金融機関向け保証システム (2014-2017)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / プログラマー</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>大手銀行向け帳票出力機能のピクセル単位での精密設計。</li>
                        <li>共通チームとしてDB操作用共通API(JAR)を開発・提供。</li>
                        <li><strong>技術:</strong> Java, Spring, Hibernate, Oracle</li>
                    </ul>
                </div>

                <!-- 4. 住宅ローンシステム -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">3. 住宅ローンシステム連携 (2013-2014)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / プログラマー</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>既存システムと新規受付システム間のSOAP連携API開発。</li>
                        <li>エンドユーザーとの直接折衝・テスト・本番デプロイまで担当。</li>
                        <li><strong>技術:</strong> Java, MySQL, SOAP, Spring</li>
                    </ul>
                </div>

                <!-- 5. 通信JUMPシステム -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">4. 通信事業者向け「JUMP」システム (2012-2013)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / プログラマー</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>「保守交換」機能の要件定義からリリースまでを一貫対応。</li>
                        <li>仕様不明確な中での自律的な調査・設計により安定稼働を実現。</li>
                        <li><strong>技術:</strong> Java, Struts2, Oracle 9i</li>
                    </ul>
                </div>

                <!-- 6. ERPシステム保守 -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">5. ERPシステム (人事・会計) (2011-2012)</h4>
                    <p class="text-xs text-gray-500 mb-2">PL / SE</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>PLとして4名のメンバーをリード。「人事」「会計」モジュール担当。</li>
                        <li>複雑な業務要件の仕様化と進捗・品質管理を完遂。</li>
                        <li><strong>技術:</strong> C#, MSSQL Server</li>
                    </ul>
                </div>

                <!-- 7. 携帯端末管理 (Aldadin) -->
                <div>
                    <h4 class="font-bold text-apple-dark text-base mb-1">6. 携帯端末管理システム (Aldadin) (2011)</h4>
                    <p class="text-xs text-gray-500 mb-2">SE / プログラマー</p>
                    <ul class="list-disc list-inside space-y-1">
                        <li>新規機能追加における設計・実装・テストを単独で完遂。</li>
                        <li><strong>技術:</strong> Java, Oracle, Swing</li>
                    </ul>
                </div>
            </div>
        `,
        // 4. [NEW] LAS21 (Independent Section)
        "exp.las21.role": "SE / プログラマー | LAS21",
        "exp.las21.body": `
            <div class="space-y-6 text-sm leading-relaxed text-gray-600">
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【プロジェクト概要】</h4>
                    <p>自治体向け健康管理システムの「特定検診」機能開発。</p>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【実績・取り組み】</h4>
                    <ul class="list-disc list-inside space-y-1">
                        <li><strong>全工程一人称対応:</strong> 要件定義から設計・実装・テストまでを単独で完遂。</li>
                        <li><strong>ドメイン知識習得:</strong> 専門的な行政業務を書籍・資料で独学し、仕様へ落とし込み。</li>
                        <li><strong>初の要件定義:</strong> 日本語での要件定義を初めて実施し、修正指摘を最小限に抑え高評価を獲得。</li>
                        <li><strong>品質担保:</strong> 単体から統合テストまで自身で設計・実施し、予定通りリリース。</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-apple-dark mb-1">【使用技術】</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Java</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Oracle 9i</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">Seasar2</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">iBatis</span>
                        <span class="px-2 py-1 bg-gray-100 rounded text-xs">WebLogic</span>
                    </div>
                </div>
            </div>
        `,
        // [NEW] Side Projects Title
        "side.title": "サイドプロジェクト & その他",

        // Side Project 1: MoneyLook
        "side.moneylook.role": "運用保守",
        "side.moneylook.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>MoneyLook（資産管理ツール）:</strong><br>
                    アカウントアグリゲーションサービスの安定稼働に向けた運用保守を担当。
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>システムの定常監視およびトラブルシューティング。</li>
                    <li>金融データ取得スクレイパーの改修およびバグ修正。</li>
                    <li><strong>技術:</strong> Java, JSP, Oracle</li>
                </ul>
                <div class="mt-4">
                    <a href="https://www.moneylook.jp/" target="_blank" class="inline-flex items-center text-apple-blue font-semibold hover:underline">
                        サイトを見る <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                    </a>
                </div>
            </div>
        `,

        // Side Project 2: MUFG
        "side.mufg.role": "バッチシステム構築",
        "side.mufg.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>三菱UFJ銀行（外為システム）:</strong><br>
                    外国為替データの大量処理を担うバッチシステムの新規構築を担当。
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>大規模トランザクションデータのバッチロジック設計・実装。</li>
                    <li>処理時間短縮に向けたSQLチューニングとパフォーマンス最適化。</li>
                    <li><strong>技術:</strong> Java, Shell Script, Oracle (PL/SQL)</li>
                </ul>
                <div class="mt-4">
                    <a href="https://www.bk.mufg.jp/ippan/gaitame/index.html" target="_blank" class="inline-flex items-center text-apple-blue font-semibold hover:underline">
                        サービスを見る <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                    </a>
                </div>
            </div>
        `,
        // [NEW] Side Project: Fast Offer (추가됨)
        "side.fastoffer.role": "アプリ保守・開発 (iOS/Android)",
        "side.fastoffer.body": `
            <div class="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>
                    <strong>「速効内定」（就活アプリ）:</strong><br>
                    iPhoneアプリの保守および、設計書なしの状態からのAndroid版再構築を担当。
                </p>
                <ul class="list-disc list-inside space-y-1">
                    <li>iPhone版（フェーズ3）を参照し、Android版を独力で逆解析・実装。</li>
                    <li>アジャイル的アプローチで仕様を確定させながらリリース。</li>
                    <li><strong>技術:</strong> Java, Android SDK, PHP, MySQL</li>
                </ul>
            </div>
        `,
        // Blog
        "blog.title": "インサイト & 興味",
        "blog.subtitle": "技術、マネジメント、ビジネスログ <a href='https://okpy.net' target='_blank' class='text-apple-blue hover:underline'>okpy.net</a>",
        "footer.title": "Let's build something starful."
    }
};

function setLanguage(lang) {
    // 1. 버튼 상태 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.lang === lang) btn.classList.add('active');
    });

    // 2. 텍스트 교체
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}