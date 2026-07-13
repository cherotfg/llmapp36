const handler = require('../../actions/find-store/index.js');

describe('find_store handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ location: 'Sydney' });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Find an adidas store near me in Sydney" returns store locations', async () => {
        const out = await handler({ location: 'Sydney' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.stores.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Sydney' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.stores)).toBe(true);
    });

    test('returns error message when required location is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/location|provide/i);
        expect(out.structuredContent.stores).toEqual([]);
    });

    test('filters stores by matching location query', async () => {
        const out = await handler({ location: 'Bondi' });
        expect(out.structuredContent.stores.length).toBeGreaterThan(0);
        expect(out.structuredContent.stores.some((s) => /bondi/i.test(`${s.name} ${s.address}`))).toBe(true);
    });

    test('falls back to nearby stores when query has no exact match', async () => {
        const out = await handler({ location: 'Zzzznowhere' });
        expect(out.content[0].text).toMatch(/no exact matches|nearby/i);
        expect(out.structuredContent.stores.length).toBeGreaterThan(0);
    });
});
