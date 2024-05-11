const { clickElement } = require("./lib/commands.js");
let page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});
afterEach(() => {
  page.close();
});
describe("tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/hall.php");
    await clickElement(
      page,
      "body > main > section:movie(1) > div:movie-seances__hall(1) > ul > li:movie-seances__time-block(2) > a'"
    );
  });
  test("Buy one ticket", async () => {
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:buying-scheme__row(2) > span:buying-scheme__chair buying-scheme__chair_standert(4)"
    );
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    const actual = page.url();
    const expected = "https://qamid.tmweb.ru/client/ticket.php";
    expect(actual).toContain(expected);
  });
  test("Buy some tickets'", async () => {
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:buying-scheme__row(6) > span:buying-scheme__chair buying-scheme__chair_standert(5)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:buying-scheme__row(6) > span:buying-scheme__chair buying-scheme__chair_standert(6)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:buying-scheme__row(6) > span:buying-scheme__chair buying-scheme__chair_standert(7)"
    );
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    const actual = page.url();
    const expected = "https://qamid.tmweb.ru/client/ticket.php";
    expect(actual).toContain(expected);
  });
  test("The buy button is not available", async () => {
    await clickElement(page, "body > main > section > button");
    const actual = page.url();
    const expected = "https://qamid.tmweb.ru/client/hall.php";
    expect(actual).toContain(expected);
  });
});
