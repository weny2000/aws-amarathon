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
    const container = document.getElementById('bannerContent');
    if (container) {
        container.innerHTML = loadingHTML;
    }
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
    
    // 组委会（包括顾问、评审和组委会成员）
    renderCommittee(data);
}

// 渲染活动介绍
function renderIntroduction(introduction) {
    const container = document.getElementById('introductionContent');
    
    if (!container) return;
    
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
    
    if (!container) return;
    
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
    
    if (!container) return;
    
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
    
    if (!container) return;
    
    if (!partners) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="partners-container">';
    
    // 12小时直播联盟
    if (partners.liveAlliance) {
        if (partners.liveAlliance.partners && Array.isArray(partners.liveAlliance.partners) && partners.liveAlliance.partners.length > 0) {
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
    }
    
    // 铂金赞助
    if (partners.platinumSponsor) {
        if (partners.platinumSponsor.partners && Array.isArray(partners.platinumSponsor.partners) && partners.platinumSponsor.partners.length > 0) {
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
    }
    
    // 社区合作
    if (partners.communityPartners) {
        if (partners.communityPartners.partners && Array.isArray(partners.communityPartners.partners) && partners.communityPartners.partners.length > 0) {
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
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// 渲染活动召集
function renderAnnouncement(announcement) {
    const container = document.getElementById('announcementContent');
    
    if (!container) return;
    
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
    
    if (!container) return;
    
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
    
    // 如果容器不存在，直接返回（避免错误）
    if (!container) {
        return;
    }
    
    if (!userGroups || userGroups.length === 0) {
        // container.innerHTML = '<div class="empty-state">暂无用户组数据</div>';
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
    
    if (!container) return;
    
    if (!gallery || gallery.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无活动图片</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="gallery-grid">
            ${gallery.map((item, index) => {
                const blogLink = item.blogPost || `event-highlights-${index + 1}`;
                return `
                    <a href="blog.html?year=${currentYear}&post=${blogLink}" class="gallery-item-link">
                        <div class="gallery-item">
                            ${item.image ? 
                                `<img src="${item.image}" alt="${item.caption}" class="gallery-image">` :
                                `<div class="gallery-placeholder">📷</div>`
                            }
                            <div class="gallery-caption">
                                ${item.caption}
                                <span class="read-more">阅读更多 →</span>
                            </div>
                        </div>
                    </a>
                `;
            }).join('')}
        </div>
    `;
}

// 渲染演讲议程
function renderAgenda(agenda) {
    const container = document.getElementById('agendaContent');
    
    if (!container) return;
    
    if (!agenda || agenda.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无演讲议程</div>';
        return;
    }
    
    // 提取唯一的难度级别和语言用于筛选
    const levels = [...new Set(agenda.map(item => item.sessionLevel || 'Level 200'))];
    const languages = [...new Set(agenda.map(item => item.language || 'English'))];
    
    container.innerHTML = `
        <div class="agenda-filters">
            <div class="filter-group">
                <label>难度级别：</label>
                <select id="levelFilter" onchange="filterAgenda()">
                    <option value="all">全部</option>
                    ${levels.map(level => `<option value="${level}">${level}</option>`).join('')}
                </select>
            </div>
            <div class="filter-group">
                <label>语言：</label>
                <select id="languageFilter" onchange="filterAgenda()">
                    <option value="all">全部</option>
                    ${languages.map(lang => `<option value="${lang}">${lang}</option>`).join('')}
                </select>
            </div>
            <div class="filter-group">
                <input type="text" id="searchInput" placeholder="搜索演讲标题或演讲者..." onkeyup="filterAgenda()">
            </div>
        </div>
        <div class="agenda-cards" id="agendaCards">
            ${agenda.map((item, index) => {
                // 分离中英文标题
                const titles = (item.sessionTitle || item.title || '').split('\n');
                const titleEn = titles[0] || '';
                const titleCn = titles[1] || '';
                
                // 分离中英文摘要（通常用换行符分隔）
                const summaries = (item.sessionSummary || item.description || '').split('\n');
                const summaryEn = summaries[0] || '';
                const summaryCn = summaries[1] || '';
                
                return `
                <div class="agenda-card" data-level="${item.sessionLevel || 'Level 200'}" data-language="${item.language || 'English'}" data-index="${index}">
                    <div class="agenda-badge ${getLevelClass(item.sessionLevel)}">${item.sessionLevel || 'Level 200'}</div>
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
                            ${item.language ? `
                                <div class="language-badge">
                                    <span class="language-icon">${getLanguageIcon(item.language)}</span>
                                    <span>${item.language}</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="agenda-right-section">
                            <div class="agenda-desc-section">
                                <h3 class="session-title">
                                    ${titleEn}
                                    ${titleCn ? `<span class="title-cn">${titleCn}</span>` : ''}
                                </h3>
                                <div class="session-summary-container">
                                    <p class="session-summary ${index > 2 ? 'collapsed' : ''}" id="summary-${index}">
                                        ${summaryEn}
                                        ${summaryCn ? `<br><br>${summaryCn}` : ''}
                                    </p>
                                    ${(summaryEn + summaryCn).length > 300 ? `
                                        <button class="toggle-summary" onclick="toggleSummary(${index})">
                                            <span class="expand-text">展开更多</span>
                                            <span class="collapse-text" style="display:none;">收起</span>
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="agenda-bottom-section">
                                <div class="speaker-info">
                                    ${item.photo ? `
                                        <img src="${item.photo}" alt="${item.firstName} ${item.lastName}" class="speaker-photo">
                                    ` : `
                                        <div class="speaker-avatar">${(item.firstName || item.speaker || 'S').charAt(0)}</div>
                                    `}
                                    <div class="speaker-details">
                                        <div class="speaker-name">${item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.speaker}</div>
                                        ${item.country ? `<div class="speaker-country">📍 ${item.country}</div>` : ''}
                                        ${item.title ? `<div class="speaker-title">${item.title}</div>` : ''}
                                    </div>
                                </div>
                                ${(item.twitter || item.facebook || item.instagram || item.gitHub || item.linkedIn || item.other) ? `
                                    <div class="speaker-social">
                                        ${item.facebook ? `<a href="${item.facebook}" target="_blank" rel="noopener noreferrer" class="social-link" title="Facebook"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>` : ''}
                                        ${item.twitter ? `<a href="${item.twitter}" target="_blank" rel="noopener noreferrer" class="social-link" title="Twitter/X"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>` : ''}
                                        ${item.linkedIn ? `<a href="${item.linkedIn}" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>` : ''}
                                        ${item.gitHub ? `<a href="${item.gitHub}" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}

// 获取难度级别对应的CSS类
function getLevelClass(level) {
    if (!level) return 'level-200';
    if (level.includes('300')) return 'level-300';
    if (level.includes('400')) return 'level-400';
    return 'level-200';
}

// 获取语言图标
function getLanguageIcon(language) {
    const icons = {
        'English': '🇬🇧',
        'Chinese': '🇨🇳',
        'Japanese': '🇯🇵',
        'French': '🇫🇷',
        'Francais': '🇫🇷',
        'Spanish': '🇪🇸',
        'German': '🇩🇪'
    };
    return icons[language] || '🌐';
}

// 切换摘要展开/收起
function toggleSummary(index) {
    const summary = document.getElementById(`summary-${index}`);
    const button = event.target.closest('.toggle-summary');
    
    if (summary.classList.contains('collapsed')) {
        summary.classList.remove('collapsed');
        button.querySelector('.expand-text').style.display = 'none';
        button.querySelector('.collapse-text').style.display = 'inline';
    } else {
        summary.classList.add('collapsed');
        button.querySelector('.expand-text').style.display = 'inline';
        button.querySelector('.collapse-text').style.display = 'none';
    }
}

// 筛选议程
function filterAgenda() {
    const levelFilter = document.getElementById('levelFilter')?.value || 'all';
    const languageFilter = document.getElementById('languageFilter')?.value || 'all';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const cards = document.querySelectorAll('.agenda-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const level = card.getAttribute('data-level');
        const language = card.getAttribute('data-language');
        const text = card.textContent.toLowerCase();
        
        const levelMatch = levelFilter === 'all' || level === levelFilter;
        const languageMatch = languageFilter === 'all' || language === languageFilter;
        const searchMatch = searchInput === '' || text.includes(searchInput);
        
        if (levelMatch && languageMatch && searchMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 显示筛选结果提示
    const container = document.getElementById('agendaCards');
    let resultHint = container.querySelector('.filter-result-hint');
    
    if (visibleCount === 0) {
        if (!resultHint) {
            resultHint = document.createElement('div');
            resultHint.className = 'filter-result-hint';
            container.insertBefore(resultHint, container.firstChild);
        }
        resultHint.textContent = '没有找到匹配的演讲议程';
        resultHint.style.display = 'block';
    } else if (resultHint) {
        resultHint.style.display = 'none';
    }
}

// 渲染组委会
function renderCommittee(data) {
    const container = document.getElementById('committeeContent');
    
    if (!container) return;
    
    // 渲染成员卡片的辅助函数
    const renderMemberCard = (member) => `
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
                            ${social.src ? `<img src="${social.src}" alt="social" onerror="this.style.display='none';this.parentElement.innerHTML='🔗'">` : '🔗'}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    const hasCommittee = data.committee && Array.isArray(data.committee) && data.committee.length > 0;
    const hasJudges = data.judges && Array.isArray(data.judges) && data.judges.length > 0;
    const hasAdvisers = data.advisers && Array.isArray(data.advisers) && data.advisers.length > 0;
    
    let html = '';
    
    // 添加导航按钮
    if (hasCommittee || hasJudges || hasAdvisers) {
        html += `
            <div class="committee-nav">
                ${hasCommittee ? `<button class="committee-nav-btn active" onclick="scrollToCommitteeSection('committee-section')">Amarathon组委会<br><span class="nav-subtitle">Amarathon Committee</span></button>` : ''}
                ${hasJudges ? `<button class="committee-nav-btn" onclick="scrollToCommitteeSection('judges-section')">Amarathon 评审团<br><span class="nav-subtitle">Amarathon Panel of Judges</span></button>` : ''}
                ${hasAdvisers ? `<button class="committee-nav-btn" onclick="scrollToCommitteeSection('advisers-section')">Amarathon 顾问<br><span class="nav-subtitle">Amarathon Adviser</span></button>` : ''}
            </div>
        `;
    }
    
    // 渲染组委会成员
    if (hasCommittee) {
        html += `
            <div id="committee-section" class="committee-section">
                <div class="committee-section-header">
                    <h3 class="section-title">Amarathon 组委会</h3>
                    <p class="section-subtitle">Amarathon Committee</p>
                </div>
                <div class="committee-grid">
                    ${data.committee.map(renderMemberCard).join('')}
                </div>
            </div>
        `;
    }
    
    // 渲染评审团
    if (hasJudges) {
        html += `
            <div id="judges-section" class="committee-section">
                <div class="committee-section-header">
                    <h3 class="section-title">Amarathon 评审团</h3>
                    <p class="section-subtitle">Amarathon Panel of Judges</p>
                </div>
                <div class="committee-grid">
                    ${data.judges.map(renderMemberCard).join('')}
                </div>
            </div>
        `;
    }
    
    // 渲染顾问团
    if (hasAdvisers) {
        html += `
            <div id="advisers-section" class="committee-section">
                <div class="committee-section-header">
                    <h3 class="section-title">Amarathon 顾问</h3>
                    <p class="section-subtitle">Amarathon Adviser</p>
                </div>
                <div class="committee-grid">
                    ${data.advisers.map(renderMemberCard).join('')}
                </div>
            </div>
        `;
    }
    
    if (html === '') {
        container.innerHTML = '<div class="empty-state">暂无组委会信息</div>';
    } else {
        container.innerHTML = html;
    }
}

// 显示空状态
function showEmptyState() {
    const elements = {
        'bannerContent': '<div class="empty-state">暂无活动信息</div>',
        'introductionContent': '',
        'liveScheduleContent': '',
        'liveStatusContent': '',
        'partnersContent': '',
        'announcementContent': '<div class="empty-state">暂无活动召集</div>',
        // 'ugContent': '<div class="empty-state">暂无用户组数据</div>',
        'galleryContent': '<div class="empty-state">暂无活动图片</div>',
        'agendaContent': '<div class="empty-state">暂无演讲议程</div>',
        'committeeContent': '<div class="empty-state">暂无组委会信息</div>'
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = elements[id];
        }
    });
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

// 滚动到组委会分组
function scrollToCommitteeSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // 更新导航按钮状态
        document.querySelectorAll('.committee-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
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
    renderContent,
    scrollToCommitteeSection
};
