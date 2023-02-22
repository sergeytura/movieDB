import React from "react";
import { Pagination } from "antd";
import './PaginationApp.css'

export default function PaginationApp () {
    return (
        <div className='app-pagination'>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    )
}