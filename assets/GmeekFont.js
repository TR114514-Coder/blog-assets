// 简洁版字体应用脚本
(function() {
  // 字体URL和名称
  const fontUrl = 'https://blog-assets.traveler.dpdns.org/font/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf';
  const fontName = 'CustomFont';
  
  // 创建字体定义
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${fontName}';
      src: url('${fontUrl}') format('truetype');
      font-display: swap;
    }
    
    * {
      font-family: '${fontName}', -apple-system, BlinkMacSystemFont, 
                   'Segoe UI', Roboto, sans-serif !important;
    }
  `;
  
  // 添加到页面
  document.head.appendChild(style);
})();
