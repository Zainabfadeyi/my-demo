import { faker } from "@faker-js/faker";

export function createRandomDocument() {
  return {
    documentNo: faker.datatype.uuid(),
    dateCreated: faker.date.recent().toLocaleDateString(),
    subject: faker.lorem.sentence(),
    from: faker.name.fullName(),
    recipient: faker.name.fullName(),
    createdBy: faker.name.fullName(),
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
    approvalLink: faker.internet.url(),
    actions: "Actions", 
  };
}

export const DOCUMENTS = Array.from({ length: 30 }, createRandomDocument);
