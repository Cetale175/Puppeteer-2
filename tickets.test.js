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
    await page.goto("https://qamid.tmweb.ru/client/");
    await clickElement(page, "[data-seance-time-stamp='1715792400']");
  });
  test("Buy one ticket", async () => {
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(4)"
    );
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    const actual = page.url();
    const expected = "https://qamid.tmweb.ru/client/ticket.php";
    expect(actual).toContain(expected);
  });
  test("Buy multiple tickets'", async () => {
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(7)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(5)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(8)"
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
