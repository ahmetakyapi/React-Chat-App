import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Header from "./components/Header";

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #11999E;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 600px;
  overflow: auto;
  width: 400px;
  border: 4px solid #FAF15D;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 80px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 4px solid #FAF15D;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: #C7F2E3;
  width: 120px;
  border: 4px solid steelblue;
  height: 30px;
  border-radius: 15px;
  color: #46516e;
  font-size: 18px;
  position: relative;
  left: 300px;
`;

const Form = styled.form`
  width: 400px;
  margin-right: 10px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: #A5F0E4;
  color: #46516e;
  border: 2px solid darkblue;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-radius:15px
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: #C56183;
  color: lightgray;
  border: 2px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-radius: 15px;
`;

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <Page>
      <Header>
      </Header>
      <Container>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <MyRow key={index}>
                <MyMessage>
                  {message.body}
                </MyMessage>
              </MyRow>
            )
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>
                {message.body}
              </PartnerMessage>
            </PartnerRow>
          )
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea value={message} onChange={handleChange} placeholder="Write something..." />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default App;