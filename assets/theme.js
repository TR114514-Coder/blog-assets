const CONFIG = {
    ENABLE_THEME: true,
    ENABLE_BACKGROUND: true,
    ENABLE_FONT_COLOR: true,
    ENABLE_BLUR: true, // 毛玻璃效果开关
    BACKGROUND_URL: 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg',
    FONT_COLOR: '#000000',
    FONT_URL: "https://blog-assets.traveler.dpdns.org/font/MiSans-Heavy.ttf", // 不用换字体填null
    FONT_FAMILY: 'sans-serif'
};

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.pathname;

    if (CONFIG.ENABLE_THEME) {
        loadFont();
        if (currentUrl.includes('/index.html') || currentUrl === "/" || currentUrl.includes('/page')) {
            applyTheme('home');
        } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
            applyTheme('post');
        } else if (currentUrl.includes('/tag.html')) {
            applyTheme('tag');
        }
    }

    addButtonDescriptions();

    if (currentUrl.includes('/tag.html')) {
        addSearchKeyboardEvent();
    }

    function loadFont() {
        if (CONFIG.FONT_URL) {
            const fontStyle = document.createElement('style');
            fontStyle.textContent = `@import url('${CONFIG.FONT_URL}');`;
            document.head.appendChild(fontStyle);
        }
    }

    function applyTheme(theme) {
        const style = document.createElement('style');
        
        const fontFamily = CONFIG.FONT_URL ? 'inherit' : CONFIG.FONT_FAMILY;
        
        const blurStyles = CONFIG.ENABLE_BLUR ? `
            body {
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                background: rgba(255, 255, 255, 0.6) !important;
            }
            .btn, .SideNav, .subnav-search-input, .markdown-body .highlight pre, .markdown-body pre, .markdown-alert {
                backdrop-filter: blur(10px) saturate(180%);
                -webkit-backdrop-filter: blur(10px) saturate(180%);
                background: rgba(255, 255, 255, 0.7) !important;
            }
            .SideNav-item:hover, .btn:hover {
                backdrop-filter: blur(15px) saturate(200%);
                -webkit-backdrop-filter: blur(15px) saturate(200%);
                background: rgba(195, 228, 227, 0.8) !important;
            }
        ` : '';
        
        let commonStyles = CONFIG.ENABLE_BACKGROUND ? `
            html {
                background: url('${CONFIG.BACKGROUND_URL}') no-repeat center center fixed;
                background-size: cover;
            }
        ` : '';
        
        commonStyles += blurStyles;
        
        commonStyles += `
            body {
                margin: 30px auto;
                font-size: 16px;
                font-family: ${fontFamily};
                line-height: 1.25;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                overflow: auto;
        `;
        
        if (!CONFIG.ENABLE_BLUR) {
            commonStyles += `background: rgba(255, 255, 255, 0.85);`;
        }
        
        if (CONFIG.ENABLE_FONT_COLOR) {
            commonStyles += `color: ${CONFIG.FONT_COLOR} !important;`;
        }
        
        commonStyles += `}
            .markdown-body,
            .markdown-body h1,
            .markdown-body h2,
            .markdown-body h3,
            .markdown-body h4,
            .markdown-body h5,
            .markdown-body h6,
            .markdown-body p,
            .markdown-body li,
            .markdown-body blockquote,
            .markdown-body table,
            .markdown-body th,
            .markdown-body td,
            .markdown-body code,
            .markdown-body pre,
            .markdown-body a:not(.btn),
            .SideNav,
            .SideNav-item,
            .SideNav-item a,
            .pagination,
            .pagination a,
            .pagination span,
            .pagination em,
            .article-title,
            .article-meta,
            .article-meta a,
            .article-content,
            .article-content a:not(.btn),
            .article-list .article-item,
            .article-list .article-title a,
            .article-list .article-meta,
            .article-list .article-meta a,
            .tag-cloud a,
            .tag-list a,
            .category-list a {
                font-family: ${fontFamily};
        `;
        
        if (CONFIG.ENABLE_FONT_COLOR) {
            commonStyles += `color: ${CONFIG.FONT_COLOR} !important;`;
        }
        
        commonStyles += `}
            .markdown-body a:not(.btn),
            .article-content a:not(.btn) {
                color: ${darkenColor(CONFIG.FONT_COLOR, 20)} !important;
                text-decoration: underline;
            }
            .markdown-body a:not(.btn):hover,
            .article-content a:not(.btn):hover {
                color: ${darkenColor(CONFIG.FONT_COLOR, 40)} !important;
            }
            .markdown-body img {
                border-radius: 10px;
                border: 2px solid #a3e0e4;
            }
            .btn {
                display: inline-flex !important;
                align-items: center !important;
                width: auto !important;
                height: 40px !important;
                margin: 0 3px !important;
                border-radius: 2em !important;
                transition: 0.3s !important;
        `;
        
        if (!CONFIG.ENABLE_BLUR) {
            commonStyles += `background: rgba(255, 255, 255, 0.8) !important;`;
        }
        
        commonStyles += `}
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            .btndescription {
                display: none;
                margin-left: 3px;
                white-space: nowrap;
                font-family: ${fontFamily};
                font-weight: bold;
        `;
        
        if (CONFIG.ENABLE_FONT_COLOR) {
            commonStyles += `color: ${CONFIG.FONT_COLOR} !important;`;
        }
        
        commonStyles += `}
            .btn:hover .btndescription {
                display: inline;
            }
        `;

        let themeStyles = '';
        
        switch(theme) {
            case 'home':
                themeStyles = `
                    .blogTitle { display: unset; }
                    #header { height: 340px; }
                    #header h1 {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .title-right {
                        margin-top: 295px;
                        margin-left: 50%;
                        transform: translateX(-50%);
                    }
                    .avatar { width: 200px; height: 200px; }
                    #header h1 a {
                        margin-top: 30px;
                        font-family: fantasy;
                        margin-left: unset;
                    }
                    body { padding: 20px; }
                    .SideNav {
                        ${!CONFIG.ENABLE_BLUR ? 'background: rgba(255, 255, 255, 0.6);' : ''}
                        border-radius: 10px;
                        min-width: unset;
                    }
                    .SideNav-item {
                        transition: 0.5s;
                    }
                    .SideNav-item:hover {
                        border-radius: 10px;
                        transform: scale(1.02);
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                    }
                    .pagination a:hover, .pagination span:hover, .pagination em:hover {
                        border-color: rebeccapurple;
                    }
                `;
                break;
                
            case 'post':
                themeStyles = `
                    @media (min-width: 1001px) { body { padding: 45px; } }
                    @media (max-width: 1000px) { body { padding: 20px; } }
                    body { max-width: 1100px; min-width: 200px; }
                    .markdown-alert { border-radius: 10px; }
                    .markdown-body .highlight pre, .markdown-body pre {
                        border-radius: 10px;
                    }
                    .markdown-body code, .markdown-body tt {
                        background-color: rgb(141 150 161 / 20%);
                    }
                    video { border-radius: 10px; }
                `;
                break;
                
            case 'tag':
                themeStyles = `
                    body { padding: 20px; }
                    .title-right { align-items: flex-end; }
                    @media (max-width: 600px) {
                        .tagTitle {
                            display: unset;
                            font-size: 14px;
                            white-space: unset;
                        }
                    }
                    .SideNav {
                        ${!CONFIG.ENABLE_BLUR ? 'background: rgba(255, 255, 255, 0.6);' : ''}
                        border-radius: 10px;
                        min-width: unset;
                    }
                    .SideNav-item {
                        transition: 0.5s;
                    }
                    .SideNav-item:hover {
                        border-radius: 10px;
                        transform: scale(1.02);
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                    }
                    .subnav-search-input { 
                        border-radius: 2em; 
                        float: unset !important;
                        font-family: ${fontFamily};
                    }
                    .subnav-search-icon { top: 9px; }
                    button.btn.float-left { display: none; }
                    .subnav-search { width: unset; height: 36px; }
                `;
                break;
        }

        style.textContent = commonStyles + themeStyles;
        document.head.appendChild(style);
    }

    function addButtonDescriptions() {
        document.querySelectorAll(".title-right a.btn").forEach(button => {
            const title = button.getAttribute('title');
            if (title && !button.querySelector('.btndescription')) {
                const desc = document.createElement('span');
                desc.className = 'btndescription';
                desc.textContent = title;
                button.appendChild(desc);
            }
        });
    }

    function addSearchKeyboardEvent() {
        const input = document.querySelector(".form-control.subnav-search-input.float-left");
        const button = document.querySelector(".btn.float-left");
        
        if (input && button) {
            input.addEventListener("keyup", function(event) {
                if (event.key === 'Enter') {
                    button.click();
                }
            });
        }
    }

    function darkenColor(color, percent) {
        if (color.startsWith('#')) {
            let num = parseInt(color.slice(1), 16);
            let amt = Math.round(2.55 * percent);
            let R = (num >> 16) - amt;
            let G = (num >> 8 & 0x00FF) - amt;
            let B = (num & 0x0000FF) - amt;
            
            R = R < 0 ? 0 : R;
            G = G < 0 ? 0 : G;
            B = B < 0 ? 0 : B;
            
            return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
        }
        else if (color.startsWith('rgb')) {
            const match = color.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
            if (match) {
                let R = parseInt(match[1]) - Math.round(2.55 * percent);
                let G = parseInt(match[2]) - Math.round(2.55 * percent);
                let B = parseInt(match[3]) - Math.round(2.55 * percent);
                
                R = R < 0 ? 0 : R;
                G = G < 0 ? 0 : G;
                B = B < 0 ? 0 : B;
                
                if (color.startsWith('rgba')) {
                    const alphaMatch = color.match(/rgba\(.*,\s*([\d.]+)\)/);
                    const alpha = alphaMatch ? alphaMatch[1] : 1;
                    return `rgba(${R}, ${G}, ${B}, ${alpha})`;
                } else {
                    return `rgb(${R}, ${G}, ${B})`;
                }
            }
        }
        
        return color;
    }
});
