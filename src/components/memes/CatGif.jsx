import React from 'react';

const CatGif = () => {
    return (
        <div className="flex justify-center mt-6">
            <div className="tenor-gif-embed"
                 data-postid="16689995327643035486"
                 data-share-method="host"
                 data-aspect-ratio="0.610442"
                 data-width="30%"  // Adjust the width to make it smaller
            >
                <a href="https://tenor.com/view/jinx-cat-javascript-js-jinx-gif-16689995327643035486">
                    Jinx Cat Javascript GIF
                </a> from <a href="https://tenor.com/search/jinx+cat-gifs">Jinx Cat GIFs</a>
            </div>
            <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        </div>
    );
};

export default CatGif;
