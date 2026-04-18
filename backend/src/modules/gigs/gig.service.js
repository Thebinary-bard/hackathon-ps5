import { Gig } from "./gig.model.js";

export const createGig = async (data, userId) => {
    const gig = await Gig.create({ ...data, createdBy: userId });
    return gig;
};

export const getAllGigs = async () => {
    return await Gig.find().sort({ createdAt: -1 }).populate("createdBy", "name email");
};

export const getMyGigsForUser = async (userId) => {
    return await Gig.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const getGigById = async (gigId) => {
    const gig = await Gig.findById(gigId).populate("createdBy", "name email");
    if (!gig) throw new Error("Gig not found");
    return gig;
};

export const applyToGig = async (gigId, userId) => {
    const gig = await Gig.findById(gigId);
    if (!gig) throw new Error("Gig not found");
    if (gig.applicants.includes(userId)) throw new Error("Already applied");
    gig.applicants.push(userId);
    await gig.save();
    return gig;
};

export const updateGigById = async (gigId, userId, data) => {
    const gig = await Gig.findOneAndUpdate(
        { _id: gigId, createdBy: userId },
        { $set: data },
        { new: true, runValidators: true }
    );
    if (!gig) throw new Error("Gig not found or not authorized");
    return gig;
};

export const updateGigStatus = async (gigId, status) => {
    const gig = await Gig.findByIdAndUpdate(gigId, { status }, { new: true });
    if (!gig) throw new Error("Gig not found");
    return gig;
};

export const deleteGigById = async (gigId, userId) => {
    const gig = await Gig.findOneAndDelete({ _id: gigId, createdBy: userId });
    if (!gig) throw new Error("Gig not found or not authorized");
    return gig;
};