import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => { 
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    const tagArray = Array.isArray(tags) ? tags : [tags];

    await test.step(`Assert tags ${tagArray} are visible`, async () => {
      for (const tag of tagArray) {
        await expect(this.page.locator('ul.tag-list li', 
          { hasText: tag})).toBeVisible();
      }
    })
  }
   
  async assertArticleTagsAreHidden() {
    await test.step(`Assert tags are hidden`, async () => {
        await expect(this.page.locator('ul.tag-list li')).toBeHidden();
      })
  }


}
