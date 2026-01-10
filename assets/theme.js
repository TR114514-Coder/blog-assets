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
    
    // 毛玻璃样式和body圆角
    if (CONFIG.enableGlassEffect) {
        style.innerHTML += `
            body {
                backdrop-filter: blur(15px) saturate(180%);
                -webkit-backdrop-filter: blur(15px) saturate(180%);
                background: rgba(255, 255, 255, 0.1) !important;
                margin: 30px auto;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                overflow: auto;
                min-height: calc(100vh - 100px);
                max-width: 90%;
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
            .SideNav {
                border-radius: 15px;
                min-width: unset;
                background: rgba(255, 255, 255, 0.08) !important;
            }
            
            /* 手机端适配 */
            @media (max-width: 768px) {
                body {
                    margin: 10px auto;
                    padding: 15px;
                    max-width: 95%;
                    min-height: calc(100vh - 20px);
                }
                
                /* 确保右上角按钮容器能正常显示 */
                .title-right {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    justify-content: center !important;
                    gap: 5px !important;
                    margin-top: 10px !important;
                }
                
                /* 调整右上角按钮大小 */
                .title-right .btn {
                    height: 36px !important;
                    min-width: 36px !important;
                    padding: 6px 10px !important;
                    font-size: 14px !important;
                    margin: 2px !important;
                }
                
                /* 手机端隐藏按钮文字描述，只显示图标/文字 */
                .title-right .btn .btndescription {
                    display: none !important;
                }
                
                /* 手机端按钮悬停时不显示描述 */
                .title-right .btn:hover .btndescription {
                    display: none !important;
                }
                
                /* 确保按钮容器不会超出屏幕 */
                .title-right {
                    max-width: 100% !important;
                    overflow-x: auto !important;
                    overflow-y: hidden !important;
                    white-space: nowrap !important;
                }
                
                /* 手机端调整圆角大小 */
                .SideNav {
                    border-radius: 10px !important;
                }
                
                /* 手机端调整毛玻璃效果强度 */
                body {
                    backdrop-filter: blur(10px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(10px) saturate(180%) !important;
                }
            }
            
            /* 小屏手机适配 */
            @media (max-width: 480px) {
                body {
                    margin: 5px auto;
                    padding: 10px;
                    border-radius: 10px;
                }
                
                .title-right .btn {
                    height: 32px !important;
                    min-width: 32px !important;
                    padding: 5px 8px !important;
                    font-size: 12px !important;
                }
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
                min-height: 100vh;
            }
        `;
    }

    document.head.appendChild(style);

    // 右上角按钮处理
    let topright_buttons = document.querySelectorAll(".title-right a.btn");
    topright_buttons.forEach(button => {
        let title = button.getAttribute('title');
        if (title) {
            let btndescription = document.createElement('span');
            btndescription.className = 'btndescription';
            btndescription.textContent = title;
            button.appendChild(btndescription);
        }
        
        // 统一按钮样式
        button.style.cssText = `
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        `;
        
        // 添加按钮描述样式
        if (!document.querySelector('#btnDescStyle')) {
            let btnDescStyle = document.createElement('style');
            btnDescStyle.id = 'btnDescStyle';
            btnDescStyle.innerHTML = `
                div.title-right .btn .btndescription {
                    display: none;
                    margin-left: 3px;
                    white-space: nowrap;
                    font-weight: bold;
                }
                div.title-right .btn:hover .btndescription {
                    display: inline;
                }
                
                /* 手机端按钮样式调整 */
                @media (max-width: 768px) {
                    div.title-right {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 5px;
                        margin-top: 10px;
                    }
                    
                    div.title-right .btn {
                        flex-shrink: 0;
                    }
                }
            `;
            document.head.appendChild(btnDescStyle);
        }
    });
});
