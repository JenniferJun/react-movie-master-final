import styled from "styled-components";
import { BASE_PATH, IMovieDetail, getOptions, getPopular, IGetMoviesResult, IMovie } from "../api";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  background: #424242;
  padding-top: 180px;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: top;
`;

const MoviesContain = styled.div`
  width: auto; 
  height: auto;
  display: grid;
  padding : 20px;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr); 
  border: 2px solid red;
`;

const Movies = styled(motion.div) <{ bgPhoto: string }>` 
  background-color: white;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
  url(${(props) => props.bgPhoto});

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

const Title = styled.h2`
  font-size: 22px;
  color: white;
  border: 0px solid white;
  padding : 15px 10px;

`;

const moviesVariants = {
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
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;


const BigMovie = styled(motion.div)`
  position: absolute;
  width: 700px;
  height: 700px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.yellow.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;  
  height: 400px; 
  align: right;
  display: flex;
  justify-content: end;
`;


const BigClose = styled.a`
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-faint);  
    cursor: pointer;
`;


const BigTitle = styled.h3`
  color: white;
  padding: 20px;
  font-size: 35px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: white;
`;

const BigDetail = styled.p`
  padding: 0px 20px;
  margint:0px;
  position: relative;
  top: -80px;
  color: white;
  
  a {
    color: yellow; 
  }
`;


function Popular() {
    const history = useHistory();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "popular"],
        getPopular
    );
    const [selectedMovieInfo, setInfo] = useState<IMovieDetail>();

    const { scrollY } = useViewportScroll();
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`);
    };


    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const onOverlayClick = () => history.push("/");
    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`${BASE_PATH}/movie/${bigMovieMatch?.params.movieId}`, getOptions)
            ).json();
            setInfo(infoData);
        })();

    }, [bigMovieMatch?.params.movieId]);

    console.log(selectedMovieInfo, scrollY.get());

    return (
        <Wrapper>
            <MoviesContain>
                {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <>
                        {data?.results
                            .map((movie) => (
                                <Movies
                                    key={movie.id}
                                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                    variants={moviesVariants}
                                    layoutId={movie.id + ""}
                                    whileHover="hover"
                                    initial="normal"
                                    transition={{ type: "tween" }}
                                    onClick={() => onBoxClicked(movie.id)}
                                >
                                    <Title>{movie.title}</Title>
                                </Movies>
                            ))}
                    </>
                )
                }
            </MoviesContain>
            {bigMovieMatch ? (
                <>
                    <Overlay
                        onClick={onOverlayClick}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <BigMovie
                        style={{ top: scrollY.get() + 100 }}
                        layoutId={bigMovieMatch.params.movieId}
                    >
                        {clickedMovie && (
                            <>
                                <BigCover
                                    style={{
                                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                            clickedMovie.backdrop_path,
                                            "w500"
                                        )})`,
                                    }}
                                >
                                    <BigClose
                                        onClick={onOverlayClick}
                                    >
                                        <svg data-slot="icon" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"></path>
                                        </svg>

                                    </BigClose>
                                </BigCover>
                                <BigTitle>{clickedMovie.title}</BigTitle>
                                <BigOverview>{clickedMovie.overview}</BigOverview>
                                <BigDetail>Genre : {selectedMovieInfo?.genres?.map(genre => genre.name).join(',')}</BigDetail>
                                <BigDetail>Homepage :
                                    {selectedMovieInfo?.homepage && (
                                        <a href={selectedMovieInfo?.homepage} target="new">{selectedMovieInfo?.homepage}</a>
                                    )}
                                </BigDetail>
                                <BigDetail>Buget : ${selectedMovieInfo?.budget} </BigDetail>
                                <BigDetail>Revenue : ${selectedMovieInfo?.revenue} </BigDetail>
                                <BigDetail>Runtime : {selectedMovieInfo?.runtime ? `${Math.floor(selectedMovieInfo.runtime / 60)}h ${selectedMovieInfo.runtime % 60}m` : '-'}</BigDetail>
                                <BigDetail>Release date: {selectedMovieInfo?.release_date}   </BigDetail>                                <BigDetail>Rating: {selectedMovieInfo?.rating ? `${selectedMovieInfo?.rating}` : '-'}   </BigDetail>


                            </>
                        )}
                    </BigMovie>
                </>
            ) : null
            }
        </Wrapper >
    );
}

export default Popular;

