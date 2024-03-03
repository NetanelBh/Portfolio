import * as authRepo from '../repositories/authRepo.js';
import {checkLimitActions} from "../services/usersService.js";

export const login =  async (user, email) => {
  try {
    // Check if the user exist in DB
    const webUser = (await authRepo.getUserFromWeb(user)).data;
    if(webUser.length === 0) {
      return {success: false, data: 'User not found'};
    }

    // Authenticate the email address
    if(webUser[0].email !== email) {
      return {success: false, data: 'Wrong email'};
    } else {
      return {success: true, data: 'Successfully logged in'};
    }
  } catch (error) {
    return {success: false, data: error};
  }
};

export const checkUserLimitActions = async (user) => {
  return checkLimitActions(user);
};