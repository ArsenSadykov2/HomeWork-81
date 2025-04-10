import express from 'express';
import {Error} from "mongoose";
import Link from "../models/Links";
import {nanoid} from "nanoid";
import {LinkWithoutId} from "../types";

const linkRouter = express.Router();

linkRouter.get('/', async (req, res, next) => {
    try{
        const links = await  Link.find();
        res.send(links);
    }catch(err){
        next(err);
    }
});

linkRouter.get('/:shortUrl', async (req, res, next) => {
    const id = req.params.shortUrl;
    try{
        const link = await  Link.findById(id);

        if(!link){
            res.status(404).send("Link not found");
            return;
        }

        res.status(301).redirect("https://www.google.com/");
    }catch(err){
        next(err);
    }
});


linkRouter.post('/', async (req, res, next) => {
    try {
        const originalUrl = req.body.originalUrl;

        if (!originalUrl) {
            return res.status(400).send({ error: 'URL is required' });
        }

        const shortUrl = nanoid(7);

        const newLink: LinkWithoutId = {
            shortUrl: shortUrl,
           originalUrl: originalUrl,
        };

        const link = new Link(newLink);
        await link.save();
        res.send(link);

    } catch (error) {
        if(error instanceof Error.ValidationError){
            res.status(400).send(error)
            return;
        }
        next(error);
    }
});
export default linkRouter;