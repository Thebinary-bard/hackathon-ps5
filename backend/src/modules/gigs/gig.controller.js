import {
    createGig,
    getAllGigs,
    getGigById,
    applyToGig,
    updateGigStatus,
} from "./gig.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
    const gig = await createGig(req.body, req.user.id);

    res.status(201).json({
        success: true,
        message: "Gig created",
        data: gig,
    });
});

export const getGigs = asyncHandler(async (req, res, next) => {
    const gigs = await getAllGigs();

    res.json({
        success: true,
        data: gigs,
    });
});

export const getGig = asyncHandler(async (req, res, next) => {
    const gig = await getGigById(req.params.id);

    res.json({
        success: true,
        data: gig,
    });
});

export const apply = asyncHandler(async (req, res, next) => {
    const gig = await applyToGig(req.params.id, req.user.id);

    res.json({
        success: true,
        message: "Applied successfully",
        data: gig,
    });
});

export const updateStatus = asyncHandler(async (req, res, next) => {
    const gig = await updateGigStatus(
        req.params.id,
        req.body.status
    );

    res.json({
        success: true,
        message: "Status updated",
        data: gig,
    });
});