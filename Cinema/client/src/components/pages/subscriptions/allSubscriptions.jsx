import styles from "./allSubscriptions.module.css";

import AllSubscriptionsList from "./allSubscriptionsList";

import { isShowPermission } from "../../utils/moviesPermissions";
import { useSelector } from "react-redux";

const AllSubscriptions = () => {
	const allEmployees = useSelector((state) => state.employees.employees);
	const allSubscriptions = useSelector((state) => state.subscriptions.subscriptions);

	const employeeId = localStorage.getItem("id");
	const viewPermission = "View Subscription";
	const showSubsPermission = isShowPermission(allEmployees, employeeId, viewPermission);

	return (
		<>
			{!showSubsPermission && (
				<div id="list_container">
					<p id="no_permission">No permission to show the Subscriptions</p>
				</div>
			)}

      {showSubsPermission && <AllSubscriptionsList subscriptions={allSubscriptions}/>}
		</>
	);
};

export default AllSubscriptions;
