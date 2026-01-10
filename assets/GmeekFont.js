// 定义字体URL和字体名称
const fontUrl = 'https://gh-proxy.com/https://github.com/TR114514-Coder/blog-assets/raw/refs/heads/main/font/MiSans-Heavy.ttf';
const fontName = 'CustomFont';

// 创建字体face规则
const fontFace = `
@font-face {
  font-family: '${fontName}';
  src: url('${fontUrl}');
  font-display: swap;
}
`;

// 创建样式元素
const style = document.createElement('style');
style.textContent = fontFace;
document.head.appendChild(style);

// 字体加载成功后应用
document.fonts.load(`16px ${fontName}`).then(() => {
  const applyStyle = document.createElement('style');
  applyStyle.textContent = `
    body, body * {
      font-family: '${fontName}', inherit !important;
    }
  `;
  document.head.appendChild(applyStyle);
  console.log('自定义字体已应用');
}).catch(() => {
  console.log('使用系统默认字体');
});
