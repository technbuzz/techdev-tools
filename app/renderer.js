const escape = require('escape-html');

const markdownView = document.querySelector('#markdown');
// const htmlView = document.querySelector('#html');
const escapedHtml = document.querySelector('#escaped-html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

const renderMarkdownToHtml = markup => {
  
  escapedHtml.value = escape(markup);
  console.log('escapedhtml', escape(markup));
};

markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;
  renderMarkdownToHtml(currentContent);
});