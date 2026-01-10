document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 字体配置区域 ====================
    const FONT_CONFIG = {
        // 字体设置
        fontUrl: 'https://blog-assets.traveler.dpdns.org/font/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf', // 留空使用默认字体
        enableFont: true,
        
        // 可选：设置字体加载后的回调
        onFontLoaded: null
    };
    // ==================== 配置结束 ====================

    // 应用字体样式
    const applyFontStyles = () => {
        // 添加字体
        if (FONT_CONFIG.enableFont && FONT_CONFIG.fontUrl) {
            // 创建字体定义
            const fontFace = new FontFace('CustomFont', `url('${FONT_CONFIG.fontUrl}')`);
            
            // 加载字体
            fontFace.load().then((loadedFont) => {
                // 添加字体到文档
                document.fonts.add(loadedFont);
                
                // 应用字体样式
                applyFontToDocument();
                
                // 触发回调函数（如果存在）
                if (typeof FONT_CONFIG.onFontLoaded === 'function') {
                    FONT_CONFIG.onFontLoaded();
                }
                
                console.log('自定义字体加载成功');
            }).catch((error) => {
                console.error('字体加载失败:', error);
                // 即使字体加载失败，也应用字体颜色
                applyFontToDocument();
            });
        } else {
            // 即使没有字体URL，也应用字体颜色
            applyFontToDocument();
        }
    };

    // 应用字体到文档
    const applyFontToDocument = () => {
        // 创建字体样式
        let fontStyle = document.createElement('style');
        fontStyle.id = 'custom-font-styles';
        
        // 构建字体样式
        let fontStyles = `
            * {
                ${FONT_CONFIG.enableFont && FONT_CONFIG.fontUrl ? "font-family: 'CustomFont', sans-serif !important;" : ''}
                 !important;
            }
            
            /* 输入框和按钮保持原有字体，避免影响用户体验 */
            input, textarea, button, select {
                font-family: inherit !important;
            }
            
            /* 确保代码块也使用定义的字体 */
            pre.notranslate, code.notranslate, .highlight pre, .markdown-body pre,
            .highlight code, .markdown-body code, .markdown-body tt,
            pre code, pre tt, .code, .code-block, .prism-code {
                font-family: 'CustomFont', monospace !important;
            }
            
            /* 特定网站适配 */
            /* 适配GitHub风格代码块 */
            .blob-code-inner, .blob-num, .highlight-source-css,
            .highlight-source-js, .highlight-source-jsx {
                font-family: 'CustomFont', 'SFMono-Regular', Consolas, monospace !important;
            }
            
            /* 适配常见博客平台 */
            .post-content code, .article-content code,
            .entry-content code, .blog-post-content code {
                font-family: 'CustomFont', monospace !important;
            }
            
            /* 防止某些元素字体被覆盖导致布局问题 */
            .icon, .fa, .fas, .far, .fab, .material-icons {
                font-family: inherit !important;
            }
        `;
        
        fontStyle.innerHTML = fontStyles;
        document.head.appendChild(fontStyle);
        
        // 添加加载完成标志
        document.documentElement.setAttribute('data-custom-font-loaded', 'true');
    };

    // 初始化函数
    const initFontCustomizer = () => {
        // 检查是否已经应用过字体
        if (document.querySelector('#custom-font-styles')) {
            return;
        }
        
        // 应用字体
        applyFontStyles();
        
        // 监听动态内容加载
        setupDynamicContentObserver();
    };

    // 设置动态内容观察器
    const setupDynamicContentObserver = () => {
        // 使用MutationObserver监听DOM变化
        const observer = new MutationObserver((mutations) => {
            // 当有新元素添加到DOM时，确保字体样式应用
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    // 短暂延迟后重新检查字体应用
                    setTimeout(() => {
                        ensureFontApplied();
                    }, 100);
                }
            });
        });
        
        // 开始观察整个文档的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    // 确保字体应用到新加载的内容
    const ensureFontApplied = () => {
        // 检查样式表是否存在
        if (!document.querySelector('#custom-font-styles')) {
            applyFontToDocument();
        }
    };

    // 提供外部API
    window.FontCustomizer = {
        // 重新加载字体
        reloadFont: () => {
            // 移除现有样式
            const existingStyle = document.querySelector('#custom-font-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // 重新应用字体
            applyFontStyles();
        },
        
        // 更新配置
        updateConfig: (newConfig) => {
            Object.assign(FONT_CONFIG, newConfig);
            
            // 重新应用字体
            const existingStyle = document.querySelector('#custom-font-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            applyFontStyles();
        },
        
        // 获取当前配置
        getConfig: () => {
            return { ...FONT_CONFIG };
        },
        
        // 检查字体是否已加载
        isFontLoaded: () => {
            return document.documentElement.getAttribute('data-custom-font-loaded') === 'true';
        }
    };

    // 初始化字体自定义功能
    initFontCustomizer();
});
