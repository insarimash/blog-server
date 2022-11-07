const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const {verify} = require('../token');

const router = express.Router();

const Post = mongoose.model('Post');

router.get('/', async (request, response) => {
    try{
        const posts = await Post.find();
        response.send(posts);
    } catch(e){
        response.status(500).send({message: e.message})
    }
})

router.get('/:id', async (request, response) => {
    try{
    const post = await Post.findById(request.params.id);
    response.send(post)
    } catch(e){
        response.status(400).send({message: e.message})
    }
})

router.post('/', async(request, reponse) =>{
    try{
        const token= request.headers.authorization;
        verify(token);

        const post = new Post({
            title: request.body.title,
            body: request.body.body,
        })
            await post.save();
            reponse.send(post)
    } catch(e){
        reponse.status(400).send({message: e.message});
    }
})

router.patch('/:id', async (request, reponse) => {
    try{
        const token= request.headers.authorization;
        verify(token);
        const post = await Post.findByIdAndUpdate(
            request.params.id, 
            request.body, 
            {new: true});
        reponse.send(post);
    } catch(e){
        reponse.status(400).send({message: e.message});
    }
    
})

router.delete('/:id', async (request, response) => {
    try{
        const token= request.headers.authorization;
        verify(token);
        const post = await Post.findByIdAndDelete(request.params.id);
        response.send(`post ${request.params.id} has been deleted`);
    }catch(e){
        response.status(400).send({message: e.message});
    }
})

module.exports = router;


