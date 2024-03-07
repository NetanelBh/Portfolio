import jsonfile from 'jsonfile';
import fs from 'fs';

const JSONPATH = process.cwd() + '/data/usersData.json';

export const getUsersData = () => {

  return jsonfile.readFile(JSONPATH);
};

export const addActionData = async (action) => {
  let fileData = {};
  if(fs.existsSync(JSONPATH)) {
    fileData = await jsonfile.readFile(JSONPATH);
    fileData.actions.push(action);
  } else {
    fileData.actions = [action];
  }
  
  return jsonfile.writeFile(JSONPATH, fileData);
};