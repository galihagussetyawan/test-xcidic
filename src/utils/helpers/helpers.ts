export function checkIsValidEmail(email: string) {
  const expression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return expression.test(email);
}
