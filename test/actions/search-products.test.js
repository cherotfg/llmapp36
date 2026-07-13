const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('happy path returns matching products', async () => {
        const out = await handler({ query: 'Samba' })
        expect(out.content[0].text).toMatch(/found/i)
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.structuredContent.products[0].name).toMatch(/samba/i)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Shoes' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every((p) => p.category === 'Shoes')).toBe(true)
    })

    test('respects max_results limit', async () => {
        const out = await handler({ max_results: 1 })
        expect(out.structuredContent.products.length).toBe(1)
    })

    test('returns no results for a non-matching query', async () => {
        const out = await handler({ query: 'zzz-nonexistent-product' })
        expect(out.content[0].text).toMatch(/no products/i)
        expect(out.structuredContent.products).toHaveLength(0)
    })
})
