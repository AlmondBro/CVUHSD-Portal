import styled from 'styled-components';

const Container = styled("article")`
    position: absolute;
    z-index: 2;
    top: 23%;
    left: 69%;

    width: 200px;
    height: 300px;

    background-color: white;
    border-radius: 10px;

    box-shadow: 5px 5px 30px -11px rgba(0,0,0,0.75);

    :after {
        content: "";

        position: absolute;
        left: 87%;
        bottom: 99%;

        width: 0;
        height: 0;

        border-bottom: solid 10px white;

        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
    }
`;

export { Container };

