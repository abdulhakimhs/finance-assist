import React, { useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import Spinner from './Spinner';
import axios from "axios";

function AddEditTransaction({ setShowAddEditTransactionModal, showAddEditTransactionModal, selectedItemEdit, setSelectedItemEdit, getTransactions }) {

    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("sheymoney-user"))
            setLoading(true);
            if (selectedItemEdit) {
                await axios.post('api/transaction/edit-transaction', { 
                    payload : {
                        ...values, 
                        userid: user._id, 
                    },
                    transactionId: selectedItemEdit._id 
                });
                getTransactions();
                message.success('Transaction Updated Successfully');
            } else {
                await axios.post('api/transaction/add-transaction', { 
                    ...values, 
                    userid: user._id 
                });
                getTransactions();
                message.success('Transaction Added Successfully');
            }
            setShowAddEditTransactionModal(false);
            setSelectedItemEdit(null);
            setLoading(false);
        } catch (error) {
            message.error('Error Something when wrong!');
            setLoading(true);
        }
    }
    return (
        <Modal title={selectedItemEdit ? 'Edit Transaction' : 'Add Transaction'}
            visible={showAddEditTransactionModal}
            onCancel={() => setShowAddEditTransactionModal(false)}
            footer={false}
        >
            {loading && <Spinner />}
            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemEdit}>
                <Form.Item label="Amount" name="amount">
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Type" name="type">
                    <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="travel">Travel</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Date" name="date">
                    <Input type="date" />
                </Form.Item>

                <Form.Item label="Reference" name="reference">
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input type="text" />
                </Form.Item>

                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'>SAVE</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditTransaction