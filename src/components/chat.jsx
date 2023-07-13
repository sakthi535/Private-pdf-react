import React, { useState, useEffect } from 'react';
import axios from 'axios';


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Box,
} from '@chakra-ui/react'

import { Input, Heading, InputGroup, InputLeftElement, InputRightElement, Text, Spacer } from '@chakra-ui/react';
import {
    FiSend,
    FiUser,
    FiX

} from "react-icons/fi"

import { IconButton } from '@chakra-ui/react'

import Typewriter from "typewriter-effect";


function Chat({ sideBar }) {

    const [inputState, setInputState] = useState(false)

    const [tokenConsumed, setTokenConsumed] = useState(0)
    const [costConsumed, setCostConsumed] = useState(0)


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



    useEffect(() => { if (tokenConsumed > 0) { localStorage.setItem('token-consumed', tokenConsumed) } }, [tokenConsumed]);
    useEffect(() => { if (costConsumed > 0) { localStorage.setItem('cost-consumed', costConsumed) } }, [costConsumed]);


    useEffect(() => { setTokenConsumed(parseInt(localStorage.getItem('token-consumed'))) }, []);
    useEffect(() => { setCostConsumed(parseFloat(localStorage.getItem('cost-consumed'))) }, []);


    React.useEffect(() => {
        if (response.length > 0) {
            localStorage.setItem('chat-history', JSON.stringify(response));
        }
    }, [response]);


    const sendQuestion = () => {
        if (question === '') { return; }

        axios.get('http://127.0.0.1:5000/createResponse', {
            params: {
                question: question,
                index: sideBar,
            }
        })
            .then((resp) => {
                setResponse([
                    { question: question, answer: resp['data']['answer'], state: 1, source_documents: resp['data']['source_documents'], metadata: resp['data']['metadata'], index: sideBar, cost: resp['data']['token']['total_cost'], token: resp['data']['token']['total_tokens'] }, ...response
                ])
                setCostConsumed(costConsumed + resp['data']['token']['total_cost'] * 84)
                setTokenConsumed(tokenConsumed + resp['data']['token']['total_tokens'])
            })
            .catch((error) => {
                alert("Unable to process queries, please try again later");
            });
    }




    const handleResponse = () => {
        setResponse([
            { question: question, answer: '', state: 1, source_documents: [], metadata: {}, index: sideBar, cost: 0, token: 0 }, ...response
        ])
        sendQuestion(question)
    }

    return (
        <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <Heading textAlign={'center'} fontWeight="normal" mb="3.5%">
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

            <Button size='sm' type='text' mr={"6%"} ml={"0%"} mt={"3%"} position={'absolute'} left={'15px'} bottom={'50px'} onClick={() => { console.log("Something here", tokenConsumed) }}>
                Token too much : {tokenConsumed}
            </Button>

            <Button size='sm' type='text' mr={"6%"} ml={"0%"} mt={"3%"} left={'15px'} bottom={'10px'} position={'absolute'}>
                Cost : Rs. {costConsumed.toFixed(3)}
            </Button>

            <div alignContents={'center'} style={{ outline: "0.25px solid #ccc", minHeight: "250px", borderRadius: "16px", padding: "10px", backgroundColor: "var(--chakra-colors-gray-200)" }}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <FiUser />
                    </InputLeftElement>

                    <InputRightElement onClick={() => { handleResponse(); }}>
                        <FiSend />
                    </InputRightElement>

                    <Input placeholder={`Ask a question in ${sideBar.replaceAll('_', ' ')}.. ?`} size='md' onKeyDown={(e) => { if (e.key === "Enter") { handleResponse() } }} onChange={(e) => { setQuestion(e.target.value) }} disabled={inputState} style={{ outline: "0.25px solid #ccc", borderRadius: "16px", backgroundColor: "var(--chakra-colors-gray-100)" }} />
                </InputGroup>


                <div style={{ overflowY: "scroll", maxHeight: "475px" }} >

                    {response.map(
                        (key, idx) => {
                            if (key.state === 1) {

                                return (
                                    <>
                                        <Heading fontWeight="medium" fontSize={18} mt={"2.5%"} mb={"2.5%"} textAlign={"left"}>Q. {key.question} </Heading>
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

                                                        setResponse(toStore)
                                                    })
                                                    .start();
                                            }}
                                        />
                                        <Accordion allowToggle mt={"2.5%"}>
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
                                                        ('source_documents' in key ? key['source_documents'].length > 0 ? key['source_documents'][0]['content'] : '' : '')

                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>


                                    </>
                                )
                            }
                            else if (key.index === sideBar) {
                                return (
                                    <>
                                        <Heading fontWeight="medium" fontSize={18} mt={"2.5%"} textAlign={"left"} width={"100%"} display={"flex"}>
                                            <Text>
                                                Q. {key.question}
                                            </Text>

                                            <Button ml={"3"} size={'md'}>
                                                Rs. {(key.cost * 84).toFixed(3)}
                                            </Button>

                                            <Button ml={"3"} mr={"3"} size={'md'}>
                                                token : {key.token}
                                            </Button>
                                            <Spacer />

                                            <IconButton
                                                backgroundColor='rgb(107 176 233 / 20%)'
                                                colorScheme='red'
                                                aria-label='remove question'
                                                onClick={() => {
                                                    response[idx]['index'] = -1;

                                                    var toStore = [...response];
                                                    toStore[idx]['index'] = -1;

                                                    setResponse(toStore)
                                                }}
                                                icon={<FiX />}
                                            />

                                        </Heading>
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
                                                        // key['source_documents'].map((doc, idx) => {
                                                        //     return <li> {doc['content'].slice(0, 400) + '...'}</li>
                                                        // })
                                                        ('source_documents' in key ? key['source_documents'].length > 0 ? key['source_documents'][0]['content'] : '' : '')

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