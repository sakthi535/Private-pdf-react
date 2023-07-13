import './App.css';

import { useState } from 'react';
import SidebarWithHeader from './components/home.jsx';
import Chat from './components/chat';
import FileUpload from './components/FileUpload';

import { useForm } from 'react-hook-form'; 

import {
  useDisclosure,
  Text,
  Button,
  Input,
} from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex
} from '@chakra-ui/react'

import axios from 'axios'

function App() {

  const [sideBar, setSideBar] = useState('default')
  const [tokenConsumed, setTokenConsumed] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const handleEvent = (formData) => {
    var reader = new FileReader();

      setIsLoading(true);
      reader.readAsBinaryString(formData['document']);
      reader.onload = () => {
        let b64payload = btoa(reader.result);
        console.log(JSON.stringify({ "file": b64payload }))
        axios.post('http://127.0.0.1:5000/addFiles', {
          dataType: "json",
          name: formData['name'],
          index: sideBar,
          data: JSON.stringify({ "file": b64payload })
        })
          .then((resp) => {
            alert("Files uploaded :)")
            setIsLoading(false)
          })
          .catch((error) => {
            alert("Files failed to upload :(")
            setIsLoading(false)
          })
      }
    console.log(formData);


    reset();    
  }

  return (
    <div className="App">
      <SidebarWithHeader setSideBar={(val) => setSideBar(val)} modalState={(val) => { onOpen(); }} tokenConsumed={tokenConsumed} setTokenConsumed={(val) => { setTokenConsumed(val) }}>
        <Chat sideBar={sideBar} tokenConsumed={tokenConsumed} setTokenConsumed={(val) => { setTokenConsumed(val) }} />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <form onSubmit = {handleSubmit(handleEvent)}>
            <ModalHeader>Add Files</ModalHeader>
            <ModalCloseButton />
            <ModalBody>


              <FileUpload name="document"
                acceptedFileTypes="pdf/*"
                isRequired={true}
                placeholder="Upload File"
                control={control}>
                New document
              </FileUpload>
              <br/>

              <Text fontWeight={"500"} >
                Name of document
              </Text>

              <Input type = 'text' {...register('name')}/>

              
              <Text fontWeight={"500"} marginTop={"5px"}>
                Add Tags
              </Text>

              <Flex display={"flex"} flexDirection={"row"} >
                <Input type = 'text' marginRight={"3px"} placeholder='Key' {...register('key1')}/>
                <Input type = 'text' marginLeft={"3px"} placeholder='Value' {...register('val1')}/>
              </Flex>
              <Flex display={"flex"} flexDirection={"row"} >
                <Input type = 'text' marginRight={"3px"} placeholder='Key' {...register('key2')}/>
                <Input type = 'text' marginLeft={"3px"} placeholder='Value' {...register('val2')}/>
              </Flex>
              <Flex display={"flex"} flexDirection={"row"} >
                <Input type = 'text' marginRight={"3px"} placeholder='Key' {...register('key3')}/>
                <Input type = 'text' marginLeft={"3px"} placeholder='Value' {...register('val3')}/>
              </Flex>


            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' isLoading = {isLoading}>
                Submit
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
              </form>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </div>
  );
}

export default App;
