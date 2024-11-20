import { useState } from "react"
import propTypes from "prop-types"

const ContactForm = ({exsistingContact = {}, updateCallback}) =>{
    const [firstName, setFirstName] = useState (exsistingContact.firstName || "")
    const [lastName, setLastName] = useState (exsistingContact.lastName || "")
    const [email, setEmail] = useState (exsistingContact.email || "")

    const updating = Object.entries(exsistingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/create_contact" + (updating ? `updates:contact/${exsistingContact.id}` : "creating_contact")
        const options = {
            method: updating? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status != 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }



    return <form onSubmit = {onSubmit}>
        <div>
            <label htmlFor="firstName">First Name:</label>
            <input 
                type="text" 
                id = "firstName" 
                value= {firstName} 
                onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name:</label>
            <input 
                type="text" 
                id = "lastName" 
                value= {lastName} 
                onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input 
                type="text" 
                id = "email" 
                value= {email} 
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type= "submit">{updating ? "Update" : "Create Contact"}</button>
    </form>
}

ContactForm.propTypes = {
    exsistingContact: Element.isRequired,
    updateCallback: propTypes.func.isRequired
}

export default ContactForm