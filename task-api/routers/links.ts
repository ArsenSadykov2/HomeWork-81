import express from 'express';
import {Error} from "mongoose";
import Link from "../models/Links";
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

linkRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const link = await  Link.findById(id);

        if(!link){
            res.status(404).send("Link not found");
            return;
        }

        res.send(link);
    }catch(err){
        next(err);
    }
});


linkRouter.post('/', async (req, res, next) => {
    try{
        const newLink: LinkWithoutId = {
            link: req.body.title,
        };

        const link = new Link(newLink);
        await link.save();
        res.send(link);
    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(400).send(error)
            return;
        }
        next(error);
    }

});

export default linkRouter;