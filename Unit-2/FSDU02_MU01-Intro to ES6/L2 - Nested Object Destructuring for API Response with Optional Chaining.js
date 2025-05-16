function destructure(object) {
    const id = object?.id || "Information not available"
    const name=object?.profile?.name||"Information not available"
    const city= object?.profile?.address?.city||"Information not available"
    const zipcode = object?.profile?.address?.zipcode||"Information not available"

    return `User ${name} (ID: ${id}) lives in ${city} (ZIP: ${zipcode})`;
}
const user = { id: 123, profile: { name: "John Doe", address: { city: "Los Angeles", zipcode: "90001" } } };


const user1 = { id: 123, profile: { name: "John Doe" } };


console.log(destructure(user))
console.log(destructure(user1))