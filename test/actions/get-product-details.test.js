const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ product_code: 'B75806' });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('happy path — looks up by product_code', async () => {
        const out = await handler({ product_code: 'B75806' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent).toBeDefined();
        expect(out.structuredContent.name).toBe('Ultraboost Light Running Shoes');
    });

    test('looks up by product_name (partial match)', async () => {
        const out = await handler({ product_name: 'Gazelle' });
        expect(out.structuredContent.name).toBe('Gazelle Shoes');
        expect(out.structuredContent.category).toBe('Originals');
    });

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ product_code: 'B75806' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(out.structuredContent).toHaveProperty('price');
        expect(out.structuredContent).not.toHaveProperty('product');
    });

    test('returns error message when no identifier is provided', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/product_code|product_name|provide/i);
        expect(out.structuredContent).toBeUndefined();
    });

    test('unknown product — not found, no structuredContent', async () => {
        const out = await handler({ product_code: 'ZZZ999' });
        expect(out.content[0].text).toMatch(/no product found/i);
        expect(out.structuredContent).toBeUndefined();
    });
});
