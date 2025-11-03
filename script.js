// SPA 应用状态管理
const AppState = {
    currentYear: 2024,
    currentTab: 'home',
    eventsData: {},
    isLoading: false
};

// 兼容性变量
let currentYear = AppState.currentYear;
let currentTab = AppState.currentTab;
let eventsData = AppState.eventsData;

// 初始化
async function init() {
    console.log('SPA 应用初始化开始...');
    
    // 加载数据
    await loadData();
    
    // 从URL加载状态
    loadStateFromURL();
    
    // 渲染界面
    renderYearButtons();
    renderContent(AppState.currentYear);
    
    // 设置初始标签页状态
    setInitialTabState();
    
    console.log('SPA 应用初始化完成');
}

// 设置初始标签页状态
function setInitialTabState() {
    // 更新标签按钮状态
    document.querySelectorAll('.sub-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeTabBtn = document.querySelector(`[onclick="selectTab('${AppState.currentTab}')"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTab = document.getElementById(AppState.currentTab + 'Tab');
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// 切换标签页
function selectTab(tab) {
    AppState.currentTab = tab;
    currentTab = tab;
    
    // 更新URL
    updateURL();
    
    // 更新标签按钮状态
    document.querySelectorAll('.sub-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');
    
    // 平滑滚动到内容区域
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}

// 显示加载状态
function showLoading() {
    AppState.isLoading = true;
    const loadingHTML = '<div class="loading-spinner">🔄 加载中...</div>';
    document.getElementById('bannerContent').innerHTML = loadingHTML;
}

// 隐藏加载状态
function hideLoading() {
    AppState.isLoading = false;
}

// 加载年份配置
async function loadYearsConfig() {
    try {
        const response = await fetch('data/years.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn('加载年份配置失败，使用默认配置:', error);
        return {
            availableYears: [2024, 2025],
            defaultYear: 2024
        };
    }
}

// 加载单个年份数据
async function loadYearData(year) {
    try {
        const response = await fetch(`data/${year}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`${year}年数据加载成功`);
        return data;
    } catch (error) {
        console.error(`加载${year}年数据失败:`, error);
        showNotification(`加载${year}年数据失败`, 'error');
        return null;
    }
}

// 加载所有数据
async function loadData() {
    showLoading();
    try {
        // 首先加载年份配置
        const yearsConfig = await loadYearsConfig();
        console.log('年份配置:', yearsConfig);
        
        // 设置默认年份
        AppState.currentYear = yearsConfig.defaultYear;
        currentYear = AppState.currentYear;
        
        // 加载所有年份的数据
        const loadPromises = yearsConfig.availableYears.map(async (year) => {
            const data = await loadYearData(year);
            return { year, data };
        });
        
        const results = await Promise.all(loadPromises);
        
        // 组装数据
        AppState.eventsData = {};
        results.forEach(({ year, data }) => {
            if (data) {
                AppState.eventsData[year] = data;
            }
        });
        
        eventsData = AppState.eventsData;
        
        const loadedYears = Object.keys(eventsData);
        console.log('所有数据加载完成:', loadedYears);
        
        if (loadedYears.length === 0) {
            throw new Error('没有成功加载任何年份的数据');
        }
        
        showNotification(`成功加载 ${loadedYears.join(', ')} 年度数据`, 'success');
        
    } catch (error) {
        console.error('加载数据失败:', error);
        AppState.eventsData = getDefaultData();
        eventsData = AppState.eventsData;
        showNotification('数据加载失败，使用默认数据', 'warning');
    } finally {
        hideLoading();
    }
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 渲染年度按钮
function renderYearButtons() {
    const yearButtons = document.getElementById('yearButtons');
    const years = Object.keys(eventsData).sort((a, b) => b - a);
    
    yearButtons.innerHTML = years.map(year => `
        <button class="year-btn ${year == currentYear ? 'active' : ''}" 
                onclick="selectYear(${year})">
            ${year}
        </button>
    `).join('');
}

// 选择年度
function selectYear(year) {
    AppState.currentYear = year;
    currentYear = year;
    
    // 更新URL（可选，用于浏览器历史记录）
    updateURL();
    
    renderYearButtons();
    renderContent(year);
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 更新URL状态（SPA路由）
function updateURL() {
    const url = new URL(window.location);
    url.searchParams.set('year', AppState.currentYear);
    url.searchParams.set('tab', AppState.currentTab);
    window.history.replaceState(null, '', url);
}

// 从URL读取状态
function loadStateFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');
    const tab = urlParams.get('tab');
    
    if (year && eventsData[year]) {
        AppState.currentYear = parseInt(year);
        currentYear = AppState.currentYear;
    }
    
    if (tab && ['home', 'agenda', 'committee'].includes(tab)) {
        AppState.currentTab = tab;
        currentTab = AppState.currentTab;
    }
}

// 渲染内容
function renderContent(year) {
    const data = eventsData[year];
    
    if (!data) {
        showEmptyState();
        return;
    }
    
    // 活动主页
    renderBanner(data.banner);
    renderIntroduction(data.introduction);
    renderLiveSchedule(data.liveSchedule);
    renderLiveStatus(data.liveStatus, data.slackInvite, data.termsLink);
    renderPartners(data.partners);
    renderAnnouncement(data.announcement);
    renderUG(data.userGroups);
    renderGallery(data.gallery);
    
    // 演讲议程
    renderAgenda(data.agenda);
    
    // 组委会
    renderCommittee(data.committee);
}

// 渲染活动介绍
function renderIntroduction(introduction) {
    const container = document.getElementById('introductionContent');
    
    if (!introduction) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="introduction-card">
            <p class="intro-title">${introduction.title}</p>
            <p class="intro-subtitle">${introduction.subtitle}</p>
            <p class="intro-subtitle-en">${introduction.subtitleEn}</p>
            <div class="intro-theme">
                <p class="theme-title">${introduction.theme}</p>
                <p class="theme-description">${introduction.themeDescription}</p>
            </div>
        </div>
    `;
}

// 渲染直播安排
function renderLiveSchedule(liveSchedule) {
    const container = document.getElementById('liveScheduleContent');
    
    if (!liveSchedule) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="live-schedule-container">
            <!-- 直播时间 -->
            <div class="live-schedule-card">
                <div class="card-icon">📅</div>
                <h3 class="card-title">直播时间 Event Date</h3>
                <div class="event-dates">
                    ${liveSchedule.eventDates.map(event => `
                        <div class="event-date-item">
                            <span class="timezone">${event.timezone}:</span>
                            <span class="datetime">${event.date}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 直播互动 -->
            <div class="live-schedule-card">
                <div class="card-icon">📺</div>
                <h3 class="card-title">${liveSchedule.livestreamInteraction.title}</h3>
                <div class="card-content">
                    <p class="description-cn">${liveSchedule.livestreamInteraction.description}</p>
                    <p class="description-en">${liveSchedule.livestreamInteraction.descriptionEn}</p>
                    <p class="details">${liveSchedule.livestreamInteraction.details}</p>
                    <div class="interaction-links">
                        <a href="${liveSchedule.livestreamInteraction.link}" target="_blank" class="link-button">参与挑战</a>
                        <span class="twitter-handle">${liveSchedule.livestreamInteraction.twitter}</span>
                    </div>
                    <a href="#" class="terms-link">${liveSchedule.livestreamInteraction.termsLink}</a>
                </div>
            </div>
            
            <!-- 实时翻译 -->
            <div class="live-schedule-card">
                <div class="card-icon">🌐</div>
                <h3 class="card-title">${liveSchedule.realTimeTranslation.title}</h3>
                <div class="card-content">
                    <p class="description-cn">${liveSchedule.realTimeTranslation.description}</p>
                    <p class="description-en">${liveSchedule.realTimeTranslation.descriptionEn}</p>
                </div>
            </div>
        </div>
    `;
}

// 渲染直播状态
function renderLiveStatus(liveStatus, slackInvite, termsLink) {
    const container = document.getElementById('liveStatusContent');
    
    if (!liveStatus) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="live-status-card">
            <div class="status-buttons">
                <span class="status-btn disabled">${liveStatus.status}</span>
            </div>
            <div class="replay-info">
                <a href="${liveStatus.replayLink}" target="_blank" rel="noopener noreferrer" class="replay-link">
                    ${liveStatus.replayDescription}
                </a>
            </div>
            ${slackInvite ? `
                <div class="community-links">
                    <a href="${slackInvite.link}" target="_blank" rel="noopener noreferrer" class="community-link">
                        ${slackInvite.description}
                    </a>
                </div>
            ` : ''}
            ${termsLink ? `
                <div class="terms-info">
                    <a href="${termsLink}" target="_blank" rel="noopener noreferrer" class="terms-link">
                        Terms and Conditions
                    </a>
                </div>
            ` : ''}
        </div>
    `;
}

// 渲染合作伙伴
function renderPartners(partners) {
    const container = document.getElementById('partnersContent');
    
    if (!partners) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="partners-container">';
    
    // 12小时直播联盟
    if (partners.liveAlliance) {
        html += `
            <div class="partner-category">
                <h3 class="partner-title">${partners.liveAlliance.title}</h3>
                <div class="partner-logos">
                    ${partners.liveAlliance.partners.map(partner => `
                        <a href="${partner.link}" target="_blank" rel="noopener noreferrer" class="partner-logo-link">
                            <img src="${partner.logo}" alt="${partner.name}" class="partner-logo">
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 铂金赞助
    if (partners.platinumSponsor) {
        html += `
            <div class="partner-category">
                <h3 class="partner-title">${partners.platinumSponsor.title}</h3>
                <div class="partner-logos">
                    ${partners.platinumSponsor.partners.map(partner => `
                        <a href="${partner.link}" target="_blank" rel="noopener noreferrer" class="partner-logo-link">
                            <img src="${partner.logo}" alt="${partner.name}" class="partner-logo">
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 社区合作
    if (partners.communityPartners) {
        html += `
            <div class="partner-category">
                <h3 class="partner-title">${partners.communityPartners.title}</h3>
                <div class="partner-logos">
                    ${partners.communityPartners.partners.map(partner => `
                        <a href="${partner.link}" target="_blank" rel="noopener noreferrer" class="partner-logo-link">
                            <img src="${partner.logo}" alt="${partner.name}" class="partner-logo">
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// 渲染活动召集
function renderAnnouncement(announcement) {
    const container = document.getElementById('announcementContent');
    
    if (!announcement) {
        container.innerHTML = '<div class="empty-state">暂无活动召集信息</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="announcement-card">
            <h3>${announcement.title}</h3>
            <div class="date">📅 ${announcement.date}</div>
            <div class="description">${announcement.description}</div>
        </div>
    `;
}

// 渲染横幅
function renderBanner(banner) {
    const container = document.getElementById('bannerContent');
    
    if (!banner) {
        container.innerHTML = '<div class="banner-placeholder">🏃 Amarathon ' + currentYear + '</div>';
        return;
    }
    
    if (banner.image) {
        container.innerHTML = `<img src="${banner.image}" alt="${banner.alt || 'Amarathon'}" class="banner-image">`;
    } else {
        container.innerHTML = '<div class="banner-placeholder">🏃 Amarathon ' + currentYear + '</div>';
    }
}

// 渲染UG图表
function renderUG(userGroups) {
    const container = document.getElementById('ugContent');
    
    if (!userGroups || userGroups.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无用户组数据</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="ug-grid">
            ${userGroups.map(ug => `
                <div class="ug-card">
                    <div class="ug-icon">${ug.icon || '👥'}</div>
                    <div class="ug-name">${ug.name}</div>
                    <div class="ug-count">${ug.count}</div>
                    <div class="ug-label">参与人数</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 渲染活动图片
function renderGallery(gallery) {
    const container = document.getElementById('galleryContent');
    
    if (!gallery || gallery.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无活动图片</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="gallery-grid">
            ${gallery.map(item => `
                <div class="gallery-item">
                    ${item.image ? 
                        `<img src="${item.image}" alt="${item.caption}" class="gallery-image">` :
                        `<div class="gallery-placeholder">📷</div>`
                    }
                    <div class="gallery-caption">${item.caption}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 渲染演讲议程
function renderAgenda(agenda) {
    const container = document.getElementById('agendaContent');
    
    if (!agenda || agenda.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无演讲议程</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="agenda-cards">
            ${agenda.map(item => `
                <div class="agenda-card">
                    <div class="agenda-badge">${item.sessionLevel || 'Level 200'}</div>
                    <div class="agenda-card-content">
                        <div class="agenda-time-section">
                            <div class="time-item">
                                <span class="timezone-label">UTC</span>
                                <span class="time-value">${item.sessionTimeUTC || item.time}</span>
                            </div>
                            ${item.sessionTimeBeijing ? `
                                <div class="time-item">
                                    <span class="timezone-label">Beijing</span>
                                    <span class="time-value">${item.sessionTimeBeijing}</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="agenda-main-content">
                            <div class="agenda-desc-section">
                                <h3 class="session-title">${item.sessionTitle || item.title}</h3>
                                ${item.language ? `
                                    <div class="language-tag">
                                        <span class="lang-label">Language:</span>
                                        <span class="lang-value">${item.language}</span>
                                    </div>
                                ` : ''}
                                <p class="session-summary">${item.sessionSummary || item.description}</p>
                            </div>
                            <div class="speaker-section">
                                <div class="speaker-info">
                                    ${item.photo ? `
                                        <img src="${item.photo}" alt="${item.firstName} ${item.lastName}" class="speaker-photo">
                                    ` : `
                                        <div class="speaker-avatar">${(item.firstName || item.speaker || 'S').charAt(0)}</div>
                                    `}
                                    <div class="speaker-details">
                                        <div class="speaker-name">${item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.speaker}</div>
                                        ${item.country ? `<div class="speaker-country">${item.country}</div>` : ''}
                                        ${item.title ? `<div class="speaker-title">${item.title}</div>` : ''}
                                    </div>
                                </div>
                                ${(item.twitter || item.facebook || item.instagram || item.gitHub || item.linkedIn || item.other) ? `
                                    <div class="speaker-social">
                                        ${item.twitter ? `<a href="${item.twitter}" target="_blank" rel="noopener noreferrer" class="social-link" title="Twitter/X">𝕏</a>` : ''}
                                        ${item.facebook ? `<a href="${item.facebook}" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook">f</a>` : ''}
                                        ${item.instagram ? `<a href="${item.instagram}" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram">📷</a>` : ''}
                                        ${item.gitHub ? `<a href="${item.gitHub}" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">🐙</a>` : ''}
                                        ${item.linkedIn ? `<a href="${item.linkedIn}" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">in</a>` : ''}
                                        ${item.other ? `<a href="${item.other}" target="_blank" rel="noopener noreferrer" class="social-link" title="Website">🌐</a>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 渲染组委会
function renderCommittee(committee) {
    const container = document.getElementById('committeeContent');
    
    if (!committee || committee.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无组委会信息</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="committee-grid">
            ${committee.map(member => `
                <div class="committee-card">
                    ${member.poster || member.photo ? `
                        <img src="${member.poster || member.photo}" alt="${member.name}" class="committee-photo">
                    ` : `
                        <div class="committee-avatar">${member.name.charAt(0)}</div>
                    `}
                    <div class="committee-info">
                        <div class="committee-name">${member.name}</div>
                        ${member.position ? `<div class="committee-position">${member.position}</div>` : ''}
                        ${member.positionEn ? `<div class="committee-position-en">${member.positionEn}</div>` : ''}
                        ${member.title ? `<div class="committee-title">${member.title}</div>` : ''}
                        ${member.desc ? `<div class="committee-desc">${member.desc}</div>` : ''}
                        ${member.descEn ? `<div class="committee-desc-en">${member.descEn}</div>` : ''}
                        ${member.bio ? `<div class="committee-bio">${member.bio}</div>` : ''}
                        ${member.job ? `<div class="committee-job">${member.job}</div>` : ''}
                        ${member.jobEn ? `<div class="committee-job-en">${member.jobEn}</div>` : ''}
                    </div>
                    ${member.share && member.share.length > 0 ? `
                        <div class="committee-social">
                            ${member.share.map(social => `
                                <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-icon">
                                    ${social.src ? `<img src="${social.src}" alt="social">` : '🔗'}
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// 显示空状态
function showEmptyState() {
    document.getElementById('bannerContent').innerHTML = 
        '<div class="empty-state">暂无活动信息</div>';
    document.getElementById('introductionContent').innerHTML = '';
    document.getElementById('liveScheduleContent').innerHTML = '';
    document.getElementById('liveStatusContent').innerHTML = '';
    document.getElementById('partnersContent').innerHTML = '';
    document.getElementById('announcementContent').innerHTML = 
        '<div class="empty-state">暂无活动召集</div>';
    document.getElementById('ugContent').innerHTML = 
        '<div class="empty-state">暂无用户组数据</div>';
    document.getElementById('galleryContent').innerHTML = 
        '<div class="empty-state">暂无活动图片</div>';
    document.getElementById('agendaContent').innerHTML = 
        '<div class="empty-state">暂无演讲议程</div>';
    document.getElementById('committeeContent').innerHTML = 
        '<div class="empty-state">暂无组委会信息</div>';
}

// 默认数据
function getDefaultData() {
    return {
        "2025": {
            "announcement": {
                "title": "2025 Amarathon 技术马拉松正式启动！",
                "date": "2025年1月15日",
                "description": "欢迎参加2025年度技术马拉松活动！本次活动将聚焦云计算、人工智能、大数据等前沿技术领域，邀请业界专家分享实践经验，促进技术交流与创新。"
            },
            "contents": [
                {
                    "title": "云原生架构实践",
                    "speaker": "张三",
                    "description": "深入探讨云原生架构设计模式，分享容器化、微服务、DevOps等实践经验。"
                },
                {
                    "title": "AI大模型应用开发",
                    "speaker": "李四",
                    "description": "介绍大语言模型的应用场景，演示如何构建智能对话系统和内容生成应用。"
                },
                {
                    "title": "数据湖架构设计",
                    "speaker": "王五",
                    "description": "分享企业级数据湖的架构设计思路，包括数据治理、安全合规等关键要素。"
                }
            ],
            "participants": [
                { "name": "张三", "role": "云架构师" },
                { "name": "李四", "role": "AI工程师" },
                { "name": "王五", "role": "数据架构师" },
                { "name": "赵六", "role": "DevOps工程师" },
                { "name": "钱七", "role": "前端开发" },
                { "name": "孙八", "role": "后端开发" }
            ]
        },
        "2024": {
            "announcement": {
                "title": "2024 Amarathon 圆满结束",
                "date": "2024年12月20日",
                "description": "2024年度技术马拉松活动已圆满结束，感谢所有参与者的热情支持！"
            },
            "contents": [
                {
                    "title": "Serverless架构实践",
                    "speaker": "陈九",
                    "description": "分享无服务器架构的设计理念和实际应用案例。"
                },
                {
                    "title": "容器安全最佳实践",
                    "speaker": "周十",
                    "description": "探讨容器环境下的安全挑战和解决方案。"
                }
            ],
            "participants": [
                { "name": "陈九", "role": "解决方案架构师" },
                { "name": "周十", "role": "安全专家" },
                { "name": "吴十一", "role": "全栈工程师" },
                { "name": "郑十二", "role": "产品经理" }
            ]
        }
    };
}

// 浏览器历史记录支持
window.addEventListener('popstate', function(event) {
    loadStateFromURL();
    renderYearButtons();
    renderContent(AppState.currentYear);
    setInitialTabState();
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 导出全局API（用于调试）
window.AmarathonSPA = {
    state: AppState,
    selectYear,
    selectTab,
    loadData,
    renderContent
};
