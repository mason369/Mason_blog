const STORAGE_KEY = "theme";
const THEME_ATTR  = "data-theme";
const QUERY_KEY   = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    // Storage theme
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia(QUERY_KEY).matches) {
    // system theme
    setTheme(themes.DARK);
  } else {
    // Default theme
    setTheme(themes.LIGHT);
  }

  // Watch for system theme changes
  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}
document.addEventListener("load") {
[...document.getElementsByTagName("pre")].forEach(item => {
  item.style.position = "relative";
  let copyButton = document.createElement("button")
  copyButton.style.cssText = 'border-radius: 4px;position:absolute;right:10px;top:10px;cursor: pointer'
  copyButton.innerHTML = "复制";
  copyButton.onclick = function () {
      let copyData = item.firstChild.innerText
      copyToClipboard(copyData)
      copyButton.innerHTML = "复制成功";
      setTimeout(function() {
          copyButton.innerHTML = "复制";
      }, 1000);
  }
  item.appendChild(copyButton)
});
// js 复制到剪贴板
function copyToClipboard(content) {
  if (window.clipboardData) {
      window.clipboardData.setData('text', content);
  } else {
      (function (content) {
          document.oncopy = function (e) {
              e.clipboardData.setData('text', content);
              e.preventDefault();
              document.oncopy = null;
          }
      })(content);
      document.execCommand('Copy');
  }
}
}