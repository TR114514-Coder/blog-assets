document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 配置区域 ====================
    const CONFIG = {
        // 字体和背景设置
        fontUrl: 'https://blog-assets.traveler.dpdns.org/font/MiSans-Heavy.ttf', // 留空使用默认字体
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC端背景
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 移动端背景
        fontColor: '#000000',
        
        // 功能开关
        enableBackground: true,
        enableFont: true,
        enableGlassEffect: true
    };
    // ==================== 配置结束 ====================

    // 设备检测函数
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 获取对应的背景URL
    const getBackgroundUrl = () => {
        return isMobileDevice() ? CONFIG.backgroundUrlMobile : CONFIG.backgroundUrlPC;
    };

    // 添加字体
    if (CONFIG.enableFont && CONFIG.fontUrl) {
        let fontLink = document.createElement('link');
        fontLink.href = CONFIG.fontUrl;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    // 添加全局字体样式
    let fontStyle = document.createElement('style');
    fontStyle.innerHTML = `
        * {
            font-family: ${CONFIG.enableFont ? `'CustomFont', ` : ''}sans-serif;
            color: ${CONFIG.fontColor};
        }
    `;
    document.head.appendChild(fontStyle);

    // 创建样式元素
    let style = document.createElement("style");
    
    // 毛玻璃样式
    if (CONFIG.enableGlassEffect) {
        style.innerHTML += `
            body {
                backdrop-filter: blur(15px) saturate(180%);
                -webkit-backdrop-filter: blur(15px) saturate(180%);
                background: rgba(255, 255, 255, 0.1) !important;
            }
            .SideNav, .btn, .title-right .btn, .subnav-search-input {
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                background: rgba(255, 255, 255, 0.15) !important;
                border: 1px solid rgba(255, 255, 255, 0.125) !important;
            }
            .btn:hover {
                background: rgba(255, 255, 255, 0.25) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
        `;
    }

    // 背景设置 - 根据设备类型使用不同的背景
    if (CONFIG.enableBackground) {
        const backgroundUrl = getBackgroundUrl();
        style.innerHTML += `
            html {
                background: url('${backgroundUrl}') no-repeat center center fixed;
                background-size: cover;
            }
        `;
    }

    document.head.appendChild(style);
});
