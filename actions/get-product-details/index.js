// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: "Nike Solo Fleece Men's Pullover Hoodie",
        description: "Men's fleece pullover hoodie for everyday warmth.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/eacfc8ef-8c8f-4a10-82d6-c4d352c1525e/M+NK+SOLO+BB+PO+HD.png',
        price: '$115',
        category: 'Hoodies & Sweatshirts'
    },
    {
        name: "Nike Solo Fleece Men's Cuffed Trousers",
        description: "Men's cuffed fleece trousers with a relaxed fit.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c10c5891-cb8b-4634-b4b2-854befda3121/M+NK+SOLO+BB+CUFF+PANT.png',
        price: '$110',
        category: 'Pants'
    },
    {
        name: "Nike Pre-Game Fleece Women's Oversized Hoodie",
        description: "Women's oversized fleece hoodie for laid-back layering.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5569961d-3a1b-4d2c-bc2e-11e2348b9a85/W+NSW+ARTICLE+FLC+HDY+2.png',
        price: '$170',
        category: 'Hoodies & Sweatshirts'
    },
    {
        name: "Nike Pre-Game Fleece Women's Loose Mid-Rise Trousers",
        description: "Women's loose mid-rise fleece trousers.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b1d7174d-633b-474c-9558-810c83e73b24/W+NSW+ARTICLE+FLC+TROUSER.png',
        price: '$170',
        category: 'Pants'
    },
    {
        name: "Nike Solo Swoosh Men's Fleece Quarter-Zip Top",
        description: "Men's fleece quarter-zip top with Solo Swoosh branding.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63e6bcd5-4131-451a-bc17-8dda2d7fc52d/M+NL+SOLO+SWSH+BB+QUARTER+ZIP.png',
        price: '$130',
        category: 'Hoodies & Sweatshirts'
    },
    {
        name: "Nike Solo Swoosh Men's Cuffed Fleece Trousers",
        description: "Men's cuffed fleece trousers with Solo Swoosh detailing.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b6448c13-813b-4bad-9348-7fd872b769e1/M+NL+SOLO+SWSH+BB+CF+PANT.png',
        price: '$130',
        category: 'Pants'
    },
    {
        name: "Nike Sportswear Tech Fleece Older Kids' Full-Zip Hoodie",
        description: "Older kids' full-zip Tech Fleece hoodie.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5bc861d6-73b0-41f4-a39c-cf348536b163/B+NSW+TCH+FLC+FZ+-+PD.png',
        price: '$130',
        category: 'Kids Clothing'
    },
    {
        name: "Nike Sportswear Tech Fleece Older Kids' Joggers",
        description: "Older kids' Tech Fleece joggers.",
        image_url: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c0ffd9ac-7728-4f14-9f86-d4c27eb36d6d/B+NSW+TCH+FLC+JGGR+-+PD.png',
        price: '$110',
        category: 'Kids Clothing'
    }
]

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide the name of the product to retrieve details for.' }]
        }
    }

    const query = name.trim().toLowerCase()
    let item = MOCK_DATA.find((p) => p.name.toLowerCase() === query)
    if (!item) {
        item = MOCK_DATA.find((p) => p.name.toLowerCase().includes(query))
    }

    if (!item) {
        // Not found — return content only (no structuredContent) so the widget shows its empty state.
        return {
            content: [{ type: 'text', text: `No product details found for: ${name.trim()}` }]
        }
    }

    const summary = `${item.name} — ${item.price}. ${item.description} Category: ${item.category}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image_url: item.image_url
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
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
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
