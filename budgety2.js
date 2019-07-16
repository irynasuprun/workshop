"use strict";
var asserts = require("assert");
var webdriver = require("selenium-webdriver");

var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

function verifyBudget() {
  return browser
    .findElement(webdriver.By.className("budget__value"))
    .getText()
    .then(function(result) {
      console.log("Budget in the budget__value:", result);
      asserts.equal(result, "+ 1,000.00");
      return result[0];
    });
}

browser.get("http://budgety2.netlify.com/");
browser
  .findElement(webdriver.By.className("add__description"))
  .sendKeys("Salary");

browser.findElement(webdriver.By.className("add__type")).sendKeys("+");
browser.findElement(webdriver.By.className("add__value")).sendKeys("1000");
browser.findElement(webdriver.By.className("add__btn")).click();
browser.wait(verifyBudget, 2000);
