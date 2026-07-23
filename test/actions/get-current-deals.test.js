const handler = require('../../actions/get-current-deals/index.js')

describe('get_current_deals handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"What ASICS shoes are on sale right now?" returns deals', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.deals.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.deals)).toBe(true)
    })

    test('handles missing/empty args without throwing', async () => {
        const out = await handler()
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.structuredContent.deals.length).toBeGreaterThan(0)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Running Shoes' })
        expect(out.structuredContent.deals.every((d) => d.category === 'Running Shoes')).toBe(true)
    })

    test('unknown category returns no deals', async () => {
        const out = await handler({ category: 'Nonexistent Category' })
        expect(out.structuredContent.deals).toHaveLength(0)
        expect(out.content[0].text).toMatch(/no current deals/i)
    })

    test('max_results caps the number of returned deals', async () => {
        const out = await handler({ max_results: 1 })
        expect(out.structuredContent.deals).toHaveLength(1)
    })
})
