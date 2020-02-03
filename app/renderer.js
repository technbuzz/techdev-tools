const escape = require('escape-html');
const { clipboard } = require('electron')

let escapedHTML = null;


const markdownView = document.querySelector('#markdown');
// const htmlView = document.querySelector('#html');
const escapedHtmlButton = document.querySelector('#escaped-html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const copyEscapedHTMLButton = document.querySelector('#copy-src');

const renderMarkdownToHtml = markup => {
  
  escapedHtmlButton.value = escape(markup);
  return escape(markup)
};

markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;
  escapedHTML =  renderMarkdownToHtml(currentContent);
});

copyEscapedHTMLButton.addEventListener('click', () => {
  clipboard.writeText(escapedHTML)
})

