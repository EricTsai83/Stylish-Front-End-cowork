import styled from 'styled-components';
import chatbotIcon from './img/chatbot-icon.png';
import inputBtn from './img/input-btn.png';
import {Message} from './Message.js';
import {SocketMessage} from './SocketMessage.js';
import {Tag} from './Tag.js';
import {useState, useEffect} from 'react';
import {useImmer} from 'use-immer';
import {io} from 'socket.io-client';
const socket = io('http://54.253.197.166/');

const Wrapper = styled.div``;

const ChatbotBtn = styled.img`
  width: 80px;
  position: fixed;
  bottom: 140px;
  right: 0px;
  cursor: pointer;
  transform: ${props => props.transform};
  transition: transform 200ms cubic-bezier(0.5, 0, 0.5, 1);

  @media screen and (max-width: 1279px) {
    width: 80px;
    position: fixed;
    bottom: 220px;
    right: 0px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 9999px;
    box-shadow: -9px 10px 30px rgba(112, 112, 112, 0.35);
  }
`;

const Chatroom = styled.div`
  width: 350px;
  height: 550px;
  position: fixed;
  background-color: #f4f4f4;
  box-shadow: 0 0 3em rgba(0, 0, 0, 0.15);
  bottom: 122px;
  right: 0;
  z-index: 9999;
  transform: ${props => props.transform};
  transition: transform 500ms cubic-bezier(0.5, 0, 0.5, 1);
  border-radius: 18px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
`;

const CloseBtn = styled.button`
  width: 20px;
  height: 20px;
  position: relative;
  background-color: transparent;
  border: none;
  margin-right: 15px;
  cursor: pointer;
`;

const StyledLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: #939393;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const IconWrapper = styled.div`
  position: relative;
`;

const Icon = styled.img`
  width: 60px;
  margin-left: 10px;
`;

const GreenCircle = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  top: 30px;
  right: 8px;
  border-radius: 9999px;
  background-color: #90ee90;
`;

const Title = styled.div`
  width: 130px;
  text-align: center;
  color: #4a4a4a;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
  height: 430px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0px 0px 0px 24px;
  border: none;
`;

const InputButton = styled.img`
  width: 27px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 8px;
  transform: translateY(-50%);
`;

export function Chatbot() {
  const [chatBtnShow, setChatBtnShow] = useState(true);
  const [chatRoomShow, setChatRoomShow] = useState(false);
  // const [messages, setMessages] = useState([
  //   '早安～ 我是你的購物小幫手，同時也是一個精通時尚的機器人喔！🤖',
  //   '有什麼可以為您服務嗎？',
  // ]);

  const [threads, setThreads] = useImmer([]);
  const [messages, setMessages] = useImmer({
    characters: ['chatbot'],
    texts: [
      [
        '您好～ 我是你的購物小幫手，同時也是一個精通時尚的機器人喔！🤖',
        '有什麼可以為您服務嗎？',
      ],
    ],
    style: [
      {
        alignItems: 'flex-start',
        avatar: chatbotIcon,
        backgroundColor: '#ffffff',
        color: '#000000',
      },
    ],
    id: [undefined],
    title: [undefined],
    image: [undefined],
    description: [undefined],
    texture: [undefined],
    place: [undefined],
    campaignId: [undefined],
    campaignImage: [undefined],
    campaignPath: [undefined],
  });

  useEffect(() => {
    socket.on('message', response => {
      setThreads(draft => draft.concat(response.data));
    });
  }, []);

  return (
    <Wrapper>
      <ChatbotBtn
        src={chatbotIcon}
        transform={chatBtnShow ? 'translateX(0%)' : 'translateX(100%)'}
        onClick={() => {
          setChatBtnShow(false);
          window.setTimeout(() => setChatRoomShow(true), 400);
        }}
      />
      <Chatroom
        transform={chatRoomShow ? 'translateX(0%)' : 'translateX(100%)'}>
        <HeaderWrapper>
          <IconWrapper>
            <Icon src={chatbotIcon} />
            <GreenCircle />
          </IconWrapper>
          <Title>STYLiSH Chatbot</Title>
          <CloseBtn
            onClick={() => {
              setChatRoomShow(false);
              window.setTimeout(() => setChatBtnShow(true), 600);
            }}>
            <StyledLine style={{transform: 'rotate(-45deg)'}} />
            <StyledLine style={{transform: 'rotate(45deg)'}} />
          </CloseBtn>
        </HeaderWrapper>
        <MessageWrapper>
          <MessageBox>
            <Message messages={messages} />
            <Tag setMessages={setMessages} />
            <SocketMessage threads={threads} />
          </MessageBox>
        </MessageWrapper>
        <InputWrapper>
          <Input placeholder="    輸入訊息" />
          <InputButton
            src={inputBtn}
            onClick={() => {
              console.log(123);
            }}
          />
        </InputWrapper>
      </Chatroom>
    </Wrapper>
  );
}
