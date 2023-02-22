import React from "react";
import { Pagination } from "antd";
import './PaginationApp.css'

export default class PaginationApp extends React.Component {



    

    render () {
        const {currentPage, page} = this.props
        return (
            <div className='app-pagination'>
            <Pagination defaultCurrent={1} total={50} current={page} onChange={currentPage}/>
            </div>
        )
        
    }
        
}