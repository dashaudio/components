// function styles(originalStyles, className) {
//
//   // Crazy hack to duplicate Shadow DOM's :host styles to polyfill browsers that choke on :host.
//   // To remove ASAP, as soon as evergreen browsers correctly parse :host pseudo-class.
//
//   let newStyles = new String(originalStyles);
//
//   let hostContextRegex = /:host-context\((.*)\)/g;
//   let hostAttribRegex = /:host\((.*)\)/g;
//   let hostRegex = /:host/g;
//
//   let match;
//
//   while ((match = hostContextRegex.exec(originalStyles)) !== null) {
//     newStyles = newStyles.replace(match[0], className + match[1]);
//   }
//
//   while ((match = hostAttribRegex.exec(originalStyles)) !== null) {
//     newStyles = newStyles.replace(match[0], className + match[1]);
//   }
//
//   while ((match = hostRegex.exec(originalStyles)) !== null) {
//     newStyles = newStyles.replace(match[0], className);
//   }
//
//   return originalStyles + newStyles;
//
// }

function styles(file, content) {

  let styleBlocks = content.match(/<style>.*?<\/style>/);

  console.log(styleBlocks)[0];

  return content;
}

module.exports = { styles };
