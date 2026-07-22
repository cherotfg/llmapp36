const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ query: 'hoodie' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Show me some Nike hoodies" returns matching products', async () => {
        const out = await handler({ query: 'hoodie' })
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ query: 'hoodie' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('returns all products when no args provided', async () => {
        const out = await handler({})
        expect(out.structuredContent.products.length).toBe(8)
        expect(out.content[0].text).toMatch(/found 8 products/i)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Pants' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every((p) => p.category === 'Pants')).toBe(true)
    })

    test('respects max_results limit', async () => {
        const out = await handler({ max_results: 2 })
        expect(out.structuredContent.products.length).toBe(2)
    })

    test('returns no results for a query that matches nothing', async () => {
        const out = await handler({ query: 'zzz-nonexistent-product' })
        expect(out.structuredContent.products.length).toBe(0)
        expect(out.content[0].text).toMatch(/no products found/i)
    })
})
