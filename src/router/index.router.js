const {Router}= require('express');
const router = Router();

//database
let products = [
    {id:'1', name:"laptop"},
    {id:'2', name:"mouse"}
];

router.get('/products',(req,res)=>{
    res.json(products)
})

router.post('/products',(req,res)=>{
    products.push({
        id:(products.length +1).toString(),
        name:req.body.name
    })
    res.json('product created')
})

router.delete('/products/:id',(req,res)=>{
    console.log(req.params.id)
    products = products.filter(p =>p.id!==req.params.id)
    res.json('deleted')
 
})

router.put('/products/:id',(req,res)=>{
    const {id} = req.params
    const {name} =req.body
    
    //products.map(p=>p.id===id ? {...name}:p)

    products.filter(p=>p.id===id)
            .map(product => product.name=name)

   res.json('update')
})

module.exports = router