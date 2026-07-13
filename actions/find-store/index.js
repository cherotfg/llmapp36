// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'adidas Sydney CBD',
        address: 'Shop 42, Pitt Street Mall, Sydney NSW 2000',
        phone: '(02) 9221 4455',
        hours: 'Mon-Sat 9am-7pm, Sun 10am-6pm',
    },
    {
        name: 'adidas Bondi Junction',
        address: 'Westfield, 500 Oxford St, Bondi Junction NSW 2022',
        phone: '(02) 9387 1122',
        hours: 'Mon-Sun 9am-6pm',
    },
    {
        name: 'adidas Parramatta',
        address: 'Westfield Parramatta, 159-175 Church St, Parramatta NSW 2150',
        phone: '(02) 9633 8899',
        hours: 'Mon-Sun 9am-6pm',
    },
];

module.exports = async ({ location = '', radius_km = 25 } = {}) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (suburb, city, or postcode) to search near.' }],
            // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
            structuredContent: { stores: [] },
        };
    }

    const query = location.trim().toLowerCase();
    const radius = typeof radius_km === 'number' && radius_km > 0 ? radius_km : 25;

    const results = MOCK_DATA.filter((store) => {
        const haystack = `${store.name} ${store.address}`.toLowerCase();
        return haystack.includes(query);
    });

    const stores = results.length > 0 ? results : MOCK_DATA;

    const summary = results.length > 0
        ? `Found ${results.length} adidas store${results.length === 1 ? '' : 's'} near "${location.trim()}" within ${radius}km.`
        : `No exact matches for "${location.trim()}" — showing ${stores.length} nearby adidas stores.`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — derived from action name "find_store" (bare array outputSchema rule)
        structuredContent: { stores },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${location}&radius=${radius_km}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}&radius=${encodeURIComponent(radius_km)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
