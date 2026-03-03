import { test } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../../src/ui/actions/article/createNewArticle'; 
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { waitAndReloadArticlePage } from '../../../src/ui/actions/article/waitAndReloadArticlePage';
import { 
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY
 } from '../../../src/ui/constants/articleErrorMessages';

let homePage;
let viewArticlePage;
let editPage;
let article;

test.describe('tests for editing article fields', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editPage = new EditArticlePage(page);
  
    article = generateNewArticleData();
    const user = generateNewUserData();
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    await viewArticlePage.assertArticleTagsAreHidden();
  });
  
  test('Edit article title', async ({ page }) => {
    await editPage.clickEditPageButton();
    await editPage.fillTitleField('new title');
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTitleIsVisible('new title');
  });

  test('Edit article description', async ({ page }) => {
    await editPage.clickEditPageButton();
    const newDescription = 'new description'

    await editPage.fillDescriptionField(newDescription);
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await editPage.clickEditPageButton();
    await editPage.assertDescriptionIsVisible(newDescription)
  })
  
  test('Edit article text', async({ page }) => {
    await editPage.clickEditPageButton();
    await editPage.fillTextField('new text');
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTextIsVisible('new text');
  })
})

test.describe('tests for editing tags in article without tags', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editPage = new EditArticlePage(page);
  
    article = generateNewArticleData();
    const user = generateNewUserData();
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    await viewArticlePage.assertArticleTagsAreHidden();
  });
  
  test('Add tags to article without tags', async({ page }) => {
    await editPage.clickEditPageButton();
    const newTags = generateNewArticleData(2);
    
    await editPage.fillTagField(newTags.tags);
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTagsAreVisible(newTags.tags);
  })
})

test.describe('tests for editing tags in article with tags', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editPage = new EditArticlePage(page);
  
    article = generateNewArticleData(2);
    const user = generateNewUserData();
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    await viewArticlePage.assertArticleTagsAreVisible(article.tags);
  });
  
  test('Add tags to article with tags', async({ page }) => {
    await editPage.clickEditPageButton();
    const newTags = generateNewArticleData(2);
    
    await editPage.fillTagField(newTags.tags);
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);
    await viewArticlePage.assertArticleTagsAreVisible(article.tags);
    await viewArticlePage.assertArticleTagsAreVisible(newTags.tags);
  })
})

test.describe('tests for removing data from article', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    viewArticlePage = new ViewArticlePage(page);
    editPage = new EditArticlePage(page);
  
    article = generateNewArticleData(1);
    const user = generateNewUserData();
  
    await signUpUser(page, user);
  
    await homePage.clickNewArticleLink();
    await createNewArticle(page, article);
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
    await viewArticlePage.assertArticleTagsAreVisible(article.tags);
  });

  test('remove article tag for the article with tag', async({ page }) => {
    
    await viewArticlePage.assertArticleTagsAreVisible(article.tags);

    await editPage.clickEditPageButton();
    await editPage.removeTagsFromArticle(article.tags);
    await editPage.clickUpdateArticleButton();
    await waitAndReloadArticlePage(page);

    await viewArticlePage.assertArticleTagsAreHidden();
  })
  
  test('remove article title', async({ page }) => {
    await editPage.clickEditPageButton();
    await editPage.removeTitleFromArticle();
    await editPage.clickUpdateArticleButton();
    await editPage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  })
  
  test('remove article description', async({ page }) => {
    await editPage.clickEditPageButton();
    await editPage.removeDescriptionFromArticle();
    await editPage.clickUpdateArticleButton();
    await editPage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  })
  
  test('remove article text', async({ page }) => {
    await editPage.clickEditPageButton();
    await editPage.removeTextFromArticle();
    await editPage.clickUpdateArticleButton();
    await editPage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  })
})

