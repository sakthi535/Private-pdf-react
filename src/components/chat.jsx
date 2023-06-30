import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'

import { Input, Heading, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';
import {
    FiSend,
    FiUser

} from "react-icons/fi"

import Typewriter from "typewriter-effect";


function Chat({sideBar}) {

    const [inputState, setInputState] = useState(false)

    const [question, setQuestion] = useState('')
    // const [response, setResponse] = useState([{
    //     state: 0,
    //     question: "What is the size of the universe ?",
    //     answer: "The world as we know may continue to exapnd, so size of the universe may be unknown.",
    //     source_documents: [{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     }]
    // },
    // {
    //     state: 0,
    //     question: "What is the size of the universe ?",
    //     answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet, quam quibusdam nostrum vel quo nisi fugiat obcaecati tempora corporis beatae consequuntur autem nulla iure sequi? Minus asperiores odio maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat illum, maxime sint nobis modi culpa perferendis sapiente laudantium suscipit veritatis dolore facere beatae voluptatem odio a delectus, vitae repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam est quibusdam, eligendi quae in qui doloribus dicta illo eaque? Hic facilis consequuntur pariatur dicta earum commodi perferendis, consequatur sit voluptatem?",
    //     source_documents: [{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     }]
    // },
    // {
    //     state: 0,
    //     question: "What is the size of the universe ?",
    //     answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet, quam quibusdam nostrum vel quo nisi fugiat obcaecati tempora corporis beatae consequuntur autem nulla iure sequi? Minus asperiores odio maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat illum, maxime sint nobis modi culpa perferendis sapiente laudantium suscipit veritatis dolore facere beatae voluptatem odio a delectus, vitae repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam est quibusdam, eligendi quae in qui doloribus dicta illo eaque? Hic facilis consequuntur pariatur dicta earum commodi perferendis, consequatur sit voluptatem?",
    //     source_documents: [{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     }]
    // },
    // {
    //     state: 0,
    //     question: "What is the size of the universe ?",
    //     answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet, quam quibusdam nostrum vel quo nisi fugiat obcaecati tempora corporis beatae consequuntur autem nulla iure sequi? Minus asperiores odio maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat illum, maxime sint nobis modi culpa perferendis sapiente laudantium suscipit veritatis dolore facere beatae voluptatem odio a delectus, vitae repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam est quibusdam, eligendi quae in qui doloribus dicta illo eaque? Hic facilis consequuntur pariatur dicta earum commodi perferendis, consequatur sit voluptatem?",
    //     source_documents: [{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     }]
    // },
    // {
    //     state: 0,
    //     question: "What is the size of the universe ?",
    //     answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet, quam quibusdam nostrum vel quo nisi fugiat obcaecati tempora corporis beatae consequuntur autem nulla iure sequi? Minus asperiores odio maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat illum, maxime sint nobis modi culpa perferendis sapiente laudantium suscipit veritatis dolore facere beatae voluptatem odio a delectus, vitae repellat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam est quibusdam, eligendi quae in qui doloribus dicta illo eaque? Hic facilis consequuntur pariatur dicta earum commodi perferendis, consequatur sit voluptatem?",
    //     source_documents: [{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     },{
    //         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    //         metadata: {}
    //     }]
    // }]);
    const [response, setResponse] = useState([])

    useEffect(() => {
        setResponse(JSON.parse(localStorage.getItem('chat-history')) ? JSON.parse(localStorage.getItem('chat-history')) : []);
    }, [])



    React.useEffect(() => {
        if(response.length > 0){
            // var toStore = [...response];
            // toStore[0]['state'] = 0;
            localStorage.setItem('chat-history', JSON.stringify(response));
        }
      }, [response]);


    const sendQuestion = () => {
        if(question === ''){return;}

        axios.get('http://127.0.0.1:5000/createResponse', {
            params: {
                question: question,
                index : sideBar,
            }
        })
        .then((resp) => {
            console.log(resp['data']);
            setResponse([
                { question: question, answer: resp['data']['answer'], state: 1, source_documents: resp['data']['source_documents'], metadata: resp['data']['metadata'] }, ...response
            ])
        })
        .catch((error)=>{
            alert("Unable to process queries, please try again later");
        });
    }




    const handleResponse = () => {
        setResponse([
            { question: question, answer: '', state: 1, source_documents: [], metadata: {} }, ...response
        ])
        sendQuestion(question)


        console.log(response)
    }

    return (
        <div style={{ paddingLeft: "30px", paddingRight: "30px"}}>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="3.5%">
                {
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("Start chatting with pdf...")
                                .pauseFor(1000)
                                .start();
                        }}
                    />

                }
            </Heading>

            <div alignContents={'center'} style={{ outline: "0.25px solid #ccc", minHeight: "250px", borderRadius: "16px", padding: "10px", backgroundColor : "var(--chakra-colors-gray-200)" }}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <FiUser />
                    </InputLeftElement>

                    <InputRightElement onClick={() => { handleResponse(); }}>
                        <FiSend />
                    </InputRightElement>

                    <Input placeholder={`Ask a question in ${sideBar.replace('_', ' ')}.. ?`} size='md' onKeyDown = {(e) => {if(e.key === "Enter"){handleResponse()}}} onChange={(e) => { console.log(e);setQuestion(e.target.value) }} disabled={inputState} style = {{outline: "0.25px solid #ccc",borderRadius: "16px", backgroundColor : "var(--chakra-colors-gray-100)" }}/>
                </InputGroup>


                <div style={{ overflowY: "scroll", maxHeight: "600px" }} >

                    {response.map(
                        (key, idx) => {
                            if (key.state === 1 && key.index === sideBar) {
                                console.log(key)

                                return (
                                    <>
                                        <Heading fontWeight="medium" fontSize={18} mt={"2.5%"} mb = {"2.5%"} textAlign={"left"}>Q. {key.question} </Heading>
                                        <Typewriter
                                            delay="300"
                                            onInit={(typewriter) => {
                                                typewriter
                                                    .callFunction(() => {
                                                        setInputState(true)
                                                    })
                                                    .typeString(key.answer)
                                                    .pauseFor(250)
                                                    .callFunction(() => {
                                                        setInputState(false);
                                                        response[idx].state = 0;

                                                        var toStore = [...response];
                                                        toStore[idx]['state'] = 0;
                                                        
                                                        console.log(toStore)
                                                        setResponse(toStore)
                                                    })
                                                    .start();
                                            }}
                                        />

                                        <Accordion allowToggle mt = {"2.5%"}>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            Source Documents
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>

                                                     {
                                                        key['source_documents'].map((doc, idx) => {
                                                            return <ul> {doc['content'].slice(0, 400)+'...' }</ul>
                                                        })
                                                    }   
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>


                                    </>
                                )
                            }
                            else if(key.index === sideBar){

                                return (

                                    <>
                                        <Heading fontWeight="medium" fontSize={18} mt={"2.5%"} textAlign={"left"}>Q. {key.question} </Heading>
                                        <Text size="sm" m={"2%"}>{key.answer}</Text>

                                        <Accordion allowToggle>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            Source Documents
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    {
                                                        key['source_documents'].map((doc, idx) => {
                                                            return <li> {doc['content'].slice(0, 400)+'...' }</li>
                                                        })
                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </>
                                )
                            }
                        }
                    )}




                </div>

            </div>






        </div>
    );
}

export default Chat;