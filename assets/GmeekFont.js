(function() {
  const fontUrl = 'https://blog-assets.traveler.dpdns.org/font/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf';
  const fontName = 'CustomFont';
  
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${fontName}';
      src: url('${fontUrl}') format('truetype');
      font-display: swap;
      font-weight: 400; /* 明确指定字重 */
    }
    
    /* 强制所有元素使用相同的字重 */
    * {
      font-family: '${fontName}', -apple-system, BlinkMacSystemFont, 
                   'Segoe UI', Roboto, sans-serif !important;
      font-weight: 400 !important; /* 统一为普通粗细 */
    }
  `;
  
  document.head.appendChild(style);
})();
