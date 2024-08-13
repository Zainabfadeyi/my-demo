import { faker } from "@faker-js/faker";

// Define the DocumentCategory type based on the categories array
export  type DocumentCategory = 
  "employment agreement" |
  "new employer document" |
  "departmental benefits" |
  "offer letter" |
  "faculty benefit" |
  "student benefit";

const categories: DocumentCategory[] = [
  "employment agreement",
  "new employer document",
  "departmental benefits",
  "offer letter",
  "faculty benefit",
  "student benefit",
];

export function createRandomDocument() {
  return {
    documentNo: faker.string.uuid(),
    dateCreated: faker.date.recent().toLocaleString(),
    subject: faker.lorem.sentence(),
    from: faker.person.fullName(),
    recipient: faker.person.fullName(),
    createdBy: faker.person.fullName(),
    category: faker.helpers.arrayElement(categories), // Randomly select a category
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected", "New"]),
    requestStatus: faker.helpers.arrayElement(["Inprogress", "completed", "Approved", "New"]),
    taskStatus: faker.helpers.arrayElement([ "completed", "Approved"]),
    approvalLink: faker.internet.url(),
    actions: "Actions",
  };
}

// Create an array of documents
export const DOCUMENTS = Array.from({ length: 30 }, createRandomDocument);