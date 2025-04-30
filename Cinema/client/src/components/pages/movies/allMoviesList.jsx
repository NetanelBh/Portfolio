import styles from "./allMoviesList.module.css";

import Card from "../../UI/card/card";
import MovieListItem from "./movieListItem";

const AllMoviesList = ({movies}) => {
	// The movies sent as parameter for cases we need to filter the movies list according to the user search
	return (
		<ul className={styles.all_movies_list_ul}>
			{movies.map((movie) => {
				return (
					<Card className="generic_card" key={movie._id}>
						<MovieListItem movie={movie} />
					</Card>
				);
			})}
		</ul>
	);
};

export default AllMoviesList;
