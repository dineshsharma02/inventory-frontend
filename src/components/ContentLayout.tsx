import { Button, Table } from 'antd';
import React, { FC, ReactElement } from 'react'
import { DataProps, FormModalProps } from '../utils/types';

interface ContentLayoutProps {
    pageTitle: string
    setModalState?: (val:boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    children?: any
    extraButton?: any
    disableAddButton?: boolean
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
        disableAddButton = false
        
        
        
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
                {!disableAddButton && <Button onClick={()=> setModalState && setModalState(true)}>Add {pageTitle}</Button>}
                 
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