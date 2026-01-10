document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 配置区域 ====================
    const CONFIG = {
        // 背景设置
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC端背景
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 移动端背景
        enableBackground: true,
        // 毛玻璃效果设置
        blurIntensity: '10px', // 模糊强度
        borderRadius: '15px',  // 圆角大小
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // 背景颜色和透明度
        contentMargin: '20px'  // 内容边距
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
                padding: 0;
                margin: 0;
            }
            
            /* 为body添加毛玻璃效果 */
            body {
                backdrop-filter: blur(${CONFIG.blurIntensity});
                -webkit-backdrop-filter: blur(${CONFIG.blurIntensity});
                background-color: ${CONFIG.backgroundColor};
                border-radius: ${CONFIG.borderRadius};
                margin: ${CONFIG.contentMargin};
                min-height: calc(100vh - 2 * ${CONFIG.contentMargin});
                position: relative;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            /* 确保body内的内容不会被模糊 */
            body > * {
                position: relative;
                z-index: 1;
            }
            
            /* 为body添加伪元素增强毛玻璃效果 */
            body::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: inherit;
                filter: blur(${CONFIG.blurIntensity});
                -webkit-filter: blur(${CONFIG.blurIntensity});
                z-index: -1;
                border-radius: ${CONFIG.borderRadius};
                margin: -${CONFIG.blurIntensity};
            }
            
            /* 移动端适配 */
            @media (max-width: 768px) {
                body {
                    margin: ${CONFIG.contentMargin};
                    border-radius: ${parseInt(CONFIG.borderRadius) / 1.5}px;
                }
                
                body::before {
                    border-radius: ${parseInt(CONFIG.borderRadius) / 1.5}px;
                }
            }
            
            /* 确保所有主要内容容器都有透明背景 */
            .container, .main-content, .content, .post-content,
            .header, .footer, .sidebar, .widget {
                background-color: transparent !important;
            }
            
            /* 为一些常见元素添加微调，确保毛玻璃效果最佳 */
            .post, .article, .card, .box {
                background-color: rgba(255, 255, 255, 0.05) !important;
                border-radius: ${parseInt(CONFIG.borderRadius) / 2}px;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
        `;
    }

    document.head.appendChild(style);
});
