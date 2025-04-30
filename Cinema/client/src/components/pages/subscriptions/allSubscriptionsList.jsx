import styles from "./allSubscriptionsList.module.css";

import Card from "../../UI/card/card";
import SubscriptionsListItem from "./subscriptionsListItem";

import { useSelector } from "react-redux";

const AllSubscriptionsList = ({ subscriptions }) => {
	const allMembers = useSelector((state) => state.members.members);

	return (
		<ul className={styles.all_subscriptions_list_ul}>
			{allMembers.map((member) => {
				// Per each member, find the corresponding subscription(if exists)
				const watchedMovies = subscriptions.find((subscription) => member._id === subscription.memberId);
				
				const subscriptionData = {...member, movies: []};
				if (watchedMovies !== undefined) {
					subscriptionData['movies'] = watchedMovies.movies;
				}
				
				return (
					<Card key={member._id} className="generic_card">
						<SubscriptionsListItem subscription={subscriptionData} />
					</Card>
				);
			})}
		</ul>
	);
};

export default AllSubscriptionsList;
