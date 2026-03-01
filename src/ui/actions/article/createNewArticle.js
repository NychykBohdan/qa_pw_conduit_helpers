import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create a new article`, async () => {
    const createArticlePage = new CreateArticlePage(page);

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    await createArticlePage.fillTagField(article.tags ?? []);
    await createArticlePage.clickPublishArticleButton();

  });
};