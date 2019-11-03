const isInternalLink = (link: string) => /^\/(?!\/)/.test(link);

test('should return true given internal link', () => {
  expect(isInternalLink('/greet/:name')).toBe(true)
})
