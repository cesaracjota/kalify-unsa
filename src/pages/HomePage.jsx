import React from 'react'
import Layout from '../components/layout/Layout'
import Home from '../components/Home'

const HomePage = () => {
    return (
        <Layout children={<Home />} />
    )
}

export default HomePage
