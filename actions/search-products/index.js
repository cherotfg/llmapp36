// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Samba OG Shoes',
        price: 'A$160',
        category: 'Shoes',
        gender: 'Unisex',
        image_url: 'https://assets.adidas.com/images/samba-og.jpg',
        product_url: 'https://www.adidas.com.au/samba-og'
    },
    {
        name: 'Adicolor Classics Tee',
        price: 'A$45',
        category: 'Clothing',
        gender: 'Men',
        image_url: 'https://assets.adidas.com/images/adicolor-tee.jpg',
        product_url: 'https://www.adidas.com.au/adicolor-tee'
    },
    {
        name: 'Ultraboost Light Running Shoes',
        price: 'A$260',
        category: 'Shoes',
        gender: 'Women',
        image_url: 'https://assets.adidas.com/images/ultraboost-light.jpg',
        product_url: 'https://www.adidas.com.au/ultraboost-light'
    }
]

module.exports = async ({ query = '', category = '', gender = '', sport = '', max_results = 24 } = {}) => {
    const q = typeof query === 'string' ? query.trim().toLowerCase() : ''
    const cat = typeof category === 'string' ? category.trim().toLowerCase() : ''
    const gen = typeof gender === 'string' ? gender.trim().toLowerCase() : ''
    const limit = typeof max_results === 'number' && max_results > 0 ? max_results : 24

    const results = MOCK_DATA.filter((item) => {
        if (q && !(item.name && item.name.toLowerCase().includes(q))) return false
        if (cat && !(item.category && item.category.toLowerCase() === cat)) return false
        if (gen && !(item.gender && item.gender.toLowerCase() === gen)) return false
        return true
    }).slice(0, limit)

    const filters = []
    if (query && typeof query === 'string' && query.trim()) filters.push(`"${query.trim()}"`)
    if (cat) filters.push(`category ${category.trim()}`)
    if (gen) filters.push(`for ${gender.trim()}`)
    const suffix = filters.length ? ` matching ${filters.join(', ')}` : ''

    const summary = results.length
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${suffix}.`
        : `No products found${suffix}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.products — derived from action name "search_products" (bare array outputSchema rule)
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?q=${query}&category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?q=${encodeURIComponent(query)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
