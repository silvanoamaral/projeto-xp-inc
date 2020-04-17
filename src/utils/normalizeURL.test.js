import { normalizeURL } from './normalizeURL'

describe('normalizeURL', () => {
  it('check str', () => {
    expect(normalizeURL('MC Kevinho')).toEqual('mc-kevinho')
  })
})