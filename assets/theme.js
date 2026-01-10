// 配置文件 - 在这里修改背景图片等设置
const CONFIG = {
    // 背景图片URL
    BACKGROUND_URL: 'https://img.154451.xyz/file/a2262c314f6a8bd592eba.jpg',
    
    // 雨滴设置
    RAIN_DROP_COUNT: 50, // 雨滴数量控制（间隔时间）
    RAIN_DROP_SPEED: 20  // 雨滴下落速度
};

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.pathname;

    // 创建下雨效果（所有页面通用）
    createRainEffect();

    // 应用主题样式
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        applyTheme('home');
    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        applyTheme('post');
    } else if (currentUrl.includes('/tag.html')) {
        applyTheme('tag');
    } else {
        console.log('未应用主题');
    }

    // 为所有页面的右上角按钮添加描述
    addButtonDescriptions();

    // 如果是标签页，添加搜索框键盘事件
    if (currentUrl.includes('/tag.html')) {
        addSearchKeyboardEvent();
    }

    // ========== 功能函数 ==========

    function createRainEffect() {
        // 创建样式
        const rainStyle = document.createElement('style');
        rainStyle.textContent = `
            * { padding: 0; margin: 0; }
            #rainBox {
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                pointer-events: none;
                z-index: 9999;
            }
            .rain {
                position: absolute;
                width: 2px;
                height: 50px;
                background: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.6));
            }
        `;
        document.head.appendChild(rainStyle);

        // 创建容器
        const rainBox = document.createElement('div');
        rainBox.id = 'rainBox';
        document.body.appendChild(rainBox);

        // 生成雨滴
        setInterval(() => {
            const rain = document.createElement('div');
            rain.className = 'rain';
            rain.style.left = Math.random() * window.innerWidth + 'px';
            rain.style.opacity = Math.random();
            rainBox.appendChild(rain);

            let speed = 1;
            const timer = setInterval(() => {
                const currentTop = parseInt(rain.style.top) || 0;
                if (currentTop > window.innerHeight) {
                    clearInterval(timer);
                    rainBox.removeChild(rain);
                }
                speed++;
                rain.style.top = (currentTop + speed) + 'px';
            }, CONFIG.RAIN_DROP_SPEED);
        }, CONFIG.RAIN_DROP_COUNT);
    }

    function applyTheme(theme) {
        console.log(`应用${theme}主题`);
        
        const style = document.createElement('style');
        
        // 公共样式
        let commonStyles = `
            html {
                background: url('${CONFIG.BACKGROUND_URL}') no-repeat center center fixed;
                background-size: cover;
            }
            body {
                margin: 30px auto;
                font-size: 16px;
                font-family: sans-serif;
                line-height: 1.25;
                background: rgba(255, 255, 255, 0.85);
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                overflow: auto;
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
            }
            .btn:hover {
                background-color: #3cd2cd !important;
            }
            .btndescription {
                display: none;
                margin-left: 3px;
                white-space: nowrap;
                color: black;
                font-weight: bold;
            }
            .btn:hover .btndescription {
                display: inline;
            }
        `;

        // 主题特定样式
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
                        background: rgba(255, 255, 255, 0.6);
                        border-radius: 10px;
                        min-width: unset;
                    }
                    .SideNav-item {
                        transition: 0.5s;
                    }
                    .SideNav-item:hover {
                        background-color: #c3e4e3;
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
                        background: rgba(255, 255, 255, 0.85);
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
                        background: rgba(255, 255, 255, 0.6);
                        border-radius: 10px;
                        min-width: unset;
                    }
                    .SideNav-item {
                        transition: 0.5s;
                    }
                    .SideNav-item:hover {
                        background-color: #c3e4e3;
                        border-radius: 10px;
                        transform: scale(1.02);
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                    }
                    .subnav-search-input { border-radius: 2em; float: unset !important; }
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
});
