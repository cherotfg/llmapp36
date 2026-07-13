// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        product_code: 'B75806',
        name: 'Ultraboost Light Running Shoes',
        description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST.',
        price: 'A$280.00',
        category: 'Running',
        sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
        colors: ['Core Black', 'Cloud White', 'Solar Red'],
        image_url: 'https://assets.adidas.com/images/ultraboost-light.jpg'
    },
    {
        product_code: 'GX3494',
        name: 'Gazelle Shoes',
        description: 'A timeless icon reborn. These adidas Gazelle shoes keep the low-profile silhouette and soft suede upper that made the original a street-style staple.',
        price: 'A$150.00',
        category: 'Originals',
        sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
        colors: ['Collegiate Green', 'Scarlet', 'Navy'],
        image_url: 'https://assets.adidas.com/images/gazelle.jpg'
    },
    {
        product_code: 'HP7401',
        name: 'Tiro 23 Training Pants',
        description: 'Built for the grind, these adidas Tiro 23 training pants feature moisture-absorbing AEROREADY and a tapered fit that moves with you through every session.',
        price: 'A$75.00',
        category: 'Training',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Team Navy Blue'],
        image_url: 'https://assets.adidas.com/images/tiro-23-pants.jpg'
    }
];

module.exports = async ({ product_code = '', product_name = '' }) => {
    const code = typeof product_code === 'string' ? product_code.trim() : '';
    const productName = typeof product_name === 'string' ? product_name.trim() : '';

    if (!code && !productName) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_code or product_name to look up product details.' }]
        };
    }

    const item = MOCK_DATA.find((p) => {
        if (code && p.product_code.toLowerCase() === code.toLowerCase()) return true;
        if (productName && p.name.toLowerCase().includes(productName.toLowerCase())) return true;
        return false;
    });

    if (!item) {
        const term = code || productName;
        return {
            content: [{ type: 'text', text: `No product found matching "${term}".` }]
        };
    }

    const summary = `${item.name} (${item.category}) — ${item.price}. Available in sizes ${item.sizes.join(', ')} and colors ${item.colors.join(', ')}.`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: {
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            sizes: item.sizes,
            colors: item.colors,
            image_url: item.image_url
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?code=${product_code}
 *   GET ${process.env.API_BASE_URL}/products?q=${product_name}
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
 *     `${process.env.API_BASE_URL}/products?code=${encodeURIComponent(product_code)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
