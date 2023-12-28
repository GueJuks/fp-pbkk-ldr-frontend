import React, { useEffect, useState, useRef } from 'react'
import DefaultLayout from './../components/DefaultLayout';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { Modal, Table, Button, Input, Select, Form, message } from 'antd';
import '../styles/InvoiceStyles.css'

const BillsPage = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const [BillsData, setBillsData] = useState([]);
    const [popUpModal, setPopUpModal] = useState(false);
    const [selectedBill, setSelectBill] = useState(null);

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
    // print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    // data
    const columns = [
        { title: 'ID', dataIndex: '_id' },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
        },
        { title: 'Contact No', dataIndex: 'customerNumber' },
        { title: 'Subtotal', dataIndex: 'subTotal' },
        { title: 'Total Amount', dataIndex: 'totalAmount' },
        { title: 'Tax', dataIndex: 'tax' },
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
                    <EyeOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectBill(record);
                            setPopUpModal(true);
                        }}
                    />
                </div>
        },
    ];

    console.log(selectedBill);
    return (
        <DefaultLayout>
            <div className='d-flex justify-content-between'>
                <h1>Invoice List</h1>
            </div>
            <Table columns={columns} dataSource={BillsData} bordered />
            {
                popUpModal && (
                    <Modal
                        width={400}
                        pagination={false}
                        title="Invoice Details"
                        open={popUpModal}
                        onCancel={() => {
                            setPopUpModal(false)
                        }}
                        footer={false}
                    >
                        {/* invoice modal start */}
                        {/* <div id='invoice-POS'> */}
                        <div id='invoice-POS' ref={componentRef}>
                            <center id='top'>
                                <div className='logo' />
                                    <div className='info'>
                                        <h2>GueJuks</h2>
                                        <p>Contact : 12345 | Luffy</p>
                                    </div>
                                    {/* end info */}
                                {/* end invoiceTop */}
                            </center>
                            <div id='mid'>
                                <div className='mt-2'>
                                    <p>
                                        Customer Name : <b>{selectedBill.customerName}</b>
                                        <br />
                                        Phone No : <b>{selectedBill.customerNumber}</b>
                                        <br />
                                        Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                                    </p>
                                    <hr style={{ margin: "5px" }} />
                                </div>
                            </div>
                            {/* End Invoice mid */}
                            <div id='bot'>
                                <div id='table'>
                                    <table>
                                        <tbody>
                                            <tr className='tabletitle'>
                                                <td className='item'>
                                                    <h2>Item</h2>
                                                </td>
                                                <td className='item'>
                                                    <h2>Qty</h2>
                                                </td>
                                                <td className='item'>
                                                    <h2>Price</h2>
                                                </td>
                                                <td className='item'>
                                                    <h2>Total</h2>
                                                </td>
                                            </tr>
                                            {selectedBill.cartItems.map((item) => (
                                                <>
                                                    <tr className='service'>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.name}</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.quantity}</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>{item.price}</p>
                                                        </td>
                                                        <td className='tableitem'>
                                                            <p className='itemtext'>
                                                                {item.quantity * item.price}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}

                                            <tr className='tabletitle'>
                                                <td />
                                                <td />
                                                <td />
                                                <td className='Rate'>
                                                    <h2>tax</h2>
                                                </td>
                                                <td className='payment'>
                                                    <h2>${selectedBill.tax}</h2>
                                                </td>
                                            </tr>

                                            <tr className='tabletitle'>
                                                <td />
                                                <td />
                                                <td />
                                                <td className='Rate'>
                                                    <h2>Grand Total</h2>
                                                </td>
                                                <td className='payment'>
                                                    <h2>
                                                        <b>
                                                            ${selectedBill.totalAmount}
                                                        </b>
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* End Table */}
                                <div id='legalcopy'>
                                    <p className='legal'>
                                        <strong>Tank You</strong> loreasasasasaaaaaaaaaasasasasasasasasas
                                        <b>guejuks@gmail.com</b>
                                    </p>
                                </div>
                            </div>
                            {/* End InvoiceBot */}
                        </div>
                        {/* End Invoice */}
                        <div className='d-flex justify-content-end mt-3'>
                            <Button type='primary' onClick={handlePrint}>Print</Button>
                            {/* <Button type='primary'>Print</Button>*/}
                        </div>
                        {/* invoice modal ends */}
                    </Modal>
                )
            }
        </DefaultLayout>
    )
}

export default BillsPage