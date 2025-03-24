import express from 'express';
import { newContact,getAllContact, getContactById, updateContactById, deleteContactById, getContactByUserId } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';


const router = express.Router();

//create new Contact
// @api dsc :- creating contact
// @api method :- POST
// @api endPoint :- /api/contact/new

//first check if user is authenticated or not
router.post('/new', isAuthenticated, newContact);


//get all contact
// @api dsc :- get all contact
// @access public
// @api method :- GET
// @api endPoint :- /api/contact/all

router.get('/', getAllContact); 

// get contact by id
router.get('/:id', getContactById);

//update contact by id
router.put('/:id', isAuthenticated, updateContactById);


//delete contact by id
router.delete('/:id', isAuthenticated, deleteContactById);


//user specific contact
router.get('/user/:id', getContactByUserId);

export default router;