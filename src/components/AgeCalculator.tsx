import { useState } from 'react'
import AgeForm from './AgeForm'
import AgeDisplay from './AgeDisplay'

export type DateOfBirth = {
  day: string
  month: string
  year: string
}

const AgeCalculator = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)
  const dateChange = (date: string) => {
    setDateOfBirth(date)
  }

  return (
    <div className="age-calculator">
      <div className="container">
        <AgeForm dateChange={dateChange} />
        <AgeDisplay dateOfBirth={dateOfBirth} />
      </div>
    </div>
  )
}
export default AgeCalculator
