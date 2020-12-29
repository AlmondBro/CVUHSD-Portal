import React from 'react';
import { useParams } from 'react-router-dom';

import { Container } from './RequestSpecificsStyledComponents.js';

const RequestSpecifics = ({districtPosition, renderAsStudent}) => {
    const { id } = useParams();

    return (
        <Container>
            <p>ID: { id }</p>
        </Container>
    );
}; //end RequestSpecifics()

export default RequestSpecifics;