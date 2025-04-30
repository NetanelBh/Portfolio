import getWebMembars from "../repositories/membersWebRepo.js";
import * as membersDbRepo from "../repositories/membersDbRepo.js";

export const getMembersFromWeb = (url) => { 
    return getWebMembars(url);
};

export const addMember = (member) => { 
    return membersDbRepo.addMember(member);
};

export const getMembersFromDb = () => {
    return membersDbRepo.getMembers();
};

export const updateMember = (member) => {
    const idFilter = {_id: member._id};

    return membersDbRepo.updateMembers(idFilter, member);
};

export const deleteMember = (id) => {
    return membersDbRepo.deleteMember(id);
};