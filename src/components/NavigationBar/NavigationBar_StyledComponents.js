import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

let NavBar = styled.nav`
        display: inline-block;

        & ul li {
            display: inline-block;
            margin: 0 15px;
        }

        &>ul li.mobile-collapse-links {
            display: none;
        }

        @media only screen and (max-width: 705px) {
            display: inline;

            & ul {
                position: relative;
                bottom: 60px;
                left: 15%;
                margin-bottom: -52px;
                z-index: 1;
                max-height: 320px;
                overflow-y: auto;
                /*Used to be -25px, now it's -50px */
                /*margin-bottom Used to be -10px */
                /* Center MenuToggleIcon */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            & ul li {
                display: none;
                margin: auto;
            }

            &&>nav>ul>li:nth-child(3) {
                margin-top: 55px;
            }
        }
    `; //end NavBar

    let NavBarImageWrapper = styled("div")`
        margin-top: 5px;

        @media only screen and (max-width: 705px) {
            .navigation-bar-image-wrapper {
                display: inline;
            } 
        }

        @media only screen and (min-width: 1185px) { 
          &::after {
                content: 'Centinela Valley Union High School District';
                display: inline;

                color: ${ props => 
                            (props.districtPosition === ("student") || props.renderAsStudent) ? 
                                "#931E1D": "#1E6C93"
                        };
                transition: color 0.5s;

                font-size: 1.3em;
                position: absolute;
                bottom: 52px;
                left: 220px;
    
                font-weight: bold;
            } 
        }
    `; //end navBarImageWrapper

    let NavBarLogo = styled.img`
        height: 100px;
        /* Was 50px */
        width: auto;

        margin-left: 50%;
        margin-top: 8px;

        @media only screen and (max-width: 705px) { 
            display: inline;
            vertical-align: middle;
            margin-left: 25%;
            position: relative;
            z-index: 2;
        }
    `; //end NavBar logo

    let NavBarUL = styled.ul`
        position: absolute;
        top: 50%;
        margin-top: -0.5em;
        /*-1/2 of line-height */
        right: 0px;
        padding-right: 2.5%;
    `; //end NavBarUL

    let MenuToggle = styled.input`
        display: none;

        /* Rotate First Bar */
        &:checked~label .nav-menu-icon .bar1 {
            -webkit-transform: rotate(-45deg) translate(-9px, 6px);
            transform: rotate(-45deg) translate(-9px, 6px);
        }

        /* Fade out second bar */
        &:checked~label .nav-menu-icon .bar2 {
            opacity: 0;
        }

                
        /*Rotate last bar */
        &:checked~label .nav-menu-icon .bar3 {
            -webkit-transform: rotate(45deg) translate(-8px, -8px);
            transform: rotate(45deg) translate(-8px, -8px);
        }

        @media only screen and (max-width: 705px) {
            &:checked~li {
                /*margin: 0 60px; */
                display: block;
                border: 0;
                border-radius: 0;
                animation: fadeIn 0.8s ease-in-out;
                padding: 15px 0;
            }
        }
    `; //end CheckBoxHack

    let NavMenuIcon = styled.div`
        display: none;

        @media only screen and (max-width: 705px) {
            display: block;
            cursor: pointer
        }  
    `; //end NavMenuIcon

    let FirstBar = styled.div`
        width: 35px;
        height: 5px;
        margin: 6px auto;
        transition: 0.4s;

        background-color: ${ props => 
                                ( (props.districtPosition === "student") || props.renderAsStudent ) ? 
                                    "#931E1D": "#1E6C93"
                            };
        
        color: ${ props => 
                                ( (props.districtPosition === "student") || props.renderAsStudent ) ? 
                                    "#931E1D": "#1E6C93"
                            };
        transition: background-color 0.5s, color 0.5s;
        
    `;
    

    //TODO: Move this rule "upward"
    let NavBarListItem = styled("a")`
        color: ${ props => 
                    ( (props.districtPosition === "student") || props.renderAsStudent) ? 
                        "#A01C1C": "#3B709A"
                };
        text-decoration: none;
    `; 

    let NavBarButton = styled("button")`
        font-size: 0.9em;
        color: white;
        background-color: ${ props => 
                                ( (props.districtPosition === "student") || props.renderAsStudent ) ? 
                                    "#931E1D": "#1E6C93"
                            };
        padding: 0.5em 0.7em;
        border: 0px;
        border-radius: 3px;

        transition: background-color 0.5s;

        &:hover {
            background-color: ${ props => 
                                ( (props.districtPosition === "student") || props.renderAsStudent) ? 
                                    "#BD2222": "#2588b9"
                            };
        }
    `; //end LogOut Button

    let NavBarListItem_Link = ({to, children, ...props}) => {
        return (
            <li>
                <Link to={to} {...props}>
                    { children }
                </Link>
            </li> 
        );
    }

    let NavBarListItem_StyledLink = styled(NavBarListItem_Link)`
        font-size: 1.1em;
        color: ${ props => 
                    ( (props.districtPosition === "student") || props.renderAsStudent) ? 
                        "#A01C1C": "#3B709A"
                };
        transition: color 0.5s;
        
        text-decoration: none;

        @media only screen and (max-width: 705px) { 
            &&>li~li::before {
                content: ${props => props.bulletPointInMobile ? "•" : null };
                margin-right: 8px;
                color: ${ props => ((props.districtPosition === "student") || props.renderAsStudent) ? 
                            "#931E1D" : "#154963"
                };
                transition: color 0.5s;
            }
        }
    `;
    let NavBarListItem_Li = styled("li")`
        font-size: 1.1em;
        transition: color 0.5s;

        @media only screen and (max-width: 705px) { 
            &&>li~li::before {
                content: ${props => props.bulletPointInMobile ? "•" : null };
                margin-right: 8px;
                color: ${ props => ((props.districtPosition === "student") || props.renderAsStudent) ? 
                            "#931E1D" : "#154963"
                };
            transition: color 0.5s;

            }
        }
    `; 

    let NavBarListItemLi = (props) => {
        if (props.to) {
            return (
                <NavBarListItem_StyledLink 
                    to={props.to} 
                    linkName={props.LinkName} 
                    bulletPointInMobile={props.bulletPointInMobile}
                    districtPosition={props.districtPosition}
                    renderAsStudent={props.renderAsStudent}
                    title={props.title}
                >
                    
                    {props.linkName || props.children}
                    
                </NavBarListItem_StyledLink>
            );
        } else {
            return (
                <NavBarListItem_Li bulletPointInMobile={props.bulletPointInMobile} renderAsStudent={props.renderAsStudent}>
                    <NavBarListItem href={props.href || null} 
                                    districtPosition={props.districtPosition}
                                    renderAsStudent={props.renderAsStudent}
                    >
                        {props.linkName || props.children}
                    </NavBarListItem>
                </NavBarListItem_Li>
            );
        }
        
    };

export { NavBar, NavBarImageWrapper, NavBarLogo, NavBarUL, MenuToggle, 
         NavMenuIcon, FirstBar, NavBarListItem, NavBarButton, NavBarListItem_Link, 
         NavBarListItem_StyledLink, NavBarListItem_Li, NavBarListItemLi 
        }