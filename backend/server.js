require("dotenv").config();

const express = require("express");
const cors = require('cors');
const supabase = require("./supabaseClient");

const port = process.env.PORT || 3300;

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3300", "http://localhost:5173"],
    })
);
app.use(express.json());


app.get('/cafe-items', async (_req, res) => {
    const {data, error} = await supabase
        .from('cafe_items')
        .select('*')
    
    if(error){
        return res.status(500).json({ message: error.message });
    }
    
    res.send(data)
})


app.get('/cafe-items/id/:id', async (req, res) => {
    try{
        const reqId = Number(req.params.id);
    
        const { data, error: itemError } = await supabase
            .from("cafe_items")
            .select("*")
            .eq("id", reqId)
            .single();
    
    
        if(itemError){
            return res.status(404).json({ message: 'ID does not exist' })
        }
    
        res.json(data)

    }catch(err){
        return res.status(500).json({ message: err.message })
    }
})


app.post('/cafe-items', async (req, res) => {
    try{
        let { name, price, available, category, calories } = req.body;
    
        if(!name || !price || !category){
            return res.status(400).json({ message: 'Enter all required fields: name, price, category' })
        };

        name = name.toLowerCase().trim();
        category = category.toLowerCase().trim();
        
        const {data, error: insertError} = await supabase.from('cafe_items').insert([{ name, price, available, category, calories }]).select()

        if(insertError){
            // return res.status(409).json({ message: insertError.message });
            return res.status(409).json({ message: `${name} already exists` });
        }

        res.status(201).json({ message: `${name} sucessfully created`, item: data[0] })

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
})


app.delete('/cafe-items/id/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { data, error: deleteError } = await supabase
        .from("cafe_items")
        .delete()
        .eq("id", id)
        .select();

    if(deleteError){
        return res.status(500).json({ message: deleteError.message });
    }

    if(!data || data === null || data === undefined || data.length === 0){
        return res.status(404).json({ message: `ID-${id} does not exist` })
    }

    res.status(200).json({ message: `succesfully deleted ID-${id}`, item: data[0] });
})


app.patch('/cafe-items/id/:id', async (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;

    const {data: existingItem, error: existingItemErr} = await supabase.from('cafe_items').select('*').eq('id', id).single();

    if(!existingItem || existingItemErr || existingItem.length === 0){
        return res.status(404).json({message: `ID-${id} does not exist`})
    }
    
    const changes = {}
    for(const key in updates){
        if (updates[key] !== existingItem[key]) {
            changes[key] = updates[key];
        }
    }
    if(Object.keys(changes).length === 0){
        return res.status(409).json({ message: "No updates were provided" });
    }

    const { data: updatedItem, error: updateError } = await supabase
        .from("cafe_items")
        .update(changes)
        .eq("id", id)
        .select();

    if(updateError){
        return res.status(500).json(updateError.message)
    }

    res.status(200).json({ message: "Succesfully updated", item: updatedItem[0] });

})
      

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})









// // 1. Collect user input
// const id = req.params.id;
// const updates = req.body;

// // 2. Sanitize user input
// if (updates.name) updates.name = updates.name.toLowerCase().trim();
// if (updates.category)
//     updates.category = updates.category.toLowerCase().trim();

// // 3. Retrieve currently existing item from database
// const { data: existingItem, err: itemErr } = await supabase
//     .from("cafe_items")
//     .select()
//     .eq("id", id)
//     .single();

// // 4. Handle errors - Non-existing ID submitted
// if (!existingItem || itemErr) {
//     return res.status(404).json({ message: `ID-${id} does not exist` });
// }

// // 5. Compare existingItem !== updates
// const changes = {};
// for (const key in updates) {
//     if (updates[key] !== existingItem[key]) {
//         changes[key] = updates[key];
//     }
// }

// // 6. Respond with an error if no changes are present
// if (changes.length === 0) {
//     return res.status(409).json({ message: "No changes were provided" });
// }

// // 7. Respond with an server/internal error if an error is presented
// if (itemErr) {
//     return res.status(500).json({ message: itemErr.message });
// }

// // 8. 
// const { updatedData, error: updatedError } = await supabase
//     .from("cafe_items")
//     .update(changes)
//     .eq("id", id)
//     .select();

// if (updatedError) {
//     return res.status(500).json({ message: updatedError.message });
// }

// res.status(200).json({ message: `Updated ID-${id}`, item: updatedData });