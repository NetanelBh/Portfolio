import styles from "./permissionsList.module.css";

import { all_permissions } from "../../utils/all_permissions_list";
const PermissionsList = ({ userPermissions, onChange }) => {
	// Get the permissions list from the permissions util file
	const all_employees_permissions = all_permissions();

	return (
		<ul className={styles.permissions_list}>
			{all_employees_permissions.map((permission) => {
				const isChecked = userPermissions.includes(permission);
				return (
					<li key={permission} className={styles.permissions_list_li}>
						<input
							className={styles.perm_input}
							type="checkbox"
							checked={isChecked}
							// Return !isChecked because isChecked is the current state, need the state after the click
							onChange={() => onChange({ permission, isChecked: !isChecked })}
							id={permission}
						/>
						<span id="perm_size">{permission}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default PermissionsList;
