// 字体URL
const FONT_URL = 'https://blog-assets.traveler.dpdns.org/font/MiSans-Heavy.ttf';

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

document.head.appendChild(fontStyle);
