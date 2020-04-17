import { msConversion } from './msConversion'

describe('msConversion', () => {
  it('check str', () => {
    expect(msConversion(1111)).toEqual('0:1')
  })
})