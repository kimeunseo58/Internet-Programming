import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Items = [
    { key: 1, value: "Top" },
    { key: 2, value: "Bottom" },
    { key: 3, value: "Shoe" },
    { key: 4, value: "Pajamas" },
    { key: 5, value: "Accessory" },
    { key: 6, value: "One-piece" },
    { key: 7, value: "Sweatsuit" }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Item, setItem] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const ItemChangeHandler = (event) => {
        setItem(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Item || Images.length === 0) {
            return alert("No Blank Space, Please")
        }

        const body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            items: Item
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('Upload Success.')
                    props.history.push('/')
                } else {
                    alert('Upload Fail.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> Product Upload</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>Price</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={ItemChangeHandler} value={Item}>
                    {Items.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    Submit
                </button>
            </Form>


        </div>
    )
}

export default UploadProductPage
