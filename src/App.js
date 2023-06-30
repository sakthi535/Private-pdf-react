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
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div className="App">
      <SidebarWithHeader setSideBar={(val) => setSideBar(val)} modalState = {onOpen}>
        <Chat sideBar={sideBar} />

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                You can scroll the content behind the modal
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </div>
  );
}

export default App;
