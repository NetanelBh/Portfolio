import jsonfile from 'jsonfile';

export const getDataFromJson = (path) => {
    return jsonfile.readFile(path);
};

export const writeDataToJson = (path, data) => {        
    return jsonfile.writeFile(path, data);
};