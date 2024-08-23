export function currency(num) {
  const n = Number(num);
  return `NT ${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = i && c !== "." && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, "") : c;
    return currency;
  })}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
