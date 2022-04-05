/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,
    reactStrictMode: true,
    
  });
};
