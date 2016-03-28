export function urlHasProtocol(s) {
  return /^(ftp|https?):\/\//i.test(s);
}

export function appendProtocol(s) {
  return urlHasProtocol(s) ? s : `http://${s}`;
}
