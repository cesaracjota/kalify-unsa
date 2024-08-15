import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Button, Heading, VStack, Text, IconButton, useToast, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Table, Thead, Tbody, Tr, Th, Td,
    Alert,
    AlertTitle,
    Stack,
    Tfoot,
    CircularProgress,
    CircularProgressLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    TableCaption,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Divider,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import jsPDF from 'jspdf';
import { FaRegGrinHearts, FaRegGrimace } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";
import html2canvas from 'html2canvas';
import { BsFillImageFill } from 'react-icons/bs';
import { FaCloudDownloadAlt } from "react-icons/fa";

const HomePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [grades, setGrades] = useState([{ score: '', weight: '' }]);
    const [currentGrade, setCurrentGrade] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [savedCourses, setSavedCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const toast = useToast();
    const componentRef = useRef();

    useEffect(() => {
        calculateCurrentGrade();
    });

    const handleChange = (index, name, value) => {
        const values = [...grades];
        values[index][name] = value;
        setGrades(values);
    };

    const handleAddGrade = () => {
        setGrades([...grades, { score: '', weight: '' }]);
    };

    const handleRemoveGrade = (index) => {
        const values = [...grades];
        values.splice(index, 1);
        setGrades(values);
    };

    const calculateCurrentGrade = () => {
        let totalWeight = 0;
        let totalGrade = 0;

        grades.forEach(grade => {
            const score = parseFloat(grade.score);
            const weight = parseFloat(grade.weight);
            if (!isNaN(score) && !isNaN(weight)) {
                totalGrade += score * (weight / 100);
                totalWeight += weight;
            }
        });

        setTotalWeight(totalWeight);
        setCurrentGrade(totalWeight > 0 ? totalGrade : 0);
    };

    const handleSave = () => {
        const course = {
            name: courseName,
            grades: [...grades],
            finalGrade: currentGrade
        };
        setSavedCourses([...savedCourses, course]);
        setGrades([{ score: '', weight: '' }]);
        setCurrentGrade(0);
        setTotalWeight(0);
        setCourseName('');
        onClose();
        toast({
            title: "Curso guardado.",
            description: `El curso ${course.name} ha sido guardado con éxito.`,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };


    const [loadingDowloadPdf, setloadingDowloadPdf] = useState(false);
    const [loadingDowloadImage, setloadingDowloadImage] = useState(false);

    const handleDownloadPdf = () => {
        setloadingDowloadPdf(true);
        const element = componentRef.current;
        // Configuración de renderizado de html2canvas
        const options = {
            scale: 4, // Aumenta la resolución de la imagen (2x)
            useCORS: true, // Habilita el uso de CORS para imágenes externas
            logging: true, // Habilita el registro de mensajes de html2canvas en la consola
            quality: 0.99, // Calidad de la imagen (0 - 1)
            allowTaint: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            backgroundColor: '#fff',
            foreignObjectRendering: false, // Habilita el renderizado de elementos SVG
            async: true, // Habilita el renderizado asíncrono
            allowTainttaintTest: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            imageTimeout: 15000, // Tiempo máximo de espera para la carga de imágenes, en milisegundos
            id: 'html2canvas', // ID del elemento a renderizar
            svgRendering: false, // Habilita el renderizado de elementos SVG,
        };

        html2canvas(element, options)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    image: {
                        type: 'png',
                        quality: 0.98
                    },
                    compress: true,
                    precision: 2,
                });
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                setloadingDowloadPdf(false);
                // open pdf in new window
                // window.open(pdf.output('bloburl'), '_blank');
                pdf.save(`${1}.pdf`);
            },
                (error) => {
                    console.log(error);
                });
    };

    const handleDownloadImage = () => {
        setloadingDowloadImage(true);
        const element = componentRef.current;
        // Configuración de renderizado de html2canvas
        const options = {
            id: 'html2canvas', // ID del elemento a renderizar
            scale: 6, // Aumenta la resolución de la imagen (2x)
            useCORS: true, // Habilita el uso de CORS para imágenes externas
            logging: true, // Habilita el registro de mensajes de html2canvas en la consola
            type: 'image/png', // Tipo de imagen a generar
            quality: 0.92, // Calidad de la imagen (0 - 1)
            allowTaint: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            backgroundColor: '#fff', // Color de fondo de la imagen
            removeContainer: true, // Elimina el contenedor generado por html2canvas
            imageTimeout: 15000, // Tiempo máximo de espera para la carga de imágenes, en milisegundos
            foreignObjectRendering: false, // Habilita el renderizado de elementos SVG
            async: true, // Habilita el renderizado asíncrono
            allowTainttaintTest: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            proxy: null, // URL del proxy a utilizar
            svgRendering: false, // Habilita el renderizado de elementos SVG
        };

        html2canvas(element, options).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${1}.png`;
            setloadingDowloadImage(false);
            link.click();
        });
    };

    const weightedAverage = savedCourses.length ? savedCourses.reduce((acc, course) => acc + course.finalGrade, 0) / savedCourses.length : 0;

    return (
        <Box w='full'>
            <Heading as="h1" size={{ base: 'md', lg: 'lg' }} mb={6}>Calculadora de Notas Parciales</Heading>
            <VStack spacing={4} align="stretch" w='full'>
                {grades.map((grade, index) => (
                    <Stack key={index} spacing={5} direction={'row'} display={'flex'} w='full' justifyContent={'space-between'}>
                        <Text sx={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }} textAlign={'center'} fontWeight={'bold'}>NOTA {index + 1}</Text>
                        <Divider orientation='vertical' h={'auto'} bg={'gray.400'} />
                        <Stack direction={{ base: 'column', md: 'column' }} w='full' display={'flex'} justifyContent={'space-between'}>
                            <Stack direction={'row'} spacing={4}>
                                <Slider value={grade.score} alignSelf={'center'} min={0} max={20} step={1} onChange={(valueString) => handleChange(index, 'score', valueString)}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb boxSize={4} />
                                </Slider>

                            </Stack>
                            <Stack direction={'row'} w='full' spacing={5}>
                                <NumberInput
                                    value={grade.score}
                                    onChange={(valueString) => handleChange(index, 'score', valueString)}
                                    min={0}
                                    max={20}
                                    step={0.1}
                                    size={{ base: 'sm', lg: 'lg' }}
                                    w="full"
                                >
                                    <NumberInputField placeholder="20.0" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <NumberInput
                                    value={grade.weight}
                                    onChange={(value) => handleChange(index, 'weight', value)}
                                    min={0}
                                    max={100}
                                    step={5}
                                    size={{ base: 'sm', lg: 'lg' }}
                                    w="full"
                                >
                                    <NumberInputField placeholder="%" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                            </Stack>
                        </Stack>
                        <IconButton
                            icon={<DeleteIcon />}
                            isDisabled={index <= 0}
                            colorScheme='red'
                            alignSelf={'center'}
                            onClick={() => handleRemoveGrade(index)}
                            size={'lg'}
                        />
                    </Stack>
                ))}
                <Divider />
                <Stack direction={'row'} justifyContent={'space-between'} display='flex' w='full'>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme='blue'
                        onClick={handleAddGrade}
                        alignSelf={'center'}
                        size={{ base: 'sm', lg: 'md' }}
                    >
                        AGREGAR NOTA
                    </Button>
                    <Stack direction={'row'} justifyContent={'space between'}>
                        <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'bold'} alignSelf={'center'}>PORCENTAJE:</Text>
                        <CircularProgress value={totalWeight} thickness='8px' color='green.400'>
                            <CircularProgressLabel fontWeight={'semibold'} fontSize={'xx-small'}>{totalWeight}%</CircularProgressLabel>
                        </CircularProgress>
                    </Stack>
                </Stack>
                <Button onClick={onOpen} isDisabled={!currentGrade} colorScheme="green" size={{ base: 'md', lg: 'lg' }}>Guardar Curso</Button>
                {
                    currentGrade ? (
                        <Alert
                            status={currentGrade >= 10.5 ? 'success' : 'error'}
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            borderRadius={'md'}
                        >
                            {
                                currentGrade >= 10.5 && currentGrade <= 16 ? (
                                    <FaRegGrimace size={25} />
                                ) : currentGrade >= 16 ? <FaRegGrinHearts size={25} /> : <ImSad2 size={25} />
                            }

                            <AlertTitle mb={1} fontSize={{ base: 'sm', lg: 'lg' }}>
                                Nota Actual: {currentGrade.toFixed(2)}
                            </AlertTitle>
                        </Alert>
                    ) : null
                }
            </VStack>
            <Box mt={6}>
                <Stack display={'flex'} justifyContent={'space-between'} direction={{ base: 'column', md: 'row' }}>
                    <Heading as="h2" size={{ base: 'sm', lg: 'md' }} alignSelf={'center'}>Cursos Guardados:</Heading>
                    <Stack direction={'row'}>
                        <IconButton
                            size={{ base: 'xs', lg: 'lg' }}
                            w='full'
                            isLoading={loadingDowloadImage ? true : false}
                            colorScheme='messenger'
                            _dark={{
                                bg: 'messenger.500',
                                color: 'white',
                                _hover: {
                                    bg: 'messenger.700',
                                },
                            }}
                            onClick={handleDownloadImage}
                            icon={<BsFillImageFill />}
                        />
                        <IconButton
                            size={{ base: 'xs', lg: 'lg' }}
                            w='full'
                            isLoading={loadingDowloadPdf ? true : false}
                            colorScheme='green'
                            _dark={{
                                bg: 'green.500',
                                color: 'white',
                                _hover: {
                                    bg: 'green.700',
                                },
                            }}
                            onClick={handleDownloadPdf}
                            icon={<FaCloudDownloadAlt />}
                        />
                    </Stack>
                </Stack>

                <Box
                    ref={componentRef}
                    mt={4}
                    borderWidth="1px"
                    overflow="hidden"
                    boxShadow="base"
                    p={6}
                    mx="auto"
                >
                    <Heading as="h2" size={{ base: 'sm', lg: 'lg' }} textAlign="center" color="blue.600">
                        Mis Notas Finales 📚🎓
                    </Heading>
                    <Table variant="simple" colorScheme="blue">
                        <TableCaption placement="top" fontWeight="bold" fontSize={{ base: 'xs', lg: 'lg' }}>
                            Semestre Académico {new Date().getFullYear()} II
                        </TableCaption>
                        <Thead>
                            <Tr bg="blue.50" _dark={{ bg: 'blue.800' }}>
                                <Th fontSize={{ base: 'xs', lg: 'sm' }} py={4}>Curso</Th>
                                <Th isNumeric fontSize={{ base: 'xs', lg: 'sm' }} py={4}>Nota Final</Th>
                            </Tr>
                        </Thead>
                        <Tbody fontSize={{ base: 'xs', lg: 'md' }}>
                            {savedCourses.map((course, index) => (
                                <Tr key={index}>
                                    <Td py={3}>{course.name}</Td>
                                    <Td isNumeric py={3} fontWeight="semibold">
                                        {course.finalGrade.toFixed(2)}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            {savedCourses.length > 0 && (
                                <Tr bg="blue.100" _dark={{ bg: 'blue.900' }}>
                                    <Td fontSize={{ base: 'xs', lg: 'md' }} py={4}>
                                        <strong>PROMEDIO PONDERADO</strong>
                                    </Td>
                                    <Td isNumeric fontSize={{ base: 'xs', lg: 'md' }} py={4}>
                                        <strong>{weightedAverage.toFixed(2)}</strong>
                                    </Td>
                                </Tr>
                            )}
                        </Tfoot>
                    </Table>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay backdropBlur={"blur(50px)"}/>
                <ModalContent
                    _dark={{
                        bg: "rgba(19,22,28, 0.9)",
                        color: "primary.100",
                        backdropBlur: "blur(50px)"
                    }}
                    bg={'white'}
                    backdropFilter="blur(10px)">
                    <ModalHeader>Guardar Curso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nombre del Curso</FormLabel>
                            <Input
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                placeholder="Ingrese el nombre del curso"
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave} isDisabled={!courseName}>
                            Guardar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default HomePage;
