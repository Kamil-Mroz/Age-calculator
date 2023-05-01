import { useEffect, useState } from 'react'
import CalculateAge from './CalculateAge'

const AgeDisplay = ({ dateOfBirth }: { dateOfBirth: string | null }) => {
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
  } | null>(null)
  console.log('changed')
  useEffect(() => {
    if (dateOfBirth) setAge(CalculateAge(dateOfBirth))
  }, [dateOfBirth])

  return (
    <div className="age-display">
      <p className="age">
        <span>{age?.years ?? '--'}</span> years
      </p>
      <p className="age">
        <span>{age?.months ?? '--'}</span> months
      </p>
      <p className="age">
        <span>{age?.days ?? '--'}</span> days
      </p>
    </div>
  )
}
export default AgeDisplay
