import GetCurrentDate from "../utils/getCurrentDate.js";
import * as authRepo from "../repositories/authRepo.js";
import * as usersRepo from "../repositories/usersRepo.js";
import {addActionData} from "../repositories/usersFileRepo.js";

export const getUsers = async () => {
  // Get the users from the DB
  const usersFromDb = await usersRepo.getUsers();
  // Get the users from the website
  const usersFromWeb = (await authRepo.getAllUsersFromWeb()).data;
  const usersToShow = usersFromWeb.map((webUser) => {
    // Find the match user in DB
    const userFromDb = usersFromDb.find((dbUser) => {
      return dbUser.fullName === webUser.name;
    });

    // Per each user, return the relevant data to display in users page
    return {
      userName: webUser.name,
      maxActions: userFromDb.numOfActions,
      remainingActions: userFromDb.remainingActions,
    };
  });

  return usersToShow;
};

//Write the action to json file and update the remaining user's actions in DB
export const addActionToUser = async (user) => {
  try {
    // Extract the id and the full name of the user from website
    const webUser = (await authRepo.getUserFromWeb(user)).data;
    // Get the user's remaining actions from DB
    const dbUserList = await usersRepo.getUserByName(webUser[0].name);

    const dbUser = dbUserList[0];

    let remainingActions = dbUser.remainingActions;
    remainingActions--;
    // Update the remaining actions to the user
    const updatedDbUser = {...dbUser._doc, remainingActions};
    // Update the user again in DB
    await usersRepo.updateUser(dbUser.id, updatedDbUser);

    // Get the current date
    const date = GetCurrentDate();
    const dataToWrite = {
      id: webUser[0].id,
      maxActions: dbUser.numOfActions,
      date,
      actionsAllowed: remainingActions,
    };

    await addActionData(dataToWrite);
    return {success: true, data: "Actions updated"};
  } catch (error) {
    return {success: false, data: error};
  }
};

// return true or false if there is an free actions
export const checkLimitActions = async (user) => {
  // Extract the full name of the user from the website
  const webUser = (await authRepo.getUserFromWeb(user)).data;
  const name = webUser[0].name;

  // Extract the remaining actions from the DB per this user
  const dbUser = await usersRepo.getUserByName(name);
  const remainingActions = dbUser[0].remainingActions;
  
  return remainingActions > 0 ? true : false;
};

export const resetUsersDailyActions = async() => {
  const allUsers = await usersRepo.getUsers();
  allUsers.forEach( async (user) => {
    try {
      const updatedUser = {...user._doc, remainingActions: user.numOfActions};
      await usersRepo.updateUser(user.id, updatedUser);
    } catch (error) {
      return false;
    }
  });

  return true;
};