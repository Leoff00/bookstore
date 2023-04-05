import { faker } from "@faker-js/faker";
import axios from "axios";

const obj = {
  bookname: faker.lorem.words(),
  author: faker.name.fullName(),
  price: Number((Math.random() * 100).toFixed(2)),
  review: faker.lorem.paragraph(3),
};

const url = "http://localhost:3001/api/register-book";

const doRequest = async () => {
  await axios.post(url, obj);
};

doRequest();
