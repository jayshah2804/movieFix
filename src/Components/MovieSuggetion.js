import React from 'react';

import "./MovieSuggetion.css";

const MovieSuggetion = ({ filteredMovieList }) => {
    return (
        <div className="movie-suggetion-container">
            <div className="more-to-explore-text">
                More to explore:{" "}
            </div>
            <div className="movie-suggetion-subContainer">
                {filteredMovieList[0]?.movies.map((val, i, arr) => {
                    if (i <= 7)
                        return (
                            <div className="movie-title-along-verticalBar" key={val.id}>
                                <span className="movie-title">
                                    &nbsp;{val.original_title}
                                </span>
                                <span>{i === arr.length - 1 ? "" : " | "}</span>
                            </div>
                        );
                    else return <></>;
                })}
            </div>
        </div>
    )
}

export default MovieSuggetion