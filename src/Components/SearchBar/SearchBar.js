import React from "react";
import { Input } from "antd";
import './SearchBar.css'

export default function SearchBar ({onChangeInput, value}) {
    return (
        <Input
        onChange={onChangeInput}
        value={value}
        className="app__search-bar" 
        placeholder="Type to search..." />
    )
}