import { Gig } from "./gig.model.js";

/**
 * 🏢 Create gig (manual or AI-structured)
 */
export const createGig = async (data, userId) => {
    const gig = await Gig.create({
        ...data,
        createdBy: userId,
    });

    return gig;
};

/**
 * 📋 Get all gigs
 */
export const getAllGigs = async () => {
    return await Gig.find().sort({ createdAt: -1 });
};

/**
 * 🔍 Get single gig
 */
export const getGigById = async (gigId) => {
    const gig = await Gig.findById(gigId).populate("createdBy");

    if (!gig) throw new Error("Gig not found");

    return gig;
};

/**
 * 🙋 Apply to gig
 */
export const applyToGig = async (gigId, userId) => {
    const gig = await Gig.findById(gigId);

    if (!gig) throw new Error("Gig not found");

    if (gig.applicants.includes(userId)) {
        throw new Error("Already applied");
    }

    gig.applicants.push(userId);
    await gig.save();

    return gig;
};

/**
 * 🧹 Update gig status
 */
export const updateGigStatus = async (gigId, status) => {
    const gig = await Gig.findByIdAndUpdate(
        gigId,
        { status },
        { new: true }
    );

    return gig;
};