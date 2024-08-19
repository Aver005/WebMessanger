import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps 
{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    actions?: ReactNode;
    headerButtons?: ReactNode;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.66);
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    max-width: 90%;
    width: 500px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
    font-size: 1.2rem;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 1.5rem;
    color: #888;
`;

const ModalBody = styled.div`
    padding: 16px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px;
    border-top: 1px solid #eee;
`;

export const ModalButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 8px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const HeaderButtons = styled.div`
    display: flex;
    margin-right: auto; /* Выравниваем кнопки влево */
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, actions, headerButtons }) => 
{
    if (!isOpen) {return null;}

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                <div>
                    <ModalTitle>{title}</ModalTitle>
                </div>
                <HeaderButtons>
                    {headerButtons}
                </HeaderButtons>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                {actions && <ModalFooter>{actions}</ModalFooter>}
            </ModalContainer>
        </ModalOverlay>
    );
};

export default Modal;