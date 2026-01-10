document.addEventListener('DOMContentLoaded', function() {
    const FONT_CONFIG = {
        fontUrl: 'https://blog-assets.traveler.dpdns.org/font/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf',
        enableFont: true,
        onFontLoaded: null
    };

    const applyFontStyles = () => {
        if (FONT_CONFIG.enableFont && FONT_CONFIG.fontUrl) {
            const fontFace = new FontFace('CustomFont', `url('${FONT_CONFIG.fontUrl}')`);
            
            fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                applyFontToDocument();
                
                if (typeof FONT_CONFIG.onFontLoaded === 'function') {
                    FONT_CONFIG.onFontLoaded();
                }
            }).catch((error) => {
                applyFontToDocument();
            });
        } else {
            applyFontToDocument();
        }
    };

    const applyFontToDocument = () => {
        let fontStyle = document.createElement('style');
        fontStyle.id = 'custom-font-styles';
        
        let fontStyles = `
            * {
                ${FONT_CONFIG.enableFont && FONT_CONFIG.fontUrl ? "font-family: 'CustomFont', sans-serif !important;" : ''}
            }
            
            input, textarea, button, select {
                font-family: inherit !important;
            }
            
            pre.notranslate, code.notranslate, .highlight pre, .markdown-body pre,
            .highlight code, .markdown-body code, .markdown-body tt,
            pre code, pre tt, .code, .code-block, .prism-code {
                font-family: 'CustomFont', monospace !important;
            }
            
            .blob-code-inner, .blob-num, .highlight-source-css,
            .highlight-source-js, .highlight-source-jsx {
                font-family: 'CustomFont', 'SFMono-Regular', Consolas, monospace !important;
            }
            
            .post-content code, .article-content code,
            .entry-content code, .blog-post-content code {
                font-family: 'CustomFont', monospace !important;
            }
            
            .icon, .fa, .fas, .far, .fab, .material-icons {
                font-family: inherit !important;
            }
        `;
        
        fontStyle.innerHTML = fontStyles;
        document.head.appendChild(fontStyle);
        
        document.documentElement.setAttribute('data-custom-font-loaded', 'true');
    };

    const initFontCustomizer = () => {
        if (document.querySelector('#custom-font-styles')) {
            return;
        }
        
        applyFontStyles();
        setupDynamicContentObserver();
    };

    const setupDynamicContentObserver = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    setTimeout(() => {
                        ensureFontApplied();
                    }, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    const ensureFontApplied = () => {
        if (!document.querySelector('#custom-font-styles')) {
            applyFontToDocument();
        }
    };

    window.FontCustomizer = {
        reloadFont: () => {
            const existingStyle = document.querySelector('#custom-font-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            applyFontStyles();
        },
        
        updateConfig: (newConfig) => {
            Object.assign(FONT_CONFIG, newConfig);
            
            const existingStyle = document.querySelector('#custom-font-styles');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            applyFontStyles();
        },
        
        getConfig: () => {
            return { ...FONT_CONFIG };
        },
        
        isFontLoaded: () => {
            return document.documentElement.getAttribute('data-custom-font-loaded') === 'true';
        }
    };

    initFontCustomizer();
});
