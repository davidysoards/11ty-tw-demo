module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/css/style.css');

  return {
    dir: {
      output: 'dist',
      input: 'src',
    },
  };
};
