import { test, expect } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../../src/ui/actions/article/createNewArticle'; 
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

let homePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);

  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
});

test('Edit article title', async ({ page }) => {
  await page.getByRole('link', { name: 'Edit Article' }).first().click();
  await page.getByPlaceholder('Article Title').clear();
  await page.getByPlaceholder('Article Title').fill('fff');
    
  
  await page.getByRole('button', { name: 'Update Article' }).click();
  
  await expect(page.getByRole('heading')).toContainText('fff');
  await page.reload();

});
