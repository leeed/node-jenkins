import App from '../src/app';

describe('Get Typeof Greet method', () => {
  it('should get string type for name user to greet', () => { 
    expect(typeof App.greet('led')).toBe('string')
  })
})
