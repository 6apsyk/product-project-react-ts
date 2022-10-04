import classNames from './classNames'

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass')
  })
  test('with additinal class', () => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  })
  test('with mods class when true', () => {
    const expected = 'someClass class1 class2 hovered border'
    expect(classNames('someClass', { hovered: true, border: true }, ['class1', 'class2'])).toBe(expected)
  })
  test('with mods class when false', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true, border: false }, ['class1', 'class2'])).toBe(expected)
  })
  test('with mods class when undefined', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true, border: undefined }, ['class1', 'class2'])).toBe(expected)
  })
})
