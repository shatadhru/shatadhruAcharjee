// Unsplash API কল করার জন্য ফাংশন

const axios = require("axios");
async function searchPhotos(query) {
  const accessKey = "kw7jUnSWBKIag6g4wve3HwzJbvEEDEfvVi-GEVxnm-8"; // Unsplash থেকে পাওয়া Access Key
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: query, per_page: 1 }, // আপনার প্রয়োজন অনুযায়ী `query` এবং `per_page` সেট করুন
      headers: { Authorization: `Client-ID ${accessKey}` }, // Access Key যুক্ত করা
    });
    console.log(response.data.results); // রেসপন্স ডেটা প্রিন্ট করা
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// ফাংশন কল করা
searchPhotos("nature");


