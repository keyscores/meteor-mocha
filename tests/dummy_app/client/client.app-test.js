/* eslint-env mocha */

if (Meteor.isClient) {
  describe('Failing test', () => {
    it('simple test', () => {
      throw 'test'
    })
  })
  describe('Client test', () => {
    it('another test', () => {
    })
  })
}
