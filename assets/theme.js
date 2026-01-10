document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 配置区域 ====================
    const CONFIG = {
        // 背景设置
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC端背景
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 移动端背景
        enableBackground: true,
        
        // 功能开关
        enableGlassEffect: true,
        
        // 布局设置
        bodyWidth: '65%',      // body宽度（百分比）
        bodyHeight: '70vh',    // body高度（视口高度百分比）
        bodyMaxWidth: '1200px' // body最大宽度
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
    
    // 毛玻璃样式和body圆角
    if (CONFIG.enableGlassEffect) {
        style.innerHTML += `
            /* 主要body样式 */
            body {
                backdrop-filter: blur(15px) saturate(180%);
                -webkit-backdrop-filter: blur(15px) saturate(180%);
                background: rgba(255, 255, 255, 0.1) !important;
                margin: 30px auto;
                padding: 25px;
                border-radius: 15px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                overflow: auto;
                min-height: ${CONFIG.bodyHeight};
                max-height: ${CONFIG.bodyHeight};
                width: ${CONFIG.bodyWidth};
                max-width: ${CONFIG.bodyMaxWidth};
                position: relative;
            }
            
            /* 优化内容区域样式 */
            body > *:not(.title-right) {
                font-size: 0.95em;
            }
            
            /* 右上角按钮容器样式 */
            .title-right {
                position: absolute;
                top: 25px;
                right: 25px;
                z-index: 1000;
            }
            
            /* 按钮样式 */
            .title-right a.btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: auto;
                height: 40px;
                margin: 0 3px;
                padding: 0 15px;
                border-radius: 2em !important;
                transition: 0.3s;
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                background: rgba(255, 255, 255, 0.15) !important;
                border: 1px solid rgba(255, 255, 255, 0.125) !important;
                text-decoration: none;
                color: #333;
                font-weight: bold;
            }
            
            .title-right a.btn:hover {
                background: rgba(255, 255, 255, 0.25) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            /* 按钮图标样式 */
            .title-right a.btn i {
                font-size: 16px;
                margin-right: 0;
            }
            
            /* 按钮描述文字样式 */
            div.title-right .btn .btndescription {
                display: none;
                margin-left: 8px;
                white-space: nowrap;
                font-weight: bold;
                font-size: 14px;
            }
            
            div.title-right .btn:hover .btndescription {
                display: inline;
            }
            
            /* 滚动条样式 */
            body::-webkit-scrollbar {
                width: 8px;
                background: rgba(255, 255, 255, 0.1);
            }
            
            body::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
            }
            
            body::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        `;
    }

    document.head.appendChild(style);

    // 处理右上角按钮
    let toprightButtons = document.querySelectorAll(".title-right a.btn");
    toprightButtons.forEach(button => {
        // 移除按钮原有的内联样式
        button.removeAttribute("style");
        
        // 添加按钮描述（如果按钮有title属性）
        let title = button.getAttribute('title');
        if (title) {
            // 检查是否已经有描述元素
            let existingDesc = button.querySelector('.btndescription');
            if (!existingDesc) {
                let btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        }
        
        // 确保按钮图标在描述文字之前
        let icon = button.querySelector('i');
        let desc = button.querySelector('.btndescription');
        if (icon && desc) {
            button.insertBefore(icon, desc);
        }
    });
});
