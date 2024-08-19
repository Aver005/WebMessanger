import { Size, SizeInPixels } from '@/types/Sizes';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const ActionButton = styled.button<{width: string, height: string}>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #8b8b8b;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {color: #555;}
`;

interface IconButtonProps 
{
    icon: IconProp;
    size?: Size;
    onClick?: ({...data}) => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, size="md", onClick}) =>
{
    return (
        <ActionButton 
            onClick={onClick} 
            width={SizeInPixels[size]} 
            height={SizeInPixels[size]}
        >
            <FontAwesomeIcon icon={icon}/>
        </ActionButton>
    );
}

export default IconButton;