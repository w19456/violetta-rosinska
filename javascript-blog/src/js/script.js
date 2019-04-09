'use strict';

function registerClickListener(selector, action) {
  document.querySelectorAll(selector).forEach(function (element) {
    element.addEventListener('click', action);
  });
}

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);
  /* for each article */
  let myInnerHtml = '';

  document.querySelectorAll(optArticleSelector + customSelector).forEach(function (article) {
    article.classList.remove('active');
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /* find the title element & get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    myInnerHtml = myInnerHtml + linkHTML;
  });

  titleList.innerHTML = myInnerHtml;
}
generateTitleLinks();

registerClickListener('.titles a', titleClickHandler);

//----------TAGS---------//
function generateTags() {
  let allTags = {};
  /* find all articles */
  /* START LOOP: for every article: */
  document.querySelectorAll(optArticleSelector).forEach(function (article) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    articleTagsArray.forEach(function (tag) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */   /* END LOOP: for each tag */
      html = html + ' ' + linkHTML;
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    });
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  });
  const tagList = document.querySelector('.tags');
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
