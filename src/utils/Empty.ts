/**
 * 判断是否为空
 *
 * @param {any} params 无限个参数
 * @return {boolean} false | true
 */

export function empty(...params: any): boolean {
  for (let i = 0; i < arguments.length; i++) {
    if (
      arguments[i] === "" ||
      arguments[i] === undefined ||
      arguments[i] === null
    ) {
      return true
    }
  }
  return false
}
