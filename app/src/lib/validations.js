function validation(test: boolean, message: string) {
  return {
    test,
    message,
  };
}

function isValidString(s, minLength = 0, maxLength = -1) {
  if (typeof s !== 'string') {
    return false;
  }
  if (s.length < minLength) {
    return false;
  }
  if (maxLength >= 0 && s.length > maxLength) {
    return false;
  }
  return true;
}

function id(s) {
  return validation(isValidString(s) && /^[0-9a-z]+$/.test(s), `Invalid id: ${s}`);
}

function created(date) {
  return validation(date instanceof Date, `Invalid date: ${date}`);
}

function title(s) {
  return validation(isValidString(s, 1), `Invalid title: ${s}`);
}

function url(s) {
  return validation(
    isValidString(s) &&
    /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/i.test(s),
    `Invalid URL: ${s}`
  );
}

export default {
  id,
  created,
  title,
  url,
};
