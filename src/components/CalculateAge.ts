const CalculateAge = (birthdayString: string) => {
  const birthday = new Date(birthdayString)
  const now = new Date()
  let years = now.getFullYear() - birthday.getFullYear()
  let months = now.getMonth() - birthday.getMonth()
  let days = now.getDate() - birthday.getDate()

  if (months < 0 || (months === 0 && days < 0)) {
    years--
    if (months < 0) {
      months += 12
    }
    if (days < 0) {
      const monthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        birthday.getDate()
      )
      days = Math.floor(
        (now.getTime() - monthAgo.getTime()) / (1000 * 60 * 60 * 24)
      )
    }
  } else if (days < 0) {
    const daysInLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      0
    ).getDate()
    days += daysInLastMonth
    months--
  }

  return {
    years,
    months,
    days,
  }
}
export default CalculateAge
