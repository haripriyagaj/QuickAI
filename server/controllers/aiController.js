import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import cloudinary from "../configs/cloudinary.js";
import axios from "axios";
import FormData from "form-data";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

/**
 * Generate an Article (text)
 */
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return res.json({ success: true, content });
  } catch (error) {
    console.error("GenerateArticle error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

/**
 * Generate Blog Title
 */
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content:prompt ,}],
      temperature: 0.7,
      max_tokens: 100,
    });

    const titles = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${titles}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return res.json({ success: true, titles });
  } catch (error) {
    console.error("GenerateBlogTitle error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

/**
 * Generate an Image
 */
export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }
    const formData = new FormData()
    formData.append('prompt',prompt)
    const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,
      { headers:{'x-api-key':process.env.CLIPDROP_API_KEY,}, responseType:"arraybuffer", })

    // ⚡ Use OpenAI Image API (NOT Gemini)
    

    const base64Image = `data:image/png;base64,${Buffer.from(data,'binary').
      toString('base64')}`; 
      const {secure_url}= await cloudinary.uploader.upload(base64Image)

   

    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image')
    `;

    

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("GenerateImage error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

