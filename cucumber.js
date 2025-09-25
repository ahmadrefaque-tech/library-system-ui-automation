module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["src/**/*.ts"],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html"
    ],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
    // tags: "@reg",
  }
};