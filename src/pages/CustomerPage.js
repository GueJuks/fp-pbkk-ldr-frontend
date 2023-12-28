import React, { useState, useEffect } from 'react'
import DefaultLayout from './../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

const CustomerPage = () => {
  const [BillsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING'
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error)
    }
  };
  // useEffect
  useEffect(() => {

    getAllBills();
  }, []);

  // data
  const columns = [
    { title: 'ID', dataIndex: '_id' },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    { title: 'Contact No', dataIndex: 'customerNumber' },
  ];
  return (
    <DefaultLayout>
      <h1>
        Customerce Page
        <Table columns={columns} dataSource={BillsData} bordered pagination={false} />
      </h1>
    </DefaultLayout>
  )
}

export default CustomerPage