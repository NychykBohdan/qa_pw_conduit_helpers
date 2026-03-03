import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.editPageButton = page.getByRole('link', {
      name: 'Edit Article',
    }).first();
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagField(tags) {
    const tagArray = Array.isArray(tags) ? tags : [tags];
    
    if (!tagArray.length) return;

    await test.step(`Fill Article tag field with 
      ${tagArray.join(', ')}`, async () => {
        for (const tag of tagArray) {
          await this.tagField.fill(tag);
          await this.page.keyboard.press('Enter');
        }      
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickEditPageButton() {
    await test.step(`Click 'Edit Page' button`, async () => {
      await this.editPageButton.click();
    });
  }

  async removeTagsFromArticle(tagName) {
    await test.step(`Remove tag from article`, async () => {
      this.page.locator('span').filter({ 
        hasText: tagName
      }).locator('i').click();
    })
  }

  async removeTitleFromArticle() {
    await test.step(`Remove title from article`, async () => {
      await this.titleField.clear();
    })
  }

  async removeDescriptionFromArticle() {
    await test.step(`Remove description from article`, async () => {
      await this.descriptionField.clear();
    })
  }

  async removeTextFromArticle() {
    await test.step(`Remove text from article`, async () => {
      await this.textField.clear();
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

}
