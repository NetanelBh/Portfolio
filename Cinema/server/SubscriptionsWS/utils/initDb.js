// Initialize the DB once the server is started.
import * as moviesServices from "../services/moviesServices.js";
import * as membersServices from "../services/membersServices.js";
import { addSubscription } from "../services/subscriptionsServices.js";

const createRelevantData = (data, type) => {
  switch (type) {
    case "movies":
      return {
        name: data.name,
        genre: data.genres,
        image: data.image.medium,
        premiered: data.premiered,
      };
    case "members":
      return {
        name: data.name,
        email: data.email,
        city: data.address.city,
      };
    default:
      return {};
  }
};

const saveData = (data, type) => {
  switch (type) {
    case "movies":
      moviesServices.addMovie(data);
      break;
    case "members":
      membersServices.addMember(data);
      break;
    case "subscriptions":
      addSubscription(data);
      break;
    default:
      break;
  }
};

const saveInDb = (dataArray, type) => {
  dataArray.forEach((elem) => {
    const relevantDataObj = createRelevantData(elem, type);
    saveData(relevantDataObj, type);
  });
};

const InitializeDb = async () => {
  try {
    // Save movies data from the given URL
    const moviesUrl = "https://api.tvmaze.com/shows";
    let resp = await moviesServices.getMoviesFromWeb(moviesUrl);
    const movies = resp.data;
    saveInDb(movies, "movies");

    // Save members data from the given URL
    const membersUrl = "https://jsonplaceholder.typicode.com/users";
    resp = await membersServices.getMembersFromWeb(membersUrl);
    const members = resp.data;
    saveInDb(members, "members");
  } catch (error) {
    console.log(error.message);
  }
};

export default InitializeDb;
