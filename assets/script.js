// ========== SINGLE DOCUMENT READY EVENT - ALL CODE INSIDE ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== GLOBAL VARIABLES ==========
    let cart = [];
    let productStock = {};
    let currentLanguage = 'en';
    let recentOrders = JSON.parse(localStorage.getItem('recent-orders')) || [];
    
    // ========== CURRENCY CONVERSIONS ==========
    const currencyRates = {
        en: { symbol: '$', rate: 1.00, code: 'USD' },
        pt: { symbol: '€', rate: 0.92, code: 'EUR' },
        es: { symbol: '€', rate: 0.92, code: 'EUR' },
        fr: { symbol: '€', rate: 0.92, code: 'EUR' },
        bn: { symbol: '৳', rate: 110.00, code: 'BDT' },
        ar: { symbol: 'ر.س', rate: 3.75, code: 'SAR' }
    };

    // ========== COMPLETE TRANSLATIONS OBJECT WITH ALL LANGUAGES ==========
    const translations = {
        // ===== ENGLISH =====
        en: {
            'home': 'Home',
            'products': 'Products',
            'services': 'Services',
            'about': 'About',
            'contact': 'Contact',
            'welcome': 'WELCOME TO SNOWFALL',
            'tagline': 'Your trusted place for quality products',
            'home-text': 'This is the official website of SNOWFALL.',
            'category': 'Category',
            'mobile': 'Mobile',
            'tablet': 'Tablets & iPads',
            'laptop': 'Laptop',
            'camera': 'Camera',
            'gaming': 'Gaming',
            'drones': 'Drones',
            'headphone': 'Headphone & Speaker',
            'charger': 'Charger',
            'watch': 'Watch',
            'featured-products': 'Our Featured Products',
            'featured': 'Featured Product',
            'featured-desc': 'Browse products by selecting categories from the sidebar.',
            'add-to-cart': 'Add to Cart',
            'iphone-15-pro': 'iPhone 15 Pro',
            'iphone-15-pro-desc': 'Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system.',
            'iphone-17': 'iPhone 17',
            'iphone-17-desc': 'Premium phone with advanced AI features and powerful processor.',
            'iphone-16': 'iPhone 16',
            'iphone-16-desc': 'AI-powered smartphone with advanced features and best-in-class camera.',
            'iphone-14': 'iPhone 14',
            'iphone-14-desc': 'Powerful smartphone with amazing features and great value.',
            'samsung-s24-ultra': 'Samsung Galaxy S24 Ultra',
            'samsung-s24-ultra-desc': 'Dynamic AMOLED 2X display, 200MP camera, and Snapdragon 8 Gen 3 processor.',
            'samsung-s25-ultra': 'Samsung Galaxy S25 Ultra',
            'samsung-s25-ultra-desc': 'Next-gen flagship with revolutionary AI features and cutting-edge camera technology.',
            'samsung-z-fold-5': 'Samsung Galaxy Z Fold 5',
            'samsung-z-fold-5-desc': 'Foldable display, multitasking powerhouse, and premium design.',
            'samsung-z-flip-5': 'Samsung Galaxy Z Flip 5',
            'samsung-z-flip-5-desc': 'Compact foldable with large cover screen and versatile camera.',
            'google-pixel-8-pro': 'Google Pixel 8 Pro',
            'google-pixel-8-pro-desc': 'Advanced AI features, exceptional camera, and pure Android experience with Tensor G3.',
            'google-pixel-10-pro': 'Google Pixel 10 Pro',
            'google-pixel-10-pro-desc': 'Next-gen AI capabilities with revolutionary Tensor G5 chip and groundbreaking camera.',
            'oneplus-12': 'OnePlus 12',
            'oneplus-12-desc': '120Hz ProXDR display, 100W fast charging, and Snapdragon 8 Gen 3.',
            'oneplus-open': 'OnePlus Open',
            'oneplus-open-desc': 'Foldable phone with flagship specs and multitasking capabilities.',
            'xiaomi-14-ultra': 'Xiaomi 14 Ultra',
            'xiaomi-14-ultra-desc': 'Leica professional cameras, 90W fast charging, and stunning display technology.',
            'xiaomi-13-pro': 'Xiaomi 13 Pro',
            'xiaomi-13-pro-desc': 'Leica camera system, Snapdragon 8 Gen 2, and premium design.',
            'sony-xperia-1-vi': 'Sony Xperia 1 VI',
            'sony-xperia-1-vi-desc': '4K OLED display, professional camera system, and multimedia excellence.',
            'nothing-phone-2': 'Nothing Phone 2',
            'nothing-phone-2-desc': 'Unique glyph interface, clean design, and innovative user experience.',
            'ipad-pro-m2': 'iPad Pro 12.9" M2',
            'ipad-pro-m2-desc': 'M2 chip, Liquid Retina XDR display, 5G, and Apple Pencil hover experience.',
            'ipad-air-m1': 'iPad Air M1',
            'ipad-air-m1-desc': 'M1 chip, 10.9" Liquid Retina display, Touch ID, and ultra-wide front camera.',
            'ipad-10th-gen': 'iPad 10th Gen',
            'ipad-10th-gen-desc': 'A14 Bionic chip, 10.9" Liquid Retina display, USB-C, and landscape camera.',
            'ipad-mini-6': 'iPad Mini 6',
            'ipad-mini-6-desc': 'A15 Bionic chip, 8.3" Liquid Retina display, 5G, and Apple Pencil 2 support.',
            'samsung-tab-s9-ultra': 'Samsung Tab S9 Ultra',
            'samsung-tab-s9-ultra-desc': '14.6" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, IP68 water resistance.',
            'samsung-tab-s9-plus': 'Samsung Tab S9+',
            'samsung-tab-s9-plus-desc': '12.4" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, and enhanced S Pen experience.',
            'samsung-tab-s9': 'Samsung Tab S9',
            'samsung-tab-s9-desc': '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, and IP67 water resistance.',
            'surface-pro-9': 'Surface Pro 9',
            'surface-pro-9-desc': '13" touchscreen, Intel Evo platform, up to 15.5 hours battery life.',
            'amazon-fire-max-11': 'Amazon Fire Max 11',
            'amazon-fire-max-11-desc': '11" display, octa-core processor, and all-day battery life.',
            'lenovo-tab-p12': 'Lenovo Tab P12',
            'lenovo-tab-p12-desc': '12.7" 3K display, MediaTek Dimensity 7050, and JBL speakers.',
            'macbook-pro-16': 'MacBook Pro 16',
            'macbook-pro-16-desc': 'M3 Pro chip, 36GB RAM, 1TB SSD, and stunning Liquid Retina XDR display.',
            'macbook-air-m2': 'MacBook Air M2',
            'macbook-air-m2-desc': 'Ultra-thin design, M2 chip, all-day battery life, and brilliant display.',
            'dell-xps-15': 'Dell XPS 15',
            'dell-xps-15-desc': 'Intel Core i9, 32GB RAM, NVIDIA RTX 4060, and 4K OLED display.',
            'dell-xps-13': 'Dell XPS 13',
            'dell-xps-13-desc': 'Ultra-portable premium laptop with InfinityEdge display and Intel Core i7.',
            'lenovo-thinkpad-x1': 'Lenovo ThinkPad X1',
            'lenovo-thinkpad-x1-desc': 'Business laptop with Intel vPro, 32GB RAM, and premium build quality.',
            'asus-rog-zephyrus': 'ASUS ROG Zephyrus',
            'asus-rog-zephyrus-desc': 'Gaming laptop with RTX 4080, 240Hz display, and advanced cooling.',
            'hp-spectre-x360': 'HP Spectre x360',
            'hp-spectre-x360-desc': 'Convertible laptop with OLED display, Intel Core i7, and premium design.',
            'microsoft-surface-laptop-5': 'Microsoft Surface Laptop 5',
            'microsoft-surface-laptop-5-desc': 'Elegant design, touchscreen display, and excellent portability.',
            'razer-blade-15': 'Razer Blade 15',
            'razer-blade-15-desc': 'Ultra-slim gaming laptop with RTX 4070 and 240Hz QHD display.',
            'acer-predator-helios': 'Acer Predator Helios',
            'acer-predator-helios-desc': 'Powerful gaming laptop with high-performance cooling and RGB keyboard.',
            'sony-a7-iv': 'Sony A7 IV',
            'sony-a7-iv-desc': 'Full-frame mirrorless camera with 33MP sensor and 4K 60p video recording.',
            'sony-a1': 'Sony A1',
            'sony-a1-desc': 'Flagship 50MP camera with 8K video, 30fps burst shooting, and incredible speed.',
            'sony-a7s-iii': 'Sony A7S III',
            'sony-a7s-iii-desc': 'Low-light champion with 12MP sensor and 4K 120p video for professionals.',
            'sony-zv-e1': 'Sony ZV-E1',
            'sony-zv-e1-desc': 'Compact vlogging camera with full-frame sensor and AI autofocus.',
            'canon-eos-r5': 'Canon EOS R5',
            'canon-eos-r5-desc': '45MP full-frame sensor, 8K RAW video, and advanced Dual Pixel AF II.',
            'canon-eos-r6-ii': 'Canon EOS R6 Mark II',
            'canon-eos-r6-ii-desc': '24MP full-frame sensor, 40fps burst, and excellent low-light performance.',
            'canon-eos-r3': 'Canon EOS R3',
            'canon-eos-r3-desc': 'Professional sports camera with 24MP stacked sensor and eye-controlled AF.',
            'canon-eos-r100': 'Canon EOS R100',
            'canon-eos-r100-desc': 'Entry-level mirrorless camera perfect for beginners and content creators.',
            'nikon-z8': 'Nikon Z8',
            'nikon-z8-desc': 'Compact powerhouse with 45.7MP sensor, 8K video, and flagship features.',
            'nikon-z9': 'Nikon Z9',
            'nikon-z9-desc': 'Flagship professional camera with stacked CMOS sensor and 8K video.',
            'nikon-z6-iii': 'Nikon Z6 III',
            'nikon-z6-iii-desc': 'Versatile full-frame camera with 24.5MP sensor and 6K video recording.',
            'fujifilm-xt5': 'Fujifilm X-T5',
            'fujifilm-xt5-desc': '40MP APS-C sensor with film simulations and classic dial design.',
            'fujifilm-x100vi': 'Fujifilm X100VI',
            'fujifilm-x100vi-desc': 'Premium compact camera with fixed 23mm lens and 40MP sensor.',
            'fujifilm-gfx100-ii': 'Fujifilm GFX100 II',
            'fujifilm-gfx100-ii-desc': 'Medium format camera with 102MP sensor and 8K video capabilities.',
            'panasonic-s5-ii': 'Panasonic Lumix S5 II',
            'panasonic-s5-ii-desc': 'Full-frame hybrid camera with phase detection AF and 6K video.',
            'ps5': 'PlayStation 5',
            'ps5-desc': 'Ultra-fast SSD, 4K gaming, haptic feedback, and adaptive triggers.',
            'xbox-series-x': 'Xbox Series X',
            'xbox-series-x-desc': '12 teraflops, quick resume, 4K gaming, and Game Pass ultimate.',
            'nintendo-switch-oled': 'Nintendo Switch OLED',
            'nintendo-switch-oled-desc': '7" OLED screen, vibrant colors, and versatile gaming modes.',
            'logitech-g-pro-x': 'Logitech G Pro X',
            'logitech-g-pro-x-desc': 'Hero 25K sensor, ultra-lightweight, and pro-grade performance.',
            'razer-deathadder-v3': 'Razer DeathAdder V3',
            'razer-deathadder-v3-desc': 'Focus Pro 30K sensor, optical switches, and ergonomic design.',
            'steelseries-apex-pro': 'SteelSeries Apex Pro',
            'steelseries-apex-pro-desc': 'OmniPoint adjustable switches, OLED display, and magnetic wrist rest.',
            'steelseries-arctis-nova-pro': 'SteelSeries Arctis Nova Pro',
            'steelseries-arctis-nova-pro-desc': 'Premium gaming headset with active noise cancellation and Hi-Res audio.',
            'xbox-elite-controller': 'Xbox Elite Controller Series 2',
            'xbox-elite-controller-desc': 'Adjustable tension thumbsticks, wrap-around rubberized grip.',
            'secretlab-titan-evo': 'Secretlab Titan Evo',
            'secretlab-titan-evo-desc': 'Premium gaming chair with magnetic head pillow and 4-way lumbar support.',
            'alienware-aw3423dw': 'Alienware AW3423DW',
            'alienware-aw3423dw-desc': '34" QD-OLED gaming monitor, 175Hz refresh rate, G-Sync Ultimate.',
            'dji-mavic-3-pro': 'DJI Mavic 3 Pro',
            'dji-mavic-3-pro-desc': 'Triple-camera system, 46-min flight time, and omnidirectional obstacle sensing.',
            'dji-air-3': 'DJI Air 3',
            'dji-air-3-desc': 'Dual-primary cameras, 46-min flight time, and 360° obstacle sensing.',
            'dji-mini-4-pro': 'DJI Mini 4 Pro',
            'dji-mini-4-pro-desc': 'Under 249g, 4K/60fps HDR, omnidirectional obstacle sensing.',
            'dji-avata': 'DJI Avata',
            'dji-avata-desc': 'FPV drone with propeller guards, 4K stabilization, and immersive flight.',
            'gopro-hero-12': 'GoPro Hero 12 Black',
            'gopro-hero-12-desc': '5.3K video, HyperSmooth 6.0 stabilization, and waterproof design.',
            'dji-osmo-action-4': 'DJI Osmo Action 4',
            'dji-osmo-action-4-desc': '1/1.3" sensor, 4K/120fps, RockSteady 3.0 stabilization.',
            'insta360-x3': 'Insta360 X3',
            'insta360-x3-desc': '360° 5.7K video, 72MP photos, and invisible selfie stick effect.',
            'dji-osmo-mobile-6': 'DJI Osmo Mobile 6',
            'dji-osmo-mobile-6-desc': 'Smartphone gimbal with built-in extension rod and ActiveTrack 5.0.',
            'dji-goggles-2': 'DJI Goggles 2',
            'dji-goggles-2-desc': 'Micro-OLED displays, 1080p, and low-latency transmission.',
            'dji-fly-more-kit': 'DJI Fly More Kit',
            'dji-fly-more-kit-desc': 'Extra batteries, charging hub, propellers, and carrying bag.',
            'sony-wh-1000xm5': 'Sony WH-1000XM5',
            'sony-wh-1000xm5-desc': 'Industry-leading noise cancellation with exceptional sound quality.',
            'bose-qc-45': 'Bose QuietComfort 45',
            'bose-qc-45-desc': 'Premium noise cancelling headphones with comfortable design.',
            'airpods-max': 'Apple AirPods Max',
            'airpods-max-desc': 'Over-ear headphones with computational audio and seamless ecosystem.',
            'sennheiser-momentum-4': 'Sennheiser Momentum 4',
            'sennheiser-momentum-4-desc': 'Audiophile-grade wireless headphones with exceptional sound.',
            'beyerdynamic-dt-990': 'Beyerdynamic DT 990 Pro',
            'beyerdynamic-dt-990-desc': 'Studio headphones with open-back design for professional use.',
            'sonos-move-2': 'Sonos Move 2',
            'sonos-move-2-desc': 'Portable smart speaker with powerful sound and Wi-Fi/Bluetooth.',
            'jbl-charge-5': 'JBL Charge 5',
            'jbl-charge-5-desc': 'Waterproof portable speaker with powerful bass and power bank.',
            'bose-soundlink-flex': 'Bose SoundLink Flex',
            'bose-soundlink-flex-desc': 'Portable Bluetooth speaker with rugged design and clear sound.',
            'marshall-stanmore-iii': 'Marshall Stanmore III',
            'marshall-stanmore-iii-desc': 'Home speaker with iconic design and room-filling sound.',
            'harman-kardon-onyx-8': 'Harman Kardon Onyx Studio 8',
            'harman-kardon-onyx-8-desc': 'Premium wireless speaker with elegant design and rich sound.',
            'anker-735-charger': 'Anker 735 Charger',
            'anker-735-charger-desc': 'GaNPrime 65W charger with 3 ports for fast charging multiple devices.',
            'belkin-3-in-1': 'Belkin 3-in-1',
            'belkin-3-in-1-desc': 'MagSafe charger for iPhone, Apple Watch, and AirPods simultaneously.',
            'samsung-wireless-charger': 'Samsung Wireless Charger',
            'samsung-wireless-charger-desc': 'Fast wireless charging pad for Samsung and Qi-compatible devices.',
            'baseus-65w-charger': 'Baseus 65W Charger',
            'baseus-65w-charger-desc': 'Compact GaN charger with 2 USB-C and 1 USB-A ports.',
            'anker-powerline-iii': 'Anker Powerline III',
            'anker-powerline-iii-desc': 'Durable USB-C to USB-C cable with 100W fast charging support.',
            'macbook-pro-charger': 'MacBook Pro 140W Charger',
            'macbook-pro-charger-desc': 'Official Apple 140W USB-C power adapter for MacBook Pro fast charging.',
            'dell-xps-charger': 'Dell XPS 130W Charger',
            'dell-xps-charger-desc': 'Official Dell 130W USB-C charger with fast charging for XPS laptops.',
            'lenovo-thinkpad-charger': 'Lenovo ThinkPad 65W Charger',
            'lenovo-thinkpad-charger-desc': 'USB-C laptop charger with Power Delivery for ThinkPad and other laptops.',
            'hp-laptop-charger': 'HP 90W Smart Charger',
            'hp-laptop-charger-desc': 'Official HP 90W AC adapter with Smart Pin for HP laptops.',
            'ugreen-100w-charger': 'UGREEN 100W Charger',
            'ugreen-100w-charger-desc': 'High-power GaN charger with 4 ports for laptops and devices.',
            'mophie-powerstation': 'Mophie Powerstation',
            'mophie-powerstation-desc': 'Portable power bank with 10,000mAh capacity and fast charging.',
            'anker-powercore': 'Anker PowerCore 26800',
            'anker-powercore-desc': 'High-capacity power bank with 26,800mAh for multiple device charges.',
            'nomad-wireless-hub': 'Nomad Wireless Hub',
            'nomad-wireless-hub-desc': 'Premium wireless charger with metal design and leather surface.',
            'pitaka-magez': 'Pitaka MagEZ Charger',
            'pitaka-magez-desc': 'Multi-device wireless charger with aramid fiber design.',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'Portable charger with 30W PD for laptops and devices.',
            'apple-watch-ultra-2': 'Apple Watch Ultra 2',
            'apple-watch-ultra-2-desc': 'Titanium case, 49mm display, dual-frequency GPS, and up to 36 hours battery life.',
            'apple-watch-series-9': 'Apple Watch Series 9',
            'apple-watch-series-9-desc': 'S9 chip, double tap gesture, brighter display, and advanced health features.',
            'apple-watch-se': 'Apple Watch SE',
            'apple-watch-se-desc': 'Essential features, activity tracking, and family setup at an affordable price.',
            'samsung-watch-6-classic': 'Samsung Galaxy Watch 6 Classic',
            'samsung-watch-6-classic-desc': 'Rotating bezel, sapphire crystal, body composition analysis, and ECG monitoring.',
            'samsung-watch-6': 'Samsung Galaxy Watch 6',
            'samsung-watch-6-desc': 'Slim design, bright display, advanced sleep tracking, and Wear OS.',
            'samsung-watch-5-pro': 'Samsung Galaxy Watch 5 Pro',
            'samsung-watch-5-pro-desc': 'Titanium body, sapphire crystal, long battery life, and advanced GPS.',
            'garmin-fenix-7': 'Garmin Fenix 7',
            'garmin-fenix-7-desc': 'Premium multisport GPS watch with solar charging and advanced training features.',
            'garmin-epix-pro': 'Garmin Epix Pro',
            'garmin-epix-pro-desc': 'AMOLED display, advanced mapping, and premium fitness tracking.',
            'garmin-venu-3': 'Garmin Venu 3',
            'garmin-venu-3-desc': 'AMOLED display, advanced health monitoring, and fitness features.',
            'google-pixel-watch-2': 'Google Pixel Watch 2',
            'google-pixel-watch-2-desc': 'Fitbit integration, stress management, and Wear OS with Google Assistant.',
            'fossil-gen-6': 'Fossil Gen 6',
            'fossil-gen-6-desc': 'Wear OS, heart rate tracking, and stylish design with rotating crown.',
            'withings-scanwatch': 'Withings ScanWatch',
            'withings-scanwatch-desc': 'Hybrid smartwatch with ECG, blood oxygen monitoring, and 30-day battery.',
            'huawei-watch-gt-4': 'Huawei Watch GT 4',
            'huawei-watch-gt-4-desc': 'Long battery life, precise health tracking, and elegant design.',
            'amazfit-gtr-4': 'Amazfit GTR 4',
            'amazfit-gtr-4-desc': 'AMOLED display, dual-band GPS, and amazing battery life up to 24 days.',
            'ticwatch-pro-5': 'TicWatch Pro 5',
            'ticwatch-pro-5-desc': 'Ultra-low power display, Snapdragon W5+ Gen 1, and advanced health sensors.',
            'cart-title': 'Your Shopping Cart',
            'product': 'Product',
            'price': 'Price',
            'quantity': 'Quantity',
            'total': 'Total',
            'action': 'Action',
            'total-label': 'Total:',
            'continue': 'Continue Shopping',
            'checkout': 'Proceed to Checkout',
            'is-empty': 'is empty',
            'payment-title': 'Payment',
            'order-summary': 'Order Summary',
            'payment-method': 'Select Payment Method',
            'card-payment': 'Card Payment',
            'google-pay': 'Google Pay',
            'apple-pay': 'Apple Pay',
            'paypal': 'PayPal',
            'mbway': 'MB WAY',
            'card-details': 'Card Details',
            'card-number': 'Card Number',
            'expiry': 'Expiry Date',
            'cvv': 'CVV',
            'card-name': 'Name on Card',
            'mbway-details': 'MB WAY Payment',
            'mbway-instruction': 'Enter your mobile phone number to receive payment notification',
            'phone-number': 'Phone Number',
            'googlepay-info': 'You will be redirected to Google Pay to complete your payment securely.',
            'applepay-info': 'You will be redirected to Apple Pay to complete your payment securely.',
            'paypal-info': 'You will be redirected to PayPal to complete your payment securely.',
            'back-to-cart': '← Back to Cart',
            'pay-now': 'Pay Now',
            'subtotal': 'Subtotal',
            'shipping': 'Shipping',
            'select-payment': 'Please select a payment method',
            'fill-card-details': 'Please fill in all card details',
            'enter-phone': 'Please enter your phone number',
            'payment-successful': 'Payment successful',
            'thank-you': 'Thank you for your order!',
            'about-story-title': 'Our Story',
            'about-story-text': 'SNOWFALL was founded in 2024 with a simple mission: to bring the latest technology to customers at fair prices. What started as a small passion for gadgets has grown into a trusted online destination for electronics enthusiasts worldwide.',
            'about-products-title': 'What We Sell',
            'about-products-text': 'We specialize in smartphones, laptops, tablets, cameras, gaming consoles, headphones, smartwatches, and accessories. Every product in our catalog is carefully selected for quality and performance.',
            'about-why-title': 'Why Choose Us',
            'about-why1': 'Latest electronics at competitive prices',
            'about-why2': '100% genuine products with warranty',
            'about-why3': 'Fast & secure shipping worldwide',
            'about-why4': '24/7 customer support',
            'about-why5': 'Easy returns & refunds',
            'about-promise-title': 'Our Promise',
            'about-promise-text': 'Your satisfaction is our priority. We\'re committed to providing a safe, secure, and enjoyable shopping experience from browsing to delivery and beyond.',
            'delivery-title': 'Fast & Reliable Delivery',
            'delivery-desc': 'Get your products delivered quickly and safely to your doorstep.',
            'delivery-feature1': 'Same-day / next-day delivery',
            'delivery-feature2': 'Worldwide shipping',
            'delivery-feature3': 'Real-time order tracking',
            'returns-title': 'Easy Returns & Refunds',
            'returns-desc': 'Hassle-free returns and quick refunds for your peace of mind.',
            'returns-feature1': '7-day or 30-day return policy',
            'returns-feature2': 'Free returns',
            'returns-feature3': 'Quick refund processing',
            'payments-title': 'Secure Payments',
            'payments-desc': 'Your transactions are protected with industry-leading security.',
            'payments-feature1': 'SSL secure checkout',
            'payments-feature2': 'Multiple payment methods',
            'payments-feature3': 'Fraud protection',
            'support-title': '24/7 Customer Support',
            'support-desc': 'We\'re always here to help you with any questions or concerns.',
            'support-feature1': 'Live chat support',
            'support-feature2': 'Email support',
            'support-feature3': 'Phone support',
            'warranty-title': 'Product Warranty',
            'warranty-desc': 'All our products come with warranty coverage for your protection.',
            'warranty-feature1': '1-year warranty',
            'warranty-feature2': 'Replacement guarantee',
            'warranty-feature3': 'Authentic products',
            'tracking-title': 'Order Tracking',
            'tracking-desc': 'Follow your package every step of the way until it arrives.',
            'tracking-feature1': 'Track order from account dashboard',
            'tracking-feature2': 'SMS / email shipping updates',
            'tracking-feature3': 'Real-time location tracking',
            'contact-title': 'Contact Us',
            'name-label': 'Name:',
            'email-label': 'Email:',
            'message-label': 'Message:',
            'send': 'Send',
            'rights': 'All rights reserved.',
            'currency': 'USD',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'Shipping Address',
            'first-name': 'First Name',
            'last-name': 'Last Name',
            'address-line1': 'Address Line 1',
            'address-line2': 'Address Line 2 (Optional)',
            'city': 'City',
            'state': 'State / Province',
            'zip-code': 'ZIP / Postal Code',
            'country': 'Country',
            'phone': 'Phone Number',
            'confirmation-email': 'Email for Order Confirmation',
            'email-note': 'We\'ll send your order confirmation and tracking info to this email',
            'save-address': 'Save this address for future orders',
            'fill-shipping-details': 'Please fill in all shipping details',
            'valid-email': 'Please enter a valid email address'
        },
        
        // ===== PORTUGUESE =====
        pt: {
            'home': 'Início',
            'products': 'Produtos',
            'services': 'Serviços',
            'about': 'Sobre',
            'contact': 'Contato',
            'welcome': 'BEM-VINDO À SNOWFALL',
            'tagline': 'O seu lugar de confiança para produtos de qualidade',
            'home-text': 'Este é o site oficial da SNOWFALL.',
            'category': 'Categorias',
            'mobile': 'Telemóvel',
            'tablet': 'Tablets & iPads',
            'laptop': 'Portátil',
            'camera': 'Câmara',
            'gaming': 'Gaming',
            'drones': 'Drones',
            'headphone': 'Auriculares & Colunas',
            'charger': 'Carregador',
            'watch': 'Relógio',
            'featured-products': 'Produtos em Destaque',
            'featured': 'Produto em Destaque',
            'featured-desc': 'Navegue pelos produtos selecionando categorias na barra lateral.',
            'add-to-cart': 'Adicionar ao Carrinho',
            'iphone-15-pro': 'iPhone 15 Pro',
            'iphone-15-pro-desc': 'O mais recente smartphone da Apple com chip A17 Pro, design em titânio e sistema de câmara avançado.',
            'iphone-17': 'iPhone 17',
            'iphone-17-desc': 'Telemóvel premium com funcionalidades avançadas de IA e processador poderoso.',
            'iphone-16': 'iPhone 16',
            'iphone-16-desc': 'Smartphone com IA e câmara de primeira classe.',
            'iphone-14': 'iPhone 14',
            'iphone-14-desc': 'Smartphone poderoso com excelente custo-benefício.',
            'samsung-s24-ultra': 'Samsung Galaxy S24 Ultra',
            'samsung-s24-ultra-desc': 'Ecrã Dynamic AMOLED 2X, câmara de 200MP e processador Snapdragon 8 Gen 3.',
            'samsung-s25-ultra': 'Samsung Galaxy S25 Ultra',
            'samsung-s25-ultra-desc': 'Flagship de próxima geração com recursos revolucionários de IA e tecnologia de câmara de ponta.',
            'samsung-z-fold-5': 'Samsung Galaxy Z Fold 5',
            'samsung-z-fold-5-desc': 'Ecrã dobrável, potência multitarefa e design premium.',
            'samsung-z-flip-5': 'Samsung Galaxy Z Flip 5',
            'samsung-z-flip-5-desc': 'Dobrável compacto com grande ecrã frontal e câmara versátil.',
            'google-pixel-8-pro': 'Google Pixel 8 Pro',
            'google-pixel-8-pro-desc': 'Funcionalidades avançadas de IA, câmara excecional e experiência Android pura com Tensor G3.',
            'google-pixel-10-pro': 'Google Pixel 10 Pro',
            'google-pixel-10-pro-desc': 'Capacidades de IA de próxima geração com chip Tensor G5 revolucionário e câmara inovadora.',
            'oneplus-12': 'OnePlus 12',
            'oneplus-12-desc': 'Ecrã ProXDR 120Hz, carregamento rápido de 100W e Snapdragon 8 Gen 3.',
            'oneplus-open': 'OnePlus Open',
            'oneplus-open-desc': 'Telemóvel dobrável com especificações topo de gama e capacidades multitarefa.',
            'xiaomi-14-ultra': 'Xiaomi 14 Ultra',
            'xiaomi-14-ultra-desc': 'Câmaras profissionais Leica, carregamento rápido de 90W e tecnologia de ecrã impressionante.',
            'xiaomi-13-pro': 'Xiaomi 13 Pro',
            'xiaomi-13-pro-desc': 'Sistema de câmara Leica, Snapdragon 8 Gen 2 e design premium.',
            'sony-xperia-1-vi': 'Sony Xperia 1 VI',
            'sony-xperia-1-vi-desc': 'Ecrã OLED 4K, sistema de câmara profissional e excelência multimédia.',
            'nothing-phone-2': 'Nothing Phone 2',
            'nothing-phone-2-desc': 'Interface glyph única, design limpo e experiência de utilizador inovadora.',
            'ipad-pro-m2': 'iPad Pro 12.9" M2',
            'ipad-pro-m2-desc': 'Chip M2, ecrã Liquid Retina XDR, 5G e experiência de hover com Apple Pencil.',
            'ipad-air-m1': 'iPad Air M1',
            'ipad-air-m1-desc': 'Chip M1, ecrã Liquid Retina de 10.9", Touch ID e câmara frontal ultra grande angular.',
            'ipad-10th-gen': 'iPad 10ª Geração',
            'ipad-10th-gen-desc': 'Chip A14 Bionic, ecrã Liquid Retina de 10.9", USB-C e câmara paisagem.',
            'ipad-mini-6': 'iPad Mini 6',
            'ipad-mini-6-desc': 'Chip A15 Bionic, ecrã Liquid Retina de 8.3", 5G e suporte para Apple Pencil 2.',
            'samsung-tab-s9-ultra': 'Samsung Tab S9 Ultra',
            'samsung-tab-s9-ultra-desc': '14.6" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, resistência à água IP68.',
            'samsung-tab-s9-plus': 'Samsung Tab S9+',
            'samsung-tab-s9-plus-desc': '12.4" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 e experiência S Pen melhorada.',
            'samsung-tab-s9': 'Samsung Tab S9',
            'samsung-tab-s9-desc': '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 e resistência à água IP67.',
            'surface-pro-9': 'Surface Pro 9',
            'surface-pro-9-desc': 'Ecrã tátil de 13", plataforma Intel Evo, até 15.5 horas de bateria.',
            'amazon-fire-max-11': 'Amazon Fire Max 11',
            'amazon-fire-max-11-desc': 'Ecrã de 11", processador octa-core e bateria para todo o dia.',
            'lenovo-tab-p12': 'Lenovo Tab P12',
            'lenovo-tab-p12-desc': 'Ecrã 3K de 12.7", MediaTek Dimensity 7050 e colunas JBL.',
            'macbook-pro-16': 'MacBook Pro 16',
            'macbook-pro-16-desc': 'Chip M3 Pro, 36GB RAM, 1TB SSD e impressionante ecrã Liquid Retina XDR.',
            'macbook-air-m2': 'MacBook Air M2',
            'macbook-air-m2-desc': 'Design ultra-fino, chip M2, bateria para todo o dia e ecrã brilhante.',
            'dell-xps-15': 'Dell XPS 15',
            'dell-xps-15-desc': 'Intel Core i9, 32GB RAM, NVIDIA RTX 4060 e ecrã OLED 4K.',
            'dell-xps-13': 'Dell XPS 13',
            'dell-xps-13-desc': 'Portátil premium ultra-portátil com ecrã InfinityEdge e Intel Core i7.',
            'lenovo-thinkpad-x1': 'Lenovo ThinkPad X1',
            'lenovo-thinkpad-x1-desc': 'Portátil empresarial com Intel vPro, 32GB RAM e qualidade de construção premium.',
            'asus-rog-zephyrus': 'ASUS ROG Zephyrus',
            'asus-rog-zephyrus-desc': 'Portátil gaming com RTX 4080, ecrã 240Hz e arrefecimento avançado.',
            'hp-spectre-x360': 'HP Spectre x360',
            'hp-spectre-x360-desc': 'Portátil conversível com ecrã OLED, Intel Core i7 e design premium.',
            'microsoft-surface-laptop-5': 'Microsoft Surface Laptop 5',
            'microsoft-surface-laptop-5-desc': 'Design elegante, ecrã tátil e excelente portabilidade.',
            'razer-blade-15': 'Razer Blade 15',
            'razer-blade-15-desc': 'Portátil gaming ultra-fino com RTX 4070 e ecrã QHD 240Hz.',
            'acer-predator-helios': 'Acer Predator Helios',
            'acer-predator-helios-desc': 'Portátil gaming poderoso com arrefecimento de alto desempenho e teclado RGB.',
            'sony-a7-iv': 'Sony A7 IV',
            'sony-a7-iv-desc': 'Câmara mirrorless full-frame com sensor de 33MP e gravação de vídeo 4K 60p.',
            'sony-a1': 'Sony A1',
            'sony-a1-desc': 'Câmara flagship de 50MP com vídeo 8K, 30fps burst e velocidade incrível.',
            'sony-a7s-iii': 'Sony A7S III',
            'sony-a7s-iii-desc': 'Campeã de pouca luz com sensor de 12MP e vídeo 4K 120p para profissionais.',
            'sony-zv-e1': 'Sony ZV-E1',
            'sony-zv-e1-desc': 'Câmara compacta para vlogging com sensor full-frame e autofoco IA.',
            'canon-eos-r5': 'Canon EOS R5',
            'canon-eos-r5-desc': 'Sensor full-frame de 45MP, vídeo RAW 8K e Dual Pixel AF II avançado.',
            'canon-eos-r6-ii': 'Canon EOS R6 Mark II',
            'canon-eos-r6-ii-desc': 'Sensor full-frame de 24MP, 40fps burst e excelente desempenho em pouca luz.',
            'canon-eos-r3': 'Canon EOS R3',
            'canon-eos-r3-desc': 'Câmara profissional desportiva com sensor empilhado de 24MP e AF com controlo ocular.',
            'canon-eos-r100': 'Canon EOS R100',
            'canon-eos-r100-desc': 'Câmara mirrorless de entrada perfeita para iniciantes e criadores de conteúdo.',
            'nikon-z8': 'Nikon Z8',
            'nikon-z8-desc': 'Potência compacta com sensor de 45.7MP, vídeo 8K e funcionalidades flagship.',
            'nikon-z9': 'Nikon Z9',
            'nikon-z9-desc': 'Câmara profissional flagship com sensor CMOS empilhado e vídeo 8K.',
            'nikon-z6-iii': 'Nikon Z6 III',
            'nikon-z6-iii-desc': 'Câmara full-frame versátil com sensor de 24.5MP e gravação de vídeo 6K.',
            'fujifilm-xt5': 'Fujifilm X-T5',
            'fujifilm-xt5-desc': 'Sensor APS-C de 40MP com simulações de filme e design clássico de mostradores.',
            'fujifilm-x100vi': 'Fujifilm X100VI',
            'fujifilm-x100vi-desc': 'Câmara compacta premium com lente fixa de 23mm e sensor de 40MP.',
            'fujifilm-gfx100-ii': 'Fujifilm GFX100 II',
            'fujifilm-gfx100-ii-desc': 'Câmara de médio formato com sensor de 102MP e capacidades de vídeo 8K.',
            'panasonic-s5-ii': 'Panasonic Lumix S5 II',
            'panasonic-s5-ii-desc': 'Câmara híbrida full-frame com AF de deteção de fase e vídeo 6K.',
            'ps5': 'PlayStation 5',
            'ps5-desc': 'SSD ultra-rápido, jogos 4K, feedback háptico e gatilhos adaptativos.',
            'xbox-series-x': 'Xbox Series X',
            'xbox-series-x-desc': '12 teraflops, retoma rápida, jogos 4K e Game Pass ultimate.',
            'nintendo-switch-oled': 'Nintendo Switch OLED',
            'nintendo-switch-oled-desc': 'Ecrã OLED de 7", cores vibrantes e modos de jogo versáteis.',
            'logitech-g-pro-x': 'Logitech G Pro X',
            'logitech-g-pro-x-desc': 'Sensor Hero 25K, ultra-leve e desempenho profissional.',
            'razer-deathadder-v3': 'Razer DeathAdder V3',
            'razer-deathadder-v3-desc': 'Sensor Focus Pro 30K, interruptores óticos e design ergonómico.',
            'steelseries-apex-pro': 'SteelSeries Apex Pro',
            'steelseries-apex-pro-desc': 'Interruptores ajustáveis OmniPoint, ecrã OLED e descanso magnético.',
            'steelseries-arctis-nova-pro': 'SteelSeries Arctis Nova Pro',
            'steelseries-arctis-nova-pro-desc': 'Headset gaming premium com cancelamento de ruído ativo e áudio Hi-Res.',
            'xbox-elite-controller': 'Xbox Elite Controller Series 2',
            'xbox-elite-controller-desc': 'Polegares com tensão ajustável, pega emborrachada.',
            'secretlab-titan-evo': 'Secretlab Titan Evo',
            'secretlab-titan-evo-desc': 'Cadeira gaming premium com apoio magnético e suporte lumbar 4 vias.',
            'alienware-aw3423dw': 'Alienware AW3423DW',
            'alienware-aw3423dw-desc': 'Monitor gaming QD-OLED 34", 175Hz, G-Sync Ultimate.',
            'dji-mavic-3-pro': 'DJI Mavic 3 Pro',
            'dji-mavic-3-pro-desc': 'Sistema de três câmaras, 46min de voo e deteção omnidirecional de obstáculos.',
            'dji-air-3': 'DJI Air 3',
            'dji-air-3-desc': 'Câmaras duplas, 46min de voo e deteção 360° de obstáculos.',
            'dji-mini-4-pro': 'DJI Mini 4 Pro',
            'dji-mini-4-pro-desc': 'Menos de 249g, 4K/60fps HDR, deteção omnidirecional de obstáculos.',
            'dji-avata': 'DJI Avata',
            'dji-avata-desc': 'Drone FPV com proteção de hélices, estabilização 4K e voo imersivo.',
            'gopro-hero-12': 'GoPro Hero 12 Black',
            'gopro-hero-12-desc': 'Vídeo 5.3K, estabilização HyperSmooth 6.0 e design à prova de água.',
            'dji-osmo-action-4': 'DJI Osmo Action 4',
            'dji-osmo-action-4-desc': 'Sensor 1/1.3", 4K/120fps, estabilização RockSteady 3.0.',
            'insta360-x3': 'Insta360 X3',
            'insta360-x3-desc': 'Vídeo 360° 5.7K, fotos 72MP e efeito de selfie stick invisível.',
            'dji-osmo-mobile-6': 'DJI Osmo Mobile 6',
            'dji-osmo-mobile-6-desc': 'Gimbal para smartphone com extensão incorporada e ActiveTrack 5.0.',
            'dji-goggles-2': 'DJI Goggles 2',
            'dji-goggles-2-desc': 'Ecrãs Micro-OLED, 1080p e transmissão de baixa latência.',
            'dji-fly-more-kit': 'DJI Fly More Kit',
            'dji-fly-more-kit-desc': 'Baterias extras, hub de carregamento, hélices e bolsa de transporte.',
            'sony-wh-1000xm5': 'Sony WH-1000XM5',
            'sony-wh-1000xm5-desc': 'Cancelamento de ruído líder com qualidade de som excecional.',
            'bose-qc-45': 'Bose QuietComfort 45',
            'bose-qc-45-desc': 'Auriculares premium com cancelamento de ruído e design confortável.',
            'airpods-max': 'Apple AirPods Max',
            'airpods-max-desc': 'Auriculares over-ear com áudio computacional e ecossistema integrado.',
            'sennheiser-momentum-4': 'Sennheiser Momentum 4',
            'sennheiser-momentum-4-desc': 'Auriculares sem fios audiophile com som excecional.',
            'beyerdynamic-dt-990': 'Beyerdynamic DT 990 Pro',
            'beyerdynamic-dt-990-desc': 'Auriculares de estúdio com design aberto para uso profissional.',
            'sonos-move-2': 'Sonos Move 2',
            'sonos-move-2-desc': 'Coluna portátil inteligente com som poderoso e Wi-Fi/Bluetooth.',
            'jbl-charge-5': 'JBL Charge 5',
            'jbl-charge-5-desc': 'Coluna portátil à prova de água com graves potentes e banco de energia.',
            'bose-soundlink-flex': 'Bose SoundLink Flex',
            'bose-soundlink-flex-desc': 'Coluna Bluetooth portátil com design robusto e som nítido.',
            'marshall-stanmore-iii': 'Marshall Stanmore III',
            'marshall-stanmore-iii-desc': 'Coluna doméstica com design icónico e som ambiente.',
            'harman-kardon-onyx-8': 'Harman Kardon Onyx Studio 8',
            'harman-kardon-onyx-8-desc': 'Coluna sem fios premium com design elegante e som rico.',
            'anker-735-charger': 'Carregador Anker 735',
            'anker-735-charger-desc': 'Carregador GaNPrime 65W com 3 portas para carregamento rápido de múltiplos dispositivos.',
            'belkin-3-in-1': 'Belkin 3 em 1',
            'belkin-3-in-1-desc': 'Carregador MagSafe para iPhone, Apple Watch e AirPods simultaneamente.',
            'samsung-wireless-charger': 'Carregador Sem Fios Samsung',
            'samsung-wireless-charger-desc': 'Base de carregamento sem fios rápido para Samsung e dispositivos compatíveis com Qi.',
            'baseus-65w-charger': 'Carregador Baseus 65W',
            'baseus-65w-charger-desc': 'Carregador GaN compacto com 2 portas USB-C e 1 USB-A.',
            'anker-powerline-iii': 'Anker Powerline III',
            'anker-powerline-iii-desc': 'Cabo USB-C para USB-C durável com suporte para carregamento rápido de 100W.',
            'macbook-pro-charger': 'Carregador MacBook Pro 140W',
            'macbook-pro-charger-desc': 'Adaptador de energia USB-C oficial da Apple de 140W para carregamento rápido do MacBook Pro.',
            'dell-xps-charger': 'Carregador Dell XPS 130W',
            'dell-xps-charger-desc': 'Carregador USB-C oficial Dell 130W com carregamento rápido para laptops XPS.',
            'lenovo-thinkpad-charger': 'Carregador Lenovo ThinkPad 65W',
            'lenovo-thinkpad-charger-desc': 'Carregador USB-C para laptop com Power Delivery para ThinkPad e outros laptops.',
            'hp-laptop-charger': 'Carregador Inteligente HP 90W',
            'hp-laptop-charger-desc': 'Adaptador AC oficial HP 90W com Smart Pin para laptops HP.',
            'ugreen-100w-charger': 'Carregador UGREEN 100W',
            'ugreen-100w-charger-desc': 'Carregador GaN de alta potência com 4 portas para laptops e dispositivos.',
            'mophie-powerstation': 'Mophie Powerstation',
            'mophie-powerstation-desc': 'Banco de energia portátil com capacidade de 10.000mAh e carregamento rápido.',
            'anker-powercore': 'Anker PowerCore 26800',
            'anker-powercore-desc': 'Banco de energia de alta capacidade com 26.800mAh para cargas múltiplas.',
            'nomad-wireless-hub': 'Nomad Wireless Hub',
            'nomad-wireless-hub-desc': 'Carregador sem fios premium com design metálico e superfície em couro.',
            'pitaka-magez': 'Carregador Pitaka MagEZ',
            'pitaka-magez-desc': 'Carregador sem fios multi-dispositivos com design de fibra de aramida.',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'Carregador portátil com 30W PD para laptops e dispositivos.',
            'apple-watch-ultra-2': 'Apple Watch Ultra 2',
            'apple-watch-ultra-2-desc': 'Caixa em titânio, ecrã de 49mm, GPS dupla frequência e até 36h de bateria.',
            'apple-watch-series-9': 'Apple Watch Series 9',
            'apple-watch-series-9-desc': 'Chip S9, gesto de duplo toque, ecrã mais brilhante e funcionalidades avançadas de saúde.',
            'apple-watch-se': 'Apple Watch SE',
            'apple-watch-se-desc': 'Funcionalidades essenciais, monitorização de atividade e configuração familiar a preço acessível.',
            'samsung-watch-6-classic': 'Samsung Galaxy Watch 6 Classic',
            'samsung-watch-6-classic-desc': 'Bisel rotativo, cristal de safira, análise de composição corporal e monitorização ECG.',
            'samsung-watch-6': 'Samsung Galaxy Watch 6',
            'samsung-watch-6-desc': 'Design fino, ecrã brilhante, monitorização avançada de sono e Wear OS.',
            'samsung-watch-5-pro': 'Samsung Galaxy Watch 5 Pro',
            'samsung-watch-5-pro-desc': 'Corpo em titânio, cristal de safira, longa duração de bateria e GPS avançado.',
            'garmin-fenix-7': 'Garmin Fenix 7',
            'garmin-fenix-7-desc': 'Relógio GPS multidesportivo premium com carregamento solar e funcionalidades avançadas de treino.',
            'garmin-epix-pro': 'Garmin Epix Pro',
            'garmin-epix-pro-desc': 'Ecrã AMOLED, mapeamento avançado e monitorização fitness premium.',
            'garmin-venu-3': 'Garmin Venu 3',
            'garmin-venu-3-desc': 'Ecrã AMOLED, monitorização avançada de saúde e funcionalidades de fitness.',
            'google-pixel-watch-2': 'Google Pixel Watch 2',
            'google-pixel-watch-2-desc': 'Integração Fitbit, gestão de stress e Wear OS com Google Assistente.',
            'fossil-gen-6': 'Fossil Gen 6',
            'fossil-gen-6-desc': 'Wear OS, monitorização de frequência cardíaca e design elegante com coroa rotativa.',
            'withings-scanwatch': 'Withings ScanWatch',
            'withings-scanwatch-desc': 'Relógio híbrido com ECG, monitorização de oxigénio no sangue e bateria de 30 dias.',
            'huawei-watch-gt-4': 'Huawei Watch GT 4',
            'huawei-watch-gt-4-desc': 'Longa duração de bateria, monitorização precisa de saúde e design elegante.',
            'amazfit-gtr-4': 'Amazfit GTR 4',
            'amazfit-gtr-4-desc': 'Ecrã AMOLED, GPS dupla banda e bateria incrível até 24 dias.',
            'ticwatch-pro-5': 'TicWatch Pro 5',
            'ticwatch-pro-5-desc': 'Ecrã de ultra baixo consumo, Snapdragon W5+ Gen 1 e sensores avançados de saúde.',
            'cart-title': 'O Seu Carrinho de Compras',
            'product': 'Produto',
            'price': 'Preço',
            'quantity': 'Quantidade',
            'total': 'Total',
            'action': 'Ação',
            'total-label': 'Total:',
            'continue': 'Continuar Compras',
            'checkout': 'Finalizar Compra',
            'is-empty': 'está vazio',
            'payment-title': 'Pagamento',
            'order-summary': 'Resumo do Pedido',
            'payment-method': 'Selecione o Método de Pagamento',
            'card-payment': 'Pagamento com Cartão',
            'google-pay': 'Google Pay',
            'apple-pay': 'Apple Pay',
            'paypal': 'PayPal',
            'mbway': 'MB WAY',
            'card-details': 'Detalhes do Cartão',
            'card-number': 'Número do Cartão',
            'expiry': 'Data de Validade',
            'cvv': 'CVV',
            'card-name': 'Nome no Cartão',
            'mbway-details': 'Pagamento MB WAY',
            'mbway-instruction': 'Introduza o seu número de telemóvel para receber a notificação de pagamento',
            'phone-number': 'Número de Telemóvel',
            'googlepay-info': 'Será redirecionado para o Google Pay para concluir o pagamento de forma segura.',
            'applepay-info': 'Será redirecionado para o Apple Pay para concluir o pagamento de forma segura.',
            'paypal-info': 'Será redirecionado para o PayPal para concluir o pagamento de forma segura.',
            'back-to-cart': '← Voltar ao Carrinho',
            'pay-now': 'Pagar Agora',
            'subtotal': 'Subtotal',
            'shipping': 'Entrega',
            'select-payment': 'Por favor, selecione um método de pagamento',
            'fill-card-details': 'Por favor, preencha todos os detalhes do cartão',
            'enter-phone': 'Por favor, introduza o seu número de telefone',
            'payment-successful': 'Pagamento bem-sucedido',
            'thank-you': 'Obrigado pelo seu pedido!',
            'about-story-title': 'Nossa História',
            'about-story-text': 'A SNOWFALL foi fundada em 2024 com uma missão simples: trazer as mais recentes tecnologias aos clientes a preços justos. O que começou como uma pequena paixão por gadgets cresceu e se tornou um destino online confiável para entusiastas de eletrônicos em todo o mundo.',
            'about-products-title': 'O Que Vendemos',
            'about-products-text': 'Especializamo-nos em smartphones, laptops, tablets, câmeras, consoles de jogos, fones de ouvido, smartwatches e acessórios. Cada produto em nosso catálogo é cuidadosamente selecionado por qualidade e desempenho.',
            'about-why-title': 'Por Que Nos Escolher',
            'about-why1': 'Eletrônicos mais recentes a preços competitivos',
            'about-why2': 'Produtos 100% genuínos com garantia',
            'about-why3': 'Envio rápido e seguro em todo o mundo',
            'about-why4': 'Suporte ao cliente 24/7',
            'about-why5': 'Devoluções e reembolsos fáceis',
            'about-promise-title': 'Nossa Promessa',
            'about-promise-text': 'A sua satisfação é a nossa prioridade. Estamos empenhados em proporcionar uma experiência de compra segura e agradável, desde a navegação até à entrega e além.',
            'delivery-title': 'Entrega Rápida e Confiável',
            'delivery-desc': 'Receba seus produtos de forma rápida e segura em sua porta.',
            'delivery-feature1': 'Entrega no mesmo dia / próximo dia',
            'delivery-feature2': 'Envio mundial',
            'delivery-feature3': 'Rastreamento em tempo real',
            'returns-title': 'Devoluções e Reembolsos Fáceis',
            'returns-desc': 'Devoluções sem complicações e reembolsos rápidos para sua tranquilidade.',
            'returns-feature1': 'Política de devolução de 7 ou 30 dias',
            'returns-feature2': 'Devoluções grátis',
            'returns-feature3': 'Processamento rápido de reembolso',
            'payments-title': 'Pagamentos Seguros',
            'payments-desc': 'Suas transações são protegidas com segurança de ponta.',
            'payments-feature1': 'Checkout seguro SSL',
            'payments-feature2': 'Múltiplos métodos de pagamento',
            'payments-feature3': 'Proteção contra fraudes',
            'support-title': 'Suporte ao Cliente 24/7',
            'support-desc': 'Estamos sempre aqui para ajudar com qualquer dúvida.',
            'support-feature1': 'Suporte por chat ao vivo',
            'support-feature2': 'Suporte por e-mail',
            'support-feature3': 'Suporte telefônico',
            'warranty-title': 'Garantia do Produto',
            'warranty-desc': 'Todos os produtos vêm com garantia para sua proteção.',
            'warranty-feature1': 'Garantia de 1 ano',
            'warranty-feature2': 'Garantia de substituição',
            'warranty-feature3': 'Produtos autênticos',
            'tracking-title': 'Rastreamento de Pedidos',
            'tracking-desc': 'Acompanhe seu pacote em cada etapa até a chegada.',
            'tracking-feature1': 'Rastreie no painel da conta',
            'tracking-feature2': 'Atualizações por SMS / e-mail',
            'tracking-feature3': 'Rastreamento em tempo real',
            'contact-title': 'Contacte-nos',
            'name-label': 'Nome:',
            'email-label': 'E-mail:',
            'message-label': 'Mensagem:',
            'send': 'Enviar',
            'rights': 'Todos os direitos reservados.',
            'currency': 'EUR',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'Endereço de Entrega',
            'first-name': 'Primeiro Nome',
            'last-name': 'Último Nome',
            'address-line1': 'Endereço Linha 1',
            'address-line2': 'Endereço Linha 2 (Opcional)',
            'city': 'Cidade',
            'state': 'Estado / Província',
            'zip-code': 'CEP / Código Postal',
            'country': 'País',
            'phone': 'Número de Telefone',
            'confirmation-email': 'Email para Confirmação do Pedido',
            'email-note': 'Enviaremos a confirmação do pedido e informações de rastreamento para este email',
            'save-address': 'Salvar este endereço para pedidos futuros',
            'fill-shipping-details': 'Por favor, preencha todos os detalhes de envio',
            'valid-email': 'Por favor, insira um email válido'
        },
        
        // ===== SPANISH =====
        es: {
            'home': 'Inicio',
            'products': 'Productos',
            'services': 'Servicios',
            'about': 'Nosotros',
            'contact': 'Contacto',
            'welcome': 'BIENVENIDO A SNOWFALL',
            'tagline': 'Tu lugar de confianza para productos de calidad',
            'home-text': 'Este es el sitio web oficial de SNOWFALL.',
            'category': 'Categoría',
            'mobile': 'Móvil',
            'tablet': 'Tablets & iPads',
            'laptop': 'Portátil',
            'camera': 'Cámara',
            'gaming': 'Gaming',
            'drones': 'Drones',
            'headphone': 'Auriculares & Altavoces',
            'charger': 'Cargador',
            'watch': 'Reloj',
            'featured-products': 'Productos Destacados',
            'featured': 'Producto Destacado',
            'featured-desc': 'Explore productos seleccionando categorías en la barra lateral.',
            'add-to-cart': 'Añadir al Carrito',
            'iphone-15-pro': 'iPhone 15 Pro',
            'iphone-15-pro-desc': 'Último smartphone de Apple con chip A17 Pro, diseño de titanio y sistema de cámara avanzado.',
            'iphone-17': 'iPhone 17',
            'iphone-17-desc': 'Teléfono premium con funciones avanzadas de IA y potente procesador.',
            'iphone-16': 'iPhone 16',
            'iphone-16-desc': 'Smartphone con IA y cámara de primera clase.',
            'iphone-14': 'iPhone 14',
            'iphone-14-desc': 'Smartphone potente con excelente relación calidad-precio.',
            'samsung-s24-ultra': 'Samsung Galaxy S24 Ultra',
            'samsung-s24-ultra-desc': 'Pantalla Dynamic AMOLED 2X, cámara de 200MP y procesador Snapdragon 8 Gen 3.',
            'samsung-s25-ultra': 'Samsung Galaxy S25 Ultra',
            'samsung-s25-ultra-desc': 'Buque insignia de próxima generación con funciones revolucionarias de IA y tecnología de cámara de vanguardia.',
            'samsung-z-fold-5': 'Samsung Galaxy Z Fold 5',
            'samsung-z-fold-5-desc': 'Pantalla plegable, potencia multitarea y diseño premium.',
            'samsung-z-flip-5': 'Samsung Galaxy Z Flip 5',
            'samsung-z-flip-5-desc': 'Plegable compacto con gran pantalla frontal y cámara versátil.',
            'google-pixel-8-pro': 'Google Pixel 8 Pro',
            'google-pixel-8-pro-desc': 'Funciones avanzadas de IA, cámara excepcional y experiencia Android pura con Tensor G3.',
            'google-pixel-10-pro': 'Google Pixel 10 Pro',
            'google-pixel-10-pro-desc': 'Capacidades de IA de próxima generación con revolucionario chip Tensor G5 y cámara innovadora.',
            'oneplus-12': 'OnePlus 12',
            'oneplus-12-desc': 'Pantalla ProXDR 120Hz, carga rápida de 100W y Snapdragon 8 Gen 3.',
            'oneplus-open': 'OnePlus Open',
            'oneplus-open-desc': 'Teléfono plegable con especificaciones de gama alta y capacidades multitarea.',
            'xiaomi-14-ultra': 'Xiaomi 14 Ultra',
            'xiaomi-14-ultra-desc': 'Cámaras profesionales Leica, carga rápida de 90W e impresionante tecnología de pantalla.',
            'xiaomi-13-pro': 'Xiaomi 13 Pro',
            'xiaomi-13-pro-desc': 'Sistema de cámara Leica, Snapdragon 8 Gen 2 y diseño premium.',
            'sony-xperia-1-vi': 'Sony Xperia 1 VI',
            'sony-xperia-1-vi-desc': 'Pantalla OLED 4K, sistema de cámara profesional y excelencia multimedia.',
            'nothing-phone-2': 'Nothing Phone 2',
            'nothing-phone-2-desc': 'Interfaz glyph única, diseño limpio y experiencia de usuario innovadora.',
            'ipad-pro-m2': 'iPad Pro 12.9" M2',
            'ipad-pro-m2-desc': 'Chip M2, pantalla Liquid Retina XDR, 5G y experiencia de hover con Apple Pencil.',
            'ipad-air-m1': 'iPad Air M1',
            'ipad-air-m1-desc': 'Chip M1, pantalla Liquid Retina de 10.9", Touch ID y cámara frontal ultra gran angular.',
            'ipad-10th-gen': 'iPad 10ª Generación',
            'ipad-10th-gen-desc': 'Chip A14 Bionic, pantalla Liquid Retina de 10.9", USB-C y cámara horizontal.',
            'ipad-mini-6': 'iPad Mini 6',
            'ipad-mini-6-desc': 'Chip A15 Bionic, pantalla Liquid Retina de 8.3", 5G y soporte para Apple Pencil 2.',
            'samsung-tab-s9-ultra': 'Samsung Tab S9 Ultra',
            'samsung-tab-s9-ultra-desc': '14.6" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, resistencia al agua IP68.',
            'samsung-tab-s9-plus': 'Samsung Tab S9+',
            'samsung-tab-s9-plus-desc': '12.4" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 y experiencia S Pen mejorada.',
            'samsung-tab-s9': 'Samsung Tab S9',
            'samsung-tab-s9-desc': '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 y resistencia al agua IP67.',
            'surface-pro-9': 'Surface Pro 9',
            'surface-pro-9-desc': 'Pantalla táctil de 13", plataforma Intel Evo, hasta 15.5 horas de batería.',
            'amazon-fire-max-11': 'Amazon Fire Max 11',
            'amazon-fire-max-11-desc': 'Pantalla de 11", procesador octa-core y batería para todo el día.',
            'lenovo-tab-p12': 'Lenovo Tab P12',
            'lenovo-tab-p12-desc': 'Pantalla 3K de 12.7", MediaTek Dimensity 7050 y altavoces JBL.',
            'macbook-pro-16': 'MacBook Pro 16',
            'macbook-pro-16-desc': 'Chip M3 Pro, 36GB RAM, 1TB SSD e impresionante pantalla Liquid Retina XDR.',
            'macbook-air-m2': 'MacBook Air M2',
            'macbook-air-m2-desc': 'Diseño ultrafino, chip M2, batería para todo el día y pantalla brillante.',
            'dell-xps-15': 'Dell XPS 15',
            'dell-xps-15-desc': 'Intel Core i9, 32GB RAM, NVIDIA RTX 4060 y pantalla OLED 4K.',
            'dell-xps-13': 'Dell XPS 13',
            'dell-xps-13-desc': 'Portátil premium ultraportátil con pantalla InfinityEdge e Intel Core i7.',
            'lenovo-thinkpad-x1': 'Lenovo ThinkPad X1',
            'lenovo-thinkpad-x1-desc': 'Portátil empresarial con Intel vPro, 32GB RAM y calidad de construcción premium.',
            'asus-rog-zephyrus': 'ASUS ROG Zephyrus',
            'asus-rog-zephyrus-desc': 'Portátil gaming con RTX 4080, pantalla 240Hz y refrigeración avanzada.',
            'hp-spectre-x360': 'HP Spectre x360',
            'hp-spectre-x360-desc': 'Portátil convertible con pantalla OLED, Intel Core i7 y diseño premium.',
            'microsoft-surface-laptop-5': 'Microsoft Surface Laptop 5',
            'microsoft-surface-laptop-5-desc': 'Diseño elegante, pantalla táctil y excelente portabilidad.',
            'razer-blade-15': 'Razer Blade 15',
            'razer-blade-15-desc': 'Portátil gaming ultradelgado con RTX 4070 y pantalla QHD 240Hz.',
            'acer-predator-helios': 'Acer Predator Helios',
            'acer-predator-helios-desc': 'Portátil gaming potente con refrigeración de alto rendimiento y teclado RGB.',
            'sony-a7-iv': 'Sony A7 IV',
            'sony-a7-iv-desc': 'Cámara mirrorless full-frame con sensor de 33MP y grabación de vídeo 4K 60p.',
            'sony-a1': 'Sony A1',
            'sony-a1-desc': 'Cámara insignia de 50MP con vídeo 8K, 30fps burst y velocidad increíble.',
            'sony-a7s-iii': 'Sony A7S III',
            'sony-a7s-iii-desc': 'Campeona de poca luz con sensor de 12MP y vídeo 4K 120p para profesionales.',
            'sony-zv-e1': 'Sony ZV-E1',
            'sony-zv-e1-desc': 'Cámara compacta para vlogging con sensor full-frame y enfoque automático IA.',
            'canon-eos-r5': 'Canon EOS R5',
            'canon-eos-r5-desc': 'Sensor full-frame de 45MP, vídeo RAW 8K y Dual Pixel AF II avanzado.',
            'canon-eos-r6-ii': 'Canon EOS R6 Mark II',
            'canon-eos-r6-ii-desc': 'Sensor full-frame de 24MP, 40fps burst y excelente rendimiento con poca luz.',
            'canon-eos-r3': 'Canon EOS R3',
            'canon-eos-r3-desc': 'Cámara deportiva profesional con sensor apilado de 24MP y AF con control ocular.',
            'canon-eos-r100': 'Canon EOS R100',
            'canon-eos-r100-desc': 'Cámara mirrorless de entrada perfecta para principiantes y creadores de contenido.',
            'nikon-z8': 'Nikon Z8',
            'nikon-z8-desc': 'Potencia compacta con sensor de 45.7MP, vídeo 8K y características insignia.',
            'nikon-z9': 'Nikon Z9',
            'nikon-z9-desc': 'Cámara profesional insignia con sensor CMOS apilado y vídeo 8K.',
            'nikon-z6-iii': 'Nikon Z6 III',
            'nikon-z6-iii-desc': 'Cámara full-frame versátil con sensor de 24.5MP y grabación de vídeo 6K.',
            'fujifilm-xt5': 'Fujifilm X-T5',
            'fujifilm-xt5-desc': 'Sensor APS-C de 40MP con simulaciones de película y diseño clásico de diales.',
            'fujifilm-x100vi': 'Fujifilm X100VI',
            'fujifilm-x100vi-desc': 'Cámara compacta premium con lente fija de 23mm y sensor de 40MP.',
            'fujifilm-gfx100-ii': 'Fujifilm GFX100 II',
            'fujifilm-gfx100-ii-desc': 'Cámara de formato medio con sensor de 102MP y capacidades de vídeo 8K.',
            'panasonic-s5-ii': 'Panasonic Lumix S5 II',
            'panasonic-s5-ii-desc': 'Cámara híbrida full-frame con AF de detección de fase y vídeo 6K.',
            'ps5': 'PlayStation 5',
            'ps5-desc': 'SSD ultrarrápido, juegos 4K, retroalimentación háptica y gatillos adaptativos.',
            'xbox-series-x': 'Xbox Series X',
            'xbox-series-x-desc': '12 teraflops, reanudación rápida, juegos 4K y Game Pass ultimate.',
            'nintendo-switch-oled': 'Nintendo Switch OLED',
            'nintendo-switch-oled-desc': 'Pantalla OLED de 7", colores vibrantes y modos de juego versátiles.',
            'logitech-g-pro-x': 'Logitech G Pro X',
            'logitech-g-pro-x-desc': 'Sensor Hero 25K, ultraligero y rendimiento profesional.',
            'razer-deathadder-v3': 'Razer DeathAdder V3',
            'razer-deathadder-v3-desc': 'Sensor Focus Pro 30K, interruptores ópticos y diseño ergonómico.',
            'steelseries-apex-pro': 'SteelSeries Apex Pro',
            'steelseries-apex-pro-desc': 'Interruptores ajustables OmniPoint, pantalla OLED y reposamuñecas magnético.',
            'steelseries-arctis-nova-pro': 'SteelSeries Arctis Nova Pro',
            'steelseries-arctis-nova-pro-desc': 'Auriculares gaming premium con cancelación activa de ruido y audio Hi-Res.',
            'xbox-elite-controller': 'Xbox Elite Controller Series 2',
            'xbox-elite-controller-desc': 'Palancas con tensión ajustable, agarre de goma.',
            'secretlab-titan-evo': 'Secretlab Titan Evo',
            'secretlab-titan-evo-desc': 'Silla gaming premium con almohada magnética y soporte lumbar 4 vías.',
            'alienware-aw3423dw': 'Alienware AW3423DW',
            'alienware-aw3423dw-desc': 'Monitor gaming QD-OLED 34", 175Hz, G-Sync Ultimate.',
            'dji-mavic-3-pro': 'DJI Mavic 3 Pro',
            'dji-mavic-3-pro-desc': 'Sistema de triple cámara, 46min de vuelo y detección omnidireccional de obstáculos.',
            'dji-air-3': 'DJI Air 3',
            'dji-air-3-desc': 'Cámaras duales, 46min de vuelo y detección 360° de obstáculos.',
            'dji-mini-4-pro': 'DJI Mini 4 Pro',
            'dji-mini-4-pro-desc': 'Menos de 249g, 4K/60fps HDR, detección omnidireccional de obstáculos.',
            'dji-avata': 'DJI Avata',
            'dji-avata-desc': 'Drone FPV con protectores de hélices, estabilización 4K y vuelo inmersivo.',
            'gopro-hero-12': 'GoPro Hero 12 Black',
            'gopro-hero-12-desc': 'Vídeo 5.3K, estabilización HyperSmooth 6.0 y diseño sumergible.',
            'dji-osmo-action-4': 'DJI Osmo Action 4',
            'dji-osmo-action-4-desc': 'Sensor 1/1.3", 4K/120fps, estabilización RockSteady 3.0.',
            'insta360-x3': 'Insta360 X3',
            'insta360-x3-desc': 'Vídeo 360° 5.7K, fotos 72MP y efecto de palo selfie invisible.',
            'dji-osmo-mobile-6': 'DJI Osmo Mobile 6',
            'dji-osmo-mobile-6-desc': 'Gimbal para smartphone con extensión incorporada y ActiveTrack 5.0.',
            'dji-goggles-2': 'DJI Goggles 2',
            'dji-goggles-2-desc': 'Pantallas Micro-OLED, 1080p y transmisión de baja latencia.',
            'dji-fly-more-kit': 'DJI Fly More Kit',
            'dji-fly-more-kit-desc': 'Baterías extra, hub de carga, hélices y bolsa de transporte.',
            'sony-wh-1000xm5': 'Sony WH-1000XM5',
            'sony-wh-1000xm5-desc': 'Cancelación de ruido líder con calidad de sonido excepcional.',
            'bose-qc-45': 'Bose QuietComfort 45',
            'bose-qc-45-desc': 'Auriculares premium con cancelación de ruido y diseño cómodo.',
            'airpods-max': 'Apple AirPods Max',
            'airpods-max-desc': 'Auriculares over-ear con audio computacional y ecosistema integrado.',
            'sennheiser-momentum-4': 'Sennheiser Momentum 4',
            'sennheiser-momentum-4-desc': 'Auriculares inalámbricos audiophile con sonido excepcional.',
            'beyerdynamic-dt-990': 'Beyerdynamic DT 990 Pro',
            'beyerdynamic-dt-990-desc': 'Auriculares de estudio con diseño abierto para uso profesional.',
            'sonos-move-2': 'Sonos Move 2',
            'sonos-move-2-desc': 'Altavoz inteligente portátil con sonido potente y Wi-Fi/Bluetooth.',
            'jbl-charge-5': 'JBL Charge 5',
            'jbl-charge-5-desc': 'Altavoz portátil sumergible con graves potentes y banco de energía.',
            'bose-soundlink-flex': 'Bose SoundLink Flex',
            'bose-soundlink-flex-desc': 'Altavoz Bluetooth portátil con diseño resistente y sonido nítido.',
            'marshall-stanmore-iii': 'Marshall Stanmore III',
            'marshall-stanmore-iii-desc': 'Altavoz doméstico con diseño icónico y sonido envolvente.',
            'harman-kardon-onyx-8': 'Harman Kardon Onyx Studio 8',
            'harman-kardon-onyx-8-desc': 'Altavoz inalámbrico premium con diseño elegante y sonido rico.',
            'anker-735-charger': 'Cargador Anker 735',
            'anker-735-charger-desc': 'Cargador GaNPrime 65W con 3 puertos para carga rápida de múltiples dispositivos.',
            'belkin-3-in-1': 'Belkin 3 en 1',
            'belkin-3-in-1-desc': 'Cargador MagSafe para iPhone, Apple Watch y AirPods simultáneamente.',
            'samsung-wireless-charger': 'Cargador Inalámbrico Samsung',
            'samsung-wireless-charger-desc': 'Base de carga inalámbrica rápida para Samsung y dispositivos compatibles con Qi.',
            'baseus-65w-charger': 'Cargador Baseus 65W',
            'baseus-65w-charger-desc': 'Cargador GaN compacto con 2 puertos USB-C y 1 USB-A.',
            'anker-powerline-iii': 'Anker Powerline III',
            'anker-powerline-iii-desc': 'Cable USB-C a USB-C duradero con soporte de carga rápida de 100W.',
            'macbook-pro-charger': 'Cargador MacBook Pro 140W',
            'macbook-pro-charger-desc': 'Adaptador de corriente USB-C oficial de Apple de 140W para carga rápida de MacBook Pro.',
            'dell-xps-charger': 'Cargador Dell XPS 130W',
            'dell-xps-charger-desc': 'Cargador USB-C oficial Dell 130W con carga rápida para laptops XPS.',
            'lenovo-thinkpad-charger': 'Cargador Lenovo ThinkPad 65W',
            'lenovo-thinkpad-charger-desc': 'Cargador USB-C para laptop con Power Delivery para ThinkPad y otras laptops.',
            'hp-laptop-charger': 'Cargador Inteligente HP 90W',
            'hp-laptop-charger-desc': 'Adaptador AC oficial HP 90W con Smart Pin para laptops HP.',
            'ugreen-100w-charger': 'Cargador UGREEN 100W',
            'ugreen-100w-charger-desc': 'Cargador GaN de alta potencia con 4 puertos para laptops y dispositivos.',
            'mophie-powerstation': 'Mophie Powerstation',
            'mophie-powerstation-desc': 'Banco de energía portátil con capacidad de 10.000mAh y carga rápida.',
            'anker-powercore': 'Anker PowerCore 26800',
            'anker-powercore-desc': 'Banco de energía de alta capacidad con 26.800mAh para cargas múltiples.',
            'nomad-wireless-hub': 'Nomad Wireless Hub',
            'nomad-wireless-hub-desc': 'Cargador inalámbrico premium con diseño metálico y superficie de cuero.',
            'pitaka-magez': 'Cargador Pitaka MagEZ',
            'pitaka-magez-desc': 'Cargador inalámbrico multidispositivo con diseño de fibra de aramida.',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'Cargador portátil con 30W PD para laptops y dispositivos.',
            'apple-watch-ultra-2': 'Apple Watch Ultra 2',
            'apple-watch-ultra-2-desc': 'Caja de titanio, pantalla de 49mm, GPS de doble frecuencia y hasta 36h de batería.',
            'apple-watch-series-9': 'Apple Watch Series 9',
            'apple-watch-series-9-desc': 'Chip S9, gesto de doble toque, pantalla más brillante y funciones avanzadas de salud.',
            'apple-watch-se': 'Apple Watch SE',
            'apple-watch-se-desc': 'Funciones esenciales, seguimiento de actividad y configuración familiar a precio asequible.',
            'samsung-watch-6-classic': 'Samsung Galaxy Watch 6 Classic',
            'samsung-watch-6-classic-desc': 'Bisel giratorio, cristal de zafiro, análisis de composición corporal y monitorización ECG.',
            'samsung-watch-6': 'Samsung Galaxy Watch 6',
            'samsung-watch-6-desc': 'Diseño delgado, pantalla brillante, seguimiento avanzado de sueño y Wear OS.',
            'samsung-watch-5-pro': 'Samsung Galaxy Watch 5 Pro',
            'samsung-watch-5-pro-desc': 'Cuerpo de titanio, cristal de zafiro, larga duración de batería y GPS avanzado.',
            'garmin-fenix-7': 'Garmin Fenix 7',
            'garmin-fenix-7-desc': 'Reloj GPS multideporte premium con carga solar y funciones avanzadas de entrenamiento.',
            'garmin-epix-pro': 'Garmin Epix Pro',
            'garmin-epix-pro-desc': 'Pantalla AMOLED, mapeo avanzado y seguimiento fitness premium.',
            'garmin-venu-3': 'Garmin Venu 3',
            'garmin-venu-3-desc': 'Pantalla AMOLED, monitoreo avanzado de salud y funciones de fitness.',
            'google-pixel-watch-2': 'Google Pixel Watch 2',
            'google-pixel-watch-2-desc': 'Integración Fitbit, gestión de estrés y Wear OS con Google Assistant.',
            'fossil-gen-6': 'Fossil Gen 6',
            'fossil-gen-6-desc': 'Wear OS, seguimiento de frecuencia cardíaca y diseño elegante con corona giratoria.',
            'withings-scanwatch': 'Withings ScanWatch',
            'withings-scanwatch-desc': 'Reloj híbrido con ECG, monitoreo de oxígeno en sangre y batería de 30 días.',
            'huawei-watch-gt-4': 'Huawei Watch GT 4',
            'huawei-watch-gt-4-desc': 'Larga duración de batería, seguimiento preciso de salud y diseño elegante.',
            'amazfit-gtr-4': 'Amazfit GTR 4',
            'amazfit-gtr-4-desc': 'Pantalla AMOLED, GPS de doble banda y batería increíble de hasta 24 días.',
            'ticwatch-pro-5': 'TicWatch Pro 5',
            'ticwatch-pro-5-desc': 'Pantalla de ultra bajo consumo, Snapdragon W5+ Gen 1 y sensores avanzados de salud.',
            'cart-title': 'Tu Carrito de Compras',
            'product': 'Producto',
            'price': 'Precio',
            'quantity': 'Cantidad',
            'total': 'Total',
            'action': 'Acción',
            'total-label': 'Total:',
            'continue': 'Seguir Comprando',
            'checkout': 'Finalizar Compra',
            'is-empty': 'está vacío',
            'payment-title': 'Pago',
            'order-summary': 'Resumen del Pedido',
            'payment-method': 'Seleccione Método de Pago',
            'card-payment': 'Pago con Tarjeta',
            'google-pay': 'Google Pay',
            'apple-pay': 'Apple Pay',
            'paypal': 'PayPal',
            'mbway': 'MB WAY',
            'card-details': 'Detalles de la Tarjeta',
            'card-number': 'Número de Tarjeta',
            'expiry': 'Fecha de Vencimiento',
            'cvv': 'CVV',
            'card-name': 'Nombre en la Tarjeta',
            'mbway-details': 'Pago MB WAY',
            'mbway-instruction': 'Introduzca su número de teléfono móvil para recibir la notificación de pago',
            'phone-number': 'Número de Teléfono',
            'googlepay-info': 'Será redirigido a Google Pay para completar su pago de forma segura.',
            'applepay-info': 'Será redirigido a Apple Pay para completar su pago de forma segura.',
            'paypal-info': 'Será redirigido a PayPal para completar su pago de forma segura.',
            'back-to-cart': '← Volver al Carrito',
            'pay-now': 'Pagar Ahora',
            'subtotal': 'Subtotal',
            'shipping': 'Envío',
            'select-payment': 'Por favor, seleccione un método de pago',
            'fill-card-details': 'Por favor, complete todos los detalles de la tarjeta',
            'enter-phone': 'Por favor, introduzca su número de teléfono',
            'payment-successful': 'Pago exitoso',
            'thank-you': '¡Gracias por su pedido!',
            'about-story-title': 'Nuestra Historia',
            'about-story-text': 'SNOWFALL fue fundada en 2024 con una misión simple: traer la última tecnología a los clientes a precios justos. Lo que comenzó como una pequeña pasión por los gadgets se ha convertido en un destino online de confianza para los entusiastas de la electrónica en todo el mundo.',
            'about-products-title': 'Lo Que Vendemos',
            'about-products-text': 'Nos especializamos en smartphones, portátiles, tablets, cámaras, consolas de juegos, auriculares, smartwatches y accesorios. Cada producto de nuestro catálogo está cuidadosamente seleccionado por su calidad y rendimiento.',
            'about-why-title': 'Por Qué Elegirnos',
            'about-why1': 'Últimos electrónicos a precios competitivos',
            'about-why2': 'Productos 100% genuinos con garantía',
            'about-why3': 'Envío rápido y seguro a todo el mundo',
            'about-why4': 'Soporte al cliente 24/7',
            'about-why5': 'Devoluciones y reembolsos fáciles',
            'about-promise-title': 'Nuestra Promesa',
            'about-promise-text': 'Su satisfacción es nuestra prioridad. Estamos comprometidos a brindar una experiencia de compra segura y agradable, desde la navegación hasta la entrega y más allá.',
            'delivery-title': 'Entrega Rápida y Confiable',
            'delivery-desc': 'Recibe tus productos rápida y seguramente en tu puerta.',
            'delivery-feature1': 'Entrega el mismo día / al día siguiente',
            'delivery-feature2': 'Envío mundial',
            'delivery-feature3': 'Seguimiento en tiempo real',
            'returns-title': 'Devoluciones y Reembolsos Fáciles',
            'returns-desc': 'Devoluciones sin problemas y reembolsos rápidos para su tranquilidad.',
            'returns-feature1': 'Política de devolución de 7 o 30 días',
            'returns-feature2': 'Devoluciones gratuitas',
            'returns-feature3': 'Procesamiento rápido de reembolsos',
            'payments-title': 'Pagos Seguros',
            'payments-desc': 'Sus transacciones están protegidas con seguridad de primer nivel.',
            'payments-feature1': 'Pago seguro SSL',
            'payments-feature2': 'Múltiples métodos de pago',
            'payments-feature3': 'Protección contra fraudes',
            'support-title': 'Soporte al Cliente 24/7',
            'support-desc': 'Siempre estamos aquí para ayudar con cualquier pregunta.',
            'support-feature1': 'Soporte por chat en vivo',
            'support-feature2': 'Soporte por correo electrónico',
            'support-feature3': 'Soporte telefónico',
            'warranty-title': 'Garantía del Producto',
            'warranty-desc': 'Todos los productos vienen con garantía para su protección.',
            'warranty-feature1': 'Garantía de 1 año',
            'warranty-feature2': 'Garantía de reemplazo',
            'warranty-feature3': 'Productos auténticos',
            'tracking-title': 'Seguimiento de Pedidos',
            'tracking-desc': 'Siga su paquete en cada paso hasta que llegue.',
            'tracking-feature1': 'Seguimiento desde el panel de cuenta',
            'tracking-feature2': 'Actualizaciones por SMS / correo electrónico',
            'tracking-feature3': 'Seguimiento en tiempo real',
            'contact-title': 'Contáctenos',
            'name-label': 'Nombre:',
            'email-label': 'Correo:',
            'message-label': 'Mensaje:',
            'send': 'Enviar',
            'rights': 'Todos los derechos reservados.',
            'currency': 'EUR',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'Dirección de Envío',
            'first-name': 'Nombre',
            'last-name': 'Apellido',
            'address-line1': 'Dirección Línea 1',
            'address-line2': 'Dirección Línea 2 (Opcional)',
            'city': 'Ciudad',
            'state': 'Estado / Provincia',
            'zip-code': 'Código Postal',
            'country': 'País',
            'phone': 'Número de Teléfono',
            'confirmation-email': 'Email para Confirmación del Pedido',
            'email-note': 'Enviaremos la confirmación del pedido y la información de seguimiento a este email',
            'save-address': 'Guardar esta dirección para pedidos futuros',
            'fill-shipping-details': 'Por favor, complete todos los detalles de envío',
            'valid-email': 'Por favor, ingrese un email válido'
        },
        
        // ===== FRENCH =====
        fr: {
            'home': 'Accueil',
            'products': 'Produits',
            'services': 'Services',
            'about': 'À propos',
            'contact': 'Contact',
            'welcome': 'BIENVENUE CHEZ SNOWFALL',
            'tagline': 'Votre lieu de confiance pour des produits de qualité',
            'home-text': 'Ceci est le site officiel de SNOWFALL.',
            'category': 'Catégorie',
            'mobile': 'Téléphone',
            'tablet': 'Tablettes & iPads',
            'laptop': 'Ordinateur',
            'camera': 'Appareil photo',
            'gaming': 'Gaming',
            'drones': 'Drones',
            'headphone': 'Casque & Haut-parleur',
            'charger': 'Chargeur',
            'watch': 'Montre',
            'featured-products': 'Nos Produits Vedettes',
            'featured': 'Produit Vedette',
            'featured-desc': 'Parcourez les produits en sélectionnant des catégories dans la barre latérale.',
            'add-to-cart': 'Ajouter au Panier',
            'iphone-15-pro': 'iPhone 15 Pro',
            'iphone-15-pro-desc': 'Dernier smartphone Apple avec puce A17 Pro, design en titane et système de caméra avancé.',
            'iphone-17': 'iPhone 17',
            'iphone-17-desc': 'Téléphone premium avec fonctionnalités d\'IA avancées et puissant processeur.',
            'iphone-16': 'iPhone 16',
            'iphone-16-desc': 'Smartphone alimenté par l\'IA avec caméra de première classe.',
            'iphone-14': 'iPhone 14',
            'iphone-14-desc': 'Smartphone puissant avec un excellent rapport qualité-prix.',
            'samsung-s24-ultra': 'Samsung Galaxy S24 Ultra',
            'samsung-s24-ultra-desc': 'Écran Dynamic AMOLED 2X, appareil photo 200MP et processeur Snapdragon 8 Gen 3.',
            'samsung-s25-ultra': 'Samsung Galaxy S25 Ultra',
            'samsung-s25-ultra-desc': 'Flagship de nouvelle génération avec fonctionnalités d\'IA révolutionnaires et technologie de caméra de pointe.',
            'samsung-z-fold-5': 'Samsung Galaxy Z Fold 5',
            'samsung-z-fold-5-desc': 'Écran pliable, puissance multitâche et design premium.',
            'samsung-z-flip-5': 'Samsung Galaxy Z Flip 5',
            'samsung-z-flip-5-desc': 'Pliable compact avec grand écran frontal et caméra polyvalente.',
            'google-pixel-8-pro': 'Google Pixel 8 Pro',
            'google-pixel-8-pro-desc': 'Fonctionnalités d\'IA avancées, appareil photo exceptionnel et expérience Android pure avec Tensor G3.',
            'google-pixel-10-pro': 'Google Pixel 10 Pro',
            'google-pixel-10-pro-desc': 'Capacités d\'IA de nouvelle génération avec puce Tensor G5 révolutionnaire et caméra innovante.',
            'oneplus-12': 'OnePlus 12',
            'oneplus-12-desc': 'Écran ProXDR 120Hz, charge rapide 100W et Snapdragon 8 Gen 3.',
            'oneplus-open': 'OnePlus Open',
            'oneplus-open-desc': 'Téléphone pliable avec spécifications haut de gamme et capacités multitâches.',
            'xiaomi-14-ultra': 'Xiaomi 14 Ultra',
            'xiaomi-14-ultra-desc': 'Appareils photo professionnels Leica, charge rapide 90W et technologie d\'écran impressionnante.',
            'xiaomi-13-pro': 'Xiaomi 13 Pro',
            'xiaomi-13-pro-desc': 'Système de caméra Leica, Snapdragon 8 Gen 2 et design premium.',
            'sony-xperia-1-vi': 'Sony Xperia 1 VI',
            'sony-xperia-1-vi-desc': 'Écran OLED 4K, système de caméra professionnel et excellence multimédia.',
            'nothing-phone-2': 'Nothing Phone 2',
            'nothing-phone-2-desc': 'Interface glyph unique, design épuré et expérience utilisateur innovante.',
            'ipad-pro-m2': 'iPad Pro 12.9" M2',
            'ipad-pro-m2-desc': 'Puce M2, écran Liquid Retina XDR, 5G et expérience de survol Apple Pencil.',
            'ipad-air-m1': 'iPad Air M1',
            'ipad-air-m1-desc': 'Puce M1, écran Liquid Retina 10.9", Touch ID et caméra frontale ultra grand-angle.',
            'ipad-10th-gen': 'iPad 10e Génération',
            'ipad-10th-gen-desc': 'Puce A14 Bionic, écran Liquid Retina 10.9", USB-C et caméra paysage.',
            'ipad-mini-6': 'iPad Mini 6',
            'ipad-mini-6-desc': 'Puce A15 Bionic, écran Liquid Retina 8.3", 5G et support Apple Pencil 2.',
            'samsung-tab-s9-ultra': 'Samsung Tab S9 Ultra',
            'samsung-tab-s9-ultra-desc': '14.6" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, résistance à l\'eau IP68.',
            'samsung-tab-s9-plus': 'Samsung Tab S9+',
            'samsung-tab-s9-plus-desc': '12.4" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 et expérience S Pen améliorée.',
            'samsung-tab-s9': 'Samsung Tab S9',
            'samsung-tab-s9-desc': '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2 et résistance à l\'eau IP67.',
            'surface-pro-9': 'Surface Pro 9',
            'surface-pro-9-desc': 'Écran tactile 13", plateforme Intel Evo, jusqu\'à 15.5h d\'autonomie.',
            'amazon-fire-max-11': 'Amazon Fire Max 11',
            'amazon-fire-max-11-desc': 'Écran 11", processeur octa-core et batterie longue durée.',
            'lenovo-tab-p12': 'Lenovo Tab P12',
            'lenovo-tab-p12-desc': 'Écran 3K 12.7", MediaTek Dimensity 7050 et haut-parleurs JBL.',
            'macbook-pro-16': 'MacBook Pro 16',
            'macbook-pro-16-desc': 'Puce M3 Pro, 36GB RAM, 1TB SSD et superbe écran Liquid Retina XDR.',
            'macbook-air-m2': 'MacBook Air M2',
            'macbook-air-m2-desc': 'Design ultra-fin, puce M2, autonomie d\'une journée et écran brillant.',
            'dell-xps-15': 'Dell XPS 15',
            'dell-xps-15-desc': 'Intel Core i9, 32GB RAM, NVIDIA RTX 4060 et écran OLED 4K.',
            'dell-xps-13': 'Dell XPS 13',
            'dell-xps-13-desc': 'Ordinateur portable premium ultra-portable avec écran InfinityEdge et Intel Core i7.',
            'lenovo-thinkpad-x1': 'Lenovo ThinkPad X1',
            'lenovo-thinkpad-x1-desc': 'Ordinateur professionnel avec Intel vPro, 32GB RAM et qualité de construction premium.',
            'asus-rog-zephyrus': 'ASUS ROG Zephyrus',
            'asus-rog-zephyrus-desc': 'PC gaming avec RTX 4080, écran 240Hz et refroidissement avancé.',
            'hp-spectre-x360': 'HP Spectre x360',
            'hp-spectre-x360-desc': 'Ordinateur convertible avec écran OLED, Intel Core i7 et design premium.',
            'microsoft-surface-laptop-5': 'Microsoft Surface Laptop 5',
            'microsoft-surface-laptop-5-desc': 'Design élégant, écran tactile et excellente portabilité.',
            'razer-blade-15': 'Razer Blade 15',
            'razer-blade-15-desc': 'PC gaming ultra-fin avec RTX 4070 et écran QHD 240Hz.',
            'acer-predator-helios': 'Acer Predator Helios',
            'acer-predator-helios-desc': 'PC gaming puissant avec refroidissement haute performance et clavier RGB.',
            'sony-a7-iv': 'Sony A7 IV',
            'sony-a7-iv-desc': 'Appareil photo mirrorless plein format avec capteur 33MP et enregistrement vidéo 4K 60p.',
            'sony-a1': 'Sony A1',
            'sony-a1-desc': 'Appareil flagship 50MP avec vidéo 8K, rafale 30fps et vitesse incroyable.',
            'sony-a7s-iii': 'Sony A7S III',
            'sony-a7s-iii-desc': 'Champion basse lumière avec capteur 12MP et vidéo 4K 120p pour professionnels.',
            'sony-zv-e1': 'Sony ZV-E1',
            'sony-zv-e1-desc': 'Appareil compact pour vlogging avec capteur plein format et autofocus IA.',
            'canon-eos-r5': 'Canon EOS R5',
            'canon-eos-r5-desc': 'Capteur plein format 45MP, vidéo RAW 8K et Dual Pixel AF II avancé.',
            'canon-eos-r6-ii': 'Canon EOS R6 Mark II',
            'canon-eos-r6-ii-desc': 'Capteur plein format 24MP, rafale 40fps et excellente performance basse lumière.',
            'canon-eos-r3': 'Canon EOS R3',
            'canon-eos-r3-desc': 'Appareil sport professionnel avec capteur empilé 24MP et AF contrôle oculaire.',
            'canon-eos-r100': 'Canon EOS R100',
            'canon-eos-r100-desc': 'Appareil mirrorless d\'entrée de gamme parfait pour débutants et créateurs.',
            'nikon-z8': 'Nikon Z8',
            'nikon-z8-desc': 'Puissance compacte avec capteur 45.7MP, vidéo 8K et caractéristiques flagship.',
            'nikon-z9': 'Nikon Z9',
            'nikon-z9-desc': 'Appareil professionnel flagship avec capteur CMOS empilé et vidéo 8K.',
            'nikon-z6-iii': 'Nikon Z6 III',
            'nikon-z6-iii-desc': 'Appareil plein format polyvalent avec capteur 24.5MP et enregistrement vidéo 6K.',
            'fujifilm-xt5': 'Fujifilm X-T5',
            'fujifilm-xt5-desc': 'Capteur APS-C 40MP avec simulations de film et design classique.',
            'fujifilm-x100vi': 'Fujifilm X100VI',
            'fujifilm-x100vi-desc': 'Appareil compact premium avec objectif fixe 23mm et capteur 40MP.',
            'fujifilm-gfx100-ii': 'Fujifilm GFX100 II',
            'fujifilm-gfx100-ii-desc': 'Appareil moyen format avec capteur 102MP et capacités vidéo 8K.',
            'panasonic-s5-ii': 'Panasonic Lumix S5 II',
            'panasonic-s5-ii-desc': 'Appareil hybride plein format avec AF détection de phase et vidéo 6K.',
            'ps5': 'PlayStation 5',
            'ps5-desc': 'SSD ultra-rapide, jeux 4K, retour haptique et gâchettes adaptatives.',
            'xbox-series-x': 'Xbox Series X',
            'xbox-series-x-desc': '12 téraflops, reprise rapide, jeux 4K et Game Pass ultimate.',
            'nintendo-switch-oled': 'Nintendo Switch OLED',
            'nintendo-switch-oled-desc': 'Écran OLED 7", couleurs vibrantes et modes de jeu polyvalents.',
            'logitech-g-pro-x': 'Logitech G Pro X',
            'logitech-g-pro-x-desc': 'Capteur Hero 25K, ultra-léger et performance professionnelle.',
            'razer-deathadder-v3': 'Razer DeathAdder V3',
            'razer-deathadder-v3-desc': 'Capteur Focus Pro 30K, interrupteurs optiques et design ergonomique.',
            'steelseries-apex-pro': 'SteelSeries Apex Pro',
            'steelseries-apex-pro-desc': 'Interrupteurs ajustables OmniPoint, écran OLED et repose-poignet magnétique.',
            'steelseries-arctis-nova-pro': 'SteelSeries Arctis Nova Pro',
            'steelseries-arctis-nova-pro-desc': 'Casque gaming premium avec réduction de bruit active et audio Hi-Res.',
            'xbox-elite-controller': 'Xbox Elite Controller Series 2',
            'xbox-elite-controller-desc': 'Joysticks à tension ajustable, poignée caoutchoutée.',
            'secretlab-titan-evo': 'Secretlab Titan Evo',
            'secretlab-titan-evo-desc': 'Chaise gaming premium avec oreiller magnétique et support lombaire 4 voies.',
            'alienware-aw3423dw': 'Alienware AW3423DW',
            'alienware-aw3423dw-desc': 'Moniteur gaming QD-OLED 34", 175Hz, G-Sync Ultimate.',
            'dji-mavic-3-pro': 'DJI Mavic 3 Pro',
            'dji-mavic-3-pro-desc': 'Système triple caméra, 46min de vol et détection omnidirectionnelle d\'obstacles.',
            'dji-air-3': 'DJI Air 3',
            'dji-air-3-desc': 'Caméras doubles, 46min de vol et détection 360° d\'obstacles.',
            'dji-mini-4-pro': 'DJI Mini 4 Pro',
            'dji-mini-4-pro-desc': 'Moins de 249g, 4K/60fps HDR, détection omnidirectionnelle d\'obstacles.',
            'dji-avata': 'DJI Avata',
            'dji-avata-desc': 'Drone FPV avec protections d\'hélices, stabilisation 4K et vol immersif.',
            'gopro-hero-12': 'GoPro Hero 12 Black',
            'gopro-hero-12-desc': 'Vidéo 5.3K, stabilisation HyperSmooth 6.0 et design étanche.',
            'dji-osmo-action-4': 'DJI Osmo Action 4',
            'dji-osmo-action-4-desc': 'Capteur 1/1.3", 4K/120fps, stabilisation RockSteady 3.0.',
            'insta360-x3': 'Insta360 X3',
            'insta360-x3-desc': 'Vidéo 360° 5.7K, photos 72MP et effet de perche selfie invisible.',
            'dji-osmo-mobile-6': 'DJI Osmo Mobile 6',
            'dji-osmo-mobile-6-desc': 'Stabilisateur pour smartphone avec perche intégrée et ActiveTrack 5.0.',
            'dji-goggles-2': 'DJI Goggles 2',
            'dji-goggles-2-desc': 'Écrans Micro-OLED, 1080p et transmission faible latence.',
            'dji-fly-more-kit': 'DJI Fly More Kit',
            'dji-fly-more-kit-desc': 'Batteries supplémentaires, station de charge, hélices et sac de transport.',
            'sony-wh-1000xm5': 'Sony WH-1000XM5',
            'sony-wh-1000xm5-desc': 'Réduction de bruit leader avec qualité sonore exceptionnelle.',
            'bose-qc-45': 'Bose QuietComfort 45',
            'bose-qc-45-desc': 'Casque premium avec réduction de bruit et design confortable.',
            'airpods-max': 'Apple AirPods Max',
            'airpods-max-desc': 'Casque circum-auriculaire avec audio computationnel et écosystème intégré.',
            'sennheiser-momentum-4': 'Sennheiser Momentum 4',
            'sennheiser-momentum-4-desc': 'Casque sans fil audiophile avec son exceptionnel.',
            'beyerdynamic-dt-990': 'Beyerdynamic DT 990 Pro',
            'beyerdynamic-dt-990-desc': 'Casque de studio avec design ouvert pour usage professionnel.',
            'sonos-move-2': 'Sonos Move 2',
            'sonos-move-2-desc': 'Enceinte intelligente portable avec son puissant et Wi-Fi/Bluetooth.',
            'jbl-charge-5': 'JBL Charge 5',
            'jbl-charge-5-desc': 'Enceinte portable étanche avec basses puissantes et batterie externe.',
            'bose-soundlink-flex': 'Bose SoundLink Flex',
            'bose-soundlink-flex-desc': 'Enceinte Bluetooth portable avec design robuste et son clair.',
            'marshall-stanmore-iii': 'Marshall Stanmore III',
            'marshall-stanmore-iii-desc': 'Enceinte domestique au design iconique et son immersif.',
            'harman-kardon-onyx-8': 'Harman Kardon Onyx Studio 8',
            'harman-kardon-onyx-8-desc': 'Enceinte sans fil premium au design élégant et son riche.',
            'anker-735-charger': 'Chargeur Anker 735',
            'anker-735-charger-desc': 'Chargeur GaNPrime 65W avec 3 ports pour charge rapide de plusieurs appareils.',
            'belkin-3-in-1': 'Belkin 3-en-1',
            'belkin-3-in-1-desc': 'Chargeur MagSafe pour iPhone, Apple Watch et AirPods simultanément.',
            'samsung-wireless-charger': 'Chargeur Sans Fil Samsung',
            'samsung-wireless-charger-desc': 'Station de charge sans fil rapide pour Samsung et appareils compatibles Qi.',
            'baseus-65w-charger': 'Chargeur Baseus 65W',
            'baseus-65w-charger-desc': 'Chargeur GaN compact avec 2 ports USB-C et 1 USB-A.',
            'anker-powerline-iii': 'Anker Powerline III',
            'anker-powerline-iii-desc': 'Câble USB-C vers USB-C durable avec support charge rapide 100W.',
            'macbook-pro-charger': 'Chargeur MacBook Pro 140W',
            'macbook-pro-charger-desc': 'Adaptateur secteur USB-C officiel Apple 140W pour charge rapide MacBook Pro.',
            'dell-xps-charger': 'Chargeur Dell XPS 130W',
            'dell-xps-charger-desc': 'Chargeur USB-C officiel Dell 130W avec charge rapide pour laptops XPS.',
            'lenovo-thinkpad-charger': 'Chargeur Lenovo ThinkPad 65W',
            'lenovo-thinkpad-charger-desc': 'Chargeur USB-C pour laptop avec Power Delivery pour ThinkPad et autres laptops.',
            'hp-laptop-charger': 'Chargeur Intelligent HP 90W',
            'hp-laptop-charger-desc': 'Adaptateur AC officiel HP 90W avec Smart Pin pour laptops HP.',
            'ugreen-100w-charger': 'Chargeur UGREEN 100W',
            'ugreen-100w-charger-desc': 'Chargeur GaN haute puissance avec 4 ports pour laptops et appareils.',
            'mophie-powerstation': 'Mophie Powerstation',
            'mophie-powerstation-desc': 'Banque d\'alimentation portable avec capacité 10 000mAh et charge rapide.',
            'anker-powercore': 'Anker PowerCore 26800',
            'anker-powercore-desc': 'Banque d\'alimentation haute capacité 26 800mAh pour charges multiples.',
            'nomad-wireless-hub': 'Nomad Wireless Hub',
            'nomad-wireless-hub-desc': 'Chargeur sans fil premium avec design métallique et surface cuir.',
            'pitaka-magez': 'Chargeur Pitaka MagEZ',
            'pitaka-magez-desc': 'Chargeur sans fil multi-appareils avec design fibre d\'aramide.',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'Chargeur portable avec 30W PD pour laptops et appareils.',
            'apple-watch-ultra-2': 'Apple Watch Ultra 2',
            'apple-watch-ultra-2-desc': 'Boîtier titane, écran 49mm, GPS double fréquence et jusqu\'à 36h d\'autonomie.',
            'apple-watch-series-9': 'Apple Watch Series 9',
            'apple-watch-series-9-desc': 'Puce S9, geste double tap, écran plus lumineux et fonctions santé avancées.',
            'apple-watch-se': 'Apple Watch SE',
            'apple-watch-se-desc': 'Fonctions essentielles, suivi d\'activité et configuration familiale à prix abordable.',
            'samsung-watch-6-classic': 'Samsung Galaxy Watch 6 Classic',
            'samsung-watch-6-classic-desc': 'Lunette rotative, verre saphir, analyse composition corporelle et surveillance ECG.',
            'samsung-watch-6': 'Samsung Galaxy Watch 6',
            'samsung-watch-6-desc': 'Design fin, écran lumineux, suivi avancé du sommeil et Wear OS.',
            'samsung-watch-5-pro': 'Samsung Galaxy Watch 5 Pro',
            'samsung-watch-5-pro-desc': 'Boîtier titane, verre saphir, longue autonomie et GPS avancé.',
            'garmin-fenix-7': 'Garmin Fenix 7',
            'garmin-fenix-7-desc': 'Montre GPS multisport premium avec charge solaire et fonctions d\'entraînement avancées.',
            'garmin-epix-pro': 'Garmin Epix Pro',
            'garmin-epix-pro-desc': 'Écran AMOLED, cartographie avancée et suivi fitness premium.',
            'garmin-venu-3': 'Garmin Venu 3',
            'garmin-venu-3-desc': 'Écran AMOLED, surveillance avancée de la santé et fonctions fitness.',
            'google-pixel-watch-2': 'Google Pixel Watch 2',
            'google-pixel-watch-2-desc': 'Intégration Fitbit, gestion du stress et Wear OS avec Google Assistant.',
            'fossil-gen-6': 'Fossil Gen 6',
            'fossil-gen-6-desc': 'Wear OS, suivi fréquence cardiaque et design élégant avec couronne rotative.',
            'withings-scanwatch': 'Withings ScanWatch',
            'withings-scanwatch-desc': 'Montre hybride avec ECG, surveillance oxygène sanguin et batterie 30 jours.',
            'huawei-watch-gt-4': 'Huawei Watch GT 4',
            'huawei-watch-gt-4-desc': 'Longue autonomie, suivi santé précis et design élégant.',
            'amazfit-gtr-4': 'Amazfit GTR 4',
            'amazfit-gtr-4-desc': 'Écran AMOLED, GPS double bande et autonomie incroyable jusqu\'à 24 jours.',
            'ticwatch-pro-5': 'TicWatch Pro 5',
            'ticwatch-pro-5-desc': 'Écran ultra basse consommation, Snapdragon W5+ Gen 1 et capteurs santé avancés.',
            'cart-title': 'Votre Panier',
            'product': 'Produit',
            'price': 'Prix',
            'quantity': 'Quantité',
            'total': 'Total',
            'action': 'Action',
            'total-label': 'Total:',
            'continue': 'Continuer',
            'checkout': 'Commander',
            'is-empty': 'est vide',
            'payment-title': 'Paiement',
            'order-summary': 'Résumé de la Commande',
            'payment-method': 'Sélectionnez le Mode de Paiement',
            'card-payment': 'Paiement par Carte',
            'google-pay': 'Google Pay',
            'apple-pay': 'Apple Pay',
            'paypal': 'PayPal',
            'mbway': 'MB WAY',
            'card-details': 'Détails de la Carte',
            'card-number': 'Numéro de Carte',
            'expiry': 'Date d\'Expiration',
            'cvv': 'CVV',
            'card-name': 'Nom sur la Carte',
            'mbway-details': 'Paiement MB WAY',
            'mbway-instruction': 'Entrez votre numéro de téléphone mobile pour recevoir la notification de paiement',
            'phone-number': 'Numéro de Téléphone',
            'googlepay-info': 'Vous serez redirigé vers Google Pay pour compléter votre paiement en toute sécurité.',
            'applepay-info': 'Vous serez redirigé vers Apple Pay pour compléter votre paiement en toute sécurité.',
            'paypal-info': 'Vous serez redirigé vers PayPal pour compléter votre paiement en toute sécurité.',
            'back-to-cart': '← Retour au Panier',
            'pay-now': 'Payer Maintenant',
            'subtotal': 'Sous-total',
            'shipping': 'Livraison',
            'select-payment': 'Veuillez sélectionner un mode de paiement',
            'fill-card-details': 'Veuillez remplir tous les détails de la carte',
            'enter-phone': 'Veuillez entrer votre numéro de téléphone',
            'payment-successful': 'Paiement réussi',
            'thank-you': 'Merci pour votre commande !',
            'about-story-title': 'Notre Histoire',
            'about-story-text': 'SNOWFALL a été fondée en 2024 avec une mission simple : apporter les dernières technologies aux clients à des prix équitables. Ce qui a commencé comme une petite passion pour les gadgets est devenu une destination en ligne de confiance pour les passionnés d\'électronique du monde entier.',
            'about-products-title': 'Ce Que Nous Vendons',
            'about-products-text': 'Nous sommes spécialisés dans les smartphones, ordinateurs portables, tablettes, appareils photo, consoles de jeux, casques, montres connectées et accessoires. Chaque produit de notre catalogue est soigneusement sélectionné pour sa qualité et ses performances.',
            'about-why-title': 'Pourquoi Nous Choisir',
            'about-why1': 'Derniers appareils électroniques à prix compétitifs',
            'about-why2': 'Produits 100% authentiques avec garantie',
            'about-why3': 'Expédition rapide et sécurisée dans le monde entier',
            'about-why4': 'Support client 24/7',
            'about-why5': 'Retours et remboursements faciles',
            'about-promise-title': 'Notre Promesse',
            'about-promise-text': 'Votre satisfaction est notre priorité. Nous nous engageons à offrir une expérience d\'achat sûre et agréable, de la navigation à la livraison et au-delà.',
            'delivery-title': 'Livraison Rapide et Fiable',
            'delivery-desc': 'Recevez vos produits rapidement et en toute sécurité à votre porte.',
            'delivery-feature1': 'Livraison le jour même / le lendemain',
            'delivery-feature2': 'Expédition dans le monde entier',
            'delivery-feature3': 'Suivi en temps réel',
            'returns-title': 'Retours et Remboursements Faciles',
            'returns-desc': 'Retours sans tracas et remboursements rapides pour votre tranquillité d\'esprit.',
            'returns-feature1': 'Politique de retour de 7 ou 30 jours',
            'returns-feature2': 'Retours gratuits',
            'returns-feature3': 'Traitement rapide des remboursements',
            'payments-title': 'Paiements Sécurisés',
            'payments-desc': 'Vos transactions sont protégées par une sécurité de pointe.',
            'payments-feature1': 'Paiement sécurisé SSL',
            'payments-feature2': 'Plusieurs méthodes de paiement',
            'payments-feature3': 'Protection contre la fraude',
            'support-title': 'Support Client 24/7',
            'support-desc': 'Nous sommes toujours là pour vous aider avec vos questions.',
            'support-feature1': 'Support par chat en direct',
            'support-feature2': 'Support par e-mail',
            'support-feature3': 'Support téléphonique',
            'warranty-title': 'Garantie Produit',
            'warranty-desc': 'Tous les produits sont couverts par une garantie pour votre protection.',
            'warranty-feature1': 'Garantie d\'un an',
            'warranty-feature2': 'Garantie de remplacement',
            'warranty-feature3': 'Produits authentiques',
            'tracking-title': 'Suivi de Commande',
            'tracking-desc': 'Suivez votre colis à chaque étape jusqu\'à son arrivée.',
            'tracking-feature1': 'Suivi depuis votre tableau de bord',
            'tracking-feature2': 'Mises à jour par SMS / e-mail',
            'tracking-feature3': 'Suivi en temps réel',
            'contact-title': 'Contactez-nous',
            'name-label': 'Nom:',
            'email-label': 'E-mail:',
            'message-label': 'Message:',
            'send': 'Envoyer',
            'rights': 'Tous droits réservés.',
            'currency': 'EUR',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'Adresse de Livraison',
            'first-name': 'Prénom',
            'last-name': 'Nom',
            'address-line1': 'Adresse Ligne 1',
            'address-line2': 'Adresse Ligne 2 (Optionnel)',
            'city': 'Ville',
            'state': 'État / Province',
            'zip-code': 'Code Postal',
            'country': 'Pays',
            'phone': 'Numéro de Téléphone',
            'confirmation-email': 'Email de Confirmation de Commande',
            'email-note': 'Nous enverrons la confirmation de votre commande et les informations de suivi à cet email',
            'save-address': 'Enregistrer cette adresse pour les commandes futures',
            'fill-shipping-details': 'Veuillez remplir tous les détails d\'expédition',
            'valid-email': 'Veuillez entrer un email valide'
        },
        
        // ===== BENGALI =====
        bn: {
            'home': 'হোম',
            'products': 'পণ্য',
            'services': 'সেবা',
            'about': 'সম্পর্কে',
            'contact': 'যোগাযোগ',
            'welcome': 'স্‌নোফলে স্বাগতম',
            'tagline': 'গুণগত পণ্যের জন্য আপনার বিশ্বস্ত স্থান',
            'home-text': 'এটি স্‌নোফলের অফিসিয়াল ওয়েবসাইট।',
            'category': 'বিভাগ',
            'mobile': 'মোবাইল',
            'tablet': 'ট্যাবলেট ও আইপ্যাড',
            'laptop': 'ল্যাপটপ',
            'camera': 'ক্যামেরা',
            'gaming': 'গেমিং',
            'drones': 'ড্রোন',
            'headphone': 'হেডফোন ও স্পিকার',
            'charger': 'চার্জার',
            'watch': 'ঘড়ি',
            'featured-products': 'আমাদের বৈশিষ্ট্যযুক্ত পণ্য',
            'featured': 'বৈশিষ্ট্যযুক্ত পণ্য',
            'featured-desc': 'সাইডবার থেকে বিভাগ নির্বাচন করে পণ্য ব্রাউজ করুন।',
            'add-to-cart': 'কার্টে যোগ করুন',
            'iphone-15-pro': 'আইফোন 15 প্রো',
            'iphone-15-pro-desc': 'A17 Pro চিপ, টাইটানিয়াম ডিজাইন এবং উন্নত ক্যামেরা সিস্টেম সহ সর্বশেষ অ্যাপল স্মার্টফোন।',
            'iphone-17': 'আইফোন 17',
            'iphone-17-desc': 'উন্নত AI বৈশিষ্ট্য এবং শক্তিশালী প্রসেসর সহ প্রিমিয়াম ফোন।',
            'iphone-16': 'আইফোন 16',
            'iphone-16-desc': 'AI চালিত স্মার্টফোন উন্নত ফিচার এবং সেরা ক্যামেরা সহ।',
            'iphone-14': 'আইফোন 14',
            'iphone-14-desc': 'দুর্দান্ত মানের শক্তিশালী স্মার্টফোন।',
            'samsung-s24-ultra': 'স্যামসাং গ্যালাক্সি S24 আল্ট্রা',
            'samsung-s24-ultra-desc': 'ডায়নামিক AMOLED 2X ডিসপ্লে, 200MP ক্যামেরা এবং স্ন্যাপড্রাগন 8 জেন 3 প্রসেসর।',
            'samsung-s25-ultra': 'স্যামসাং গ্যালাক্সি S25 আল্ট্রা',
            'samsung-s25-ultra-desc': 'বিপ্লবী AI বৈশিষ্ট্য এবং অত্যাধুনিক ক্যামেরা প্রযুক্তি সহ পরবর্তী প্রজন্মের ফ্ল্যাগশিপ।',
            'samsung-z-fold-5': 'স্যামসাং গ্যালাক্সি জেড ফোল্ড 5',
            'samsung-z-fold-5-desc': 'ভাঁজযোগ্য ডিসপ্লে, মাল্টিটাস্কিং পাওয়ারহাউস এবং প্রিমিয়াম ডিজাইন।',
            'samsung-z-flip-5': 'স্যামসাং গ্যালাক্সি জেড ফ্লিপ 5',
            'samsung-z-flip-5-desc': 'বড় কভার স্ক্রিন এবং বহুমুখী ক্যামেরা সহ কমপ্যাক্ট ভাঁজযোগ্য ফোন।',
            'google-pixel-8-pro': 'গুগল পিক্সেল 8 প্রো',
            'google-pixel-8-pro-desc': 'উন্নত AI বৈশিষ্ট্য, ব্যতিক্রমী ক্যামেরা এবং টেনসর G3 সহ খাঁটি অ্যান্ড্রয়েড অভিজ্ঞতা।',
            'google-pixel-10-pro': 'গুগল পিক্সেল 10 প্রো',
            'google-pixel-10-pro-desc': 'বিপ্লবী টেনসর G5 চিপ এবং যুগান্তকারী ক্যামেরা সহ পরবর্তী প্রজন্মের AI ক্ষমতা।',
            'oneplus-12': 'ওয়ানপ্লাস 12',
            'oneplus-12-desc': '120Hz ProXDR ডিসপ্লে, 100W ফাস্ট চার্জিং এবং স্ন্যাপড্রাগন 8 জেন 3।',
            'oneplus-open': 'ওয়ানপ্লাস ওপেন',
            'oneplus-open-desc': 'ফ্ল্যাগশিপ স্পেস এবং মাল্টিটাস্কিং ক্ষমতা সহ ভাঁজযোগ্য ফোন।',
            'xiaomi-14-ultra': 'শাওমি 14 আল্ট্রা',
            'xiaomi-14-ultra-desc': 'লাইকা প্রফেশনাল ক্যামেরা, 90W ফাস্ট চার্জিং এবং চমৎকার ডিসপ্লে প্রযুক্তি।',
            'xiaomi-13-pro': 'শাওমি 13 প্রো',
            'xiaomi-13-pro-desc': 'লাইকা ক্যামেরা সিস্টেম, স্ন্যাপড্রাগন 8 জেন 2 এবং প্রিমিয়াম ডিজাইন।',
            'sony-xperia-1-vi': 'সনি এক্সপেরিয়া 1 VI',
            'sony-xperia-1-vi-desc': '4K OLED ডিসপ্লে, প্রফেশনাল ক্যামেরা সিস্টেম এবং মাল্টিমিডিয়া এক্সিলেন্স।',
            'nothing-phone-2': 'নাথিং ফোন 2',
            'nothing-phone-2-desc': 'অনন্য গ্লিফ ইন্টারফেস, পরিষ্কার ডিজাইন এবং উদ্ভাবনী ব্যবহারকারীর অভিজ্ঞতা।',
            'ipad-pro-m2': 'আইপ্যাড প্রো 12.9" M2',
            'ipad-pro-m2-desc': 'M2 চিপ, লিকুইড রেটিনা XDR ডিসপ্লে, 5G এবং অ্যাপল পেন্সিল হোভার অভিজ্ঞতা।',
            'ipad-air-m1': 'আইপ্যাড এয়ার M1',
            'ipad-air-m1-desc': 'M1 চিপ, 10.9" লিকুইড রেটিনা ডিসপ্লে, টাচ আইডি এবং আল্ট্রা-ওয়াইড ফ্রন্ট ক্যামেরা।',
            'ipad-10th-gen': 'আইপ্যাড 10ম জেনারেশন',
            'ipad-10th-gen-desc': 'A14 বায়োনিক চিপ, 10.9" লিকুইড রেটিনা ডিসপ্লে, USB-C এবং ল্যান্ডস্কেপ ক্যামেরা।',
            'ipad-mini-6': 'আইপ্যাড মিনি 6',
            'ipad-mini-6-desc': 'A15 বায়োনিক চিপ, 8.3" লিকুইড রেটিনা ডিসপ্লে, 5G এবং অ্যাপল পেন্সিল 2 সাপোর্ট।',
            'samsung-tab-s9-ultra': 'স্যামসাং ট্যাব S9 আল্ট্রা',
            'samsung-tab-s9-ultra-desc': '14.6" ডায়নামিক AMOLED 2X, স্ন্যাপড্রাগন 8 জেন 2, IP68 জল প্রতিরোধ।',
            'samsung-tab-s9-plus': 'স্যামসাং ট্যাব S9+',
            'samsung-tab-s9-plus-desc': '12.4" ডায়নামিক AMOLED 2X, স্ন্যাপড্রাগন 8 জেন 2 এবং উন্নত S পেন অভিজ্ঞতা।',
            'samsung-tab-s9': 'স্যামসাং ট্যাব S9',
            'samsung-tab-s9-desc': '11" ডায়নামিক AMOLED 2X, স্ন্যাপড্রাগন 8 জেন 2 এবং IP67 জল প্রতিরোধ।',
            'surface-pro-9': 'সারফেস প্রো 9',
            'surface-pro-9-desc': '13" টাচস্ক্রিন, ইন্টেল ইভো প্ল্যাটফর্ম, 15.5 ঘন্টা ব্যাটারি লাইফ।',
            'amazon-fire-max-11': 'আমাজন ফায়ার ম্যাক্স 11',
            'amazon-fire-max-11-desc': '11" ডিসপ্লে, অক্টা-কোর প্রসেসর এবং সারাদিনের ব্যাটারি লাইফ।',
            'lenovo-tab-p12': 'লেনোভো ট্যাব P12',
            'lenovo-tab-p12-desc': '12.7" 3K ডিসপ্লে, মিডিয়াটেক ডাইমেনসিটি 7050 এবং JBL স্পিকার।',
            'macbook-pro-16': 'ম্যাকবুক প্রো 16',
            'macbook-pro-16-desc': 'M3 প্রো চিপ, 36GB RAM, 1TB SSD এবং চমৎকার লিকুইড রেটিনা XDR ডিসপ্লে।',
            'macbook-air-m2': 'ম্যাকবুক এয়ার M2',
            'macbook-air-m2-desc': 'আল্ট্রা-থিন ডিজাইন, M2 চিপ, সারাদিনের ব্যাটারি লাইফ এবং উজ্জ্বল ডিসপ্লে।',
            'dell-xps-15': 'ডেল XPS 15',
            'dell-xps-15-desc': 'ইন্টেল কোর i9, 32GB RAM, এনভিডিয়া RTX 4060 এবং 4K OLED ডিসপ্লে।',
            'dell-xps-13': 'ডেল XPS 13',
            'dell-xps-13-desc': 'আল্ট্রা-পোর্টেবল প্রিমিয়াম ল্যাপটপ ইনফিনিটি এজ ডিসপ্লে এবং ইন্টেল কোর i7 সহ।',
            'lenovo-thinkpad-x1': 'লেনোভো থিংকপ্যাড X1',
            'lenovo-thinkpad-x1-desc': 'ব্যবসায়িক ল্যাপটপ ইন্টেল vPro, 32GB RAM এবং প্রিমিয়াম বিল্ড কোয়ালিটি সহ।',
            'asus-rog-zephyrus': 'ASUS ROG জেফিরাস',
            'asus-rog-zephyrus-desc': 'গেমিং ল্যাপটপ RTX 4080, 240Hz ডিসপ্লে এবং অ্যাডভান্সড কুলিং সহ।',
            'hp-spectre-x360': 'HP স্পেক্টার x360',
            'hp-spectre-x360-desc': 'কনভার্টিবল ল্যাপটপ OLED ডিসপ্লে, ইন্টেল কোর i7 এবং প্রিমিয়াম ডিজাইন সহ।',
            'microsoft-surface-laptop-5': 'মাইক্রোসফট সারফেস ল্যাপটপ 5',
            'microsoft-surface-laptop-5-desc': 'এলিগেন্ট ডিজাইন, টাচস্ক্রিন ডিসপ্লে এবং চমৎকার পোর্টেবিলিটি।',
            'razer-blade-15': 'রেজার ব্লেড 15',
            'razer-blade-15-desc': 'আল্ট্রা-স্লিম গেমিং ল্যাপটপ RTX 4070 এবং 240Hz QHD ডিসপ্লে সহ।',
            'acer-predator-helios': 'এসার প্রিডেটর হেলিওস',
            'acer-predator-helios-desc': 'পাওয়ারফুল গেমিং ল্যাপটপ হাই-পারফরম্যান্স কুলিং এবং RGB কিবোর্ড সহ।',
            'sony-a7-iv': 'সনি A7 IV',
            'sony-a7-iv-desc': 'ফুল-ফ্রেম মিররলেস ক্যামেরা 33MP সেন্সর এবং 4K 60p ভিডিও রেকর্ডিং সহ।',
            'sony-a1': 'সনি A1',
            'sony-a1-desc': 'ফ্ল্যাগশিপ 50MP ক্যামেরা 8K ভিডিও, 30fps বার্স্ট শুটিং এবং অবিশ্বাস্য গতি সহ।',
            'sony-a7s-iii': 'সনি A7S III',
            'sony-a7s-iii-desc': 'লো-লাইট চ্যাম্পিয়ন 12MP সেন্সর এবং পেশাদারদের জন্য 4K 120p ভিডিও সহ।',
            'sony-zv-e1': 'সনি ZV-E1',
            'sony-zv-e1-desc': 'কম্প্যাক্ট ভ্লগিং ক্যামেরা ফুল-ফ্রেম সেন্সর এবং AI অটোফোকাস সহ।',
            'canon-eos-r5': 'ক্যানন EOS R5',
            'canon-eos-r5-desc': '45MP ফুল-ফ্রেম সেন্সর, 8K RAW ভিডিও এবং অ্যাডভান্সড ডুয়াল পিক্সেল AF II।',
            'canon-eos-r6-ii': 'ক্যানন EOS R6 মার্ক II',
            'canon-eos-r6-ii-desc': '24MP ফুল-ফ্রেম সেন্সর, 40fps বার্স্ট এবং চমৎকার লো-লাইট পারফরম্যান্স।',
            'canon-eos-r3': 'ক্যানন EOS R3',
            'canon-eos-r3-desc': 'পেশাদার স্পোর্টস ক্যামেরা 24MP স্ট্যাকড সেন্সর এবং আই-কন্ট্রোল AF সহ।',
            'canon-eos-r100': 'ক্যানন EOS R100',
            'canon-eos-r100-desc': 'এন্ট্রি-লেভেল মিররলেস ক্যামেরা শিক্ষানবিস এবং কন্টেন্ট ক্রিয়েটরদের জন্য উপযুক্ত।',
            'nikon-z8': 'নিকন Z8',
            'nikon-z8-desc': 'কম্প্যাক্ট পাওয়ারহাউস 45.7MP সেন্সর, 8K ভিডিও এবং ফ্ল্যাগশিপ বৈশিষ্ট্য সহ।',
            'nikon-z9': 'নিকন Z9',
            'nikon-z9-desc': 'ফ্ল্যাগশিপ পেশাদার ক্যামেরা স্ট্যাকড CMOS সেন্সর এবং 8K ভিডিও সহ।',
            'nikon-z6-iii': 'নিকন Z6 III',
            'nikon-z6-iii-desc': 'বহুমুখী ফুল-ফ্রেম ক্যামেরা 24.5MP সেন্সর এবং 6K ভিডিও রেকর্ডিং সহ।',
            'fujifilm-xt5': 'ফুজিফিল্ম X-T5',
            'fujifilm-xt5-desc': '40MP APS-C সেন্সর ফিল্ম সিমুলেশন এবং ক্লাসিক ডায়াল ডিজাইন সহ।',
            'fujifilm-x100vi': 'ফুজিফিল্ম X100VI',
            'fujifilm-x100vi-desc': 'প্রিমিয়াম কম্প্যাক্ট ক্যামেরা ফিক্সড 23mm লেন্স এবং 40MP সেন্সর সহ।',
            'fujifilm-gfx100-ii': 'ফুজিফিল্ম GFX100 II',
            'fujifilm-gfx100-ii-desc': 'মিডিয়াম ফরম্যাট ক্যামেরা 102MP সেন্সর এবং 8K ভিডিও ক্ষমতা সহ।',
            'panasonic-s5-ii': 'পানাসনিক লুমিক্স S5 II',
            'panasonic-s5-ii-desc': 'ফুল-ফ্রেম হাইব্রিড ক্যামেরা ফেজ ডিটেকশন AF এবং 6K ভিডিও সহ।',
            'ps5': 'প্লেস্টেশন 5',
            'ps5-desc': 'আল্ট্রা-ফাস্ট SSD, 4K গেমিং, হ্যাপটিক ফিডব্যাক এবং অ্যাডাপ্টিভ ট্রিগার।',
            'xbox-series-x': 'এক্সবক্স সিরিজ X',
            'xbox-series-x-desc': '12 টেরাফ্লপস, কুইক রিজিউম, 4K গেমিং এবং গেম পাস আল্টিমেট।',
            'nintendo-switch-oled': 'নিন্টেন্ডো সুইচ OLED',
            'nintendo-switch-oled-desc': '7" OLED স্ক্রিন, ভাইব্রেন্ট কালার এবং বহুমুখী গেমিং মোড।',
            'logitech-g-pro-x': 'লজিটেক G প্রো X',
            'logitech-g-pro-x-desc': 'হিরো 25K সেন্সর, আল্ট্রা-লাইটওয়েট এবং প্রো-গ্রেড পারফরম্যান্স।',
            'razer-deathadder-v3': 'রেজার ডেথএডার V3',
            'razer-deathadder-v3-desc': 'ফোকাস প্রো 30K সেন্সর, অপটিক্যাল সুইচ এবং এরগোনমিক ডিজাইন।',
            'steelseries-apex-pro': 'স্টিলসিরিজ অ্যাপেক্স প্রো',
            'steelseries-apex-pro-desc': 'অমনিপয়েন্ট অ্যাডজাস্টেবল সুইচ, OLED ডিসপ্লে এবং ম্যাগনেটিক রিস্ট রেস্ট।',
            'steelseries-arctis-nova-pro': 'স্টিলসিরিজ আর্কটিস নোভা প্রো',
            'steelseries-arctis-nova-pro-desc': 'প্রিমিয়াম গেমিং হেডসেট অ্যাক্টিভ নয়েজ ক্যান্সেলেশন এবং হাই-রেস অডিও সহ।',
            'xbox-elite-controller': 'এক্সবক্স এলিট কন্ট্রোলার সিরিজ 2',
            'xbox-elite-controller-desc': 'অ্যাডজাস্টেবল টেনশন থাম্বস্টিক, রাবারাইজড গ্রিপ।',
            'secretlab-titan-evo': 'সিক্রেটল্যাব টাইটান ইভো',
            'secretlab-titan-evo-desc': 'প্রিমিয়াম গেমিং চেয়ার ম্যাগনেটিক হেড পিলো এবং 4-ওয়ে লাম্বার সাপোর্ট সহ।',
            'alienware-aw3423dw': 'এলিয়েনওয়্যার AW3423DW',
            'alienware-aw3423dw-desc': '34" QD-OLED গেমিং মনিটর, 175Hz রিফ্রেশ রেট, জি-সিঙ্ক আল্টিমেট।',
            'dji-mavic-3-pro': 'ডিজেআই ম্যাভিক 3 প্রো',
            'dji-mavic-3-pro-desc': 'ট্রিপল-ক্যামেরা সিস্টেম, 46 মিনিট ফ্লাইট টাইম এবং সর্বদিকের বাধা সনাক্তকরণ।',
            'dji-air-3': 'ডিজেআই এয়ার 3',
            'dji-air-3-desc': 'ডুয়াল-প্রাইমারি ক্যামেরা, 46 মিনিট ফ্লাইট টাইম এবং 360° বাধা সনাক্তকরণ।',
            'dji-mini-4-pro': 'ডিজেআই মিনি 4 প্রো',
            'dji-mini-4-pro-desc': '249g এর নিচে, 4K/60fps HDR, সর্বদিকের বাধা সনাক্তকরণ।',
            'dji-avata': 'ডিজেআই অবাটা',
            'dji-avata-desc': 'FPV ড্রোন প্রপেলার গার্ড, 4K স্টেবিলাইজেশন এবং ইমারসিভ ফ্লাইট সহ।',
            'gopro-hero-12': 'গোপ্রো হিরো 12 ব্ল্যাক',
            'gopro-hero-12-desc': '5.3K ভিডিও, হাইপারস্মুথ 6.0 স্টেবিলাইজেশন এবং ওয়াটারপ্রুফ ডিজাইন।',
            'dji-osmo-action-4': 'ডিজেআই ওস্মো অ্যাকশন 4',
            'dji-osmo-action-4-desc': '1/1.3" সেন্সর, 4K/120fps, রকস্টেডি 3.0 স্টেবিলাইজেশন।',
            'insta360-x3': 'ইনস্টা360 X3',
            'insta360-x3-desc': '360° 5.7K ভিডিও, 72MP ফটো এবং ইনভিজিবল সেলফি স্টিক ইফেক্ট।',
            'dji-osmo-mobile-6': 'ডিজেআই ওস্মো মোবাইল 6',
            'dji-osmo-mobile-6-desc': 'স্মার্টফোন জিম্বাল বিল্ট-ইন এক্সটেনশন রড এবং অ্যাক্টিভট্র্যাক 5.0 সহ।',
            'dji-goggles-2': 'ডিজেআই গগলস 2',
            'dji-goggles-2-desc': 'মাইক্রো-OLED ডিসপ্লে, 1080p এবং লো-লেটেন্সি ট্রান্সমিশন।',
            'dji-fly-more-kit': 'ডিজেআই ফ্লাই মোর কিট',
            'dji-fly-more-kit-desc': 'অতিরিক্ত ব্যাটারি, চার্জিং হাব, প্রপেলার এবং ক্যারিং ব্যাগ।',
            'sony-wh-1000xm5': 'সনি WH-1000XM5',
            'sony-wh-1000xm5-desc': 'ইন্ডাস্ট্রি-লিডিং নয়েজ ক্যান্সেলেশন ব্যতিক্রমী সাউন্ড কোয়ালিটি সহ।',
            'bose-qc-45': 'বোস কোয়ায়েটকমফর্ট 45',
            'bose-qc-45-desc': 'প্রিমিয়াম নয়েজ ক্যান্সেলিং হেডফোন আরামদায়ক ডিজাইন সহ।',
            'airpods-max': 'অ্যাপল এয়ারপডস ম্যাক্স',
            'airpods-max-desc': 'ওভার-ইয়ার হেডফোন কম্পিউটেশনাল অডিও এবং সিমলেস ইকোসিস্টেম সহ।',
            'sennheiser-momentum-4': 'সেনহাইজার মোমেন্টাম 4',
            'sennheiser-momentum-4-desc': 'অডিওফাইল-গ্রেড ওয়্যারলেস হেডফোন ব্যতিক্রমী সাউন্ড সহ।',
            'beyerdynamic-dt-990': 'বেয়ারডাইনামিক DT 990 প্রো',
            'beyerdynamic-dt-990-desc': 'স্টুডিও হেডফোন ওপেন-ব্যাক ডিজাইন পেশাদার ব্যবহারের জন্য।',
            'sonos-move-2': 'সোনোস মুভ 2',
            'sonos-move-2-desc': 'পোর্টেবল স্মার্ট স্পিকার শক্তিশালী সাউন্ড এবং Wi-Fi/ব্লুটুথ সহ।',
            'jbl-charge-5': 'JBL চার্জ 5',
            'jbl-charge-5-desc': 'ওয়াটারপ্রুফ পোর্টেবল স্পিকার শক্তিশালী বাস এবং পাওয়ার ব্যাংক সহ।',
            'bose-soundlink-flex': 'বোস সাউন্ডলিংক ফ্লেক্স',
            'bose-soundlink-flex-desc': 'পোর্টেবল ব্লুটুথ স্পিকার রাগড ডিজাইন এবং পরিষ্কার সাউন্ড সহ।',
            'marshall-stanmore-iii': 'মার্শাল স্ট্যানমোর III',
            'marshall-stanmore-iii-desc': 'হোম স্পিকার আইকনিক ডিজাইন এবং রুম-ফিলিং সাউন্ড সহ।',
            'harman-kardon-onyx-8': 'হারম্যান কার্ডন অনিক্স স্টুডিও 8',
            'harman-kardon-onyx-8-desc': 'প্রিমিয়াম ওয়্যারলেস স্পিকার এলিগেন্ট ডিজাইন এবং রিচ সাউন্ড সহ।',
            'anker-735-charger': 'অ্যাঙ্কর 735 চার্জার',
            'anker-735-charger-desc': 'GaNPrime 65W চার্জার 3 পোর্ট সহ একাধিক ডিভাইস ফাস্ট চার্জিংয়ের জন্য।',
            'belkin-3-in-1': 'বেলকিন 3-ইন-1',
            'belkin-3-in-1-desc': 'ম্যাগসেফ চার্জার iPhone, Apple Watch এবং AirPods একসাথে চার্জ করার জন্য।',
            'samsung-wireless-charger': 'স্যামসাং ওয়্যারলেস চার্জার',
            'samsung-wireless-charger-desc': 'ফাস্ট ওয়্যারলেস চার্জিং প্যাড Samsung এবং Qi-কম্প্যাটিবল ডিভাইসের জন্য।',
            'baseus-65w-charger': 'বেসিউস 65W চার্জার',
            'baseus-65w-charger-desc': 'কম্প্যাক্ট GaN চার্জার 2 USB-C এবং 1 USB-A পোর্ট সহ।',
            'anker-powerline-iii': 'অ্যাঙ্কর পাওয়ারলাইন III',
            'anker-powerline-iii-desc': 'টেকসই USB-C থেকে USB-C কেবল 100W ফাস্ট চার্জিং সাপোর্ট সহ।',
            'macbook-pro-charger': 'ম্যাকবুক প্রো 140W চার্জার',
            'macbook-pro-charger-desc': 'অফিসিয়াল অ্যাপল 140W USB-C পাওয়ার অ্যাডাপ্টার ম্যাকবুক প্রো ফাস্ট চার্জিংয়ের জন্য।',
            'dell-xps-charger': 'ডেল XPS 130W চার্জার',
            'dell-xps-charger-desc': 'অফিসিয়াল ডেল 130W USB-C চার্জার XPS ল্যাপটপের জন্য ফাস্ট চার্জিং সহ।',
            'lenovo-thinkpad-charger': 'লেনোভো থিংকপ্যাড 65W চার্জার',
            'lenovo-thinkpad-charger-desc': 'USB-C ল্যাপটপ চার্জার পাওয়ার ডেলিভারি সহ থিংকপ্যাড এবং অন্যান্য ল্যাপটপের জন্য।',
            'hp-laptop-charger': 'HP 90W স্মার্ট চার্জার',
            'hp-laptop-charger-desc': 'অফিসিয়াল HP 90W AC অ্যাডাপ্টার স্মার্ট পিন সহ HP ল্যাপটপের জন্য।',
            'ugreen-100w-charger': 'ইউগ্রিন 100W চার্জার',
            'ugreen-100w-charger-desc': 'হাই-পাওয়ার GaN চার্জার 4 পোর্ট সহ ল্যাপটপ এবং ডিভাইসের জন্য।',
            'mophie-powerstation': 'মোফাই পাওয়ারস্টেশন',
            'mophie-powerstation-desc': 'পোর্টেবল পাওয়ার ব্যাংক 10,000mAh ক্যাপাসিটি এবং ফাস্ট চার্জিং সহ।',
            'anker-powercore': 'অ্যাঙ্কর পাওয়ারকোর 26800',
            'anker-powercore-desc': 'হাই-ক্যাপাসিটি পাওয়ার ব্যাংক 26,800mAh একাধিক ডিভাইস চার্জের জন্য।',
            'nomad-wireless-hub': 'নোম্যাড ওয়্যারলেস হাব',
            'nomad-wireless-hub-desc': 'প্রিমিয়াম ওয়্যারলেস চার্জার মেটাল ডিজাইন এবং লেদার সারফেস সহ।',
            'pitaka-magez': 'পিটাকা MagEZ চার্জার',
            'pitaka-magez-desc': 'মাল্টি-ডিভাইস ওয়্যারলেস চার্জার অ্যারামিড ফাইবার ডিজাইন সহ।',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'পোর্টেবল চার্জার 30W PD সহ ল্যাপটপ এবং ডিভাইসের জন্য।',
            'apple-watch-ultra-2': 'অ্যাপল ওয়াচ আল্ট্রা 2',
            'apple-watch-ultra-2-desc': 'টাইটানিয়াম কেস, 49mm ডিসপ্লে, ডুয়াল-ফ্রিকোয়েন্সি GPS এবং 36 ঘন্টা ব্যাটারি লাইফ।',
            'apple-watch-series-9': 'অ্যাপল ওয়াচ সিরিজ 9',
            'apple-watch-series-9-desc': 'S9 চিপ, ডাবল ট্যাপ জেসচার, উজ্জ্বল ডিসপ্লে এবং অ্যাডভান্সড স্বাস্থ্য বৈশিষ্ট্য।',
            'apple-watch-se': 'অ্যাপল ওয়াচ SE',
            'apple-watch-se-desc': 'প্রয়োজনীয় বৈশিষ্ট্য, অ্যাক্টিভিটি ট্র্যাকিং এবং সাশ্রয়ী মূল্যে ফ্যামিলি সেটআপ।',
            'samsung-watch-6-classic': 'স্যামসাং গ্যালাক্সি ওয়াচ 6 ক্লাসিক',
            'samsung-watch-6-classic-desc': 'রোটেটিং বেজেল, স্যাফায়ার ক্রিস্টাল, বডি কম্পোজিশন বিশ্লেষণ এবং ইসিজি মনিটরিং।',
            'samsung-watch-6': 'স্যামসাং গ্যালাক্সি ওয়াচ 6',
            'samsung-watch-6-desc': 'স্লিম ডিজাইন, উজ্জ্বল ডিসপ্লে, অ্যাডভান্সড স্লিপ ট্র্যাকিং এবং ওয়্যার ওএস।',
            'samsung-watch-5-pro': 'স্যামসাং গ্যালাক্সি ওয়াচ 5 প্রো',
            'samsung-watch-5-pro-desc': 'টাইটানিয়াম বডি, স্যাফায়ার ক্রিস্টাল, লম্বা ব্যাটারি লাইফ এবং অ্যাডভান্সড GPS।',
            'garmin-fenix-7': 'গারমিন ফেনিক্স 7',
            'garmin-fenix-7-desc': 'প্রিমিয়াম মাল্টিস্পোর্ট GPS ওয়াচ সোলার চার্জিং এবং অ্যাডভান্সড ট্রেনিং বৈশিষ্ট্য সহ।',
            'garmin-epix-pro': 'গারমিন এপিক্স প্রো',
            'garmin-epix-pro-desc': 'AMOLED ডিসপ্লে, অ্যাডভান্সড ম্যাপিং এবং প্রিমিয়াম ফিটনেস ট্র্যাকিং।',
            'garmin-venu-3': 'গারমিন ভেনু 3',
            'garmin-venu-3-desc': 'AMOLED ডিসপ্লে, অ্যাডভান্সড স্বাস্থ্য মনিটরিং এবং ফিটনেস বৈশিষ্ট্য।',
            'google-pixel-watch-2': 'গুগল পিক্সেল ওয়াচ 2',
            'google-pixel-watch-2-desc': 'ফিটবিট ইন্টিগ্রেশন, স্ট্রেস ম্যানেজমেন্ট এবং গুগল অ্যাসিস্ট্যান্ট সহ ওয়্যার ওএস।',
            'fossil-gen-6': 'ফসিল জেন 6',
            'fossil-gen-6-desc': 'ওয়্যার ওএস, হার্ট রেট ট্র্যাকিং এবং রোটেটিং ক্রাউন সহ স্টাইলিশ ডিজাইন।',
            'withings-scanwatch': 'উইথিংস স্ক্যানওয়াচ',
            'withings-scanwatch-desc': 'হাইব্রিড স্মার্টওয়াচ ইসিজি, ব্লাড অক্সিজেন মনিটরিং এবং 30-দিনের ব্যাটারি সহ।',
            'huawei-watch-gt-4': 'হুয়াওয়ে ওয়াচ GT 4',
            'huawei-watch-gt-4-desc': 'লম্বা ব্যাটারি লাইফ, নির্ভুল স্বাস্থ্য ট্র্যাকিং এবং এলিগেন্ট ডিজাইন।',
            'amazfit-gtr-4': 'আমাজফিট GTR 4',
            'amazfit-gtr-4-desc': 'AMOLED ডিসপ্লে, ডুয়াল-ব্যান্ড GPS এবং 24 দিন পর্যন্ত অবিশ্বাস্য ব্যাটারি লাইফ।',
            'ticwatch-pro-5': 'টিকওয়াচ প্রো 5',
            'ticwatch-pro-5-desc': 'আল্ট্রা-লো পাওয়ার ডিসপ্লে, স্ন্যাপড্রাগন W5+ জেন 1 এবং অ্যাডভান্সড স্বাস্থ্য সেন্সর।',
            'cart-title': 'আপনার শপিং কার্ট',
            'product': 'পণ্য',
            'price': 'মূল্য',
            'quantity': 'পরিমাণ',
            'total': 'মোট',
            'action': 'ক্রিয়া',
            'total-label': 'মোট:',
            'continue': 'কেনা চালিয়ে যান',
            'checkout': 'চেকআউটে যান',
            'is-empty': 'খালি',
            'payment-title': 'পেমেন্ট',
            'order-summary': 'অর্ডার সারাংশ',
            'payment-method': 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
            'card-payment': 'কার্ড পেমেন্ট',
            'google-pay': 'গুগল পে',
            'apple-pay': 'অ্যাপল পে',
            'paypal': 'পেপ্যাল',
            'mbway': 'এমবি ওয়ে',
            'card-details': 'কার্ডের বিবরণ',
            'card-number': 'কার্ড নম্বর',
            'expiry': 'মেয়াদ শেষ হওয়ার তারিখ',
            'cvv': 'সিভিভি',
            'card-name': 'কার্ডে নাম',
            'mbway-details': 'এমবি ওয়ে পেমেন্ট',
            'mbway-instruction': 'পেমেন্ট নোটিফিকেশন পেতে আপনার মোবাইল নম্বর লিখুন',
            'phone-number': 'ফোন নম্বর',
            'googlepay-info': 'আপনাকে নিরাপদে পেমেন্ট সম্পূর্ণ করতে গুগল পেতে পুনঃনির্দেশিত করা হবে।',
            'applepay-info': 'আপনাকে নিরাপদে পেমেন্ট সম্পূর্ণ করতে অ্যাপল পেতে পুনঃনির্দেশিত করা হবে।',
            'paypal-info': 'আপনাকে নিরাপদে পেমেন্ট সম্পূর্ণ করতে পেপ্যালে পুনঃনির্দেশিত করা হবে।',
            'back-to-cart': '← কার্টে ফিরে যান',
            'pay-now': 'এখনই পেমেন্ট করুন',
            'subtotal': 'সাবটোটাল',
            'shipping': 'শিপিং',
            'select-payment': 'অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন',
            'fill-card-details': 'অনুগ্রহ করে সমস্ত কার্ডের বিবরণ পূরণ করুন',
            'enter-phone': 'অনুগ্রহ করে আপনার ফোন নম্বর লিখুন',
            'payment-successful': 'পেমেন্ট সফল হয়েছে',
            'thank-you': 'আপনার অর্ডারের জন্য ধন্যবাদ!',
            'about-story-title': 'আমাদের গল্প',
            'about-story-text': 'SNOWFALL 2024 সালে একটি সহজ লক্ষ্য নিয়ে প্রতিষ্ঠিত হয়েছিল: গ্রাহকদের কাছে ন্যায্য মূল্যে সর্বশেষ প্রযুক্তি পৌঁছে দেওয়া। গ্যাজেটগুলির জন্য একটি ছোট আবেগ হিসাবে যা শুরু হয়েছিল তা বিশ্বব্যাপী ইলেকট্রনিক্স উত্সাহীদের জন্য একটি বিশ্বস্ত অনলাইন গন্তব্যে পরিণত হয়েছে।',
            'about-products-title': 'আমরা কী বিক্রি করি',
            'about-products-text': 'আমরা স্মার্টফোন, ল্যাপটপ, ট্যাবলেট, ক্যামেরা, গেমিং কনসোল, হেডফোন, স্মার্টওয়াচ এবং আনুষাঙ্গিকগুলিতে বিশেষজ্ঞ। আমাদের ক্যাটালগের প্রতিটি পণ্য গুণমান এবং কর্মক্ষমতার জন্য সাবধানে নির্বাচন করা হয়।',
            'about-why-title': 'কেন আমাদের বেছে নেবেন',
            'about-why1': 'প্রতিযোগিতামূলক দামে সর্বশেষ ইলেকট্রনিক্স',
            'about-why2': 'ওয়ারেন্টি সহ 100% খাঁটি পণ্য',
            'about-why3': 'বিশ্বব্যাপী দ্রুত এবং নিরাপদ শিপিং',
            'about-why4': '২৪/৭ গ্রাহক সহায়তা',
            'about-why5': 'সহজ রিটার্ন এবং রিফান্ড',
            'about-promise-title': 'আমাদের প্রতিশ্রুতি',
            'about-promise-text': 'আপনার সন্তুষ্টি আমাদের অগ্রাধিকার। ব্রাউজিং থেকে ডেলিভারি এবং তার বাইরেও একটি নিরাপদ, সুরক্ষিত এবং উপভোগ্য শপিং অভিজ্ঞতা প্রদান করতে আমরা প্রতিশ্রুতিবদ্ধ।',
            'delivery-title': 'দ্রুত এবং নির্ভরযোগ্য ডেলিভারি',
            'delivery-desc': 'আপনার পণ্য দ্রুত এবং নিরাপদে আপনার দরজায় পৌঁছে দিন।',
            'delivery-feature1': 'একই দিন / পরের দিন ডেলিভারি',
            'delivery-feature2': 'বিশ্বব্যাপী শিপিং',
            'delivery-feature3': 'রিয়েল-টাইম অর্ডার ট্র্যাকিং',
            'returns-title': 'সহজ রিটার্ন এবং রিফান্ড',
            'returns-desc': 'ঝামেলামুক্ত রিটার্ন এবং দ্রুত রিফান্ড আপনার মানসিক শান্তির জন্য।',
            'returns-feature1': '৭ দিন বা ৩০ দিনের রিটার্ন নীতি',
            'returns-feature2': 'বিনামূল্যে রিটার্ন',
            'returns-feature3': 'দ্রুত রিফান্ড প্রক্রিয়াকরণ',
            'payments-title': 'নিরাপদ পেমেন্ট',
            'payments-desc': 'আপনার লেনদেন শিল্প-নেতৃস্থানীয় নিরাপত্তা সঙ্গে সুরক্ষিত।',
            'payments-feature1': 'SSL সুরক্ষিত চেকআউট',
            'payments-feature2': 'একাধিক পেমেন্ট পদ্ধতি',
            'payments-feature3': 'জালিয়াতি সুরক্ষা',
            'support-title': '২৪/৭ গ্রাহক সহায়তা',
            'support-desc': 'আমরা সবসময় আপনার প্রশ্নের সাহায্য করতে এখানে আছি।',
            'support-feature1': 'লাইভ চ্যাট সমর্থন',
            'support-feature2': 'ইমেইল সমর্থন',
            'support-feature3': 'ফোন সমর্থন',
            'warranty-title': 'পণ্য ওয়ারেন্টি',
            'warranty-desc': 'আপনার সুরক্ষার জন্য সমস্ত পণ্য ওয়ারেন্টি সহ আসে।',
            'warranty-feature1': '১ বছরের ওয়ারেন্টি',
            'warranty-feature2': 'প্রতিস্থাপন গ্যারান্টি',
            'warranty-feature3': 'প্রামাণিক পণ্য',
            'tracking-title': 'অর্ডার ট্র্যাকিং',
            'tracking-desc': 'আপনার প্যাকেজটি আগমন পর্যন্ত প্রতিটি ধাপে অনুসরণ করুন।',
            'tracking-feature1': 'অ্যাকাউন্ট ড্যাশবোর্ড থেকে ট্র্যাক করুন',
            'tracking-feature2': 'এসএমএস / ইমেইল শিপিং আপডেট',
            'tracking-feature3': 'রিয়েল-টাইম অবস্থান ট্র্যাকিং',
            'contact-title': 'যোগাযোগ করুন',
            'name-label': 'নাম:',
            'email-label': 'ইমেইল:',
            'message-label': 'বার্তা:',
            'send': 'পাঠান',
            'rights': 'সমস্ত অধিকার সংরক্ষিত।',
            'currency': 'BDT',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'শিপিং ঠিকানা',
            'first-name': 'প্রথম নাম',
            'last-name': 'শেষ নাম',
            'address-line1': 'ঠিকানা লাইন ১',
            'address-line2': 'ঠিকানা লাইন ২ (ঐচ্ছিক)',
            'city': 'শহর',
            'state': 'রাজ্য / প্রদেশ',
            'zip-code': 'জিপ কোড',
            'country': 'দেশ',
            'phone': 'ফোন নম্বর',
            'confirmation-email': 'অর্ডার নিশ্চিতকরণের জন্য ইমেইল',
            'email-note': 'আমরা এই ইমেইলে আপনার অর্ডার নিশ্চিতকরণ এবং ট্র্যাকিং তথ্য পাঠাব',
            'save-address': 'ভবিষ্যতের অর্ডারের জন্য এই ঠিকানা সংরক্ষণ করুন',
            'fill-shipping-details': 'অনুগ্রহ করে সমস্ত শিপিং বিবরণ পূরণ করুন',
            'valid-email': 'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন'
        },
        
        // ===== ARABIC =====
        ar: {
            'home': 'الرئيسية',
            'products': 'المنتجات',
            'services': 'الخدمات',
            'about': 'من نحن',
            'contact': 'اتصل بنا',
            'welcome': 'مرحبًا بكم في سنوفول',
            'tagline': 'مكانك الموثوق للمنتجات عالية الجودة',
            'home-text': 'هذا هو الموقع الرسمي لسنوفول.',
            'category': 'الفئة',
            'mobile': 'جوال',
            'tablet': 'أجهزة لوحية وآيباد',
            'laptop': 'لابتوب',
            'camera': 'كاميرا',
            'gaming': 'ألعاب',
            'drones': 'طائرات درون',
            'headphone': 'سماعات ومكبرات صوت',
            'charger': 'شاحن',
            'watch': 'ساعة',
            'featured-products': 'منتجاتنا المميزة',
            'featured': 'منتج مميز',
            'featured-desc': 'تصفح المنتجات عن طريق اختيار الفئات من الشريط الجانبي.',
            'add-to-cart': 'أضف إلى السلة',
            'iphone-15-pro': 'آيفون 15 برو',
            'iphone-15-pro-desc': 'أحدث هاتف ذكي من Apple مع شريحة A17 Pro وتصميم تيتانيوم ونظام كاميرا متقدم.',
            'iphone-17': 'آيفون 17',
            'iphone-17-desc': 'هاتف ممتاز مع ميزات ذكاء اصطناعي متقدمة ومعالج قوي.',
            'iphone-16': 'آيفون 16',
            'iphone-16-desc': 'هاتف ذكي مدعوم بالذكاء الاصطناعي مع كاميرا من الدرجة الأولى.',
            'iphone-14': 'آيفون 14',
            'iphone-14-desc': 'هاتف ذكي قوي بقيمة ممتازة.',
            'samsung-s24-ultra': 'سامسونج جالاكسي S24 ألترا',
            'samsung-s24-ultra-desc': 'شاشة Dynamic AMOLED 2X وكاميرا 200 ميجابكسل ومعالج Snapdragon 8 Gen 3.',
            'samsung-s25-ultra': 'سامسونج جالاكسي S25 ألترا',
            'samsung-s25-ultra-desc': 'رائد الجيل التالي مع ميزات ذكاء اصطناعي ثورية وتقنية كاميرا متطورة.',
            'samsung-z-fold-5': 'سامسونج جالاكسي Z Fold 5',
            'samsung-z-fold-5-desc': 'شاشة قابلة للطي وقوة متعددة المهام وتصميم ممتاز.',
            'samsung-z-flip-5': 'سامسونج جالاكسي Z Flip 5',
            'samsung-z-flip-5-desc': 'هاتف قابل للطي صغير الحجم مع شاشة خارجية كبيرة وكاميرا متعددة الاستخدامات.',
            'google-pixel-8-pro': 'جوجل بيكسل 8 برو',
            'google-pixel-8-pro-desc': 'ميزات ذكاء اصطناعي متقدمة وكاميرا استثنائية وتجربة أندرويد نقية مع Tensor G3.',
            'google-pixel-10-pro': 'جوجل بيكسل 10 برو',
            'google-pixel-10-pro-desc': 'قدرات ذكاء اصطناعي من الجيل التالي مع شريحة Tensor G5 الثورية وكاميرا مبتكرة.',
            'oneplus-12': 'ون بلس 12',
            'oneplus-12-desc': 'شاشة ProXDR 120Hz وشحن سريع 100W ومعالج Snapdragon 8 Gen 3.',
            'oneplus-open': 'ون بلس أوبن',
            'oneplus-open-desc': 'هاتف قابل للطي بمواصفات رائدة وقدرات متعددة المهام.',
            'xiaomi-14-ultra': 'شاومي 14 ألترا',
            'xiaomi-14-ultra-desc': 'كاميرات احترافية من Leica وشحن سريع 90W وتقنية شاشة مذهلة.',
            'xiaomi-13-pro': 'شاومي 13 برو',
            'xiaomi-13-pro-desc': 'نظام كاميرا Leica ومعالج Snapdragon 8 Gen 2 وتصميم ممتاز.',
            'sony-xperia-1-vi': 'سوني إكسبيريا 1 VI',
            'sony-xperia-1-vi-desc': 'شاشة OLED 4K ونظام كاميرا احترافي وتميز الوسائط المتعددة.',
            'nothing-phone-2': 'نوثينج فون 2',
            'nothing-phone-2-desc': 'واجهة Glyph فريدة وتصميم نظيف وتجربة مستخدم مبتكرة.',
            'ipad-pro-m2': 'آيباد برو 12.9" M2',
            'ipad-pro-m2-desc': 'شريحة M2، شاشة Liquid Retina XDR، 5G، وتجربة hover مع Apple Pencil.',
            'ipad-air-m1': 'آيباد إير M1',
            'ipad-air-m1-desc': 'شريحة M1، شاشة Liquid Retina 10.9"، Touch ID، وكاميرا أمامية فائقة الاتساع.',
            'ipad-10th-gen': 'آيباد الجيل العاشر',
            'ipad-10th-gen-desc': 'شريحة A14 Bionic، شاشة Liquid Retina 10.9"، USB-C، وكاميرا أفقية.',
            'ipad-mini-6': 'آيباد ميني 6',
            'ipad-mini-6-desc': 'شريحة A15 Bionic، شاشة Liquid Retina 8.3"، 5G، ودعم Apple Pencil 2.',
            'samsung-tab-s9-ultra': 'سامسونج تاب S9 ألترا',
            'samsung-tab-s9-ultra-desc': '14.6" Dynamic AMOLED 2X، Snapdragon 8 Gen 2، مقاومة للماء IP68.',
            'samsung-tab-s9-plus': 'سامسونج تاب S9+',
            'samsung-tab-s9-plus-desc': '12.4" Dynamic AMOLED 2X، Snapdragon 8 Gen 2، وتجربة S Pen محسنة.',
            'samsung-tab-s9': 'سامسونج تاب S9',
            'samsung-tab-s9-desc': '11" Dynamic AMOLED 2X، Snapdragon 8 Gen 2، ومقاومة للماء IP67.',
            'surface-pro-9': 'سيرفس برو 9',
            'surface-pro-9-desc': 'شاشة لمس 13"، منصة Intel Evo، عمر بطارية يصل إلى 15.5 ساعة.',
            'amazon-fire-max-11': 'أمازون فاير ماكس 11',
            'amazon-fire-max-11-desc': 'شاشة 11"، معالج ثماني النواة، وعمر بطارية طوال اليوم.',
            'lenovo-tab-p12': 'لينوفو تاب P12',
            'lenovo-tab-p12-desc': 'شاشة 3K 12.7"، MediaTek Dimensity 7050، ومكبرات صوت JBL.',
            'macbook-pro-16': 'ماك بوك برو 16',
            'macbook-pro-16-desc': 'شريحة M3 Pro، 36GB RAM، 1TB SSD، وشاشة Liquid Retina XDR مذهلة.',
            'macbook-air-m2': 'ماك بوك إير M2',
            'macbook-air-m2-desc': 'تصميم فائق النحافة، شريحة M2، عمر بطارية طوال اليوم، وشاشة رائعة.',
            'dell-xps-15': 'ديل XPS 15',
            'dell-xps-15-desc': 'Intel Core i9، 32GB RAM، NVIDIA RTX 4060، وشاشة OLED 4K.',
            'dell-xps-13': 'ديل XPS 13',
            'dell-xps-13-desc': 'لابتوب فائق النحافة مع شاشة InfinityEdge و Intel Core i7.',
            'lenovo-thinkpad-x1': 'لينوفو ثينك باد X1',
            'lenovo-thinkpad-x1-desc': 'لابتوب للأعمال مع Intel vPro، 32GB RAM، وجودة بناء ممتازة.',
            'asus-rog-zephyrus': 'ASUS ROG زيفيروس',
            'asus-rog-zephyrus-desc': 'لابتوب ألعاب مع RTX 4080، شاشة 240Hz، وتبريد متقدم.',
            'hp-spectre-x360': 'إتش بي سبيكتر x360',
            'hp-spectre-x360-desc': 'لابتوب قابل للتحويل مع شاشة OLED، Intel Core i7، وتصميم ممتاز.',
            'microsoft-surface-laptop-5': 'مايكروسوفت سيرفس لابتوب 5',
            'microsoft-surface-laptop-5-desc': 'تصميم أنيق، شاشة لمس، وقابلية حمل ممتازة.',
            'razer-blade-15': 'رايزر بليد 15',
            'razer-blade-15-desc': 'لابتوب ألعاب فائق النحافة مع RTX 4070 وشاشة QHD 240Hz.',
            'acer-predator-helios': 'أيسر بريداتور هيليوس',
            'acer-predator-helios-desc': 'لابتوب ألعاب قوي مع تبريد عالي الأداء ولوحة مفاتيح RGB.',
            'sony-a7-iv': 'Sony A7 IV',
            'sony-a7-iv-desc': 'كاميرا بدون مرآة كاملة الإطار بمستشعر 33 ميجابكسل وتسجيل فيديو 4K 60p.',
            'sony-a1': 'Sony A1',
            'sony-a1-desc': 'كاميرا رائدة بدقة 50 ميجابكسل مع فيديو 8K وتصوير متواصل 30 إطارًا في الثانية وسرعة لا تصدق.',
            'sony-a7s-iii': 'Sony A7S III',
            'sony-a7s-iii-desc': 'بطلة الإضاءة المنخفضة بمستشعر 12 ميجابكسل وفيديو 4K 120p للمحترفين.',
            'sony-zv-e1': 'Sony ZV-E1',
            'sony-zv-e1-desc': 'كاميرا مدمجة لتدوين الفيديو بمستشعر كامل الإطار وتركيز تلقائي بالذكاء الاصطناعي.',
            'canon-eos-r5': 'Canon EOS R5',
            'canon-eos-r5-desc': 'مستشعر كامل الإطار بدقة 45 ميجابكسل وفيديو RAW 8K ونظام Dual Pixel AF II المتقدم.',
            'canon-eos-r6-ii': 'Canon EOS R6 Mark II',
            'canon-eos-r6-ii-desc': 'مستشعر كامل الإطار بدقة 24 ميجابكسل وتصوير متواصل 40 إطارًا في الثانية وأداء ممتاز في الإضاءة المنخفضة.',
            'canon-eos-r3': 'Canon EOS R3',
            'canon-eos-r3-desc': 'كاميرا رياضية احترافية بمستشعر مكدس بدقة 24 ميجابكسل وتركيز بالتحكم بالعين.',
            'canon-eos-r100': 'Canon EOS R100',
            'canon-eos-r100-desc': 'كاميرا بدون مرآة للمبتدئين مثالية للمبتدئين ومنشئي المحتوى.',
            'nikon-z8': 'Nikon Z8',
            'nikon-z8-desc': 'قوة مدمجة بمستشعر 45.7 ميجابكسل وفيديو 8K وميزات رائدة.',
            'nikon-z9': 'Nikon Z9',
            'nikon-z9-desc': 'كاميرا احترافية رائدة بمستشعر CMOS مكدس وفيديو 8K.',
            'nikon-z6-iii': 'Nikon Z6 III',
            'nikon-z6-iii-desc': 'كاميرا كاملة الإطار متعددة الاستخدامات بمستشعر 24.5 ميجابكسل وتسجيل فيديو 6K.',
            'fujifilm-xt5': 'Fujifilm X-T5',
            'fujifilm-xt5-desc': 'مستشعر APS-C بدقة 40 ميجابكسل مع محاكاة الأفلام وتصميم الأقراص الكلاسيكي.',
            'fujifilm-x100vi': 'Fujifilm X100VI',
            'fujifilm-x100vi-desc': 'كاميرا مدمجة فاخرة بعدسة ثابتة 23 مم ومستشعر 40 ميجابكسل.',
            'fujifilm-gfx100-ii': 'Fujifilm GFX100 II',
            'fujifilm-gfx100-ii-desc': 'كاميرا متوسطة التنسيق بمستشعر 102 ميجابكسل وقدرات فيديو 8K.',
            'panasonic-s5-ii': 'Panasonic Lumix S5 II',
            'panasonic-s5-ii-desc': 'كاميرا هجينة كاملة الإطار مع تركيز بكشف الطور وفيديو 6K.',
            'ps5': 'بلاي ستيشن 5',
            'ps5-desc': 'SSD فائق السرعة وألعاب 4K وردود فعل لمسية ومشغلات تكيفية.',
            'xbox-series-x': 'إكس بوكس سيريس إكس',
            'xbox-series-x-desc': '12 تيرافلوبس واستئناف سريع وألعاب 4K وجيم باس ألتيميت.',
            'nintendo-switch-oled': 'نينتندو سويتش OLED',
            'nintendo-switch-oled-desc': 'شاشة OLED بحجم 7 بوصة وألوان نابضة بالحياة وأوضاع لعب متعددة الاستخدامات.',
            'logitech-g-pro-x': 'لوجيتك جي برو إكس',
            'logitech-g-pro-x-desc': 'مستشعر Hero 25K وخفيف الوزن للغاية وأداء احترافي.',
            'razer-deathadder-v3': 'رايزر ديث آدر V3',
            'razer-deathadder-v3-desc': 'مستشعر Focus Pro 30K ومفاتيح بصرية وتصميم مريح.',
            'steelseries-apex-pro': 'ستيل سيريس أبيكس برو',
            'steelseries-apex-pro-desc': 'مفاتيح OmniPoint قابلة للتعديل وشاشة OLED ومسند معصم مغناطيسي.',
            'steelseries-arctis-nova-pro': 'ستيل سيريس أركيتس نوفا برو',
            'steelseries-arctis-nova-pro-desc': 'سماعة ألعاب فاخرة مع إلغاء الضوضاء النشط وصوت عالي الدقة.',
            'xbox-elite-controller': 'يد إكس بوكس إليت سيريس 2',
            'xbox-elite-controller-desc': 'عصي تحكم بشد قابل للتعديل ومقبض مطاطي.',
            'secretlab-titan-evo': 'سيكريت لاب تايتان إيفو',
            'secretlab-titan-evo-desc': 'كرسي ألعاب فاخر مع وسادة رأس مغناطيسية ودعم قطني رباعي الاتجاهات.',
            'alienware-aw3423dw': 'ألين وير AW3423DW',
            'alienware-aw3423dw-desc': 'شاشة ألعاب QD-OLED 34 بوصة ومعدل تحديث 175Hz و G-Sync Ultimate.',
            'dji-mavic-3-pro': 'دي جي آي مافيك 3 برو',
            'dji-mavic-3-pro-desc': 'نظام ثلاثي الكاميرات ووقت طيران 46 دقيقة واستشعار العقبات متعدد الاتجاهات.',
            'dji-air-3': 'دي جي آي إير 3',
            'dji-air-3-desc': 'كاميرتان أساسيتان ووقت طيران 46 دقيقة واستشعار عقبات 360 درجة.',
            'dji-mini-4-pro': 'دي جي آي ميني 4 برو',
            'dji-mini-4-pro-desc': 'أقل من 249 جرام و 4K/60fps HDR واستشعار عقبات متعدد الاتجاهات.',
            'dji-avata': 'دي جي آي أفاتا',
            'dji-avata-desc': 'طائرة FPV مع واقيات مروحة وتثبيت 4K ورحلة غامرة.',
            'gopro-hero-12': 'GoPro Hero 12 بلاك',
            'gopro-hero-12-desc': 'فيديو 5.3K وتثبيت HyperSmooth 6.0 وتصميم مقاوم للماء.',
            'dji-osmo-action-4': 'دي جي آي أوسمو أكشن 4',
            'dji-osmo-action-4-desc': 'مستشعر 1/1.3 بوصة و 4K/120fps وتثبيت RockSteady 3.0.',
            'insta360-x3': 'إنستا360 X3',
            'insta360-x3-desc': 'فيديو 360° 5.7K وصور 72 ميجابكسل وتأثير عصا السيلفي غير المرئية.',
            'dji-osmo-mobile-6': 'دي جي آي أوسمو موبايل 6',
            'dji-osmo-mobile-6-desc': 'مثبت للهواتف الذكية مع عمود تمديد مدمج و ActiveTrack 5.0.',
            'dji-goggles-2': 'دي جي آي جوغلز 2',
            'dji-goggles-2-desc': 'شاشات Micro-OLED و 1080p ونقل بزمن استجابة منخفض.',
            'dji-fly-more-kit': 'دي جي آي فلاي مور كيت',
            'dji-fly-more-kit-desc': 'بطاريات إضافية ومحطة شحن ومراوح وحقيبة حمل.',
            'sony-wh-1000xm5': 'Sony WH-1000XM5',
            'sony-wh-1000xm5-desc': 'إلغاء ضوضاء رائد مع جودة صوت استثنائية.',
            'bose-qc-45': 'Bose QuietComfort 45',
            'bose-qc-45-desc': 'سماعات رأس فاخرة لإلغاء الضوضاء بتصميم مريح.',
            'airpods-max': 'Apple AirPods Max',
            'airpods-max-desc': 'سماعات فوق الأذن مع صوت حسابي ونظام بيئي متكامل.',
            'sennheiser-momentum-4': 'Sennheiser Momentum 4',
            'sennheiser-momentum-4-desc': 'سماعات لاسلكية من فئة عشاق الصوت بصوت استثنائي.',
            'beyerdynamic-dt-990': 'Beyerdynamic DT 990 Pro',
            'beyerdynamic-dt-990-desc': 'سماعات استوديو بتصميم مفتوح للاستخدام الاحترافي.',
            'sonos-move-2': 'Sonos Move 2',
            'sonos-move-2-desc': 'مكبر صوت ذكي محمول بصوت قوي و Wi-Fi/Bluetooth.',
            'jbl-charge-5': 'JBL Charge 5',
            'jbl-charge-5-desc': 'مكبر صوت محمول مقاوم للماء مع جهير قوي وبنك طاقة.',
            'bose-soundlink-flex': 'Bose SoundLink Flex',
            'bose-soundlink-flex-desc': 'مكبر صوت Bluetooth محمول بتصميم متين وصوت نقي.',
            'marshall-stanmore-iii': 'Marshall Stanmore III',
            'marshall-stanmore-iii-desc': 'مكبر صوت منزلي بتصميم أيقوني وصوت يملأ الغرفة.',
            'harman-kardon-onyx-8': 'Harman Kardon Onyx Studio 8',
            'harman-kardon-onyx-8-desc': 'مكبر صوت لاسلكي فاخر بتصميم أنيق وصوت غني.',
            'anker-735-charger': 'شاحن Anker 735',
            'anker-735-charger-desc': 'شاحن GaNPrime 65W مع 3 منافذ لشحن سريع لأجهزة متعددة.',
            'belkin-3-in-1': 'Belkin 3 في 1',
            'belkin-3-in-1-desc': 'شاحن MagSafe لـ iPhone و Apple Watch و AirPods في وقت واحد.',
            'samsung-wireless-charger': 'شاحن سامسونج اللاسلكي',
            'samsung-wireless-charger-desc': 'قاعدة شحن لاسلكي سريع لسامسونج والأجهزة المتوافقة مع Qi.',
            'baseus-65w-charger': 'شاحن Baseus 65W',
            'baseus-65w-charger-desc': 'شاحن GaN مدمج مع منفذي USB-C ومنفذ USB-A.',
            'anker-powerline-iii': 'Anker Powerline III',
            'anker-powerline-iii-desc': 'كابل USB-C إلى USB-C متين مع دعم شحن سريع 100W.',
            'macbook-pro-charger': 'شاحن MacBook Pro 140W',
            'macbook-pro-charger-desc': 'محول طاقة USB-C رسمي من Apple بقدرة 140 واط للشحن السريع لـ MacBook Pro.',
            'dell-xps-charger': 'شاحن Dell XPS 130W',
            'dell-xps-charger-desc': 'شاحن USB-C رسمي من Dell بقدرة 130 واط مع شحن سريع لأجهزة XPS المحمولة.',
            'lenovo-thinkpad-charger': 'شاحن Lenovo ThinkPad 65W',
            'lenovo-thinkpad-charger-desc': 'شاحن USB-C للابتوب مع Power Delivery لـ ThinkPad وأجهزة كمبيوتر محمولة أخرى.',
            'hp-laptop-charger': 'شاحن HP الذكي 90W',
            'hp-laptop-charger-desc': 'محول AC رسمي من HP بقدرة 90 واط مع Smart Pin لأجهزة HP المحمولة.',
            'ugreen-100w-charger': 'شاحن UGREEN 100W',
            'ugreen-100w-charger-desc': 'شاحن GaN عالي الطاقة مع 4 منافذ لأجهزة الكمبيوتر المحمولة والأجهزة.',
            'mophie-powerstation': 'Mophie Powerstation',
            'mophie-powerstation-desc': 'بنك طاقة محمول بسعة 10,000mAh وشحن سريع.',
            'anker-powercore': 'Anker PowerCore 26800',
            'anker-powercore-desc': 'بنك طاقة عالي السعة 26,800mAh لشحن أجهزة متعددة.',
            'nomad-wireless-hub': 'Nomad Wireless Hub',
            'nomad-wireless-hub-desc': 'شاحن لاسلكي فاخر بتصميم معدني وسطح جلدي.',
            'pitaka-magez': 'شاحن Pitaka MagEZ',
            'pitaka-magez-desc': 'شاحن لاسلكي متعدد الأجهزة بتصميم من ألياف الأراميد.',
            'ravpower-20000': 'RAVPower 20000mAh',
            'ravpower-20000-desc': 'شاحن محمول مع 30W PD لأجهزة الكمبيوتر المحمولة والأجهزة.',
            'apple-watch-ultra-2': 'Apple Watch Ultra 2',
            'apple-watch-ultra-2-desc': 'هيكل تيتانيوم وشاشة 49 مم و GPS مزدوج التردد وعمر بطارية يصل إلى 36 ساعة.',
            'apple-watch-series-9': 'Apple Watch Series 9',
            'apple-watch-series-9-desc': 'شريحة S9 وإيماءة النقر المزدوج وشاشة أكثر سطوعًا وميزات صحية متقدمة.',
            'apple-watch-se': 'Apple Watch SE',
            'apple-watch-se-desc': 'ميزات أساسية وتتبع النشاط وإعداد العائلة بسعر معقول.',
            'samsung-watch-6-classic': 'Samsung Galaxy Watch 6 Classic',
            'samsung-watch-6-classic-desc': 'إطار دوار وكريستال ياقوتي وتحليل تكوين الجسم ومراقبة ECG.',
            'samsung-watch-6': 'Samsung Galaxy Watch 6',
            'samsung-watch-6-desc': 'تصميم نحيف وشاشة ساطعة وتتبع نوم متقدم و Wear OS.',
            'samsung-watch-5-pro': 'Samsung Galaxy Watch 5 Pro',
            'samsung-watch-5-pro-desc': 'هيكل تيتانيوم وكريستال ياقوتي وعمر بطارية طويل ونظام تحديد المواقع المتقدم.',
            'garmin-fenix-7': 'Garmin Fenix 7',
            'garmin-fenix-7-desc': 'ساعة GPS متعددة الرياضات فاخرة مع شحن شمسي وميزات تدريب متقدمة.',
            'garmin-epix-pro': 'Garmin Epix Pro',
            'garmin-epix-pro-desc': 'شاشة AMOLED وخرائط متقدمة وتتبع لياقة بدنية فاخر.',
            'garmin-venu-3': 'Garmin Venu 3',
            'garmin-venu-3-desc': 'شاشة AMOLED ومراقبة صحية متقدمة وميزات لياقة بدنية.',
            'google-pixel-watch-2': 'Google Pixel Watch 2',
            'google-pixel-watch-2-desc': 'تكامل Fitbit وإدارة الإجهاد و Wear OS مع مساعد Google.',
            'fossil-gen-6': 'Fossil Gen 6',
            'fossil-gen-6-desc': 'Wear OS وتتبع معدل ضربات القلب وتصميم أنيق مع تاج دوار.',
            'withings-scanwatch': 'Withings ScanWatch',
            'withings-scanwatch-desc': 'ساعة هجينة مع ECG ومراقبة الأكسجين في الدم وبطارية 30 يومًا.',
            'huawei-watch-gt-4': 'Huawei Watch GT 4',
            'huawei-watch-gt-4-desc': 'عمر بطارية طويل وتتبع صحي دقيق وتصميم أنيق.',
            'amazfit-gtr-4': 'Amazfit GTR 4',
            'amazfit-gtr-4-desc': 'شاشة AMOLED ونظام تحديد المواقع ثنائي النطاق وعمر بطارية مذهل يصل إلى 24 يومًا.',
            'ticwatch-pro-5': 'TicWatch Pro 5',
            'ticwatch-pro-5-desc': 'شاشة فائقة الانخفاض في استهلاك الطاقة و Snapdragon W5+ Gen 1 وأجهزة استشعار صحية متقدمة.',
            'cart-title': 'سلة التسوق الخاصة بك',
            'product': 'المنتج',
            'price': 'السعر',
            'quantity': 'الكمية',
            'total': 'الإجمالي',
            'action': 'إجراء',
            'total-label': 'الإجمالي:',
            'continue': 'مواصلة التسوق',
            'checkout': 'إتمام الشراء',
            'is-empty': 'فارغة',
            'payment-title': 'الدفع',
            'order-summary': 'ملخص الطلب',
            'payment-method': 'اختر طريقة الدفع',
            'card-payment': 'الدفع بالبطاقة',
            'google-pay': 'جوجل باي',
            'apple-pay': 'أبل باي',
            'paypal': 'باي بال',
            'mbway': 'إم بي واي',
            'card-details': 'تفاصيل البطاقة',
            'card-number': 'رقم البطاقة',
            'expiry': 'تاريخ الانتهاء',
            'cvv': 'رمز الأمان',
            'card-name': 'الاسم على البطاقة',
            'mbway-details': 'دفع إم بي واي',
            'mbway-instruction': 'أدخل رقم هاتفك المحمول لتلقي إشعار الدفع',
            'phone-number': 'رقم الهاتف',
            'googlepay-info': 'سيتم إعادة توجيهك إلى جوجل باي لإكمال الدفع بأمان.',
            'applepay-info': 'سيتم إعادة توجيهك إلى أبل باي لإكمال الدفع بأمان.',
            'paypal-info': 'سيتم إعادة توجيهك إلى باي بال لإكمال الدفع بأمان.',
            'back-to-cart': '← العودة إلى السلة',
            'pay-now': 'ادفع الآن',
            'subtotal': 'المجموع الفرعي',
            'shipping': 'الشحن',
            'select-payment': 'الرجاء اختيار طريقة الدفع',
            'fill-card-details': 'الرجاء ملء جميع تفاصيل البطاقة',
            'enter-phone': 'الرجاء إدخال رقم هاتفك',
            'payment-successful': 'تم الدفع بنجاح',
            'thank-you': 'شكرا لطلبك!',
            'about-story-title': 'قصتنا',
            'about-story-text': 'تأسست سنوفول في عام 2024 بمهمة بسيطة: تقديم أحدث التقنيات للعملاء بأسعار عادلة. ما بدأ كشغف صغير بالأدوات الإلكترونية تحول إلى وجهة إلكترونية موثوقة لعشاق الإلكترونيات في جميع أنحاء العالم.',
            'about-products-title': 'ماذا نبيع',
            'about-products-text': 'نحن متخصصون في الهواتف الذكية وأجهزة الكمبيوتر المحمولة والأجهزة اللوحية والكاميرات وأجهزة الألعاب وسماعات الرأس والساعات الذكية والملحقات. يتم اختيار كل منتج في كتالوجنا بعناية من حيث الجودة والأداء.',
            'about-why-title': 'لماذا تختارنا',
            'about-why1': 'أحدث الإلكترونيات بأسعار تنافسية',
            'about-why2': 'منتجات أصلية 100% مع ضمان',
            'about-why3': 'شحن سريع وآمن في جميع أنحاء العالم',
            'about-why4': 'دعم العملاء 24/7',
            'about-why5': 'إرجاع واسترداد سهل',
            'about-promise-title': 'وعدنا',
            'about-promise-text': 'رضاك هو أولويتنا. نحن ملتزمون بتوفير تجربة تسوق آمنة وممتعة من التصفح إلى التسليم وما بعده.',
            'delivery-title': 'توصيل سريع وموثوق',
            'delivery-desc': 'احصل على منتجاتك بسرعة وأمان إلى عتبة داركم.',
            'delivery-feature1': 'توصيل في نفس اليوم / اليوم التالي',
            'delivery-feature2': 'شحن عالمي',
            'delivery-feature3': 'تتبع الطلب في الوقت الفعلي',
            'returns-title': 'إرجاع واسترداد سهل',
            'returns-desc': 'إرجاع بدون متاعب واسترداد سريع لراحة بالك.',
            'returns-feature1': 'سياسة إرجاع 7 أيام أو 30 يومًا',
            'returns-feature2': 'إرجاع مجاني',
            'returns-feature3': 'معالجة سريعة للمبالغ المستردة',
            'payments-title': 'مدفوعات آمنة',
            'payments-desc': 'معاملاتك محمية بأمان على مستوى الصناعة.',
            'payments-feature1': 'دفع آمن SSL',
            'payments-feature2': 'طرق دفع متعددة',
            'payments-feature3': 'حماية من الاحتيال',
            'support-title': 'دعم العملاء 24/7',
            'support-desc': 'نحن دائمًا هنا لمساعدتك في أي أسئلة أو استفسارات.',
            'support-feature1': 'دردشة مباشرة',
            'support-feature2': 'دعم البريد الإلكتروني',
            'support-feature3': 'دعم هاتفي',
            'warranty-title': 'ضمان المنتج',
            'warranty-desc': 'جميع منتجاتنا تأتي مع ضمان لحمايتك.',
            'warranty-feature1': 'ضمان لمدة عام',
            'warranty-feature2': 'ضمان الاستبدال',
            'warranty-feature3': 'منتجات أصلية',
            'tracking-title': 'تتبع الطلب',
            'tracking-desc': 'تابع طردك في كل خطوة حتى وصوله.',
            'tracking-feature1': 'تتبع من لوحة التحكم',
            'tracking-feature2': 'تحديثات الشحن عبر الرسائل القصيرة / البريد الإلكتروني',
            'tracking-feature3': 'تتبع الموقع في الوقت الفعلي',
            'contact-title': 'اتصل بنا',
            'name-label': 'الاسم:',
            'email-label': 'البريد الإلكتروني:',
            'message-label': 'الرسالة:',
            'send': 'إرسال',
            'rights': 'جميع الحقوق محفوظة.',
            'currency': 'SAR',
            
            // ===== SHIPPING ADDRESS TRANSLATIONS =====
            'shipping-address': 'عنوان الشحن',
            'first-name': 'الاسم الأول',
            'last-name': 'اسم العائلة',
            'address-line1': 'العنوان السطر 1',
            'address-line2': 'العنوان السطر 2 (اختياري)',
            'city': 'المدينة',
            'state': 'الولاية / المقاطعة',
            'zip-code': 'الرمز البريدي',
            'country': 'الدولة',
            'phone': 'رقم الهاتف',
            'confirmation-email': 'البريد الإلكتروني لتأكيد الطلب',
            'email-note': 'سنرسل تأكيد طلبك ومعلومات التتبع إلى هذا البريد الإلكتروني',
            'save-address': 'حفظ هذا العنوان للطلبات المستقبلية',
            'fill-shipping-details': 'الرجاء ملء جميع تفاصيل الشحن',
            'valid-email': 'الرجاء إدخال بريد إلكتروني صحيح'
        }
    };

    // ========== MOBILE MENU TOGGLE ==========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (mobileToggle) mobileToggle.textContent = '☰';
            });
        });
    }
    
    // ========== HIDE/SHOW HEADER ON SCROLL ==========
    if (header) {
        let lastScrollTop = 0;
        const headerHeight = header.offsetHeight;
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (!nav || !nav.classList.contains('active')) {
                if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                    header.classList.add('hide-header');
                } else {
                    header.classList.remove('hide-header');
                }
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
    
    // ========== SECTION NAVIGATION ==========
    const productsSection = document.getElementById('products-section');
    const aboutSection = document.getElementById('about');
    const servicesSection = document.getElementById('services');
    const contactSection = document.getElementById('contact');
    const homeSection = document.getElementById('home');
    const coverSection = document.querySelector('.cover');
    const footer = document.querySelector('footer');
    const cartSection = document.getElementById('cart');
    const paymentSection = document.getElementById('payment');
    
    function hideAllSections() {
        if (productsSection) productsSection.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'none';
        if (servicesSection) servicesSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';
        if (cartSection) cartSection.style.display = 'none';
        if (paymentSection) paymentSection.style.display = 'none';
        
        const trustSection = document.querySelector('.trust-section');
        if (trustSection) {
            trustSection.style.display = 'none';
        }
    }
    
    function showSection(sectionId) {
        hideAllSections();
        
        if (homeSection) homeSection.style.display = 'block';
        if (coverSection) coverSection.style.display = 'block';
        if (footer) footer.style.display = 'block';
        
        const trustSection = document.querySelector('.trust-section');
        if (trustSection) {
            if (sectionId === 'services') {
                trustSection.style.display = 'flex';
            } else {
                trustSection.style.display = 'none';
            }
        }
        
        if (sectionId === 'products' && productsSection) {
            productsSection.style.display = 'block';
        } else if (sectionId === 'about' && aboutSection) {
            aboutSection.style.display = 'block';
        } else if (sectionId === 'services' && servicesSection) {
            servicesSection.style.display = 'block';
        } else if (sectionId === 'contact' && contactSection) {
            contactSection.style.display = 'block';
        } else if (sectionId === 'cart' && cartSection) {
            cartSection.style.display = 'block';
        } else if (sectionId === 'payment' && paymentSection) {
            paymentSection.style.display = 'block';
        }
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const sectionId = href.replace('#', '');
            
            if (sectionId === 'home') {
                hideAllSections();
                if (homeSection) homeSection.style.display = 'block';
                if (coverSection) coverSection.style.display = 'block';
                if (footer) footer.style.display = 'block';
                
                const trustSection = document.querySelector('.trust-section');
                if (trustSection) trustSection.style.display = 'none';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                e.preventDefault();
                showSection(sectionId);
                setTimeout(() => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        window.scrollTo({
                            top: section.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon a');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('cart');
            setTimeout(() => {
                if (cartSection) {
                    window.scrollTo({
                        top: cartSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    }
    
    // ========== CATEGORY FILTERING ==========
    const categoryItems = document.querySelectorAll('.category-list li');
    const defaultProducts = document.getElementById('default-products');
    const categoryContainers = document.querySelectorAll('.category-products');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryItems.forEach(cat => {
                cat.style.background = '';
                cat.querySelector('span:last-child').textContent = '+';
            });
            
            this.style.background = 'rgba(52, 152, 219, 0.1)';
            this.querySelector('span:last-child').textContent = '−';
            
            if (defaultProducts) {
                defaultProducts.style.display = 'none';
            }
            
            categoryContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            const selectedCategory = document.getElementById(`${category}-products`);
            if (selectedCategory) {
                selectedCategory.style.display = 'grid';
            }
        });
    });
    
    // Show mobile products by default
    const mobileCategory = document.querySelector('[data-category="mobile"]');
    if (mobileCategory) {
        setTimeout(() => {
            mobileCategory.click();
        }, 100);
    }
    
    // ========== CONTACT FORM ==========
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            alert(translations[currentLang]['send'] + ' (Demo)');
            this.reset();
        });
    }
    
    // ========== CART FUNCTIONALITY ==========
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateStockFromCart();
        updateCartDisplay();
    }
    
    // Initialize stock for all products
    function initializeProductStock() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('.cart-btn')?.getAttribute('data-product');
            if (productName && !productStock[productName]) {
                productStock[productName] = 4;
            }
        });
    }
    initializeProductStock();
    
    function updateStockFromCart() {
        for (let product in productStock) {
            productStock[product] = 4;
        }
        
        cart.forEach(item => {
            if (productStock[item.name] !== undefined) {
                productStock[item.name] -= item.quantity;
            }
        });
        
        updateStockUI();
    }
    
    function updateStockUI() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('.cart-btn')?.getAttribute('data-product');
            if (productName && productStock[productName] !== undefined) {
                const stockLeft = productStock[productName];
                
                let stockElement = card.querySelector('.stock-count');
                if (!stockElement) {
                    stockElement = document.createElement('div');
                    stockElement.className = 'stock-count';
                    card.insertBefore(stockElement, card.querySelector('.price'));
                }
                
                if (stockLeft <= 0) {
                    card.classList.add('out-of-stock');
                    stockElement.innerHTML = `<span>OUT OF STOCK</span>`;
                } else {
                    card.classList.remove('out-of-stock');
                    stockElement.innerHTML = `<span>${stockLeft}</span> left in stock`;
                }
            }
        });
    }
    
    function getTotalItems() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    function updateCartTotal() {
        const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalElement) {
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            const currency = currencyRates[currentLang];
            const convertedTotal = totalUSD * currency.rate;
            cartTotalElement.textContent = `${currency.symbol}${convertedTotal.toFixed(2)}`;
        }
        return totalUSD;
    }
    
    function updateCartDisplay() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        
        if (cart.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="5" class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>${translations[currentLang]['cart-title']} ${translations[currentLang]['is-empty'] || 'is empty'}</p>
                </td>
            `;
            cartItemsContainer.appendChild(emptyRow);
        } else {
            const currency = currencyRates[currentLang];
            
            cart.forEach((item, index) => {
                const itemTotalUSD = item.price * item.quantity;
                const itemTotalConverted = itemTotalUSD * currency.rate;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="product-info">
                            <img src="${item.image}" alt="${item.name}">
                            <span class="product-name">${item.name}</span>
                        </div>
                    </td>
                    <td>${currency.symbol}${(item.price * currency.rate).toFixed(2)}</td>
                    <td>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td>${currency.symbol}${itemTotalConverted.toFixed(2)}</td>
                    <td>
                        <button class="remove-btn" data-index="${index}">${translations[currentLang]['action'] || 'Remove'}</button>
                    </td>
                `;
                cartItemsContainer.appendChild(row);
            });
        }
        
        if (cartCount) {
            cartCount.textContent = getTotalItems();
        }
        
        updateCartTotal();
        localStorage.setItem('cart', JSON.stringify(cart));
        
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    productStock[cart[index].name] = (productStock[cart[index].name] || 0) + 1;
                    updateStockUI();
                    updateCartDisplay();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const productName = cart[index].name;
                
                if (productStock[productName] > 0) {
                    cart[index].quantity++;
                    productStock[productName]--;
                    updateStockUI();
                    updateCartDisplay();
                } else {
                    alert('This product is out of stock!');
                }
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const productName = cart[index].name;
                
                productStock[productName] = (productStock[productName] || 0) + cart[index].quantity;
                cart.splice(index, 1);
                updateStockUI();
                updateCartDisplay();
            });
        });
    }
    
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productCard = this.closest('.product-card');
            const productImage = productCard ? productCard.querySelector('.product-image').src : '';
            
            if (productStock[productName] <= 0) {
                alert('This product is out of stock!');
                return;
            }
            
            const existingItemIndex = cart.findIndex(item => item.name === productName);
            
            if (existingItemIndex !== -1) {
                if (productStock[productName] > 0) {
                    cart[existingItemIndex].quantity += 1;
                    productStock[productName]--;
                } else {
                    alert('Cannot add more - out of stock!');
                    return;
                }
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                productStock[productName] = (productStock[productName] || 4) - 1;
            }
            
            updateStockUI();
            updateCartDisplay();
            
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            showToast(`${productName} ${translations[currentLang]['add-to-cart'] || 'added to cart'}!`);
        });
    });
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            if (productsSection) {
                productsSection.style.display = 'block';
                hideAllSections();
                productsSection.style.display = 'block';
                window.scrollTo({
                    top: productsSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            
            if (cart.length === 0) {
                alert(translations[currentLang]['cart-title'] + ' ' + (translations[currentLang]['is-empty'] || 'is empty'));
                return;
            }
            
            updatePaymentSummary();
            showSection('payment');
            setTimeout(() => {
                if (paymentSection) {
                    window.scrollTo({
                        top: paymentSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    }
    
    // ========== PAYMENT FUNCTIONALITY ==========

    function addToRecentOrders(orderNumber) {
        let recentOrders = JSON.parse(localStorage.getItem('recent-orders')) || [];
        if (!recentOrders.includes(orderNumber)) {
            recentOrders.unshift(orderNumber);
            if (recentOrders.length > 5) recentOrders.pop();
            localStorage.setItem('recent-orders', JSON.stringify(recentOrders));
        }
    }

    function saveCompletedOrder(orderNumber, total, itemCount) {
        const orders = JSON.parse(localStorage.getItem('completed-orders')) || [];
        orders.push({
            orderNumber: orderNumber,
            date: new Date().toISOString(),
            total: total,
            itemCount: itemCount
        });
        localStorage.setItem('completed-orders', JSON.stringify(orders));
        addToRecentOrders(orderNumber);
    }

    // Payment method switching
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById('card-form');
    const mbwayForm = document.getElementById('mbway-form');
    const googlepayInfo = document.getElementById('googlepay-info');
    const applepayInfo = document.getElementById('applepay-info');
    const paypalInfo = document.getElementById('paypal-info');

    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (cardForm) cardForm.style.display = 'none';
                if (mbwayForm) mbwayForm.style.display = 'none';
                if (googlepayInfo) googlepayInfo.style.display = 'none';
                if (applepayInfo) applepayInfo.style.display = 'none';
                if (paypalInfo) paypalInfo.style.display = 'none';
                
                const value = this.value;
                if (value === 'card' && cardForm) {
                    cardForm.style.display = 'block';
                } else if (value === 'mbway' && mbwayForm) {
                    mbwayForm.style.display = 'block';
                } else if (value === 'google-pay' && googlepayInfo) {
                    googlepayInfo.style.display = 'block';
                } else if (value === 'apple-pay' && applepayInfo) {
                    applepayInfo.style.display = 'block';
                } else if (value === 'paypal' && paypalInfo) {
                    paypalInfo.style.display = 'block';
                }
            });
        });
    }

    function updatePaymentSummary() {
        const orderItems = document.getElementById('order-items');
        const paymentSubtotal = document.getElementById('payment-subtotal');
        const paymentTotal = document.getElementById('payment-total');
        
        if (!orderItems || !paymentSubtotal || !paymentTotal) return;
        
        orderItems.innerHTML = '';
        
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const currency = currencyRates[currentLang];
        
        if (cart.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-cart-message';
            emptyMessage.innerHTML = `<p>${translations[currentLang]['cart-title']} ${translations[currentLang]['is-empty'] || 'is empty'}</p>`;
            orderItems.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                const itemTotalUSD = item.price * item.quantity;
                const itemTotalConverted = itemTotalUSD * currency.rate;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'order-item-payment';
                itemElement.innerHTML = `
                    <div class="order-item-info">
                        <h4>${item.name}</h4>
                        <p>${translations[currentLang]['quantity']}: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">${currency.symbol}${itemTotalConverted.toFixed(2)}</div>
                `;
                orderItems.appendChild(itemElement);
            });
        }
        
        const subtotalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const subtotalConverted = subtotalUSD * currency.rate;
        const shipping = 5.99 * currency.rate;
        const totalConverted = subtotalConverted + shipping;
        
        paymentSubtotal.textContent = `${currency.symbol}${subtotalConverted.toFixed(2)}`;
        paymentTotal.textContent = `${currency.symbol}${totalConverted.toFixed(2)}`;
    }

    const backToCartBtn = document.querySelector('.back-to-cart');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('cart');
            setTimeout(() => {
                if (cartSection) {
                    window.scrollTo({
                        top: cartSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    }

    // ========== SINGLE PAY NOW BUTTON ==========
    const payNowBtn = document.querySelector('.pay-now-btn');
    if (payNowBtn) {
        payNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            if (!selectedPayment) {
                const currentLang = localStorage.getItem('preferred-language') || 'en';
                alert(translations[currentLang]['select-payment'] || 'Please select a payment method');
                return;
            }
            
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            const currency = currencyRates[currentLang];
            const totalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const totalConverted = totalUSD * currency.rate;
            
            let paymentMethod = selectedPayment.value;

            // ===== SHIPPING ADDRESS VALIDATION =====
            const firstName = document.getElementById('first-name')?.value;
            const lastName = document.getElementById('last-name')?.value;
            const addressLine1 = document.getElementById('address-line1')?.value;
            const city = document.getElementById('city')?.value;
            const state = document.getElementById('state')?.value;
            const zipCode = document.getElementById('zip-code')?.value;
            const country = document.getElementById('country')?.value;
            const phone = document.getElementById('phone')?.value;
            const confirmEmail = document.getElementById('confirmation-email')?.value;

            if (!firstName || !lastName || !addressLine1 || !city || !state || !zipCode || !country || !phone || !confirmEmail) {
                alert(translations[currentLang]['fill-shipping-details'] || 'Please fill in all shipping details');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(confirmEmail)) {
                alert(translations[currentLang]['valid-email'] || 'Please enter a valid email address');
                return;
            }

            // Save address if checkbox is checked
            const saveAddress = document.getElementById('save-address')?.checked;
            if (saveAddress) {
                const shippingAddress = {
                    firstName, lastName, addressLine1,
                    addressLine2: document.getElementById('address-line2')?.value,
                    city, state, zipCode, country, phone
                };
                localStorage.setItem('saved-shipping-address', JSON.stringify(shippingAddress));
            }

            // Payment method validation
            if (paymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number')?.value;
                const expiry = document.getElementById('expiry')?.value;
                const cvv = document.getElementById('cvv')?.value;
                const cardName = document.getElementById('card-name')?.value;
                
                if (!cardNumber || !expiry || !cvv || !cardName) {
                    alert(translations[currentLang]['fill-card-details'] || 'Please fill in all card details');
                    return;
                }
            } else if (paymentMethod === 'mbway') {
                const phone = document.getElementById('mbway-phone')?.value;
                if (!phone) {
                    alert(translations[currentLang]['enter-phone'] || 'Please enter your phone number');
                    return;
                }
            }
            
            const orderNumber = 'SNOW-' + Math.floor(10000000 + Math.random() * 90000000);
            
            saveCompletedOrder(orderNumber, totalConverted, getTotalItems());
            addToRecentOrders(orderNumber);
            
            showPaymentSuccessModal(orderNumber, currency, totalConverted);
            
            cart = [];
            updateCartDisplay();
            initializeProductStock();
            updateStockUI();
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function showPaymentSuccessModal(orderNumber, currency, total) {
        const modal = document.getElementById('payment-success-modal');
        const orderDisplay = document.getElementById('order-number-display');
        
        if (orderDisplay) {
            orderDisplay.textContent = orderNumber;
        }
        
        if (modal) {
            modal.style.display = 'flex';
        }
        
        const continueBtn = document.querySelector('.continue-shopping-btn');
        if (continueBtn) {
            const newContinueBtn = continueBtn.cloneNode(true);
            continueBtn.parentNode.replaceChild(newContinueBtn, continueBtn);
            
            newContinueBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                
                const paymentSection = document.getElementById('payment');
                const homeSection = document.getElementById('home');
                const coverSection = document.querySelector('.cover');
                const footer = document.querySelector('footer');
                
                if (paymentSection) paymentSection.style.display = 'none';
                if (homeSection) homeSection.style.display = 'block';
                if (coverSection) coverSection.style.display = 'block';
                if (footer) footer.style.display = 'block';
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    function updatePrices(lang) {
        const currency = currencyRates[lang];
        if (!currency) return;
        
        document.querySelectorAll('.price').forEach(priceElement => {
            let usdPrice = parseFloat(priceElement.getAttribute('data-usd-price'));
            
            if (isNaN(usdPrice)) {
                const priceText = priceElement.textContent;
                const match = priceText.match(/\d+(\.\d+)?/);
                if (match) {
                    usdPrice = parseFloat(match[0]);
                    priceElement.setAttribute('data-usd-price', usdPrice);
                }
            }
            
            if (!isNaN(usdPrice)) {
                const convertedPrice = usdPrice * currency.rate;
                priceElement.textContent = `${currency.symbol}${convertedPrice.toFixed(2)}`;
            }
        });
    }

    function updateAllText(lang) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', translations[lang][key]);
                    } else {
                        element.value = translations[lang][key];
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // ========== LANGUAGE SELECTOR ==========
    document.querySelectorAll('.price').forEach(priceElement => {
        const priceText = priceElement.textContent;
        const match = priceText.match(/\d+(\.\d+)?/);
        if (match) {
            priceElement.setAttribute('data-usd-price', match[0]);
        }
    });
    
    function changeLanguage(lang) {
        console.log('Changing language to:', lang);
        updateAllText(lang);
        
        const langBtnSpan = document.querySelector('.lang-btn span');
        if (langBtnSpan) {
            let displayLang = '';
            if (lang === 'en') displayLang = 'EN';
            else if (lang === 'pt') displayLang = 'PT';
            else if (lang === 'es') displayLang = 'ES';
            else if (lang === 'fr') displayLang = 'FR';
            else if (lang === 'bn') displayLang = 'বাংলা';
            else if (lang === 'ar') displayLang = 'العربية';
            langBtnSpan.textContent = displayLang;
        }
        
        updatePrices(lang);
        
        if (cart && cart.length > 0) {
            updateCartDisplay();
        }
        
        if (document.getElementById('payment') && document.getElementById('payment').style.display === 'block') {
            updatePaymentSummary();
        }
        
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
        }
        
        localStorage.setItem('preferred-language', lang);
    }
    
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            
            const dropdown = document.querySelector('.lang-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
                setTimeout(() => {
                    dropdown.style.display = '';
                }, 200);
            }
        });
    });
    
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    changeLanguage(savedLang);
    
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isVisible = langDropdown.style.display === 'block';
            langDropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        document.addEventListener('click', function(e) {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.style.display = 'none';
            }
        });
    }

    // ========== AI CHAT BOT ==========
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotModal = document.getElementById('chatbot-modal');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    if (chatbotToggle && chatbotModal) {
        const trustItems = document.querySelectorAll('.trust-item');
        trustItems.forEach(item => {
            const itemText = item.textContent || item.innerText;
            if (itemText.includes('24/7') || itemText.includes('Support')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    chatbotToggle.style.display = 'flex';
                    setTimeout(() => {
                        chatbotModal.style.display = 'block';
                        chatbotToggle.style.display = 'none';
                    }, 300);
                });
            }
        });
        
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const cardText = card.textContent || card.innerText;
            if (cardText.includes('24/7') || cardText.includes('Customer Support')) {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    chatbotToggle.style.display = 'flex';
                    setTimeout(() => {
                        chatbotModal.style.display = 'block';
                        chatbotToggle.style.display = 'none';
                    }, 300);
                });
            }
        });
        
        chatbotToggle.addEventListener('click', function() {
            chatbotModal.style.display = 'block';
            chatbotToggle.style.display = 'none';
        });
        
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                chatbotModal.style.display = 'none';
                chatbotToggle.style.display = 'flex';
            });
        }
        
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message === '') return;
            
            addMessage(message, 'user');
            chatbotInput.value = '';
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = getAIResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }
        
        if (chatbotSend) {
            chatbotSend.addEventListener('click', sendMessage);
        }
        
        if (chatbotInput) {
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        quickQuestions.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                let message = '';
                
                switch(question) {
                    case 'shipping':
                        message = 'Tell me about your shipping options';
                        break;
                    case 'returns':
                        message = 'What is your return policy?';
                        break;
                    case 'payment':
                        message = 'What payment methods do you accept?';
                        break;
                    case 'warranty':
                        message = 'Tell me about product warranty';
                        break;
                }
                
                chatbotInput.value = message;
                sendMessage();
            });
        });
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = text;
            
            messageDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typing-indicator';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
            
            typingDiv.appendChild(contentDiv);
            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        function removeTypingIndicator() {
            const typing = document.getElementById('typing-indicator');
            if (typing) {
                typing.remove();
            }
        }
        
        function getAIResponse(message) {
            const lowerMsg = message.toLowerCase();
            
            if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery') || lowerMsg.includes('deliver')) {
                return "📦 We offer worldwide shipping! Standard delivery takes 3-7 business days. Express shipping (1-3 days) is available for an additional fee. Free shipping on orders over $50!";
            } else if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
                return "🔄 You can return any item within 30 days of delivery for a full refund. Items must be unused and in original packaging. We also offer free returns!";
            } else if (lowerMsg.includes('payment') || lowerMsg.includes('pay') || lowerMsg.includes('card')) {
                return "💳 We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Google Pay, Apple Pay, and MB WAY. All payments are 100% secure with SSL encryption!";
            } else if (lowerMsg.includes('warranty') || lowerMsg.includes('guarantee')) {
                return "🛡️ All our products come with a minimum 1-year manufacturer's warranty. Some products have extended warranty options available at checkout!";
            } else if (lowerMsg.includes('product') || lowerMsg.includes('item') || lowerMsg.includes('buy')) {
                return "🛍️ We have a wide range of products including smartphones, laptops, tablets, cameras, gaming consoles, headphones, smartwatches, and accessories. All products are 100% genuine!";
            } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
                return "💰 Prices vary by product. You can check individual product pages for current prices. We also have frequent sales and discounts!";
            } else if (lowerMsg.includes('track') || lowerMsg.includes('order') || lowerMsg.includes('where is my')) {
                return "📱 You can track your order from your account dashboard. You'll also receive SMS and email updates with tracking information once your order ships!";
            } else if (lowerMsg.includes('help') || lowerMsg.includes('support') || lowerMsg.includes('contact')) {
                return "🤝 Our 24/7 customer support team is here to help! You can reach us via live chat, email at support@snowfall.com, or call us at +1 (555) 123-4567.";
            } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
                return "👋 Hello! How can I assist you with your shopping today?";
            } else {
                return "I'm not sure I understand. Could you please rephrase? You can ask me about shipping, returns, payments, warranty, or products!";
            }
        }
        
        const style = document.createElement('style');
        style.textContent = `
            .typing-indicator .message-content span {
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #999;
                margin: 0 2px;
                animation: typing 1.4s infinite;
            }
            .typing-indicator .message-content span:nth-child(2) {
                animation-delay: 0.2s;
            }
            .typing-indicator .message-content span:nth-child(3) {
                animation-delay: 0.4s;
            }
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-5px); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
// ========== ORDER TRACKING ==========
    const returnsBtn = document.getElementById('returns-tracking-btn');
    const trackingModal = document.getElementById('order-tracking-modal');
    const trackingClose = document.querySelector('.tracking-close');
    const trackOrderBtn = document.getElementById('track-order-btn');
    const orderInput = document.getElementById('order-confirmation-input');
    const orderResult = document.getElementById('order-result');
    const recentOrdersList = document.getElementById('recent-orders-list');
    
    let recentOrdersList_ = JSON.parse(localStorage.getItem('recent-orders')) || [];
    
    function updateRecentOrders() {
        if (!recentOrdersList) return;
        
        recentOrdersList.innerHTML = '';
        if (recentOrdersList_.length === 0) {
            recentOrdersList.innerHTML = '<p style="color: #999;">No recent orders</p>';
            return;
        }
        
        recentOrdersList_.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'recent-order-item';
            orderItem.innerHTML = `<i class="fas fa-box"></i> ${order}`;
            orderItem.addEventListener('click', function() {
                orderInput.value = order;
                trackOrder(order);
            });
            recentOrdersList.appendChild(orderItem);
        });
    }
    
    function trackOrder(orderNumber) {
        const orders = JSON.parse(localStorage.getItem('completed-orders')) || [];
        const order = orders.find(o => o.orderNumber === orderNumber);
        
        if (order) {
            const orderDate = new Date(order.date);
            const today = new Date();
            const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
            const isWithinReturn = daysDiff <= 30;
            
            orderResult.innerHTML = `
                <div class="order-result-header">
                    <i class="fas fa-check-circle"></i>
                    <h4>Order Found!</h4>
                </div>
                <div class="order-details">
                    <div class="order-detail-row">
                        <span class="detail-label">Order Number:</span>
                        <span class="detail-value">${order.orderNumber}</span>
                    </div>
                    <div class="order-detail-row">
                        <span class="detail-label">Order Date:</span>
                        <span class="detail-value">${new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div class="order-detail-row">
                        <span class="detail-label">Total:</span>
                        <span class="detail-value">$${order.total.toFixed(2)}</span>
                    </div>
                    <div class="order-detail-row">
                        <span class="detail-label">Items:</span>
                        <span class="detail-value">${order.itemCount}</span>
                    </div>
                    <div class="order-detail-row">
                        <span class="detail-label">Return Status:</span>
                        <span class="detail-value ${isWithinReturn ? 'return-eligible' : 'return-not-eligible'}">
                            ${isWithinReturn ? '✅ Eligible for return' : '❌ Return period expired'}
                        </span>
                    </div>
                </div>
                <div class="return-deadline">
                    ${isWithinReturn 
                        ? `⏰ You have ${30 - daysDiff} days left to return this order.` 
                        : `⏰ Return period ended ${daysDiff - 30} days ago.`}
                </div>
            `;
            orderResult.className = `order-result valid`;
        } else {
            orderResult.innerHTML = `
                <div class="order-result-header">
                    <i class="fas fa-exclamation-circle"></i>
                    <h4>Order Not Found</h4>
                </div>
                <p style="color: #666; margin-top: 10px;">No order found with number: ${orderNumber}</p>
                <p style="color: #666; margin-top: 5px;">Please check your order confirmation email or try again.</p>
            `;
            orderResult.className = `order-result invalid`;
        }
        
        orderResult.style.display = 'block';
    }
    
    // 30-Day Returns button - OPENS ORDER TRACKING (OLD FUNCTIONALITY)
    if (returnsBtn) {
        returnsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            trackingModal.style.display = 'block';
            updateRecentOrders();
        });
    }
    
    if (trackingClose) {
        trackingClose.addEventListener('click', function() {
            trackingModal.style.display = 'none';
            orderResult.style.display = 'none';
            orderInput.value = 'SNOW-';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === trackingModal) {
            trackingModal.style.display = 'none';
            orderResult.style.display = 'none';
            orderInput.value = 'SNOW-';
        }
    });
    
    if (trackOrderBtn) {
        trackOrderBtn.addEventListener('click', function() {
            const orderNumber = orderInput.value.trim();
            if (orderNumber && orderNumber !== 'SNOW-') {
                trackOrder(orderNumber);
            } else {
                alert('Please enter a valid order number');
            }
        });
    }
    
    if (orderInput) {
        orderInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const orderNumber = orderInput.value.trim();
                if (orderNumber && orderNumber !== 'SNOW-') {
                    trackOrder(orderNumber);
                }
            }
        });
    }

    // ========== RETURNS FUNCTIONALITY ==========
    const returnsModal = document.getElementById('returns-modal');
    const returnsClose = document.querySelector('.returns-close');
    const returnShippingBtn = document.getElementById('return-shipping-btn'); // NEW BUTTON for Return Shipping $50
    let currentReturnStep = 1;
    let selectedReturnOrder = null;

    // Sample orders data (in real app, this would come from your orders)
    const sampleOrders = [
        {
            number: 'SNOW-12345678',
            date: '2026-03-01',
            total: 1299.00,
            items: [
                { name: 'iPhone 15 Pro', price: 999.00, quantity: 1, image: 'image/products/iPhone 15.png' },
                { name: 'Apple AirPods Max', price: 549.00, quantity: 1, image: 'image/products/Apple AirPods Max.png' }
            ]
        },
        {
            number: 'SNOW-87654321',
            date: '2026-02-15',
            total: 2199.00,
            items: [
                { name: 'MacBook Air M2', price: 1199.00, quantity: 1, image: 'image/products/MacBook Air M2.png' },
                { name: 'iPad Pro 12.9 M2', price: 1099.00, quantity: 1, image: 'image/products/iPad Pro M2.png' }
            ]
        }
    ];

    // Return Shipping $50 button - OPENS RETURNS MODAL (NEW FUNCTIONALITY)
    if (returnShippingBtn) {
        returnShippingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            returnsModal.style.display = 'block';
            resetReturnForm();
        });
    }

    // Close returns modal
    if (returnsClose) {
        returnsClose.addEventListener('click', function() {
            returnsModal.style.display = 'none';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === returnsModal) {
            returnsModal.style.display = 'none';
        }
    });

    // Reset return form
    function resetReturnForm() {
        currentReturnStep = 1;
        document.getElementById('return-step-1').classList.remove('hidden');
        document.getElementById('return-step-2').classList.add('hidden');
        document.getElementById('return-step-3').classList.add('hidden');
        document.getElementById('return-step-4').classList.add('hidden');
        
        document.getElementById('step1').classList.add('active');
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.remove('active');
        document.getElementById('step4').classList.remove('active');
        
        document.getElementById('return-prev-btn').disabled = true;
        document.getElementById('order-preview').style.display = 'none';
        document.getElementById('return-order-number').value = '';
    }

    // Search order
    document.getElementById('search-order-btn')?.addEventListener('click', function() {
        const orderNumber = document.getElementById('return-order-number').value.trim();
        if (!orderNumber) {
            alert('Please enter an order number');
            return;
        }
        
        // Find order in sample data
        const order = sampleOrders.find(o => o.number === orderNumber);
        
        if (order) {
            selectedReturnOrder = order;
            document.getElementById('preview-order-number').textContent = order.number;
            document.getElementById('preview-order-date').textContent = new Date(order.date).toLocaleDateString();
            document.getElementById('preview-order-total').textContent = `$${order.total.toFixed(2)}`;
            
            // Check if within 30 days
            const orderDate = new Date(order.date);
            const today = new Date();
            const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
            const eligibility = document.getElementById('return-eligibility');
            
            if (daysDiff <= 30) {
                eligibility.className = 'return-eligibility eligible';
                eligibility.innerHTML = `✅ Eligible for return (${30 - daysDiff} days left)`;
            } else {
                eligibility.className = 'return-eligibility not-eligible';
                eligibility.innerHTML = '❌ Return period expired (over 30 days)';
            }
            
            document.getElementById('order-preview').style.display = 'block';
        } else {
            alert('Order not found. Please check the order number.');
        }
    });

    // Load return items
    function loadReturnItems(order) {
        const container = document.getElementById('return-items-list');
        container.innerHTML = '';
        
        order.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'return-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="return-item-image">
                <div class="return-item-details">
                    <h4>${item.name}</h4>
                    <div class="return-item-price">$${item.price.toFixed(2)}</div>
                    <div class="return-item-quantity">
                        <span>Quantity to return:</span>
                        <select class="return-qty-${index}" data-price="${item.price}">
                            <option value="0">0</option>
                            <option value="1" selected>1</option>
                            ${item.quantity > 1 ? `<option value="2">2</option>` : ''}
                            ${item.quantity > 2 ? `<option value="3">3</option>` : ''}
                            ${item.quantity > 3 ? `<option value="4">4</option>` : ''}
                        </select>
                    </div>
                </div>
            `;
            container.appendChild(itemDiv);
            
            // Add change event to update totals
            itemDiv.querySelector('select').addEventListener('change', updateReturnTotals);
        });
        
        updateReturnTotals();
    }

    // Update return totals
    function updateReturnTotals() {
        let itemCount = 0;
        let totalAmount = 0;
        
        document.querySelectorAll('[class^="return-qty-"]').forEach(select => {
            const qty = parseInt(select.value);
            const price = parseFloat(select.getAttribute('data-price'));
            itemCount += qty;
            totalAmount += price * qty;
        });
        
        document.getElementById('return-item-count').textContent = itemCount;
        document.getElementById('return-amount').textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById('return-total').textContent = `$${(totalAmount + 5.99).toFixed(2)}`;
    }

    // Navigation
    const prevBtn = document.getElementById('return-prev-btn');
    const nextBtn = document.getElementById('return-next-btn');

    function updateReturnStep(step) {
        // Hide all steps
        document.getElementById('return-step-1').classList.add('hidden');
        document.getElementById('return-step-2').classList.add('hidden');
        document.getElementById('return-step-3').classList.add('hidden');
        document.getElementById('return-step-4').classList.add('hidden');
        
        // Show current step
        document.getElementById(`return-step-${step}`).classList.remove('hidden');
        
        // Update step indicators
        for (let i = 1; i <= 4; i++) {
            const stepEl = document.getElementById(`step${i}`);
            if (i < step) {
                stepEl.classList.add('completed');
                stepEl.classList.remove('active');
            } else if (i === step) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        }
        
        // Update buttons
        prevBtn.disabled = step === 1;
        
        if (step === 4) {
            nextBtn.textContent = 'Submit Return Request';
            nextBtn.classList.add('return');
        } else {
            nextBtn.textContent = 'Next →';
            nextBtn.classList.remove('return');
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentReturnStep === 1) {
                if (!selectedReturnOrder) {
                    alert('Please search and select an order first');
                    return;
                }
                loadReturnItems(selectedReturnOrder);
                currentReturnStep = 2;
                updateReturnStep(2);
            } else if (currentReturnStep === 2) {
                const itemCount = parseInt(document.getElementById('return-item-count').textContent);
                if (itemCount === 0) {
                    alert('Please select at least one item to return');
                    return;
                }
                currentReturnStep = 3;
                updateReturnStep(3);
            } else if (currentReturnStep === 3) {
                const reason = document.getElementById('return-reason-select').value;
                if (!reason) {
                    alert('Please select a return reason');
                    return;
                }
                
                // Update confirm screen
                document.getElementById('confirm-order-number').textContent = selectedReturnOrder.number;
                document.getElementById('confirm-item-count').textContent = 
                    document.getElementById('return-item-count').textContent + ' items';
                document.getElementById('confirm-refund-amount').textContent = 
                    document.getElementById('return-total').textContent;
                
                const reasonText = document.getElementById('return-reason-select').options[
                    document.getElementById('return-reason-select').selectedIndex
                ].text;
                document.getElementById('confirm-reason').textContent = reasonText;
                
                currentReturnStep = 4;
                updateReturnStep(4);
            } else if (currentReturnStep === 4) {
                const terms = document.getElementById('confirm-return-terms');
                if (!terms.checked) {
                    alert('Please confirm that you have read the return policy');
                    return;
                }
                
                // Generate return number
                const returnNumber = 'RET-' + Math.floor(10000000 + Math.random() * 90000000);
                document.getElementById('return-request-number').textContent = returnNumber;
                
                // Hide returns modal and show success modal
                returnsModal.style.display = 'none';
                document.getElementById('return-success-modal').style.display = 'block';
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentReturnStep > 1) {
                currentReturnStep--;
                updateReturnStep(currentReturnStep);
            }
        });
    }

    // View shipping label button
    document.getElementById('view-label-btn')?.addEventListener('click', function() {
        document.getElementById('return-success-modal').style.display = 'none';
        
        // Set label details
        document.getElementById('label-return-number').textContent = 
            document.getElementById('return-request-number').textContent;
        document.getElementById('label-order-number').textContent = 
            selectedReturnOrder?.number || 'SNOW-12345678';
        
        const customerName = document.getElementById('first-name')?.value || 'John Doe';
        const address = document.getElementById('address-line1')?.value || '123 Main Street';
        document.getElementById('label-from').textContent = `${customerName}, ${address}`;
        
        document.getElementById('shipping-label-modal').style.display = 'block';
    });

    // Close success modal
    document.querySelectorAll('.return-success-modal .return-btn').forEach(btn => {
        if (btn.id !== 'view-label-btn') {
            btn.addEventListener('click', function() {
                document.getElementById('return-success-modal').style.display = 'none';
            });
        }
    });

    // Close shipping label modal
    document.querySelectorAll('.shipping-label-modal .label-actions button').forEach(btn => {
        if (btn.classList.contains('label-download')) {
            btn.addEventListener('click', function() {
                alert('Label downloaded successfully! (Demo)');
            });
        }
    });

    // Close label modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('shipping-label-modal')) {
            document.getElementById('shipping-label-modal').style.display = 'none';
        }
        if (e.target === document.getElementById('return-success-modal')) {
            document.getElementById('return-success-modal').style.display = 'none';
        }
    });

});