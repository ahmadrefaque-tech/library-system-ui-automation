import { Page, expect } from "playwright/test";
import { Book } from "../support/world";
import logger from "../support/logger";
import { faker } from "@faker-js/faker";
import { getFutureDate } from "../support/utils";
import { randomTitle } from "../../src/support/utils";
import { BasePage } from "./BasePage";
import { DataTable } from "@cucumber/cucumber";

export class AddBooksPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private pageHeading = "[id='add-book-heading']";
  private addBookButton = "button[aria-label='Submit Add New Book Form']";
  private titleLengthError = "p[id='title-error']";
  private titleField = "#title";
  private genreField = "#genre";
  private dateField = "#publicationDate";
  private isbnField = "#isbn";
  private priceField = "#price";
  private authorField = "#author";
  private pageTitle = "Add a New Book";
  private summaryError = "text=Please correct the following errors:";

  async addBook(book: Book) {
    logger.info(`Adding book: ${JSON.stringify(book)}`);
    await this.fillInput(this.titleField, book.title);
    await this.selectDropdownByLabel(this.genreField, book.genre);
    await this.fillInput(this.dateField, book.publicationDate, 100);
    await this.fillInput(this.isbnField, book.isbn);
    await this.fillInput(this.priceField, book.price);
    await this.fillInput(this.authorField, book.author);
    await this.clickAddBookButton();
    logger.info(`Book submitted: "${book.title}"`);
  }

  async verifyAddBookPageDisplay(): Promise<void> {
    logger.info("Verifying Add Book page is displayed");
    await this.verifyText(this.pageHeading, this.pageTitle);
    logger.info("Add Book page verified");
  }

  async clickAddBookButton() {
    logger.info("Clicking 'Add Book' button");
    await this.click(this.addBookButton);
  }

  async verifyTitleLengthErrorMessage(exptError: string) {
    logger.info("Verifying title length error message");
    await this.waitForVisible(this.titleLengthError);
    await this.verifyText(this.titleLengthError, exptError);
    logger.info(`Title length error verified: "${exptError}"`);
  }

  async getErrorSummary(): Promise<string | null> {
    const count = await this.getCount(this.summaryError);
    if (count === 0) return null;
    const summary = (await this.getLocator(this.summaryError).first().textContent())?.trim() ?? null;
    logger.info(`Error summary: ${summary}`);
    return summary;
  }

  async addNewBook(titleLength: string): Promise<Book> {
    logger.info(`Generating new book with title length ${titleLength}`);
    const book: Book = {
      title: randomTitle(Number(titleLength)),
      author: faker.person.fullName(),
      genre: faker.helpers.arrayElement([
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Fantasy",
        "Science Fiction",
        "Biography",
      ]),
      publicationDate: getFutureDate(60),
      isbn: faker.string.numeric(10),
      price: faker.commerce.price({ min: 5, max: 50 }),
    };
    await this.addBook(book);
    return book;
  }

  async verifySummaryErrorMessages() {
    logger.info("Verifying error summary messages");
    const summary = await this.getLocator("div[role='alert']");
    await expect(summary).toBeVisible({ timeout: 5000 });

    const heading = summary.locator("h3");
    await expect(heading).toHaveText("Please correct the following errors:");

    const errors = await summary.locator("ul li").allTextContents();
    const expectedErrors = [
      "Title is required.",
      "Author is required.",
      "Genre is required.",
      "ISBN is required.",
      "Publication Date is required.",
      "Price is required.",
    ];
    expect(errors).toEqual(expectedErrors);

    logger.info("Error summary validation passed", errors);
  }

  async getValidationErrorsMap(): Promise<Record<string, string>> {
    logger.info("Collecting field-level validation errors");
    const errors = await this.getLocator('p[role="alert"], [id$="-error"]').all();
    const map: Record<string, string> = {};

    for (const e of errors) {
      const id = await e.getAttribute("id");
      const text = (await e.innerText()).trim();
      if (id && id.endsWith("-error")) {
        const fieldId = id.replace(/-error$/, "");
        map[fieldId] = text;
        logger.info(`Validation error on [${fieldId}]: "${text}"`);
      }
    }

    return map;
  }

  async verifyEmptyFieldErrors(dataTable: DataTable) {
    logger.info("Verifying empty field errors using DataTable");
    const expectedRows = dataTable.rows();
    const labelToFieldId: Record<string, string> = {
      Title: "title",
      Author: "author",
      Genre: "genre",
      ISBN: "isbn",
      "Publication Date": "publicationDate",
      Price: "price",
    };

    const actualMap = await this.getValidationErrorsMap();

    for (const [label, expectedMessage] of expectedRows) {
      const fieldId = labelToFieldId[label];
      const actualMessage = fieldId ? actualMap[fieldId] : undefined;

      if (!actualMessage) {
        throw new Error(`No validation message found for field: ${label}`);
      }

      if (actualMessage !== expectedMessage) {
        throw new Error(
          `Validation mismatch for ${label}: expected "${expectedMessage}", got "${actualMessage}"`
        );
      }

      logger.info(`Verified validation for ${label}: "${expectedMessage}"`);
    }
  }
}
