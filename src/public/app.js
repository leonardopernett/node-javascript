$(function(){
    const form = document.getElementById('form')
    const name = document.getElementById('name')
    const getProduct = document.getElementById('getProduct')
    const list = document.getElementById('list')
    
    
    const getallProduct = async()=>{
        const res= await fetch('/products',{
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await res.json()
       
        list.innerHTML=""
         data.forEach(product => {
             list.innerHTML += `
               <tr>
                <td class="id">${product.id}</td>
                <td>
                   <input class="name" type="text" value="${product.name}" />
                </td>
                <td>
                  <button class="delete" _id="${product.id}" >delete</button>
                  <button id="update" class="update" _id="${product.id}" >update</button>
                </td>
               </tr>
             `
         });
    }    
    
    const createProduct = async (e)=>{
       e.preventDefault()
    
       const formdata = new FormData()
       formdata.append('name', name.value)
    
       const newProduct ={
           name:name.value
       }
            const res = await fetch('/products',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            const data = await res.json()
            console.log(data)
            getallProduct();
            form.reset();
    }
    
    const deleteProduct = async(e)=>{
        if(e.target.classList.contains('delete')){
            const res = await fetch(`/products/${e.target.getAttribute('_id')}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json()
            console.log(data)
            getallProduct()
        }
    }
    
    

    $('#list').on('click', '.update',function(){
        let row = $(this).closest('tr');
        let id = row.find('.id').text()

        const product = {
            name:row.find('.name').val()
        }
        fetch(`/products/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            getallProduct();
        })
    })


    getProduct.addEventListener('click', getallProduct)
    form.addEventListener('submit',createProduct);
    list.addEventListener('click', deleteProduct)
})