export function dateFormat (date : Date) {
  const oos = (nb : number) => `00${ nb }`.slice(-2);
  return oos(date.getHours()) + ':' + oos(date.getMinutes()) + ':' + oos(date.getSeconds());
}
