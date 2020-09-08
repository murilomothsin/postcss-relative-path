const postcss = require('postcss');

// Replace relative path ../../ with / for icons used on base-ui themes
module.exports = postcss.plugin('postcss-image', (options) => (css) => {
  options = options || {};
  const regex = options.regex || /\.\.\//g;
  const leadingSlash = options.leading_slash || true;

  const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

  css.walkRules((rule) => {
    rule.walkDecls((decl) => {
      const { value } = decl;
      if (value.indexOf('url(') !== -1) {
        const matches = value.match(regex);
        decl.value = value.toString().replace(regex, '');
        if (matches && matches.length > 0 && leadingSlash) {
          decl.value = insertAt(decl.value, '/', 4);
        }
      }
    });
  });
});
