fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    let names = data.map((x) => x.name)
    console.log(names)
})

