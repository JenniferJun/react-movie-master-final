import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useHistory } from "react-router-dom";
import { IGetMoviesResult } from "../api";


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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
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

const Title = styled.div`
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

interface MovieListProps {
    data: IGetMoviesResult;
}

function MovieList(movieData: MovieListProps) {

    const history = useHistory();
    const onBoxClicked = (movieId: number) => {
        history.push(`/popular/${movieId}`);
    };

    return (
        <MoviesContain variants={moviesContainVar} initial="start" animate="end">
            {movieData?.data.results
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

                        </Movie><Title>{movie.title}</Title>
                    </Movies>
                ))}
        </MoviesContain>
    );
}

export default MovieList;


