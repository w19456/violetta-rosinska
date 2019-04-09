'use strict';

function registerClickListener(selector, action) {
  document.querySelectorAll(selector).forEach(function (element) {
    element.addEventListener('click', action);
  });
}

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let myInnerHtml = '';
  document.querySelectorAll(optArticleSelector + customSelector).forEach(function (article) {
    article.classList.remove('active');
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    myInnerHtml = myInnerHtml + linkHTML;
  });
  titleList.innerHTML = myInnerHtml;
}
generateTitleLinks();

registerClickListener('.titles a', titleClickHandler);

//----------TAGS---------//
function generateTags() {
  let allTags = {};
  document.querySelectorAll(optArticleSelector).forEach(function (article) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    articleTagsArray.forEach(function (tag) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + ' ' + linkHTML;
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    });
    tagsWrapper.innerHTML = html;
  });
  const tagList = document.querySelector('.tags');
  console.log(allTags);
  let allTagsHTML = '';
  for (let tag in allTags) {
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a>(' + allTags[tag] + ')</li>';
  }
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const tag = href.replace('#tag-', '');
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

registerClickListener(optArticleSelector + ' a[href^="#tag-"]', tagClickHandler);
registerClickListener('.tags a[href^="#tag-"]', tagClickHandler);

/*----------AUTHORS---------*/

function generateAuthors() {
  const authorsSet = new Set();
  document.querySelectorAll(optArticleSelector).forEach(function (article) {
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const authorElement = article.querySelector(optArticleAuthorSelector);
    authorsSet.add(articleAuthor);
    authorElement.innerHTML = '<a href="#">' + articleAuthor + '</a>';
    authorElement.setAttribute('data-author', articleAuthor);
  });
  const authorList = document.querySelector('.authors');
  authorList.innerHTML = '';
  let authorHtml = '';
  authorsSet.forEach(function (author) {
    const elementCount = document.querySelectorAll(optArticleSelector + '[data-author="' + author + '"]').length;
    authorHtml += '<li><a href="#">' + author + '</a>(' + elementCount + ')</li>';
  });
  authorList.innerHTML = authorHtml;
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const articleAuthor = this.innerHTML;
  generateTitleLinks('[data-author="' + articleAuthor + '"]');
}

registerClickListener(optArticleAuthorSelector + ' a', authorClickHandler);
registerClickListener('.authors a', authorClickHandler);
