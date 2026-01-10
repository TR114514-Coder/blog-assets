document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 配置区域 ====================
    const CONFIG = {
        // 背景设置
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC端背景
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 移动端背景
        enableBackground: true
    };
    // ==================== 配置结束 ====================

    // 获取当前页面路径
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').pop();
    
    // 检查当前页面是否在指定的页面列表中
    const shouldApplyStyles = () => {
        // 文章页（包含/post路径）
        if (currentPath.includes('/post')) {
            return true;
        }
        
        // 分页页面（page*.html）
        if (currentPage.startsWith('page') && currentPage.endsWith('.html')) {
            return true;
        }
        
        // 特定页面
        const allowedPages = ['about.html', 'link.html'];
        if (allowedPages.includes(currentPage)) {
            return true;
        }
        
        // 首页（index.html或根目录）
        if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/')) {
            return true;
        }
        
        return false;
    };
    
    // 如果当前页面不在指定列表中，不执行后续代码
    if (!shouldApplyStyles()) {
        return;
    }

    // 设备检测函数
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 获取对应的背景URL
    const getBackgroundUrl = () => {
        return isMobileDevice() ? CONFIG.backgroundUrlMobile : CONFIG.backgroundUrlPC;
    };

    // 创建样式元素
    let style = document.createElement("style");
    
    // 背景设置 - 根据设备类型使用不同的背景
    if (CONFIG.enableBackground) {
        const backgroundUrl = getBackgroundUrl();
        style.innerHTML += `
            html {
                background: url('${backgroundUrl}') no-repeat center center fixed;
                background-size: cover;
                min-height: 100vh;
                background-attachment: fixed;
            }
        `;
    }

    document.head.appendChild(style);
});
