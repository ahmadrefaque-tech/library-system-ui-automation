import { setWorldConstructor, IWorldOptions, World } from "@cucumber/cucumber";
import { Browser, Page, BrowserContext } from "playwright";
import { LoginPage } from "../pages/login.page";
import { AddBooksPage } from "../pages/add-books.page";
import { WelcomePage } from "../pages/welcome.page";
import { BooksListPage } from "../pages/books-list.page";
import { UpdateBooksPage } from "../pages/update-books.page";

export interface Book {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  isbn: string;
  price: string;
}

export interface ICustomWorld extends World {
  browser: Browser;
  page: Page;
  context: BrowserContext;
  loginPage: LoginPage;
  addBooksPage: AddBooksPage;
  welcomePage: WelcomePage;
  booksListPage: BooksListPage;
  updateBooksPage: UpdateBooksPage;
  currentBook?: Book;
  initialCount?: number;
}

class CustomWorld extends World implements ICustomWorld {
  browser!: Browser;
  page!: Page;
  context!: BrowserContext;  
  loginPage!: LoginPage;
  addBooksPage!: AddBooksPage;
  welcomePage!: WelcomePage;
  updateBooksPage!: UpdateBooksPage;
  booksListPage!: BooksListPage;
  currentBook?: Book;
  initialCount?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);