import React, { useState, useEffect } from 'react'
import DefaultLayout from './../components/DefaultLayout';
import axios from 'axios';
import { Row, Col } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState('kaos');
  const categories = [
    {
      name: 'kaos',
      imageUrl: 'https://e7.pngegg.com/pngimages/739/735/png-clipart-t-shirt-clothing-sleeve-polo-shirt-creative-t-shirt-design.png'
    },
    {
      name: 'celana',
      imageUrl: 'https://th.bing.com/th/id/OIP.i9APbSUw3xy9N59npH-qdgHaLH?rs=1&pid=ImgDetMain'
    },
    {
      name: 'sepatu',
      imageUrl: 'https://blog.jejualan.com/wp-content/uploads/2020/05/Tips-Menjalankan-Bisnis-Cuci-Sepatu-bagi-Pemula4-768x450.jpg'
    },
  ]
  const dispatch = useDispatch()

  // useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className='d-flex'>
        {categories.map(category => (
          <div key={category.name} className={`d-flex category ${selecedCategory === category.name && "category-active"}`}
          onClick={() => setSelecedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="60"
              width="60"
            />
          </div>
        ))}
      </div>
      <Row>
        {
          itemsData.filter(i => i.category === selecedCategory).map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))
        }
      </Row>
    </DefaultLayout>
  )
}

export default HomePage