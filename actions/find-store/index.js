// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Nike Sydney George Street',
        address: '77 George St, Sydney NSW 2000',
        phone: '(02) 9247 1188',
        hours: 'Mon–Sat 9am–7pm, Sun 10am–6pm'
    },
    {
        name: 'Nike Bondi Junction',
        address: '500 Oxford St, Bondi Junction NSW 2022',
        phone: '(02) 9387 4422',
        hours: 'Mon–Sun 9am–6pm'
    },
    {
        name: 'Nike Broadway',
        address: '1 Bay St, Broadway NSW 2007',
        phone: '(02) 9211 3300',
        hours: 'Mon–Sat 9:30am–6pm, Sun 10am–5pm'
    }
]

module.exports = async ({ location = '' }) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, suburb, or postcode) to search near.' }],
            // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()
    let stores = MOCK_DATA.filter((store) => (
        (store.name && store.name.toLowerCase().includes(query))
        || (store.address && store.address.toLowerCase().includes(query))
    ))

    // No direct match — fall back to returning all stores so the shopper still sees options.
    if (stores.length === 0) {
        stores = MOCK_DATA
    }

    const summary = `Found ${stores.length} Nike store${stores.length === 1 ? '' : 's'} near ${location.trim()}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${location}
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
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
