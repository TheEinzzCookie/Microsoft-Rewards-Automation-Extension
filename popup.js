document.addEventListener('DOMContentLoaded', () => {
    const siteButton = document.getElementById('go-to-site');
    const closeButton = document.getElementById('close-tabs');
    const stageButton = document.getElementById('stage-button');
    const stageSelect = document.getElementById('stage-select');

    // Your list of keywords
    const keywords = [
        "recipe", "travel", "photography", "fitness", "yoga",
        "meditation", "gardening", "technology", "coding", "cryptocurrency",
        "fashion", "skincare", "mental health", "mindfulness", "productivity",
        "podcasts", "movies", "documentaries", "books", "history",
        "science", "art", "music", "cooking", "DIY",
        "home improvement", "pets", "wildlife", "hiking", "camping",
        "climate change", "sustainability", "recipes", "travel tips",
        "language learning", "online courses", "meditation techniques",
        "workout routines", "healthy eating", "meal prep", "photography tips",
        "digital marketing", "SEO", "social media", "graphic design",
        "web development", "app development", "artificial intelligence",
        "machine learning", "data analysis", "statistics", "personal finance",
        "investing", "stocks", "real estate", "budgeting", "retirement planning",
        "credit scores", "loans", "insurance", "taxes", "savings",
        "debt management", "side hustles", "entrepreneurship", "startups",
        "business models", "networking", "job interviews", "resumes",
        "cover letters", "career advice", "workplace culture", "leadership",
        "management", "team building", "conflict resolution", "public speaking",
        "communication skills", "negotiation", "critical thinking", "creativity",
        "innovation", "brainstorming", "goal setting", "time management",
        "work-life balance", "stress management", "emotional intelligence",
        "self-care", "hobbies", "crafts", "painting", "drawing",
        "knitting", "sewing", "woodworking", "metalworking", "pottery",
        "baking", "desserts", "smoothies", "snacks", "vegan recipes",
        "gluten-free", "paleo", "keto", "low-carb", "meal plans",
        "nutrition", "vitamins", "supplements", "hydration", "sleep hygiene",
        "wellness", "fitness challenges", "running", "cycling", "swimming",
        "sports", "team sports", "yoga poses", "stretching", "mindfulness exercises",
        "guided meditations", "affirmations", "journaling", "gratitude",
        "visualization", "self-improvement", "motivation", "inspiration",
        "quotes", "life hacks", "travel destinations", "cultural experiences",
        "language exchange", "international cuisine", "street food", "local attractions",
        "historical sites", "nature reserves", "wildlife safaris", "beach vacations",
        "mountain retreats", "city tours", "road trips", "adventure sports",
        "scuba diving", "skydiving", "zip-lining", "rock climbing", "surfing",
        "snowboarding", "skiing", "fishing", "hunting", "birdwatching",
        "stargazing", "astronomy", "astrology", "tarot", "crystals",
        "energy healing", "holistic health", "herbal remedies", "essential oils",
        "aromatherapy", "acupuncture", "chiropractic", "massage therapy",
        "reflexology", "wellness retreats", "spa treatments", "skincare routines",
        "beauty tips", "hair care", "makeup tutorials", "fashion trends",
        "outfit ideas", "wardrobe essentials", "thrift shopping", "sustainable fashion",
        "capsule wardrobe", "styling tips", "personal branding", "digital presence",
        "online safety", "privacy settings", "password management", "cybersecurity",
        "identity theft", "scams", "fraud prevention", "online shopping",
        "product reviews", "gadgets", "tech news", "gaming", "esports"
    ];

    let searchIntervalId; // To keep track of the interval ID

    siteButton.addEventListener('click', () => {
        const targetUrl = "https://rewards.bing.com"; // Replace with your target URL
        chrome.tabs.create({ url: targetUrl });
    });

    closeButton.addEventListener('click', async () => {
        const now = Date.now();
        const fiveMinutesAgo = now - 5 * 60 * 1000;

        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
            if (tab.lastAccessed >= fiveMinutesAgo) {
                chrome.tabs.remove(tab.id);
            }
        });
    });

    stageButton.addEventListener('click', () => {
        const selectedStage = stageSelect.value;

        if (selectedStage === 'stage1') {
            startStage1();
        } else if (selectedStage === 'stage2') {
            console.log("Starting Stage 2...");
            // Add your logic for Stage 2 here
        } else {
            console.log("No stage selected.");
        }
    });

    function startStage1() {
        console.log("Starting Stage 1...");
        const selectedKeywords = getRandomKeywords(keywords, 10);
        console.log("Selected Keywords: ", selectedKeywords);
        
        // Clear any previous interval if it's running
        if (searchIntervalId) {
            clearInterval(searchIntervalId);
        }

        performSearches(selectedKeywords, 10);
    }

    function getRandomKeywords(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function performSearches(keywords, count) {
        let searchCount = 0;
    
        searchIntervalId = setInterval(() => {
            if (searchCount < count) {
                const keyword = keywords[searchCount];
                const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`;
                chrome.tabs.create({ url: searchUrl });
                console.log(`Searching for: ${keyword}`); // Log the current search keyword
                searchCount++;
                console.log(`Search count incremented: ${searchCount}`); // Debug log
            } else {
                clearInterval(searchIntervalId);
                searchIntervalId = null; // Reset the interval ID
                console.log("Completed all searches.");
            }
        }, getRandomInterval(1000, 2000));
    }

    function getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});