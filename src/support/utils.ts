import { faker } from "@faker-js/faker";
import logger from "./logger";

export function getFutureDate(daysAhead: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formatted = `${day}/${month}/${year}`;
  logger.info(`Generated future date (+${daysAhead} days): ${formatted}`);
  return formatted;
}

export function randomTitle(length: number): string {
  let title = faker.word.words(5).replace(/\s+/g, "");

  if (title.length < length) {
    title = title + faker.string.alpha({ length: length - title.length });
  } else if (title.length > length) {
    title = title.slice(0, length);
  }

  logger.info(`Generated random title [length=${length}]: ${title}`);
  return title;
}