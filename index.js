const express = require('express')
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())
/*
    - Query params => meusote.com/user?nome=roberio&age=36
    - Route params +> /users/32   // BUSCAR, DELETAR OU ATUALIZAR ALGOESPECIFICO.
    -Resques Body => { "name:"Roberio", "age":}

    - GET           => Buscar informação do beck-end
    - POST          => Criar informação no back-end
    - PUT / PACHT   => ALterar/Ataulizar informçao no back-end
    - DELETE        => Deletar informação no back-end
    
*/
const users = []

app.get('/users', (request, response) => {
        
    return response.json({users})
})

app.post('/users', (request, response) => {
    const { name, age} = request.body

    const user = {id: uuid.v4(), name, age}

    users.push(user)
    return response.status(201).json({user})
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age}

    const index = users.findIndex(user => user.id === id)

    if(index < 0) {
        return response.status(404).json({message: "User not found"})
    }
    
    users[index] = updateUser
    return response.json({ updateUser })
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0) {
        return response.status(404).json({message: "User not found"})
    }
    
    users.splice(index,1)
    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`✌️  Server started on port ${port}`)
})