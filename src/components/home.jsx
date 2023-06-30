import React, { useState, useEffect } from "react"
import axios from 'axios'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  InputGroup,
  Input,
  Button,
  InputLeftElement
} from "@chakra-ui/react"

import {
  FiTrendingUp,
  FiX,
  FiMenu,
  FiUploadCloud,
  FiBell,
  FiChevronDown,
  FiFilePlus,

} from "react-icons/fi"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"


export default function SidebarWithHeader({ children, setSideBar, modalState }) {
  // const [showModal, setShowModal] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeIndex, setActiveIndex] = useState('');

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        setActiveIndex={(val) => { setActiveIndex(val); setSideBar(val) }}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} activeIndex = {activeIndex} modalState = {modalState} setActiveIndex={(val) => { setActiveIndex(val); setSideBar(val) }} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} activeIndex={activeIndex} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, modalState, activeIndex, setActiveIndex, ...rest }) => {



  const [inputState, setInputState] = useState(false);
  const [index, setIndex] = useState('');
  const [addIndex, setAddIndex] = useState('');


  const [LinkItems, setLinkItems] = useState([
    { name: "Home", state: false },
    { name: "Trending", state: false },
    { name: "Explore", state: false },
    { name: "Favourites", state: false }
  ])

  useEffect(() => {
    // Update the document title using the browser API
    axios.get('http://127.0.0.1:5000/get_indices')
      .then((response) => {
        setLinkItems(response.data)
        // setActiveIndex(response.data[0])
        console.log(response.data);
      })
      .catch((error) => {
        alert("Unable to get Indices, please check server status :(")
      });
  }, [inputState]);

  const insertIndex = () => {
    if(addIndex === ''){return;}
    
    axios.get('http://127.0.0.1:5000/add_index', {
      params: {
        // name: addIndex
        name: addIndex.toLowerCase().replaceAll(' ', '_')
      },
    })
      .then((response) => {
        // setLinkItems(response.data)
        console.log(response.data);
        if (response.status === 200) {
          setInputState(false)
        }
      }
      )
      .catch((error) => {
        alert("Unable to insert section. Please Try again")
      });
  }



  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY={'scroll'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          query-pdf
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (

        
        <NavItem key={link.name} icon={FiX} active={link.name === index} setInputState = {() => {setInputState(!inputState)}} onClick={() => { setActiveIndex(link.name); setIndex(link.name);}} justifyContent={"space-between"}>
          {/* {console.log(link.name, ' ', index)} */}
            {(link.name.replaceAll('_', ' '))}
        </NavItem>
      ))}
      <hr />
      <NavItem key={"Add a section"} icon={FiFilePlus} onClick={() => {setInputState(true); console.log(modalState)}} active={true} justifyContent={"space-between"}>
        <div>
          {"Add a section"}
        </div>

      </NavItem>

      {inputState && (
        <>
          <InputGroup >
            <Input size='sm' type='text' placeholder="Name of new section" mr={"6%"} ml={"6%"} mt={"3%"} onChange={(e) => { setAddIndex(e.target.value) }} />
          </InputGroup>
          <Button mt={"5%"} onClick={() => { insertIndex(); }}>
            Enter
          </Button>
        </>

      )}

    </Box>
  )
}

const NavItem = ({ icon, active, children, setInputState, ...rest }) => {
  console.log("button ", active)

  const titleCaseString = (str) => {return str;}

  const eraseItem = (index) => {
    if(window.confirm("Are you sure to delete column ?") === true){

      axios.post('http://127.0.0.1:5000/eraseIndex', {
        name: index,
        })
          .then((resp) => {
            console.log(resp['data']);
            setInputState();
            alert("Index removed succesfully")
          })
          .catch((error) => {
            console.log("files failed")
            alert("Failed to remove Index")
          });
      }
      
  }
  console.log("something here")
  console.log(children)

  
  return (
    <Link
      // href={loc}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        // align="justify-content"
        // flexDirection={"justify-content"}
        p="3"
        mx="4"
        borderRadius= "lg"
        role="group"
        bg={active ? "gray.100" : "white"}
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white"
        }}
        {...rest}
      >
        {titleCaseString(children)}
          {active && <Icon
            right = {5}
            top = {0}
            // ml="3"
            fontSize="14"
            onClick={() => {eraseItem(children.replaceAll(' ', '_'))}}
            _groupHover={{
              color: "red"
            }}
            as={icon}
          />}
      </Flex>
    </Link>
  )
}

const MobileNav = ({ onOpen, activeIndex, ...rest }) => {

  const [fileList, setFilesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFiles = () => {
    if(activeIndex === ''){
      alert("Please select a section present at left to upload a file")
      setIsLoading(false)

      return;
    }



    setIsLoading(true)

    // let newWhatever = fileList.map((val, idx) => {
    //   return val
    // })
    let pdfList = Array.from(fileList).map(file => { return file });

    if(pdfList.length() === 0){
      alert("Please pick files to upload files");
      setIsLoading(false)
      return;
    }


    pdfList.forEach((file, idx) => {

      var reader = new FileReader();

      reader.readAsBinaryString(file);
      reader.onload = () => {
        console.log(file['name'])
        let b64payload = btoa(reader.result);
        axios.post('http://127.0.0.1:5000/addFiles', {
          dataType: "json",
          name: file['name'],
          index: activeIndex,
          data: JSON.stringify({ "file": b64payload })
        })
          .then((resp) => {
            console.log(resp['data']);
            alert("Files uploaded :)")
            setIsLoading(false)
          })
          .catch((error) => {
            console.log("files failed")
            alert("Files failed to upload :(")
            setIsLoading(false)
          })
      }

    })

  };




  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >


      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Button for="file" isLoading = {isLoading} onClick={() => { handleFiles() }} rightIcon={<FiUploadCloud />}>{`Add pdfs to ${activeIndex.replaceAll('_', ' ')}`}</Button>
        <Input type='file' maxWidth={"250px"} id="filesToUpload" multiple onInput={(e) => { setFilesList(e.target.files) }} />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    {activeIndex}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
