import styled from "styled-components";
import { BASE_PATH, IMovieDetail, IMovie, getOptions } from "../api";
import { motion, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 500px;
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
  height: 100%; 
  background-size: cover;
  background-position: center center;  
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
  top: -420px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -420px;
  color: white;
`;

const BigDetail = styled.p`
  padding: 0px 20px;
  margint:0px;
  position: relative;
  top: -420px;
  color: white;
  
  a {
    text-decoration: underline;
  }
`;

const BigMoviePop = styled.div``;

const Overlay = styled(motion.div)`
  position: fixed; 
  width: 100wv;
  height: 100hv;
  top:0;
  right:0;
  left:0;
  bottom:0px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

interface BigPopMovieProps {
    clickedMovie?: IMovie;
    keyword?: string | null;
}

function BigPopMovie({ clickedMovie, keyword }: BigPopMovieProps) {
    const history = useHistory();
    let selectedMovieId = "";

    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/popular/:movieId");
    const csMovieMatch = useRouteMatch<{ movieId: string }>("/comingsoon/:movieId");
    const npMovieMatch = useRouteMatch<{ movieId: string }>("/nowplaying/:movieId");
    const searchMatch = useRouteMatch<{ movieId: string }>("/search/:movieId");

    if (csMovieMatch?.isExact) {
        selectedMovieId = csMovieMatch.params.movieId;
    } else if (npMovieMatch?.isExact) {
        selectedMovieId = npMovieMatch.params.movieId;
    } else if (searchMatch) {
        selectedMovieId = searchMatch.params.movieId;
    } else if (bigMovieMatch?.isExact) {
        selectedMovieId = bigMovieMatch.params.movieId;
    }

    const [selectedMovieInfo, setInfo] = useState<IMovieDetail>();
    const { scrollY } = useViewportScroll();
    const onOverlayClick = () => history.goBack();

    useEffect(() => {
        async function fetchMovieData() {
            const response = await fetch(`${BASE_PATH}/movie/${selectedMovieId}`, getOptions);
            const movieData = await response.json();
            setInfo(movieData);
        }

        if (selectedMovieId) {
            fetchMovieData();
        }
    }, [selectedMovieId]);
    return (
        <BigMoviePop>
            <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }} ></Overlay>
            <BigMovie
                style={{ top: scrollY.get() + 100 }}
                layoutId={selectedMovieId}
            >
                {clickedMovie && (
                    <>
                        <BigCover
                            style={{
                                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                    clickedMovie.backdrop_path,
                                    "original"
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
                        {selectedMovieInfo?.homepage && (
                            <BigDetail><a href={selectedMovieInfo?.homepage} target="new">{selectedMovieInfo?.homepage}</a> </BigDetail>
                        )}
                        <BigDetail>Genre : {selectedMovieInfo?.genres?.map(genre => genre.name).join(', ')}</BigDetail>
                        <BigDetail>Budget : {selectedMovieInfo?.budget ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+selectedMovieInfo.budget) : 'Unknown'}</BigDetail>
                        <BigDetail>Revenue : {selectedMovieInfo?.revenue ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+selectedMovieInfo.revenue) : 'Unknown'}</BigDetail>
                        <BigDetail>Runtime : {selectedMovieInfo?.runtime ? `${Math.floor(selectedMovieInfo.runtime / 60)}h ${selectedMovieInfo.runtime % 60}m` : '-'}</BigDetail>
                        <BigDetail>Release date: {selectedMovieInfo?.release_date}   </BigDetail>                                <BigDetail>Rating: {selectedMovieInfo?.rating ? `${selectedMovieInfo?.rating}` : '-'}   </BigDetail>


                    </>
                )}
            </BigMovie>
        </BigMoviePop>
    );
}
export default BigPopMovie;