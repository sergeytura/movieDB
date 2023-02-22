import React from "react";
import { Input } from "antd";
import './SearchBar.css'

export default function SearchBar () {
    return (
        <Input className="app__search-bar" placeholder="Type to search..." />
    )
}