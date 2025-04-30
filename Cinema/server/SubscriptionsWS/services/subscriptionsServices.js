import * as subscriptionsDbRepo from "../repositories/subscriptionDbRepo.js";

export const addSubscription = (subscription) => {
	return subscriptionsDbRepo.addSubscription(subscription);
};

export const getSubscriptions = () => {
	return subscriptionsDbRepo.getSubscriptions();
};

export const getSubscriptionById = (id) => {
	return subscriptionsDbRepo.getSubscriptionById(id);
};

export const updateSubscriptions = (subscriptionsList) => {     
    return subscriptionsDbRepo.updateSubscriptions(subscriptionsList);
};

export const deleteSubscription = (id) => {
	// Here I need to set filter because I need to find the memberId and not the id that created by MongoDB
	const filter = { memberId: id };
	return subscriptionsDbRepo.deleteSubscription(filter);
};
