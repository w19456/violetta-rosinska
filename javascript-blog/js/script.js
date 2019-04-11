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
  const tplArticleLinksSource = document.querySelector('#template-articleLinks').innerHTML;
  const tplArticleLinks = Handlebars.compile(tplArticleLinksSource);
  document.querySelectorAll(optArticleSelector + customSelector).forEach(function (article) {
    article.classList.remove('active');
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // replaced by handlebars======> const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const dataArticleLinks = { articleIdTemp: articleId, articleTitleTemp: articleTitle };
    let generatedHTML = tplArticleLinks(dataArticleLinks);

    myInnerHtml = myInnerHtml + generatedHTML;
  });
  titleList.innerHTML = myInnerHtml;
  registerClickListener('.titles a', titleClickHandler);
}
generateTitleLinks();

//----------TAGS---------//
function generateTags() {
  let allTags = {};
  const tplArticleTagsSource = document.querySelector('#template-articleTags').innerHTML;
  const tplArticleTags = Handlebars.compile(tplArticleTagsSource);
  document.querySelectorAll(optArticleSelector).forEach(function (article) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    articleTagsArray.forEach(function (tag) {
      // replaced by handlebars======> const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const dataArticleTags = { tagIdTemp: tag };
      let generatedHTML = tplArticleTags(dataArticleTags);

      //myInnerHtml = myInnerHtml + generatedHTML;

      html = html + ' ' + generatedHTML;
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    );
    tagsWrapper.innerHTML = html;
  });
  const tagList = document.querySelector('.tags');
  let generatedHTML = '';
  const quantityArray = [];

  const tplTagColumnSource = document.querySelector('#template-tagColumn').innerHTML;
  const tplTagColumn = Handlebars.compile(tplTagColumnSource);

  for (let tag in allTags) {
    quantityArray.push(allTags[tag]);
  }
  for (let tag in allTags) {
    let className = ' ';
    if (allTags[tag] == Math.max(...quantityArray)) {
      className = 'max';
    } else if (allTags[tag] == Math.min(...quantityArray)) {
      className = 'min';
    }
    else {
      className = 'aver';
    }
    // replaced by handlebars======> allTagsHTML += '<li class="' + className + '" ><a href="#tag-' + tag + '">' + tag + '</a>(' + allTags[tag] + ')</li>';
    const dataTagColumn = {
      tagColumnClass: className,
      tagIdTemp: tag,
      tagsColumn: allTags[tag]
    };
    generatedHTML += tplTagColumn(dataTagColumn);

  }
  tagList.innerHTML = generatedHTML;
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

  const tplArticleAuthorSource = document.querySelector('#template-articleAuthor').innerHTML;
  const tplArticleAuthor = Handlebars.compile(tplArticleAuthorSource);

  document.querySelectorAll(optArticleSelector).forEach(function (article) {
    const articleAuthor = article.getAttribute('data-author');
    const authorElement = article.querySelector(optArticleAuthorSelector);
    authorsSet.add(articleAuthor);
    // replaced by handlebars======> authorElement.innerHTML = '<a href="#">' + articleAuthor + '</a>';
    authorElement.innerHTML = tplArticleAuthor({ author: articleAuthor });
    authorElement.setAttribute('data-author', articleAuthor);
  });
  const authorList = document.querySelector('.authors');
  authorList.innerHTML = '';
  let authorHtml = '';

  const tplAuthorColumnSource = document.querySelector('#template-authorColumn').innerHTML;
  const tplAuthorColumn = Handlebars.compile(tplAuthorColumnSource);

  authorsSet.forEach(function (author) {
    const elementCount = document.querySelectorAll(optArticleSelector + '[data-author="' + author + '"]').length;
    // replaced by handlebars======> authorHtml += '<li><a href="#">' + author + '</a>(' + elementCount + ')</li>';

    const dataAuthorColumn = {
      authorTemp: author,
      authorsColumn: elementCount
    };
    authorHtml += tplAuthorColumn(dataAuthorColumn);

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
