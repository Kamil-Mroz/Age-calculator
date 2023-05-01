import { DateOfBirth } from './AgeCalculator'
import ArrowIcon from '../assets/images/icon-arrow.svg'
import { useState } from 'react'
type AgeForm = {
  dateChange: (date: string) => void
}

const AgeForm = ({ dateChange }: AgeForm) => {
  const initialState: DateOfBirth & { invalidDate: string } = {
    year: '',
    month: '',
    day: '',
    invalidDate: '',
  }

  const [error, setError] = useState(initialState)

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateElement = e.currentTarget
    let errorMessage = ''

    switch (dateElement.name) {
      case 'year':
        if (!dateElement.value) errorMessage = 'This field is required'
        else if (dateElement.value.length < 4)
          errorMessage = 'Must be a valid year'
        else if (parseInt(dateElement.value) > new Date().getFullYear())
          errorMessage = 'Must be in the past'
        break
      case 'month':
        if (!dateElement.value) errorMessage = 'This field is required'
        else if (
          parseInt(dateElement.value) <= 0 ||
          parseInt(dateElement.value) > 12
        )
          errorMessage = 'Must be a valid month'

        break
      case 'day':
        if (!dateElement.value) errorMessage = 'This field is required'
        else if (
          parseInt(dateElement.value) <= 0 ||
          parseInt(dateElement.value) > 31
        )
          errorMessage = 'Must be a valid day'
        break
      default:
        break
    }
    dateElement.name !== 'year' &&
      (dateElement.value = dateElement.valueAsNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      }))
    if (errorMessage)
      setError((prev) => ({
        ...prev,
        [dateElement.name]: errorMessage,
      }))
    else {
      setError((prev) => ({
        ...prev,
        [dateElement.name]: '',
        invalidDate: '',
      }))
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(error).some((error) => error)) {
      return
    }

    const formData = new FormData(e.currentTarget)
    if (!formData) return

    const data = Object.fromEntries(formData)

    if (Object.values(data).some((error) => error === '')) return

    const monthString = formData.get('month') as string
    const dayString = formData.get('day') as string
    const yearString = formData.get('year') as string

    const month = parseInt(monthString)
    const day = parseInt(dayString)
    const year = parseInt(yearString)

    const ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month == 1 || month > 2) {
      if (day > ListOfDays[month - 1]) {
        return setError((prev) => ({
          ...prev,
          invalidDate: 'Must be a valid date',
        }))
      }
    } else if (month == 2) {
      let leapYear = false
      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true
      if (leapYear == false && day >= 29) return false
      else if (leapYear == true && day > 29) {
        return setError((prev) => ({
          ...prev,
          invalidDate: 'Must be a valid date',
        }))
      }
    }
    const fullDateOfBirth = `${year}-${month}-${day}`
    dateChange(fullDateOfBirth)
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="age-form"
      >
        <div className="age-inputs">
          <div
            className={`input-group ${
              error.day || (error.invalidDate && 'error')
            }`}
          >
            <label htmlFor="day">DAY</label>
            <input
              type="number"
              name="day"
              id="day"
              onBlur={onBlur}
              placeholder="DD"
            />
            {error.day ? (
              <p className="error">{error.day}</p>
            ) : error.invalidDate ? (
              <p className="error">{error.invalidDate}</p>
            ) : null}
          </div>
          <div
            className={`input-group ${
              error.month || (error.invalidDate && 'error')
            }`}
          >
            <label htmlFor="month">MONTH</label>
            <input
              type="number"
              name="month"
              id="month"
              onBlur={onBlur}
              placeholder="MM"
            />
            {error.month ? <p className="error">{error.month}</p> : null}
          </div>
          <div
            className={`input-group ${
              error.year || (error.invalidDate && 'error')
            }`}
          >
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              onBlur={onBlur}
              placeholder="YYYY"
            />
            {error.year ? <p className="error">{error.year}</p> : null}
          </div>
        </div>
        <div className="divider">
          <div className="line"></div>
          <button
            aria-label="calculate age"
            className="btn"
            type="submit"
          >
            <img
              src={ArrowIcon}
              alt="arrow"
            />
          </button>
        </div>
      </form>
    </>
  )
}
export default AgeForm
