import subscriptionModel from "../models/subscriptionsModel.js";

export const addSubscription = (subscription) => {
	const newSubscription = subscriptionModel(subscription);

	return newSubscription.save();
};

export const getSubscriptions = () => {
	return subscriptionModel.find();
};

export const getSubscriptionById = (id) => {
	return subscriptionModel.findOne({ memberId: id });
};

export const updateSubscriptions = async (subscriptions) => {
	// Per each subscription create an update query to wait for all of them to finish when update the DB in the repo
	const updatedSubscriptions = subscriptions.map((sub) =>
		subscriptionModel.findOneAndUpdate({ memberId: sub.memberId }, { movies: sub.movies }, { new: true })
	);

	const res = Promise.all(updatedSubscriptions);
	return res;

	return res;
};

export const deleteSubscription = (filter) => {
	// I need here the filter because I want to remove the line by the memberId and not the id that created by MongoDB
	return subscriptionModel.deleteOne(filter);
};
