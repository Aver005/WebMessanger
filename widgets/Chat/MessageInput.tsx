import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
`;

const TextInput = styled.textarea`
    flex: 1;
    border: none;
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    background-color: #f0f0f0;
    margin-right: 10px;
`;

const SendButton = styled.button`
    background-color: #4caf50;
    font-size: 20px;
    color: #fff;
    padding: 18px 36px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {background-color: #45a049;}
`;

const MessageInput: React.FC<any> = ({onSend, ...props}) => (
    <InputContainer>
        <TextInput type="text" {...props} />
        <SendButton onClick={onSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
    </InputContainer>
);

export default MessageInput;
