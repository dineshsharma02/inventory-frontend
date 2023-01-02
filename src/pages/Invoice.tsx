import {FC, useEffect, useRef, useState} from 'react'
import { getShops } from '../utils/functions';
import ContentLayout from '../components/ContentLayout';
import { DataProps, InvoiceCreationProps, invoiceType, ShopProps } from '../utils/types';
import AddShopForm from '../components/AddShopForm';
import { useGetInvoices, useGetShops } from '../utils/hooks';
import { Button } from 'antd';
import PrintOut from '../components/printOut';
import  { useReactToPrint } from 'react-to-print';

const Invoice:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [invoices, setInvoices] = useState<invoiceType[]>([])
    const [invoiceData, setInvoiceData] = useState<InvoiceCreationProps[]>([])
    const [canPrintOut, setCanPrintOut] = useState(false)

    const printOutRef = useRef<any>()
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Created By',
        dataIndex: 'created_by_email',
        key: 'created_by_email',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: "Shop Name",
        dataIndex: "shop_name",
        key: "shop_name"
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action"
      }
    ];

    useGetInvoices(setInvoices, setFetching)
    

    const handlePrint = useReactToPrint({
      content: () => printOutRef.current,
    });


    const printData = (i:InvoiceCreationProps[]) =>{
      setInvoiceData(i)
      setCanPrintOut(true)

    }

    useEffect(()=>{
      if(canPrintOut){
        handlePrint()
        setCanPrintOut(false)
      }
    },[canPrintOut])

    const pushActionToList =()=>{
      return invoices.map(item=>({
        ...item,action: <Button onClick={()=> printData(item.invoice_items)}>Print</Button>
      }))
    }
    

    

    return (
      <>
        <ContentLayout
          pageTitle="Invoices"
          dataSource={(pushActionToList() as unknown) as DataProps[]}
          columns={columns}
          fetching={fetching}
          disableAddButton = {true}
        />

        <div ref={printOutRef}>
          {canPrintOut && <PrintOut data={invoiceData}  />}
         </div>
          
         </>
    )
}


export default Invoice