module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ "static/calculator.html": "calculator/index.html" });
  eleventyConfig.addPassthroughCopy({ "static/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("date", (dateValue) =>
    new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("htmlDateString", (dateValue) =>
    new Date(dateValue).toISOString().split("T")[0]
  );

  eleventyConfig.addCollection("post", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort(
      (a, b) => b.date - a.date
    )
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
