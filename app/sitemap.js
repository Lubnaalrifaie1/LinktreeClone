import { collection, getDocs } from "firebase/firestore";
import { fireApp } from "@/important/firebase";

const staticRoutes= [
    {
        url: 'https://mylinks.lubnaalrifaie1.online',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: 'https://mylinks.lubnaalrifaie1.online/signup',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: 'https://mylinks.lubnaalrifaie1.online/login',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: 'https://mylinks.lubnaalrifaie1.online/freepalestine',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: 'https://mylinks.lubnaalrifaie1.online/lubnaalrifaie1',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    },
];

async function fetchUsernames() {
    const users= [];

    try {
        const collectionRef = collection(fireApp, "accounts");
        const querySnapshot = await getDocs(collectionRef);
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push({
                username: String(data.username).toLowerCase(),
                lastModified: doc.updateTime?.toDate().toISOString() || new Date().toISOString(),
            });
        });
    } catch (error) {
        console.error('Error fetching usernames:', error);
    }
    return users;
}

export default async function sitemap() {
    try {
        const users = await fetchUsernames();

        const userRoutes = users.map((user) => ({
            url: `https://mylinks.lubnaalrifaie1.online/${user.username}`,
            lastModified: new Date(user.lastModified || new Date()),
            changeFrequency: 'daily',
            priority: 0.8,
        }));

        return [...staticRoutes, ...userRoutes, {
            url: `https://mylinks.lubnaalrifaie1.online/${users.length}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        }];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticRoutes;
    }
}
