const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Plan = require('../models/Plan');
const moment = require('moment');
// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('currentPlan');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate remaining images based on the current plan
    const plan = user.currentPlan || await Plan.findOne({ name: 'Basic' });
    const remainingImages = plan ? (plan.maxImages - (user.imagesProcessed || 0)) : 0;

    res.json({
      imagesProcessed: user.imagesProcessed || 0,
      remainingImages: Math.max(remainingImages, 0),
      subscription: {
        plan: user.currentPlan || { name: 'Free' },
        type: user.subscriptionType,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// Track usage
router.post('/track', auth, async (req, res) => {
  try {
    const { service, imageCount = 1 } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if subscription is expired
if (
  user.subscriptionEndDate &&
  new Date(user.subscriptionEndDate).getTime() < Date.now()
) {
  return res.status(403).json({ error: 'Your subscription plan has expired.' });
}

    // Ensure plan is populated
    let plan = user.currentPlan;
    if (!plan) {
      plan = await Plan.findOne({ name: 'Basic' });
      if (!plan) {
        plan = await Plan.create({
          name: 'Basic',
          monthlyFee: 0,
          annualFee: 0,
          services: [
  { name: 'optimize-compress', monthlyQuota: 3, annualQuota: 36 },
  { name: 'optimize-upscale', monthlyQuota: 3, annualQuota: 36 },
  { name: 'optimize-remove-background', monthlyQuota: 3, annualQuota: 36 },
  { name: 'create-meme', monthlyQuota: 3, annualQuota: 36 },
  { name: 'modify-resize', monthlyQuota: 3, annualQuota: 36 },
  { name: 'modify-crop', monthlyQuota: 3, annualQuota: 36 },
  { name: 'modify-rotate', monthlyQuota: 3, annualQuota: 36 },
  { name: 'convert-to-jpg', monthlyQuota: 3, annualQuota: 36 },
  { name: 'convert-from-jpg', monthlyQuota: 3, annualQuota: 36 },
  { name: 'convert-html-to-image', monthlyQuota: 3, annualQuota: 36 },
  { name: 'security-watermark', monthlyQuota: 3, annualQuota: 36 },
  { name: 'security-blur-face', monthlyQuota: 3, annualQuota: 36 },
  { name: 'convert-audio', monthlyQuota: 3, annualQuota: 36 },
  { name: 'convert-video', monthlyQuota: 3, annualQuota: 36 },
  { name: 'compress-video', monthlyQuota: 3, annualQuota: 36 },
  { name: 'compress-audio', monthlyQuota: 3, annualQuota: 36 },
]
        });
      }
    }

    const serviceConfig = plan.services?.find(s => s.name === service);
    if (!serviceConfig) {
      console.error(`Service ${service} not found in plan:`, plan);
      return res.status(400).json({ error: 'Service not available in current plan' });
    }

    const quota = user.subscriptionType === 'annual' ? serviceConfig.annualQuota : serviceConfig.monthlyQuota;
    const serviceUsage = user.usage?.find(u => u.service === service)?.count || 0;

    if (serviceUsage + imageCount > quota) {
      return res.status(403).json({ error: 'Image quota exceeded for this service' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $inc: { imagesProcessed: imageCount },
        $set: {
          'usage.$[elem].count': serviceUsage + imageCount,
          'usage.$[elem].lastReset': new Date()
        }
      },
      {
        new: true,
        runValidators: true,
        arrayFilters: [{ 'elem.service': service }],
        upsert: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      imagesProcessed: updatedUser.imagesProcessed,
      remainingImages: quota - (serviceUsage + imageCount)
    });

  } catch (error) {
    console.error('Error tracking usage:', error);
    res.status(500).json({ error: 'Failed to track usage' });
  }
});

module.exports = router; 