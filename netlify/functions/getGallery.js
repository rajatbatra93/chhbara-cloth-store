// /netlify/functions/getGallery.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async function () {
  try {
    const result = await cloudinary.search
      .expression("folder:shop_uploads") // Adjust folder name if needed
      .sort_by("created_at", "desc")
      .max_results(20)
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result.resources),
    };
  } catch (error) {
    console.error("Cloudinary Search API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch media from Cloudinary" }),
    };
  }
};