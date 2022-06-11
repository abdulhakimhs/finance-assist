import { Progress } from 'antd'
import React from 'react'
import '../resources/analytics.css'

function Analytics({ transactions }) {

    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpanseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100

    const totalTurnoverRp = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(totalTurnover);

    const totalIncomeTurnoverRp = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(totalIncomeTurnover);

    const totalExpenseTurnoverRp = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(totalExpenseTurnover);

    const categories = [
        "salary",
        "freelance",
        "food",
        "entertainment",
        "travel",
        "investment",
        "education",
        "medical",
        "tax"
    ]

    return (
        <div className='analytics'>
            <div className="row">
                <div className="col-md-6 mt-3">
                    <div className="transaction-count">
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTransactions.length}</h5>
                        <h5>Expense : {totalExpenseTransactions.length}</h5>

                        <div className='progress-bars'>
                            <Progress className='mx-5' strokeColor='green' type="circle" percent={totalIncomeTransactionsPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type="circle" percent={totalExpenseTransactionsPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="transaction-count">
                        <h4>Total Turnover : {totalTurnoverRp}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTurnoverRp}</h5>
                        <h5>Expense : {totalExpenseTurnoverRp}</h5>

                        <div className='progress-bars'>
                            <Progress className='mx-5' strokeColor='green' type="circle" percent={totalIncomeTurnoverPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type="circle" percent={totalExpanseTurnoverPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="category-analysys">
                        <h4>Income - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions.filter((t) => t.type == 'income' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                            return (
                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="category-analysys">
                        <h4>Expense - Category Wise</h4>
                        {categories.map((category) => {
                            const amount = transactions.filter((t) => t.type == 'expense' && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                            return (
                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics