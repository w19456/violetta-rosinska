'use strict';

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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

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

  document.querySelectorAll('.titles a').forEach(function (link) {
    link.addEventListener('click', titleClickHandler);
  });
}
generateTitleLinks();

//----------TAGS---------//
function generateTags() {
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
    });
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  });
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  /* START LOOP: for each active tag link */
  /* remove class active */ /* END LOOP: for each active tag link */
  // const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // for (let activeTagLink of activeTagLinks) {
  //   activeTagLink.classList.remove('active');
  // }
  /* find all tag links with "href" attribute equal to the "href" constant */
  /* START LOOP: for each found tag link */
  /* add class active */
  /* END LOOP: for each found tag link */
  // const hrefTagLinks = document.querySelectorAll('a.active[href^="href"]');
  generateTitleLinks('[data-tags~="' + tag + '"]');
  // for (let hrefTagLink of hrefTagLinks) {
  //   hrefTagLink.classList.add('active');
  //   /* execute function "generateTitleLinks" with article selector as argument */

  // }
}
// tagClickHandler();

function addClickListenersToTags() {
  /* find all links to tags */
  const hrefTagLinks = document.querySelectorAll(optArticleSelector + ' a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of hrefTagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

//----------AUTHORS---------//
function generateAuthors() {
  document.querySelectorAll(optArticleSelector).forEach(function (article) {
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    const authorElement = article.querySelector(optArticleAuthorSelector);
    authorElement.innerHTML = '<a href="#">' + articleAuthor + '</a>';
    authorElement.setAttribute('data-author', articleAuthor);
  });
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const articleAuthor = this.innerHTML;
  generateTitleLinks('[data-author="' + articleAuthor + '"]');

}


function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();