const arrText = ["человек", "человека", "человек"];

export function formattingUserCount(num) {
  if (num % 10 === 1 && num % 100 !== 11) {
    return arrText[0];
  } else if (
    num % 10 >= 2 &&
    num % 10 <= 4 &&
    (num % 100 < 10 || num % 100 >= 20)
  ) {
    return arrText[1];
  }
  return arrText[2];
}
