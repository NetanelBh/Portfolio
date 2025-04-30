// Conditions that require to check the view permission
const CONDITIONAL_SUBSCRIPTION_PERMISSIONS = ["Create Subscriptions", "Delete Subscriptions", "Update Subscription"];

// Conditions that require to check the view permission
const CONDITIONAL_MOVIE_PERMISSIONS = ["Create Movies", "Delete Movies", "Update Movie"];

const updatedPermissionsCheckboxes = (clickedOption, current_employee_permissions) => {
	const viewMovies = "View Movies";
	const viewSubscription = "View Subscription";

	let updatedPermissions = [...current_employee_permissions];

	const filterPermissions = (type) => {
        // When view permissions clicked an unchecked, remove all the sub permissions and the view permission itself
		if (type === viewMovies) {
			return updatedPermissions.filter((perm) => {
				return (
                    perm !== type &&
					perm !== CONDITIONAL_MOVIE_PERMISSIONS[0] &&
					perm !== CONDITIONAL_MOVIE_PERMISSIONS[1] &&
					perm !== CONDITIONAL_MOVIE_PERMISSIONS[2]
				);
			});
		} else if (type === viewSubscription) {
            return updatedPermissions.filter((perm) => {
				return (
                    perm !== type &&
					perm !== CONDITIONAL_SUBSCRIPTION_PERMISSIONS[0] &&
					perm !== CONDITIONAL_SUBSCRIPTION_PERMISSIONS[1] &&
					perm !== CONDITIONAL_SUBSCRIPTION_PERMISSIONS[2]
				);
			});
		}
	};

	if (!clickedOption.isChecked) {
		// If the clicked permission in either view subscription or view movies, remove also the all sub permissions
		if ([viewSubscription, viewMovies].includes(clickedOption.permission)) {
			updatedPermissions = filterPermissions(clickedOption.permission);
		} else {
			updatedPermissions = updatedPermissions.filter((perm) => clickedOption.permission !== perm);
		}
	} else {
		// Insert the clicked permission to the employee permissions list
		updatedPermissions.push(clickedOption.permission);

		// Check if one of the conditional permissions is checked to check the view permission automatically
		if (CONDITIONAL_SUBSCRIPTION_PERMISSIONS.includes(clickedOption.permission)) {
			if (!current_employee_permissions.includes(viewSubscription)) {
				updatedPermissions.push(viewSubscription);
			}
		} else if (CONDITIONAL_MOVIE_PERMISSIONS.includes(clickedOption.permission)) {
			if (!current_employee_permissions.includes(viewMovies)) {
				updatedPermissions.push(viewMovies);
			}
		}
	}

	return updatedPermissions;
};

export default updatedPermissionsCheckboxes;
