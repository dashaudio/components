function styles(originalStyles, className) {

  // Crazy hack to duplicate Shadow DOM's :host styles to polyfill browsers that choke on :host.
  // To remove ASAP, as soon as evergreen browsers correctly parse :host pseudo-class.

  let newStyles = new String(originalStyles);

  let contentRegex = /::content/g;
  let hostContextRegex = /:host-context\((.*?)\)/g;
  let hostDoubleAttribRegex = /:host\(([^\)]*)?\):host\(([^\)]*)?\)/g;
  let hostAttribRegex = /:host\((.*?)\)/g;
  let hostRegex = /:host/g;

  let match;

  while ((match = contentRegex.exec(originalStyles)) !== null) {
    newStyles = newStyles.replace(match[0], className);
  }


  while ((match = hostContextRegex.exec(originalStyles)) !== null) {
    let replacement = match[1] + ' ' + className;
    // console.log("matching host context", match[0], replacement);
    newStyles = newStyles.replace(match[0], replacement);
  }

  while ((match = hostDoubleAttribRegex.exec(originalStyles)) !== null) {
    let replacement = className + match[1] + match[2];
    // console.log("matching double host attribute", match[0], match[1], match[2], replacement);
    newStyles = newStyles.replace(match[0], replacement);
  }

  while ((match = hostAttribRegex.exec(originalStyles)) !== null) {
    let replacement = className + match[1];
    // console.log("matching host attribute", match[0], replacement)
    newStyles = newStyles.replace(match[0], replacement);
  }

  while ((match = hostRegex.exec(originalStyles)) !== null) {
    newStyles = newStyles.replace(match[0], className);
  }

  return originalStyles + newStyles;

}

export default { styles };
