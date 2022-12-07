const axios = require('axios')
axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        // response.data is users
        const users = response.data.map((user) => user.name)
        console.log(users)
    })
    .catch(error => {
        console.log(error)
    })