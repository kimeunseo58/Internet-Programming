import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import { continents } from './Sections/Datas';
import Meta from 'antd/lib/card/Meta';
import SearchFeature from './Sections/SearchFeature';
function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")
    const [Filters, setFilters] = useState({
        continents: []
    })

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("Fail to get data.")
                }
            })
    }
    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)

    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }
    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>


            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>More</button>
                </div>
            }

        </div>

        
    )
}

export default LandingPage
