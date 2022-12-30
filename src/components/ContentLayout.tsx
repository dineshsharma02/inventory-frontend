import { Button, Table } from 'antd';
import React, { FC, ReactElement } from 'react'
import { DataProps, FormModalProps } from '../utils/types';

interface ContentLayoutProps {
    pageTitle: string
    setModalState: (val:boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    children: any
    extraButton?: any
}


const ContentLayout= (
    {
        children,
        pageTitle,
        setModalState,
        dataSource,
        columns,
        fetching,
        extraButton,
        
        
        
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
                <div className="buttons">
                <Button onClick={()=>setModalState(true)}>Add {pageTitle}</Button>
                {/* <Button onClick={()=>setModalState(true)}>Add {pageTitle}</Button> */}
                 
                 {extraButton}
                </div>
                
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