import { DatePicker, message, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner';
import '../resources/transactions.css'
import moment from "moment"
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';

const { RangePicker } = DatePicker;

function Home() {
  const [loading, setLoading] = useState(false);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [selectedItemEdit, setSelectedItemEdit] = useState(null);

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-user"))
      setLoading(true);
      const response = await axios.post('api/transaction/get-all-transactions', {
        userid: user._id,
        type,
        frequency,
        ...(frequency === 'custom' && { selectedRange }),
      });
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  }

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post('api/transaction/delete-transaction', {
        transactionId: record._id,
      });
      message.success('Transaction deleted successfully!');
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  }

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type])

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(text);
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => {
        return <div>
          <EditOutlined onClick={() => {
            setSelectedItemEdit(record)
            setShowAddEditTransactionModal(true)
          }} />
          <DeleteOutlined className="mx-3" onClick={() => {
            deleteTransaction(record)
          }} />
        </div>
      }
    },
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>

          <div className='d-flex flex-column mx-5'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="all">All</Select.Option>
            </Select>
          </div>
        </div>

        <div className='d-flex'>
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined className={`mx-3 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewType('table')} />
              <AreaChartOutlined className={`mx-3 ${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewType('analytics')} />
            </div>
          </div>
          <button className='primary' onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>
      </div>

      <div className="table-analytics">
        {viewType === 'table' ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div> : <Analytics transactions={transactionsData} />}
      </div>

      {showAddEditTransactionModal &&
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemEdit={selectedItemEdit}
          setSelectedItemEdit={setSelectedItemEdit}
          getTransactions={getTransactions}
        />}
    </DefaultLayout>
  )
}

export default Home