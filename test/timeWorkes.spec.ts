import { getTimeWorked } from '../apps/homepage/helpers'

describe('getTimeWorked', () => {
  it('Basic', () => {
    expect(getTimeWorked('1/1/2012', '4/1/2013')).toEqual('1 yr 4 mos')
  })
  it('Basic - Always Pad / Singular Month', () => {
    expect(getTimeWorked('1/1/2012', '1/1/2012')).toEqual('1 mo')
  })
  it('Basic - Plural Month', () => {
    expect(getTimeWorked('12/1/2012', '1/1/2013')).toEqual('2 mos')
  })
  it('Basic - Singular Month', () => {
    expect(getTimeWorked('1/1/2012', '12/1/2012')).toEqual('1 yr')
  })

  it('Long', () => {
    expect(getTimeWorked('1/1/2012', '11/1/2029')).toEqual('17 yrs 11 mos')
  })
})
