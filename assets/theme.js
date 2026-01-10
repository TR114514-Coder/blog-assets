document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 配置区域 ====================
    const CONFIG = {
        // 字体和背景设置
        fontUrl: 'https://blog-assets.traveler.dpdns.org/font/MiSans-Heavy.ttf', // 留空使用默认字体
        backgroundUrlPC: 'https://g-bg-api.traveler.dpdns.org/h', // PC端背景
        backgroundUrlMobile: 'https://g-bg-api.traveler.dpdns.org/v', // 移动端背景
        fontColor: '#000000',
        
        // 功能开关
        enableRain: true,
        enableBackground: true,
        enableTheme: true,
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

    // 下雨效果
    if (CONFIG.enableRain) {
        let rainstyle = document.createElement('style');
        rainstyle.innerHTML = `
            * { padding: 0; margin: 0; }
            .raincontent { width: 100%; height: 100%; }
            #rainBox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: -1;
            }
            .rain {
                position: absolute;
                width: 2px;
                height: 50px;
                background: linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,.6));
            }
        `;
        document.head.appendChild(rainstyle);

        let raincontent = document.createElement('div');
        raincontent.classList.add('raincontent');
        let rainBox = document.createElement('div');
        rainBox.id = 'rainBox';
        raincontent.appendChild(rainBox);
        document.body.appendChild(raincontent);

        let box = document.getElementById('rainBox');
        let boxHeight = box.clientHeight;
        let boxWidth = box.clientWidth;

        window.onload = function () {
            boxHeight = box.clientHeight;
            boxWidth = box.clientWidth;
        };

        window.onresize = function () {
            boxHeight = box.clientHeight;
            boxWidth = box.clientWidth;
        };

        setInterval(() => {
            let rain = document.createElement('div');
            rain.classList.add('rain');
            rain.style.top = '0px';
            rain.style.left = Math.random() * boxWidth + 'px';
            rain.style.opacity = Math.random();
            box.appendChild(rain);

            let race = 1;
            let timer = setInterval(() => {
                if (parseInt(rain.style.top) > boxHeight) {
                    clearInterval(timer);
                    box.removeChild(rain);
                }
                race++;
                rain.style.top = parseInt(rain.style.top) + race + 'px';
            }, 20);
        }, 50);
    }

    // 判断URL应用主题
    if (CONFIG.enableTheme) {
        let currentUrl = window.location.pathname;
        let isHomePage = currentUrl.includes('/index.html') || currentUrl === "/" || currentUrl.includes('/page');
        let isArticlePage = currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html');
        let isTagPage = currentUrl.includes('/tag.html');

        let style = document.createElement("style");
        
        // 公共毛玻璃样式
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

        if (isHomePage) {
            style.innerHTML += `
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
                    margin: unset;
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
                body {
                    margin: 30px auto;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: auto;
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)'};
                }
                .SideNav {
                    border-radius: 15px;
                    min-width: unset;
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)'};
                }
                .SideNav-item:hover {
                    background-color: ${CONFIG.enableGlassEffect ? 'rgba(195, 228, 227, 0.3)' : '#c3e4e3'};
                    border-radius: 10px;
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .SideNav-item { transition: 0.3s; }
                .pagination a:hover, .pagination span:hover, .pagination em:hover {
                    border-color: rebeccapurple;
                }
            `;
        } else if (isArticlePage) {
            style.innerHTML += `
                body {
                    min-width: 200px;
                    max-width: 1100px;
                    margin: 30px auto;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: auto;
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.85)'};
                }
                @media (min-width: 1001px) { body { padding: 45px; } }
                @media (max-width: 1000px) { body { padding: 20px; } }
                .markdown-body img {
                    border-radius: 10px;
                    border: 2px solid rgba(163, 224, 228, 0.5);
                }
                .markdown-alert { border-radius: 10px; }
                .markdown-body .highlight pre, .markdown-body pre {
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.85)'};
                    border-radius: 10px;
                }
                .markdown-body code, .markdown-body tt {
                    background-color: rgba(141, 150, 161, 0.2);
                }
                video { border-radius: 10px; }
            `;
        } else if (isTagPage) {
            style.innerHTML += `
                .title-right { align-items: flex-end; }
                @media (max-width: 600px) {
                    .tagTitle {
                        display: unset;
                        font-size: 14px;
                        white-space: unset;
                    }
                }
                body {
                    margin: 30px auto;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    overflow: auto;
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.8)'};
                }
                .SideNav {
                    border-radius: 15px;
                    min-width: unset;
                    background: ${CONFIG.enableGlassEffect ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)'};
                }
                .SideNav-item:hover {
                    background-color: ${CONFIG.enableGlassEffect ? 'rgba(195, 228, 227, 0.3)' : '#c3e4e3'};
                    border-radius: 10px;
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .SideNav-item { transition: 0.3s; }
                .subnav-search-input {
                    border-radius: 2em;
                    float: unset !important;
                }
                .subnav-search-icon { top: 9px; }
                button.btn.float-left { display: none; }
                .subnav-search { width: unset; height: 36px; }
            `;
            
            let input = document.querySelector(".form-control.subnav-search-input.float-left");
            let button = document.querySelector(".btn.float-left");
            if (input && button) {
                input.addEventListener("keyup", function(event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        button.click();
                    }
                });
            }
        }

        document.head.appendChild(style);
    }

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
            `;
            document.head.appendChild(btnDescStyle);
        }
    });
});
