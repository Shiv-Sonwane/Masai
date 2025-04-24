let array = [15, 30, 45, 60, 75, 90]

function extractAndReverse(arr) {
    let rev_arr = arr.slice(3,5).reverse()
    return rev_arr
}

console.log(extractAndReverse(array))