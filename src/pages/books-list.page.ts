import { Page } from "@playwright/test";
import { Book } from "../support/world";
import logger from "../support/logger";
import { BasePage } from "./BasePage";

export class BooksListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private welcomeMessage = ".text-lg.font-bold";
  private addBookButton = "button:has-text('Add Book')";
  private totalBooksHeading = "h3[class*='text-lg']";
  private logoutButton = "button:has-text('Log Out')";
  private tableRows = "table tbody tr";

  async verifyWelcomeMessage(): Promise<void> {
    logger.info("Verifying welcome message");
    const expectedUser = this.capitalize(process.env.APP_USERNAME!);
    await this.verifyText(this.welcomeMessage, `Welcome, ${expectedUser}!`);
    logger.info(`Verified welcome message for user: ${expectedUser}`);
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  async verifyLogoutButtonVisible() {
    logger.info("Checking if logout button is visible");
    await this.waitForVisible(this.logoutButton);
    logger.info("Logout button is visible");
  }

  async verifyBookPresent(book: Book) {
    logger.info(`Verifying book is present: ${book.title}`);
    await this.waitForVisible(`tr:has(td:text-is("${book.title}"))`);
    const cells = this.getLocator(`tr:has(td:text-is("${book.title}"))`).locator("td");
    const cellTexts = (await cells.allTextContents()).map((t) => t.trim());

    const expectedValues = [
      book.title,
      book.author,
      book.genre,
      book.isbn,
      book.publicationDate,
      book.price,
    ];

    for (let i = 0; i < expectedValues.length; i++) {
      let actual = cellTexts[i];
      let expected = expectedValues[i].trim();

      if (i === 5) {
        actual = actual.replace(/[^0-9.]/g, "");
        expected = expected.replace(/[^0-9.]/g, "");
      }
      await this.assertEqual(actual, expected);
    }
    logger.info(`Verified all details for book: ${book.title}`);
  }

  async clickAddBookButton() {
    logger.info("Clicking 'Add Book' button");
    await this.page.click(this.addBookButton);
  }

  async getTotalBooksCount(): Promise<number> {
    const heading = this.page.locator(this.totalBooksHeading);
    const text = await heading.textContent();
    const count = parseInt(text?.match(/\d+/)?.[0] || "0", 10);
    logger.info(`Total books count : ${count}`);
    return count;
  }

  async verifyBooksCountIncreased(initialCount: number) {
    logger.info("Verifying book count increased");
    const newCount = await this.getTotalBooksCount();
    logger.info(`Initial count: ${initialCount}, New count: ${newCount}`);
    await this.assertEqual(newCount, initialCount + 1);
    logger.info("Book count increased by 1");
  }

  async clickEditForBook(title: string) {
    logger.info(`Clicking edit for book: ${title}`);
    const row = this.page.locator(`tr:has(td:text-is("${title}"))`);
    await row.locator('button:has-text("Edit")').click();
    logger.info(`Edit clicked for book: ${title}`);
  }

  async clickDeleteForBook(title: string) {
    logger.info(`Clicking delete for book: ${title}`);
    const row = this.page.locator(`tr:has(td:text-is("${title}"))`);
    await row.locator('button:has-text("Delete")').click();
    logger.info(`Delete clicked for book: ${title}`);
  }

  async verifyBookNotPresent(book: Book) {
    logger.info(`Verifying book is NOT present: ${book.title}`);
    const row = this.page.locator(`tr:has(td:text-is("${book.title}"))`);
    await this.assertNotVisible(row, `Book "${book.title}" should not be present in the catalog`);
    logger.info(`Verified book is not present: ${book.title}`);
  }

  async clickLogout() {
    logger.info("Clicking logout button");
    await this.page.click(this.logoutButton);
    logger.info("Logout clicked");
  }

  async verifyBooksCountDecreased(initialCount: number) {
    logger.info("Verifying book count decreased");
    const newCount = await this.getTotalBooksCount();
    logger.info(`Initial count: ${initialCount}, New count: ${newCount}`);
    await this.assertEqual(newCount, initialCount - 1);
    logger.info("Book count decreased by 1");
  }

  async verifyBookCountMatchesCatalog(): Promise<void> {
    logger.info("Verifying book count matches catalog rows");
    const rowCount = await this.getCount(this.tableRows);
    const bookCount = await this.getTotalBooksCount();

    logger.info(`Book count displayed: ${bookCount}`);
    logger.info(`Row count in catalog: ${rowCount}`);

    await this.assertEqual(bookCount, rowCount);
    logger.info("Book count matches catalog rows");
  }
}
