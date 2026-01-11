/**
 * 极简页面加载效果
 * 只需引入此JS文件即可实现加载效果
 */

// 立即创建并注入样式
(function() {
    const style = document.createElement('style');
    style.textContent = `
        #simple-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 35, 126, 0.95);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        #simple-loading-overlay.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .simple-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: simple-spin 1s ease-in-out infinite;
            margin-bottom: 20px;
        }
        
        @keyframes simple-spin {
            to { transform: rotate(360deg); }
        }
        
        .simple-loading-text {
            font-size: 20px;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
})();

// 创建加载界面
(function() {
    const overlay = document.createElement('div');
    overlay.id = 'simple-loading-overlay';
    overlay.innerHTML = `
        <div class="simple-spinner"></div>
        <div class="simple-loading-text">正在加载中</div>
    `;
    
    document.body.appendChild(overlay);
    
    // 页面加载完成后隐藏
    window.addEventListener('load', function() {
        setTimeout(function() {
            overlay.classList.add('hidden');
        }, 300);
    });
    
    // 确保即使load事件未触发，也能在一定时间后隐藏
    setTimeout(function() {
        if (!overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
        }
    }, 500); // 10秒后自动隐藏，防止一直显示
})();
