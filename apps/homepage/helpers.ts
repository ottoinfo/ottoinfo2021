// I want to pass in TWO times (start: '1/1/2012', stop: 4/1/2013)
// and return a time period =>  1 year 3 months
export const getTimeWorked = (start: string, stop: string): string => {
  const startDate = new Date(start)
  const stoptDate = stop === 'present' ? new Date() : new Date(stop)
  const startMonth = startDate.getMonth()
  const stopMonth = stoptDate.getMonth()
  // Always Pad the months by 1
  let months = ((12 - startMonth + stopMonth) % 12) + 1
  const initialYears = stoptDate.getFullYear() - startDate.getFullYear()
  // Just because year 2011 - 2012, you may have started in DEC ended in JAN ( 1 months )
  // We need to MAKE SURE we are calculating the years correctly
  let years = initialYears
  if (initialYears >= 1) {
    years = Math.floor((12 * initialYears - startMonth + stopMonth) / 12)
  }
  // Lets always DEFAULT to years 12 months => 1 year
  if (months === 12) {
    months = 0
    years += 1
  }
  const prettyYear = years ? `${years} yr${years > 1 ? 's' : ''} ` : ''
  const prettyMonth = months ? `${months} mo${months > 1 ? 's' : ''}` : ''
  // Remove Beginning/Trailing Whitespace  Ex: ` 1yr 6mos ` => `1yr 6mos`
  return `${prettyYear}${prettyMonth}`.replace(/^\s/, '').replace(/\s$/, '')
}
