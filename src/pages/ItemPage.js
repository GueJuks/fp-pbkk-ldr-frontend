import React, { useEffect, useState } from 'react'
import DefaultLayout from './../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Table, Button, Input, Select, Form, message } from 'antd';

const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const [popUpModal, setPopUpModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
      dispatch({ type: "HIDE_LOADING" });
      console.log(error)
    }
  };
  // useEffect
  useEffect(() => {

    getAllItems();
  }, []);


  // handle delete
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: 'SHOW_LOADING'
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success('Item Diedit berhasil');
      getAllItems();
      setPopUpModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error('Ada kesalahan')
      console.log(error)
    }
  }
  // data
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) =>
        <img src={image} alt={record.name} height="60" width="60" />
    },
    { title: 'Price', dataIndex: 'price' },
    // {
    //   title: 'Quantity', dataIndex: '_id',
    //   render: (id, record) =>
    //     <div>
    //       <PlusCircleOutlined
    //         className='mx-3'
    //         style={{ cursor: "pointer" }}
    //         onClick={() => handleIncreament(record)}
    //       />
    //       <b>{record.quantity}</b>
    //       <MinusCircleOutlined
    //         className='mx-3'
    //         style={{ cursor: "pointer" }}
    //         onClick={() => handleDecreament(record)}
    //       />
    //     </div>
    // },
    {
      title: 'Actions',
      dataIndex: "_id",
      render: (id, record) =>
        <div>
          <EditOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setEditItem(record)
              setPopUpModal(true)
            }}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
    },
  ]

  // handleSubmit
  const handleSubmit = async (value) => {
    if (editItem == null) {
      // console.log(value);
      try {
        dispatch({
          type: 'SHOW_LOADING'
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success('Item Ditambahkan berhasil');
        getAllItems();
        setPopUpModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error('Ada kesalahan')
        console.log(error)
      }
    } else {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id
        });
        message.success('Item DiEdit berhasil');
        getAllItems();
        setPopUpModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error('Ada kesalahan')
        console.log(error)
      }
    }
  }

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Item List</h1>
        <Button type='primary' onClick={() => setPopUpModal(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {
        popUpModal && (
          <Modal
            title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
            open={popUpModal}
            onCancel={() => {
              setEditItem(null);
              setPopUpModal(false)
            }}
            footer={false}
          >
            <Form
              layout='vertical'
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="baju">Baju</Select.Option>
                  <Select.Option value="celana">Celana</Select.Option>
                  <Select.Option value="sepatu">Sepatu</Select.Option>
                </Select>
              </Form.Item>
              <div className='d-flex justify-content-end'>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        )
      }
    </DefaultLayout >
  )
}

export default ItemPage;