const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('content is an array of text blocks on happy path', async () => {
        const out = await handler({ name: "Nike Solo Fleece Men's Pullover Hoodie" })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the Nike Solo Fleece Men\'s Pullover Hoodie" returns product details', async () => {
        const out = await handler({ name: "Nike Solo Fleece Men's Pullover Hoodie" })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Nike Solo Fleece Men's Pullover Hoodie/)
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe("Nike Solo Fleece Men's Pullover Hoodie")
        expect(out.structuredContent.price).toBe('$115')
        expect(out.structuredContent.category).toBe('Hoodies & Sweatshirts')
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: "Nike Solo Fleece Men's Pullover Hoodie" })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('matches by partial (case-insensitive) name', async () => {
        const out = await handler({ name: "solo swoosh men's fleece quarter-zip" })
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe("Nike Solo Swoosh Men's Fleece Quarter-Zip Top")
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown product name returns not-found and no structuredContent', async () => {
        const out = await handler({ name: 'Adidas Running Shoe' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0].text).toMatch(/no product details found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
