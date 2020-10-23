// @ts-check
/* global chrome */

const urlPatterns = [
  'https://www.amazon.co.jp/*/dp/*',
  'https://www.amazon.co.jp/*/product/*',
  'https://www.amazon.co.jp/*%2Fdp%2F*',
  'https://www.amazon.co.jp/*%2Fproduct%2F*',
];

/** @param {string} url */
const openTab = (url) => {
  const matches = decodeURIComponent(url).match(/\/(?:dp|product)\/(\w+)/);

  if (!matches) {
    alert('not match'); // eslint-disable-line no-alert
    return;
  }

  chrome.tabs.create({ url: `https://sakura-checker.jp/search/${matches[1]}` });
};

chrome.contextMenus.create({
  title: 'このページをサクラチェッカーで調べる',
  contexts: ['page'],
  documentUrlPatterns: urlPatterns,
  onclick(info) {
    openTab(info.pageUrl);
  },
});

chrome.contextMenus.create({
  title: 'このリンクをサクラチェッカーで調べる',
  contexts: ['link'],
  targetUrlPatterns: urlPatterns,
  onclick(info) {
    openTab(info.linkUrl);
  },
});
