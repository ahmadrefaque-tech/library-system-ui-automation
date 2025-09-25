import { Page } from "playwright/test";
import { BasePage } from "./BasePage";
import logger from "../support/logger";

export class UpdateBooksPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private titleField = "input[name='title']";
  private pricePrice = "input[name='price']";
  private submitButton = "button[type='submit']";

  async updateTitle(newTitle: string) {
    logger.info(`Updating book title to: "${newTitle}"`);
    await this.fillInput(this.titleField, newTitle);
    logger.info("Book title updated");
  }

  async updatePrice(newPrice: string) {
    logger.info(`Updating book price to: "${newPrice}"`);
    await this.fillInput(this.pricePrice, newPrice);
    logger.info("Book price updated");
  }

  async saveChanges() {
    logger.info("Saving updated book details");
    await this.click(this.submitButton);
    logger.info("Changes saved successfully");
  }
}
