import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // Clerk injects auth
    const { userId, has } = await req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // check subscription
    const hasPremiumPlan = await has({ plan: "premium" });

    // fetch user
    const user = await clerkClient.users.getUser(userId);

    // check or reset free usage
    if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
