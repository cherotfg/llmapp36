// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'GEL-KAYANO 31',
        price: 'SGD 179.00',
        original_price: 'SGD 259.00',
        discount_percentage: '30% OFF',
        category: 'Running Shoes',
        image_url: '',
    },
    {
        name: 'GT-2000 13',
        price: 'SGD 129.00',
        original_price: 'SGD 189.00',
        discount_percentage: '32% OFF',
        category: 'Running Shoes',
        image_url: '',
    },
    {
        name: 'NOVABLAST 5',
        price: 'SGD 109.00',
        original_price: 'SGD 159.00',
        discount_percentage: '31% OFF',
        category: 'Running Shoes',
        image_url: '',
    },
]

module.exports = async ({ category = '', max_results = 20 } = {}) => {
    const limit = typeof max_results === 'number' && max_results > 0 ? max_results : 20

    let results = MOCK_DATA
    if (category && typeof category === 'string' && category.trim()) {
        const cat = category.trim().toLowerCase()
        results = results.filter((item) => (item.category || '').toLowerCase() === cat)
    }
    results = results.slice(0, limit)

    const summary = results.length > 0
        ? `Found ${results.length} ASICS deal${results.length === 1 ? '' : 's'} currently on sale${category ? ` in ${category}` : ''}.`
        : `No current deals found${category ? ` in ${category}` : ''}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.deals — derived from action name "get_current_deals" (bare array outputSchema rule)
        structuredContent: { deals: results },
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/deals?category=${category}&limit=${max_results}
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
 *     `${process.env.API_BASE_URL}/deals?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
