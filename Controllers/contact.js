import { Contact } from '../Models/Contact.js';



//get all contact
// @api dsc :- get all contact
// @access public
// @api method :- GET
// @api endPoint :- /api/contact/all
export const getAllContact = async (req, res) => {
    let userContacts = await Contact.find();

    if (!userContacts) {
        return res.status(400).json({ message: "No Contact Found", success: false });
    }

    res.json({ message: "All Contact Fetched", userContacts });
}


export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;

    if (!name || !email || !phone || !type) {
        return res.status(422).json({ error: "Please fill all details" });
    }

    let contactFind = await Contact.findOne({ email: email });
    if (contactFind) {
        return res.status(400).json({ message: "Contact Already Exists", success: false });
    }

    let savedContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user,  
    });

    res.json({ message: "Contact saved successfully", savedContact, success: true });
}



//get contact by id
export const getContactById = async (req, res) => {
    const id = req.params.id;
    let contact = await Contact.findById(id)
    if (!contact) {
        return res.status(400).json({ message: "No Contact Found", success: false });
    }
    res.json({ message: "Contact Found", contact, success: true });
}


//update contact by id
export const updateContactById = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;

    if (!name || !email || !phone || !type) {
        return res.status(422).json({ error: "Please fill all details" });
    }

    let updatedContact = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        type,
    },
        {
            new: true
        }
    );

    if (!updatedContact) {
        return res.status(400).json({ message: "Contact does not exist", success: false });
    }

    res.json({ message: "Contact updated successfully", updatedContact, success: true });
};


//delete contact by id
export const deleteContactById = async (req, res) => {
    const id = req.params.id;

    let deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
        return res.status(400).json({ message: "Contact does not exist", success: false });
    }

    res.json({ message: "Contact Deleted successfully", deletedContact, success: true });
};

//get contact by userid
export const getContactByUserId = async (req, res) => {
    const id = req.params.id;
    let userContact = await Contact.find({user: id})
    if (!userContact) {
        return res.status(400).json({ message: "No Contact Found", success: false });
    }
    res.json({ message: "User Specified Contacts Found", userContact, success: true });
}

