import { useLocation } from "react-router";
import styled from "styled-components";
import { getSearchMovie, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import { movieList } from "./Popular";
import SearchPop from "../Components/SearchPop";

const Wrapper = styled.div`
  background: #000000;
  padding-top: 180px;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: top;
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const history = useHistory();

    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", keyword],
        () => getSearchMovie(keyword)
    );

    const onBoxClicked = (movieId: number) => {
        history.push(`/search/${movieId}?keyword=${keyword}`);
    };
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/search/:movieId");
    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

    return (
        <Wrapper>
            {movieList(isLoading, data, onBoxClicked)}

            {bigMovieMatch && clickedMovie ? (
                <SearchPop clickedMovie={clickedMovie} keyword={keyword}></SearchPop>
            ) : null
            }
        </Wrapper >
    );
}

export default Search;



