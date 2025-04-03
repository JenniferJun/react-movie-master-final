import styled from "styled-components";
import { getNowPlaying, IGetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import BigPopMovie from "../Components/BigPopMovie";
import { movieList } from "./Popular";


const Wrapper = styled.div`
  background: #16323D;
  padding-top: 180px;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: top;
`;

function NowPlaying() {
    const history = useHistory();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getNowPlaying
    );

    const onBoxClicked = (movieId: number) => {
        history.push(`/nowplaying/${movieId}`);
    };
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/nowplaying/:movieId");
    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
    return (
        <Wrapper>
            {movieList(isLoading, data, onBoxClicked)}

            {bigMovieMatch && clickedMovie ? (
                <BigPopMovie clickedMovie={clickedMovie}></BigPopMovie>
            ) : null
            }
        </Wrapper >
    );
}

export default NowPlaying;


