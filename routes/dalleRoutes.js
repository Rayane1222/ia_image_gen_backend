import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';


dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: "sk-proj-ru5eTjMfHEaFek7llyiWT3BlbkFJYbma614RQjXmdaihpkdu",
});

router.route('/').get((req, res) => {
    res.send('Welcome tobj Dalle!');
});

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n:1,
            size:'1024x1024',
            response_format: 'b64_json' ,
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image});

    }catch(err){
        console.error(err);
        res.status(500).send(err?.response.data.error.message);
    }
})

export default router;
