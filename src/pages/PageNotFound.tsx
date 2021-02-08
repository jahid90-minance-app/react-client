import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            The requested page could not be found.
            <br />
            Go back to <Link to='/'>home</Link>.
        </div>
    );
}

export default PageNotFound;