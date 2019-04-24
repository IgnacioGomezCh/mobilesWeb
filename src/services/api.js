const endpoint =
  "https://rt6sa58oih.execute-api.us-east-1.amazonaws.com/dev/rest/";

const endpt =
  "https://rt6sa58oih.execute-api.us-east-1.amazonaws.com/dev/auth/";

const getRestaurants = () => {
  const url = `${endpoint}restList`;
  var request = new Request(url, {
    method: "GET",
    credentials: "include"
  });
  return fetch(request);
};

const getUsers = () => {
  const url = `${endpt}userList`;
  var request = new Request(url, {
    method: "GET",
    credentials: "include"
  });
  return fetch(request);
};

const signIn = (email, password) => {
  var data = JSON.stringify({
    email: email,
    password: password
  });
  const url = `${endpt}signInAdmin`;
  var request = new Request(url, {
    method: "POST",
    body: data
  });
  return fetch(request);
};

const delRestaurant = id => {
  const body = JSON.stringify({
    id
  });
  const url = `${endpoint}delRest`;
  var request = new Request(url, {
    method: "POST",
    body,
    credentials: "include"
  });
  return fetch(request);
};

const addRestaurant = (name, food, schedule, contactInfo, cost, x, y) => {
  const body = JSON.stringify({
    name,
    food,
    schedule,
    contactInfo,
    cost,
    x,
    y,
    images: []
  });

  const url = `${endpoint}addRest`;
  var request = new Request(url, {
    method: "POST",
    body,
    credentials: "include"
  });
  return fetch(request);
};

const updateRestaurant = (
  id,
  name,
  food,
  schedule,
  contactInfo,
  cost,
  x,
  y
) => {
  const body = JSON.stringify({
    id,
    name,
    food,
    schedule,
    contactInfo,
    cost,
    x,
    y,
    images: []
  });

  const url = `${endpoint}updateRest`;
  var request = new Request(url, {
    method: "POST",
    body,
    credentials: "include"
  });
  return fetch(request);
};

export default {
  getRestaurants,
  delRestaurant,
  addRestaurant,
  getUsers,
  signIn,
  updateRestaurant
};
