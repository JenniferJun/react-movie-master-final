import styled from "styled-components";
import { getPopular, IGetMoviesResult } from "../api";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import BigPopMovie from "../Components/BigPopMovie";


const Wrapper = styled.div`
  background: #3EB489;
  padding-top: 180px;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: top;
`;

const MoviesContain = styled(motion.div)`
  width: auto; 
  height: auto;
  display: grid;
  padding : 0px;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);  
`;
const moviesContainVar = {
    start: {
        scale: 0.5,
    },
    end: {
        scale: 1,
        transition: {
            type: "tween",
            duration: 0.5,
            bounce: 0.5,
            delayChildren: 0.5,
            staggerChildren: 0.2,
        },
    },
};

const Movies = styled(motion.div)`
 
`;
const moviesVariants = {
    start: {
        opacity: 0,
        y: 10,
    },
    end: {
        opacity: 1,
        y: 0,
    },
};

const Movie = styled(motion.div) <{ bgphoto: string }>` 
  background-color: white;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
  url(${(props) => props.bgphoto});
  background-position: center center;
  cursor: pointer;
  width:  250px;
  height: 380px; 
  margin: 10px;  
  border-radius: 10%;  
  flex-direction: column;
  display : flex;
  justify-content: end;

`;

const Title = styled(motion.div)`
  font-size: 22px;
  color: white;
  width:  250px;
  border: 0px solid white;
  padding : 0px 30px; 
  position: relative;
  top : -8px;

`;

const movieVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
        y: -30,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
        },
    },
};

const Loader = styled.div`
  height: 100vh;
  width: 100wh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Popular() {
    const history = useHistory();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "popular"],
        getPopular
    );

    const onBoxClicked = (movieId: number) => {
        history.push(`/popular/${movieId}`);
    };
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/popular/:movieId");
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

export default Popular;


export function movieList(isLoading: boolean, data: IGetMoviesResult | undefined, onBoxClicked: (movieId: number) => void) {
    return <MoviesContain variants={moviesContainVar} initial="start" animate="end">
        {isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                {data?.results
                    .map((movie) => (
                        <Movies key={movie.id} variants={moviesVariants}>
                            <Movie
                                key={movie.id}
                                bgphoto={makeImagePath(movie.poster_path, "w500")}
                                variants={movieVariants}
                                layoutId={movie.id + ""}
                                whileHover="hover"
                                initial="normal"
                                transition={{ type: "tween" }}
                                onClick={() => onBoxClicked(movie.id)}
                            >
                                <Title>{movie.title}</Title>
                            </Movie>
                        </Movies>
                    ))}
            </>
        )}
    </MoviesContain>;
}

