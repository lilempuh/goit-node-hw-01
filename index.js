const contactsOperation = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contactById = await contactsOperation.getContactById(id);
      if (!contactById) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(contactById);
      break;
    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.log("Unknown action type!");
  }
};

invokeAction(argv);
// invokeAction({ action: "getAll" });
// invokeAction({ action: "getContactById", id: "5" });

// const data = {
//   name: "Allen ",
//   email: "nulla@vestibul.co.uk",
//   phone: "14-3799992",
// };
// invokeAction({
//   action: "add",
//   name: "Allen ",
//   email: "nulla@vestibul.co.uk",
//   phone: "14-3799992",
// });
// invokeAction({ action: "removeContact", id: "5" });
