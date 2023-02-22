import React from "react";
import { Rate } from "antd";

export default function Rating () {
    return (
        <div className="card__rating">
            <Rate 
            style={{
                fontSize: '14px',
            }}
            count='10' />
        </div>
    )
}