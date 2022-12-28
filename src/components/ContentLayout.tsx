import { Table } from 'antd';
import React, { FC } from 'react'
import { DataProps, FormModalProps } from '../utils/types';

interface ContentLayoutProps {
    pageTitle: string
    setModalState: (val:boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    children: any
}


const ContentLayout= (
    {
        children,
        pageTitle,
        setModalState,
        dataSource,
        columns,
        fetching,
        
        
    }:ContentLayoutProps) => {
    return (
        <>
          <div className="card">
            <div className="cardHeader">
              <h1 className="headContent">{pageTitle}</h1>
              <div className="rightContent">
                <div className="searchInput">
                  <input type="text" name="" id="" />
                </div>
                <button onClick={()=>setModalState(true)}>Add {pageTitle}</button>
              </div>
            </div>
            <br />
            <br />
            <Table columns={columns} dataSource={dataSource} loading = {fetching} size="middle" />
          </div>

          {children}
    
          
        </>
      );
}

export default ContentLayout