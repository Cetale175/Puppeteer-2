const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`, {
    setTimeout: 20000,
  });
});
When("user selects a time", async function () {
  return clickElement(
    this.page,
    "body > main > section:nth-child(2) > div:nth-child(2) > ul > li:nth-child(2) > a"
  );
});
When("user selects a place", async function () {
  return clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(4)"
  );
});
When("user selects a place 1", async function () {
  return clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(7)"
  );
});
When("user selects a place 2", async function () {
  return clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(5)"
  );
});
When("user selects a place 3", async function () {
  return clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(8)"
  );
});
When("user presses the register button", async function () {
  return clickElement(this.page, "body > main > section > button");
});
When("user presses the button to get the code", async function () {
  return clickElement(this.page, "body > main > section > div > button");
});
Then(
  "user sees the QR of the booked ticket on the page {string}",
  async function (string) {
    const actual = this.page.url();
    const expected = string;
    expect(actual).contains(expected);
  }
);
