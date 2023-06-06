export function buildShopifyLink(headers) {
  let startIndex;
  if (headers.link.includes(`rel="previous",`)) {
    startIndex = headers.link.indexOf(`rel="previous"`) + 15;
  }
  const shopifyLink = headers.link
    .slice(startIndex)
    .split(";")[0]
    .replace(/[\<\>]/g, "");
  return shopifyLink;
}
