import React from 'react';

const Artist = (props) => {
    if (!props.artist) return null;

    const { images, name, followers, genres } = props.artist;
    return (
        <div>
            <h3>{name}</h3>
            <p>{followers.total} followers</p>
            <p>{genres.join(', ')}</p>
            <img src={images[0].url} alt={name} />
        </div>
    )
}

export default Artist;