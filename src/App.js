import './App.css';

import { useState } from 'react';
import SidebarWithHeader from './components/home.jsx';
import Chat from './components/chat';

import {
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from "@chakra-ui/react"


function App() {

  const [sideBar, setSideBar] = useState('default')
  const [tokenConsumed, setTokenConsumed] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div className="App">
      <SidebarWithHeader setSideBar={(val) => setSideBar(val)} modalState = {onOpen} tokenConsumed = {tokenConsumed} setTokenConsumed = {(val) => {setTokenConsumed(val)}}>
        <Chat sideBar={sideBar} tokenConsumed = {tokenConsumed} setTokenConsumed = {(val) => {setTokenConsumed(val)}}/>
      </SidebarWithHeader>
    </div>
  );
}

export default App;
