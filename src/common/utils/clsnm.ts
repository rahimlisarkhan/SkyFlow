export function clsnm(...classNames: string[]) {
  let className = "";

  for (let i = 0; i < classNames?.length; i++) {
    if (classNames[i]) {
      className += `${i === 0 ? "" : " "}${classNames[i]}`;
    }
  }

  return className;
}
