import { useState } from 'react'
import AgeForm from './AgeForm'

export type DateOfBirth = {
  day: string
  month: string
  year: string
}

const AgeCalculator = () => {
  const [dateOfBirth, setDateOfBirth] = useState<DateOfBirth>({
    day: '',
    month: '',
    year: '',
  })
  const dateChange = (date: DateOfBirth) => {
    setDateOfBirth(date)
  }

  return (
    <div className="age-calculator">
      <div className="container">
        <AgeForm dateChange={dateChange} />
      </div>
    </div>
  )
}
export default AgeCalculator
