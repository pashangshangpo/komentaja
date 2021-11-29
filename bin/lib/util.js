import Path from 'path'

/**
 * 根路径组合当前路径
 * @param  {...any} path 路径
 * @returns String
 */
export const resolveRoot = (...path) => {
  return Path.resolve('.', ...path)
}
