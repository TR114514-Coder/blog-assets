// 在开头定义字体URL
const FONT_URL = 'https://blog-assets.traveler.dpdns.org/font/MiSans-Heavy.ttf';

// 应用字体到所有元素
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @font-face {
    font-family: 'Font113332';
    src: url('${FONT_URL}') format('truetype');
  }
  
  * {
    font-family: 'GlobalFont', sans-serif !important;
  }
`;

// 添加到文档头部
document.head.appendChild(fontStyle);
