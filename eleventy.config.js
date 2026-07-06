module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("date", (dateValue) =>
    new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
