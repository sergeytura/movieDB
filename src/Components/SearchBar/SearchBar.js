import React from "react";
import { Input } from "antd";
import './SearchBar.css'

export default function SearchBar ({onChangeInput}) {
    return (
        <Input
        onChange={onChangeInput}
        className="app__search-bar" 
        placeholder="Type to search..." />
    )
}