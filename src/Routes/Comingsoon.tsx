import styled from "styled-components";
import { getCommingSoon, IGetMoviesResult } from "../api";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import BigPopMovie from "../Components/BigPopMovie";
import { movieList } from "./Popular";


const Wrapper = styled.div`
  background: #424242;
  padding-top: 180px;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: top;
`;

function NowPlaying() {
    const history = useHistory();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "commingSoon"],
        getCommingSoon
    );

    const onBoxClicked = (movieId: number) => {
        history.push(`/comingsoon/${movieId}`);
    };
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/comingsoon/:movieId");
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

