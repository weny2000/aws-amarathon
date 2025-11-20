# Tab显示控制说明

## 功能概述

网站支持根据年份动态控制Tab的显示/隐藏。目前配置为2025年隐藏"Amarathon组委会"Tab。

## 实现逻辑

### 自动隐藏规则
- **2025年**：隐藏"Amarathon组委会"Tab
- **其他年份**：显示所有Tab

### 行为说明
1. 当切换到2025年时，组委会Tab按钮会自动隐藏
2. 如果用户当前正在查看组委会Tab，切换到2025年后会自动跳转到"活动主页"
3. 切换回其他年份时，组委会Tab会重新显示

## 技术实现

在 `script.js` 中的 `updateTabVisibility(year)` 函数：

```javascript
function updateTabVisibility(year) {
    const committeeBtn = document.querySelector('[onclick="selectTab(\'committee\')"]');
    const committeeTab = document.getElementById('committeeTab');
    
    // 2025年隐藏组委会Tab
    if (year == 2025) {
        if (committeeBtn) committeeBtn.style.display = 'none';
        if (committeeTab) committeeTab.style.display = 'none';
        
        // 如果当前在组委会Tab，切换到活动主页
        if (AppState.currentTab === 'committee') {
            selectTab('home');
        }
    } else {
        if (committeeBtn) committeeBtn.style.display = 'inline-block';
        if (committeeTab && AppState.currentTab === 'committee') {
            committeeTab.style.display = 'block';
        }
    }
}
```

## 如何修改配置

如果需要为其他年份隐藏Tab，修改 `updateTabVisibility()` 函数中的条件判断：

```javascript
// 示例：隐藏多个年份
if (year == 2025 || year == 2026) {
    // 隐藏逻辑
}

// 示例：只显示特定年份
if (year != 2024) {
    // 隐藏逻辑
}
```
