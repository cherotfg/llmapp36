const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ location: 'Sydney' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Find a Nike store near Sydney" returns store locations', async () => {
        const out = await handler({ location: 'Sydney' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Sydney' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/location|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('matches a store by suburb name', async () => {
        const out = await handler({ location: 'Bondi' })
        expect(out.structuredContent.stores.some((s) => /Bondi/i.test(s.name))).toBe(true)
    })
})
