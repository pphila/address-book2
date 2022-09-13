//Business Logic for AdressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

//Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber, primaryEmail, secondaryEmail, mailingAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.primaryEmail = primaryEmail;
  this.secondaryEmail = secondaryEmail;
  this.mailingAddress = mailingAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//Contact.prototype.addEmail = function(primaryEmail, secondaryEmail) {
  // this.primaryEmail = primaryEmail;
  // this.secondaryEmail = secondaryEmail;
//}

// function Email(emailOne, emailTwo) {
//  this.emailOne = emailOne;
//  this.emailTwo = emailTwo;
// }

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email-address1").innerText = contact.primaryEmail;
  document.querySelector(".email-address2").innerText = contact.secondaryEmail;
  document.querySelector(".mailing-address").innerText = contact.mailingAddress;
  document.querySelector("div#contact-details").removeAttribute("class");
}

// UI Logic
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmailAddress1 = document.querySelector("input#new-email-address1").value;
  const inputtedEmailAddress2 = document.querySelector("input#new-email-address2").value;
  const inputtedMailingAddress = document.querySelector("input#new-mailing-address").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress1, inputtedEmailAddress2, inputtedMailingAddress);
  addressBook.addContact(newContact);
  listContacts(addressBook);
}

window.addEventListener("load", function () {
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
});